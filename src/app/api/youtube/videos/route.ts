import { NextRequest, NextResponse } from 'next/server'
import { YouTubeService } from '@/lib/socialMedia'
import { getRedis, getRatelimit, cacheKeys, CACHE_TTL, isRedisConfigured } from '@/lib/redis'
import { socialMediaConfig } from '@/lib/config'

/**
 * GET /api/youtube/videos
 *
 * Fetches recent YouTube videos with Redis caching and rate limiting
 *
 * Query Parameters:
 * - limit: number of videos to fetch (default: 5, max: 20)
 *
 * Features:
 * - Redis caching (5 min TTL) to reduce YouTube API quota usage
 * - Rate limiting (10 requests per 60s per IP) to prevent abuse
 * - Graceful fallback when Redis is not configured
 *
 * Returns:
 * - 200: Array of YouTubeVideo objects
 * - 429: Rate limit exceeded
 * - 500: Server error
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const limit = Math.min(parseInt(limitParam || '5', 10), 20) // Max 20 videos

    // Rate limiting
    if (isRedisConfigured()) {
      const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'anonymous'
      const { success, limit: rateLimit, remaining, reset } = await getRatelimit().limit(ip)

      if (!success) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            message: 'Too many requests. Please try again later.',
            limit: rateLimit,
            remaining,
            reset: new Date(reset).toISOString(),
          },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': rateLimit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
            }
          }
        )
      }

      // Add rate limit headers to successful responses
      const headers = {
        'X-RateLimit-Limit': rateLimit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      }

      // Check Redis cache
      const cacheKey = cacheKeys.youtubeVideos(limit)
      const cached = await getRedis().get(cacheKey)

      if (cached) {
        return NextResponse.json(
          {
            data: cached,
            cached: true,
            timestamp: new Date().toISOString(),
          },
          {
            status: 200,
            headers: {
              ...headers,
              'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
            }
          }
        )
      }

      // Cache miss - fetch from YouTube API
      const youtubeService = new YouTubeService(
        socialMediaConfig.youtube.apiKey,
        socialMediaConfig.youtube.channelId,
        socialMediaConfig.youtube.channelHandle
      )

      const videos = await youtubeService.getRecentVideos(limit)

      // Store in Redis cache
      await getRedis().setex(cacheKey, CACHE_TTL.YOUTUBE_VIDEOS, videos)

      return NextResponse.json(
        {
          data: videos,
          cached: false,
          timestamp: new Date().toISOString(),
        },
        {
          status: 200,
          headers: {
            ...headers,
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
          }
        }
      )
    } else {
      // Fallback when Redis is not configured
      // Still functional but without caching or rate limiting
      const youtubeService = new YouTubeService(
        socialMediaConfig.youtube.apiKey,
        socialMediaConfig.youtube.channelId,
        socialMediaConfig.youtube.channelHandle
      )

      const videos = await youtubeService.getRecentVideos(limit)

      return NextResponse.json(
        {
          data: videos,
          cached: false,
          timestamp: new Date().toISOString(),
          warning: 'Redis not configured - caching and rate limiting disabled',
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
          }
        }
      )
    }
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch videos',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

/**
 * Check if Redis is configured
 */
export function isRedisConfigured(): boolean {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  )
}

/**
 * Lazy-loaded Redis client for caching and rate limiting
 * Uses Upstash Redis (serverless Redis for edge functions)
 * Only initializes when actually used at runtime
 */
let redisInstance: Redis | null = null
export function getRedis(): Redis {
  if (!redisInstance && isRedisConfigured()) {
    redisInstance = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  }
  return redisInstance!
}

/**
 * Lazy-loaded rate limiter configuration
 * Allows 10 requests per 60 seconds per IP address
 */
let ratelimitInstance: Ratelimit | null = null
export function getRatelimit(): Ratelimit {
  if (!ratelimitInstance && isRedisConfigured()) {
    ratelimitInstance = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(10, '60 s'),
      analytics: true,
      prefix: '@upstash/ratelimit',
    })
  }
  return ratelimitInstance!
}

// Export legacy names for backwards compatibility
export const redis = getRedis
export const ratelimit = getRatelimit

/**
 * Cache TTL configurations (in seconds)
 */
export const CACHE_TTL = {
  YOUTUBE_VIDEOS: 300, // 5 minutes - balance between freshness and API quota
  FACEBOOK_POSTS: 300, // 5 minutes
  LONG: 3600, // 1 hour for less frequently changing data
} as const

/**
 * Cache key generator for consistent naming
 */
export const cacheKeys = {
  youtubeVideos: (limit: number) => `youtube:videos:${limit}`,
  facebookPosts: (limit: number) => `facebook:posts:${limit}`,
} as const

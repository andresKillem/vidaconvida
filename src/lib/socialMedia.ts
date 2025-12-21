// Social Media API Integration
export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  duration: string
  viewCount: string
  url: string
}

export interface FacebookPost {
  id: string
  message: string
  created_time: string
  full_picture?: string
  permalink_url: string
  type: string
}

export interface SocialMediaConfig {
  youtube: {
    channelId: string
    apiKey: string
  }
  facebook: {
    pageId: string
    accessToken: string
  }
}

// YouTube API Integration
export class YouTubeService {
  private apiKey: string
  private channelId: string
  private channelHandle: string

  constructor(apiKey: string, channelId: string = '', channelHandle: string = '') {
    this.apiKey = apiKey
    this.channelId = channelId
    this.channelHandle = channelHandle
  }

  private async getChannelId(): Promise<string> {
    // If we already have a channel ID, use it
    if (this.channelId) {
      return this.channelId
    }

    // Otherwise, resolve the handle to a channel ID
    if (this.channelHandle) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${this.channelHandle}&key=${this.apiKey}`
        )
        const data = await response.json()

        if (data.items?.[0]?.id) {
          this.channelId = data.items[0].id // Cache it
          return this.channelId
        }
      } catch (error) {
        console.error('Error resolving channel handle:', error)
      }
    }

    throw new Error('No valid channel ID or handle provided')
  }

  async getRecentVideos(limit: number = 5): Promise<YouTubeVideo[]> {
    try {
      if (!this.apiKey) {
        throw new Error('YouTube API key not configured')
      }

      const channelId = await this.getChannelId()

      // Get channel uploads playlist
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${this.apiKey}`
      )
      const channelData = await channelResponse.json()

      if (!channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads) {
        throw new Error('Channel not found or no uploads playlist')
      }

      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads

      // Get videos from uploads playlist
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${limit}&key=${this.apiKey}`
      )
      const videosData = await videosResponse.json()

      if (videosData.error) {
        throw new Error(videosData.error.message || 'Failed to fetch videos')
      }

      // Get video statistics (duration, view count) with a second API call
      const videoIds = videosData.items?.map((item: { snippet: { resourceId: { videoId: string } } }) => item.snippet.resourceId.videoId).join(',')

      const videoStats: Record<string, { duration: string; viewCount: string }> = {}

      if (videoIds) {
        const statsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${this.apiKey}`
        )
        const statsData = await statsResponse.json()

        statsData.items?.forEach((item: { id: string; contentDetails: { duration: string }; statistics: { viewCount: string } }) => {
          videoStats[item.id] = {
            duration: this.formatDuration(item.contentDetails.duration),
            viewCount: this.formatViewCount(item.statistics.viewCount)
          }
        })
      }

      return videosData.items?.map((item: { snippet: { resourceId: { videoId: string }, title: string, description: string, thumbnails: { high?: { url: string }, default?: { url: string } }, publishedAt: string } }) => {
        const videoId = item.snippet.resourceId.videoId
        const stats = videoStats[videoId] || { duration: '', viewCount: '' }

        return {
          id: videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
          publishedAt: item.snippet.publishedAt,
          duration: stats.duration,
          viewCount: stats.viewCount,
          url: `https://www.youtube.com/watch?v=${videoId}`
        }
      }) || []
    } catch (error) {
      console.error('Error fetching YouTube videos:', error)
      throw error // Re-throw to let caller handle it
    }
  }

  private formatDuration(isoDuration: string): string {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
    if (!match) return ''

    const hours = match[1] ? parseInt(match[1]) : 0
    const minutes = match[2] ? parseInt(match[2]) : 0
    const seconds = match[3] ? parseInt(match[3]) : 0

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  private formatViewCount(count: string): string {
    const num = parseInt(count)
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toLocaleString()
  }
}

// Facebook Graph API Integration
export class FacebookService {
  private pageId: string
  private accessToken: string

  constructor(pageId: string, accessToken: string) {
    this.pageId = pageId
    this.accessToken = accessToken
  }

  async getRecentPosts(limit: number = 5): Promise<FacebookPost[]> {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${this.pageId}/posts?fields=id,message,created_time,full_picture,permalink_url,type&limit=${limit}&access_token=${this.accessToken}`
      )
      const data = await response.json()

      return data.data?.map((post: { id: string, message?: string, created_time: string, full_picture?: string, permalink_url: string, type: string }) => ({
        id: post.id,
        message: post.message || '',
        created_time: post.created_time,
        full_picture: post.full_picture,
        permalink_url: post.permalink_url,
        type: post.type
      })) || []
    } catch (error) {
      console.error('Error fetching Facebook posts:', error)
      return []
    }
  }
}

// Cache service for social media data
export class SocialMediaCache {
  private cache: Map<string, { data: unknown; timestamp: number }> = new Map()
  private cacheTimeout = 5 * 60 * 1000 // 5 minutes

  set(key: string, data: unknown): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  get(key: string): unknown | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  clear(): void {
    this.cache.clear()
  }
}

// Main service that combines everything
export class SocialMediaService {
  private youtube: YouTubeService
  private facebook: FacebookService
  private cache: SocialMediaCache

  constructor(config: SocialMediaConfig & { youtube: { channelHandle?: string } }) {
    this.youtube = new YouTubeService(
      config.youtube.apiKey,
      config.youtube.channelId,
      config.youtube.channelHandle || ''
    )
    this.facebook = new FacebookService(config.facebook.pageId, config.facebook.accessToken)
    this.cache = new SocialMediaCache()
  }

  async getLatestContent() {
    const cacheKey = 'latest_content'
    const cached = this.cache.get(cacheKey)
    if (cached) return cached

    try {
      const [videos, posts] = await Promise.all([
        this.youtube.getRecentVideos(3),
        this.facebook.getRecentPosts(3)
      ])

      const result = { videos, posts }
      this.cache.set(cacheKey, result)
      return result
    } catch (error) {
      console.error('Error fetching social media content:', error)
      return { videos: [], posts: [] }
    }
  }
}

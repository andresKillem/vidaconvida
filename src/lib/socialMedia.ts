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

  constructor(apiKey: string, channelId: string) {
    this.apiKey = apiKey
    this.channelId = channelId
  }

  async getRecentVideos(limit: number = 5): Promise<YouTubeVideo[]> {
    try {
      // Get channel uploads playlist
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${this.channelId}&key=${this.apiKey}`
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

      return videosData.items?.map((item: { snippet: { resourceId: { videoId: string }, title: string, description: string, thumbnails: { high?: { url: string }, default?: { url: string } }, publishedAt: string } }) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
        duration: '', // Would need additional API call for duration
        viewCount: '', // Would need additional API call for view count
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
      })) || []
    } catch (error) {
      console.error('Error fetching YouTube videos:', error)
      return []
    }
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

  constructor(config: SocialMediaConfig) {
    this.youtube = new YouTubeService(config.youtube.apiKey, config.youtube.channelId)
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

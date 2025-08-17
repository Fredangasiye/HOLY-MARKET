// YouTube API Integration for Scoutlify
// This service handles YouTube as a backend API for video storage and management

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: number
  likes: number
  uploadDate: string
  youtubeUrl: string
  channelTitle: string
  tags: string[]
  categoryId: string
  privacyStatus: 'public' | 'private' | 'unlisted'
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

class YouTubeAPIService {
  private apiKey: string
  private clientId: string
  private clientSecret: string
  private redirectUri: string

  constructor() {
    // These would be set from environment variables in production
    this.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || ''
    this.clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID || ''
    this.clientSecret = import.meta.env.VITE_YOUTUBE_CLIENT_SECRET || ''
    this.redirectUri = import.meta.env.VITE_YOUTUBE_REDIRECT_URI || 'http://localhost:5173/auth/youtube-callback'
  }

  // Initialize YouTube API authentication
  async initializeAuth(): Promise<string> {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${this.clientId}&` +
      `redirect_uri=${encodeURIComponent(this.redirectUri)}&` +
      `scope=${encodeURIComponent('https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly')}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`

    return authUrl
  }

  // Handle OAuth callback and get access token
  async handleAuthCallback(code: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
      }),
    })

    const data = await response.json()
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    }
  }

  // Upload video to YouTube
  async uploadVideo(
    file: File,
    metadata: {
      title: string
      description: string
      tags: string[]
      categoryId?: string
      privacyStatus?: 'public' | 'private' | 'unlisted'
    },
    accessToken: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<YouTubeVideo> {
    const formData = new FormData()
    
    // Add video file
    formData.append('video', file)
    
    // Add metadata
    const videoMetadata = {
      snippet: {
        title: metadata.title,
        description: metadata.description,
        tags: metadata.tags,
        categoryId: metadata.categoryId || '17', // Sports category
      },
      status: {
        privacyStatus: metadata.privacyStatus || 'public',
        selfDeclaredMadeForKids: false,
      },
    }
    
    formData.append('metadata', new Blob([JSON.stringify(videoMetadata)], { type: 'application/json' }))

    const xhr = new XMLHttpRequest()
    
    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          onProgress({
            loaded: event.loaded,
            total: event.total,
            percentage: (event.loaded / event.total) * 100,
          })
        }
      })

      xhr.addEventListener('load', async () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          const video = await this.getVideoDetails(response.id, accessToken)
          resolve(video)
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`))
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'))
      })

      xhr.open('POST', 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&uploadType=multipart')
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
      xhr.send(formData)
    })
  }

  // Get video details from YouTube
  async getVideoDetails(videoId: string, accessToken?: string): Promise<YouTubeVideo> {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${this.apiKey}`
    
    const headers: Record<string, string> = {}
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const response = await fetch(url, { headers })
    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      throw new Error('Video not found')
    }

    const video = data.items[0]
    const snippet = video.snippet
    const statistics = video.statistics
    const contentDetails = video.contentDetails

    return {
      id: videoId,
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || '',
      duration: this.parseDuration(contentDetails.duration),
      views: parseInt(statistics.viewCount) || 0,
      likes: parseInt(statistics.likeCount) || 0,
      uploadDate: snippet.publishedAt,
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      channelTitle: snippet.channelTitle,
      tags: snippet.tags || [],
      categoryId: snippet.categoryId,
      privacyStatus: video.status?.privacyStatus || 'public',
    }
  }

  // Search videos on YouTube
  async searchVideos(
    query: string,
    maxResults: number = 10,
    accessToken?: string
  ): Promise<YouTubeVideo[]> {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${this.apiKey}`
    
    const headers: Record<string, string> = {}
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const response = await fetch(url, { headers })
    const data = await response.json()

    if (!data.items) {
      return []
    }

    // Get detailed information for each video
    const videoIds = data.items.map((item: any) => item.id.videoId).join(',')
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${this.apiKey}`
    
    const detailsResponse = await fetch(detailsUrl, { headers })
    const detailsData = await detailsResponse.json()

    return detailsData.items.map((video: any) => {
      const snippet = video.snippet
      const statistics = video.statistics
      const contentDetails = video.contentDetails

      return {
        id: video.id,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || '',
        duration: this.parseDuration(contentDetails.duration),
        views: parseInt(statistics.viewCount) || 0,
        likes: parseInt(statistics.likeCount) || 0,
        uploadDate: snippet.publishedAt,
        youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
        channelTitle: snippet.channelTitle,
        tags: snippet.tags || [],
        categoryId: snippet.categoryId,
        privacyStatus: 'public', // Search results are always public
      }
    })
  }

  // Get videos from a specific channel
  async getChannelVideos(
    channelId: string,
    maxResults: number = 10,
    accessToken?: string
  ): Promise<YouTubeVideo[]> {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=${maxResults}&key=${this.apiKey}`
    
    const headers: Record<string, string> = {}
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const response = await fetch(url, { headers })
    const data = await response.json()

    if (!data.items) {
      return []
    }

    // Get detailed information for each video
    const videoIds = data.items.map((item: any) => item.id.videoId).join(',')
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${this.apiKey}`
    
    const detailsResponse = await fetch(detailsUrl, { headers })
    const detailsData = await detailsResponse.json()

    return detailsData.items.map((video: any) => {
      const snippet = video.snippet
      const statistics = video.statistics
      const contentDetails = video.contentDetails

      return {
        id: video.id,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || '',
        duration: this.parseDuration(contentDetails.duration),
        views: parseInt(statistics.viewCount) || 0,
        likes: parseInt(statistics.likeCount) || 0,
        uploadDate: snippet.publishedAt,
        youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
        channelTitle: snippet.channelTitle,
        tags: snippet.tags || [],
        categoryId: snippet.categoryId,
        privacyStatus: 'public',
      }
    })
  }

  // Parse YouTube duration format (PT4M13S -> 4:13)
  private parseDuration(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return '0:00'

    const hours = parseInt(match[1]) || 0
    const minutes = parseInt(match[2]) || 0
    const seconds = parseInt(match[3]) || 0

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }

  // Get YouTube thumbnail URL
  getThumbnailUrl(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres'): string {
    return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`
  }

  // Get YouTube embed URL
  getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`
  }

  // Extract video ID from YouTube URL
  extractVideoId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    return match ? match[1] : null
  }
}

// Create singleton instance
export const youtubeAPI = new YouTubeAPIService()

// Mock data for development (when YouTube API is not configured)
export const mockYouTubeVideos: YouTubeVideo[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Epic Goal from 30 Yards Out!',
    description: 'Amazing long-range strike that left the goalkeeper stunned',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '2:45',
    views: 15420,
    likes: 892,
    uploadDate: '2024-08-01T10:00:00Z',
    youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    channelTitle: 'Lerato Mokoena',
    tags: ['goals', 'long-range', 'midfielder'],
    categoryId: '17',
    privacyStatus: 'public',
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Incredible Dribbling Skills',
    description: 'Solo run through the entire defense with perfect ball control',
    thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
    duration: '3:12',
    views: 23450,
    likes: 1245,
    uploadDate: '2024-08-02T10:00:00Z',
    youtubeUrl: 'https://youtube.com/watch?v=jNQXAC9IVRw',
    channelTitle: 'Sipho Ndlovu',
    tags: ['skills', 'dribbling', 'forward'],
    categoryId: '17',
    privacyStatus: 'public',
  },
  {
    id: '9bZkp7q19f0',
    title: 'Perfect Free Kick Technique',
    description: 'Curling free kick that finds the top corner',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    duration: '1:58',
    views: 18920,
    likes: 1103,
    uploadDate: '2024-08-03T10:00:00Z',
    youtubeUrl: 'https://youtube.com/watch?v=9bZkp7q19f0',
    channelTitle: 'Thabo Maseko',
    tags: ['free-kick', 'technique', 'midfielder'],
    categoryId: '17',
    privacyStatus: 'public',
  },
] 
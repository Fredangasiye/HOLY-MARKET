// YouTube Upload API Endpoint for Scoutlify
// This would be deployed as a serverless function (Vercel, Netlify, etc.)

import { google } from 'googleapis'

// YouTube API configuration
const youtube = google.youtube('v3')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { accessToken, videoData, metadata } = req.body

    if (!accessToken || !videoData) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    // Set up YouTube API with access token
    const auth = new google.auth.OAuth2()
    auth.setCredentials({ access_token: accessToken })

    // Upload video to YouTube
    const uploadResponse = await youtube.videos.insert({
      auth,
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: metadata.title,
          description: metadata.description,
          tags: metadata.tags,
          categoryId: metadata.categoryId || '17', // Sports
        },
        status: {
          privacyStatus: metadata.privacyStatus || 'public',
          selfDeclaredMadeForKids: false,
        },
      },
      media: {
        body: videoData,
      },
    })

    const videoId = uploadResponse.data.id

    // Get video details
    const videoDetails = await youtube.videos.list({
      auth,
      part: ['snippet', 'statistics', 'contentDetails'],
      id: [videoId],
    })

    const video = videoDetails.data.items[0]
    const snippet = video.snippet
    const statistics = video.statistics
    const contentDetails = video.contentDetails

    // Return formatted video data
    const formattedVideo = {
      id: videoId,
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || '',
      duration: parseDuration(contentDetails.duration),
      views: parseInt(statistics.viewCount) || 0,
      likes: parseInt(statistics.likeCount) || 0,
      uploadDate: snippet.publishedAt,
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      channelTitle: snippet.channelTitle,
      tags: snippet.tags || [],
      categoryId: snippet.categoryId,
      privacyStatus: video.status?.privacyStatus || 'public',
    }

    res.status(200).json({
      success: true,
      video: formattedVideo,
    })
  } catch (error) {
    console.error('YouTube upload error:', error)
    res.status(500).json({
      error: 'Failed to upload video to YouTube',
      details: error.message,
    })
  }
}

// Helper function to parse YouTube duration format
function parseDuration(duration) {
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
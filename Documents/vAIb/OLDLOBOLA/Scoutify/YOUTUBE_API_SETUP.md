# YouTube API Integration Setup for Scoutlify

This guide explains how to set up YouTube as a backend API for Scoutlify, allowing users to upload videos directly to your platform while they're actually stored on YouTube.

## 🎯 Overview

Scoutlify uses YouTube as a backend storage and processing service, providing:
- **Zero server costs** for video storage and streaming
- **Professional video processing** via YouTube's infrastructure
- **Global CDN** for fast video delivery worldwide
- **Automatic video optimization** and compression
- **Built-in analytics** and engagement metrics

## 🔧 Setup Instructions

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3

### 2. Configure OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:5173/auth/youtube-callback` (development)
   - `https://yourdomain.com/auth/youtube-callback` (production)
5. Note down your Client ID and Client Secret

### 3. Set Environment Variables

Create a `.env` file in your project root:

```env
# YouTube API Configuration
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
VITE_YOUTUBE_CLIENT_ID=your_oauth_client_id_here
VITE_YOUTUBE_CLIENT_SECRET=your_oauth_client_secret_here
VITE_YOUTUBE_REDIRECT_URI=http://localhost:5173/auth/youtube-callback
```

### 4. Install Dependencies

```bash
npm install googleapis
```

## 🚀 How It Works

### Upload Flow

1. **User selects video file** on Scoutlify
2. **YouTube OAuth authentication** (if not already authenticated)
3. **Direct upload to YouTube** via API
4. **Video processing** by YouTube (compression, thumbnails, etc.)
5. **Metadata storage** in Scoutlify database
6. **Video display** on Scoutlify with YouTube backend

### Video Display

- Videos appear as native Scoutlify content
- YouTube thumbnails and metadata are fetched automatically
- Users can watch videos directly on Scoutlify
- YouTube analytics and engagement data are available

## 📁 File Structure

```
scoutlify/
├── client/src/
│   ├── lib/
│   │   └── youtube-api.ts          # YouTube API service
│   └── pages/
│       └── upload-video.tsx        # Upload interface
├── api/
│   └── youtube-upload.js           # Serverless API endpoint
└── YOUTUBE_API_SETUP.md           # This file
```

## 🔑 API Endpoints

### Upload Video
```javascript
POST /api/youtube-upload
{
  "accessToken": "user_oauth_token",
  "videoData": "video_file_data",
  "metadata": {
    "title": "Video Title",
    "description": "Video Description",
    "tags": ["football", "highlights"],
    "privacyStatus": "public"
  }
}
```

### Get Video Details
```javascript
GET /api/youtube-video/:videoId
```

## 🎨 User Experience

### Upload Process
1. User clicks "Upload to Scoutlify"
2. File selection dialog opens
3. User fills in title, description, tags
4. Upload progress bar shows
5. Success message with video preview
6. Video appears in Scoutlify video wall

### Video Wall
- Videos display with YouTube thumbnails
- Real-time view and like counts
- Direct YouTube links for watching
- Scoutlify branding throughout

## 💰 Cost Benefits

- **Storage**: $0 (YouTube handles all video storage)
- **Bandwidth**: $0 (YouTube CDN delivers videos)
- **Processing**: $0 (YouTube handles compression and optimization)
- **Scalability**: Unlimited (YouTube infrastructure scales automatically)

## 🔒 Security & Privacy

- OAuth 2.0 authentication required
- User consent for YouTube access
- Videos can be set to private/unlisted
- Scoutlify controls video metadata and display

## 🚀 Deployment

### Vercel (Recommended)
1. Deploy to Vercel
2. Set environment variables in Vercel dashboard
3. API routes automatically become serverless functions

### Netlify
1. Deploy to Netlify
2. Set environment variables
3. Configure API routes as serverless functions

### Other Platforms
- AWS Lambda
- Google Cloud Functions
- Azure Functions

## 🐛 Troubleshooting

### Common Issues

1. **OAuth Error**: Check redirect URIs in Google Cloud Console
2. **Upload Failed**: Verify API quotas and file size limits
3. **Thumbnail Not Loading**: Check YouTube API key permissions

### Debug Mode

Enable debug logging by setting:
```env
VITE_DEBUG_YOUTUBE_API=true
```

## 📈 Analytics

YouTube provides built-in analytics:
- View counts
- Like/dislike ratios
- Watch time
- Audience retention
- Geographic data

## 🔄 Future Enhancements

- YouTube Live integration for live scouting events
- YouTube Shorts for quick highlights
- YouTube Studio integration for content management
- Advanced analytics dashboard
- Automated video processing and tagging

## 📞 Support

For issues with YouTube API integration:
1. Check Google Cloud Console quotas
2. Verify OAuth credentials
3. Review API error logs
4. Contact Scoutlify support

---

**Note**: This integration requires users to authenticate with YouTube. Make sure to clearly communicate this requirement and the benefits of using YouTube's infrastructure. 
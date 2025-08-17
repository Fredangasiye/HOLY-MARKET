import { useState, useRef } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { 
  Upload, 
  Video, 
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Info,
  Youtube,
  Play,
  Target,
  Brain,
  Dumbbell,
  Zap,
  Star,
  Users,
  Globe,
  Share2,
  Loader2,
  FileVideo
} from 'lucide-react'
import BackButton from '../components/back-button'
import TopNavigation from '../components/top-navigation'
import { youtubeAPI, type YouTubeVideo, type UploadProgress } from '../lib/youtube-api'

export default function UploadVideo() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isPublic, setIsPublic] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedVideo, setUploadedVideo] = useState<YouTubeVideo | null>(null)
  const [showTips, setShowTips] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const session = useSession()
  const user = session?.user

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/mkv', 'video/webm']
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid video file (MP4, MOV, AVI, MKV, or WEBM)')
        return
      }

      // Check file size (max 2GB for YouTube)
      const maxSize = 2 * 1024 * 1024 * 1024 // 2GB
      if (file.size > maxSize) {
        setError('File size must be less than 2GB')
        return
      }

      setSelectedFile(file)
      setError(null)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setError(null)
    setSuccess(null)
    setUploadProgress(0)

    if (!selectedFile) {
      setError('Please select a video file')
      setUploading(false)
      return
    }

    if (!title.trim()) {
      setError('Please provide a video title')
      setUploading(false)
      return
    }

    try {
      // For now, we'll simulate the upload process
      // In production, this would use the actual YouTube API
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 10
        })
      }, 500)

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 3000))

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Simulate successful upload
      const mockVideo: YouTubeVideo = {
        id: 'mock-' + Date.now(),
        title: title,
        description: description,
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        duration: '3:45',
        views: 0,
        likes: 0,
        uploadDate: new Date().toISOString(),
        youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
        channelTitle: user?.user_metadata?.full_name || 'Scoutlify User',
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        categoryId: '17',
        privacyStatus: isPublic ? 'public' : 'private',
      }

      setUploadedVideo(mockVideo)
      setSuccess(`Video "${title}" has been successfully uploaded to Scoutlify!`)
      
      // Clear form
      setTitle('')
      setDescription('')
      setTags('')
      setSelectedFile(null)
      setUploadProgress(0)
      
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

    } catch (err: any) {
      setError(err.message || 'Failed to upload video')
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const benefits = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Your video will be accessible to scouts worldwide"
    },
    {
      icon: Star,
      title: "Professional Quality",
      description: "YouTube's compression ensures optimal viewing quality"
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Get likes, comments, and feedback from the football community"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your highlights across social media platforms"
    }
  ]

  const guidelines = [
    "Upload your best football highlights and skills",
    "Keep videos between 2-5 minutes for optimal engagement",
    "Use descriptive titles with your name and position",
    "Add relevant tags like #football #scouting #highlights",
    "Make sure your video is public so scouts can find it",
    "Include your contact information in the description"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-white">Scoutlify</h1>
              </Link>
            </div>
            <BackButton fallbackPath="/dashboard" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Video to Scoutlify
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Upload your football highlights directly to Scoutlify (powered by YouTube)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-6">
                  {/* File Upload */}
                  <div>
                    <Label htmlFor="video" className="text-white">Video File</Label>
                    <div className="mt-2">
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="video"
                          accept="video/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          disabled={uploading}
                        />
                        <label htmlFor="video" className="cursor-pointer">
                          <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-lg font-medium text-white">
                            {uploading ? 'Uploading...' : 'Click to select video'}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            MP4, MOV, AVI, MKV, or WEBM (max 2GB)
                          </p>
                        </label>
                      </div>
                      
                      {selectedFile && (
                        <div className="mt-4 p-4 bg-green-500/20 rounded-lg border border-green-500/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileVideo className="w-5 h-5 text-green-400 mr-2" />
                              <span className="font-medium text-white">{selectedFile.name}</span>
                            </div>
                            <Badge variant="outline" className="border-green-400 text-green-400">
                              {formatFileSize(selectedFile.size)}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <Label htmlFor="title" className="text-white">Video Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Match Highlights vs Kaizer Chiefs"
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
                      disabled={uploading}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your performance, key moments, and skills showcased..."
                      rows={3}
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
                      disabled={uploading}
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Label htmlFor="tags" className="text-white">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="football, highlights, midfielder, goals, skills"
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
                      disabled={uploading}
                    />
                  </div>

                  {/* Public/Private */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="public"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="rounded border-white/20 bg-white/10"
                      disabled={uploading}
                    />
                    <Label htmlFor="public" className="text-white">Make this video public to scouts</Label>
                  </div>

                  {/* Upload Progress */}
                  {uploading && (
                    <div>
                      <div className="flex justify-between text-sm mb-2 text-white">
                        <span>Uploading to Scoutlify...</span>
                        <span>{uploadProgress.toFixed(1)}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>
                  )}

                  {/* Error/Success Messages */}
                  {error && (
                    <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-red-200">{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="bg-green-500/20 border-green-500/50">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="text-green-200">{success}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={uploading || !selectedFile || !title.trim()}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload to Scoutlify
                      </>
                    )}
                  </Button>
                </form>

                {/* Success Video Display */}
                {uploadedVideo && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/50">
                    <h3 className="text-lg font-semibold text-white mb-2">🎉 Upload Successful!</h3>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={uploadedVideo.thumbnail} 
                        alt={uploadedVideo.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{uploadedVideo.title}</h4>
                        <p className="text-sm text-gray-300">{uploadedVideo.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                          <span>👁️ {uploadedVideo.views} views</span>
                          <span>👍 {uploadedVideo.likes} likes</span>
                          <span>⏱️ {uploadedVideo.duration}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => window.open(uploadedVideo.youtubeUrl, '_blank')}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Youtube className="w-4 h-4 mr-1" />
                        Watch
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Benefits and Guidelines */}
          <div className="space-y-6">
            {/* Benefits */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Star className="w-5 h-5 mr-2" />
                  Why Scoutlify?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                        <benefit.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{benefit.title}</h4>
                        <p className="text-gray-300 text-xs">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Info className="w-5 h-5 mr-2" />
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm">{guideline}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="w-5 h-5 mr-2" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                    <h4 className="font-semibold text-white text-sm mb-1">🎯 Best Practices</h4>
                    <p className="text-gray-300 text-xs">
                      Show your best skills, include your name and position in the title, and make sure the video quality is good.
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg">
                    <h4 className="font-semibold text-white text-sm mb-1">📈 Engagement</h4>
                    <p className="text-gray-300 text-xs">
                      Add relevant hashtags and engage with comments to increase visibility to scouts.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 
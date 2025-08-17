import { useState, useRef } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Link, useLocation } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Checkbox } from '../components/ui/checkbox'
import { Progress } from '../components/ui/progress'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Badge } from '../components/ui/badge'
import { 
  Upload, 
  Video, 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Info,
  Camera,
  Play,
  Target,
  Brain,
  Dumbbell,
  Zap,
  FileVideo,
  AlertCircle
} from 'lucide-react'
import { z } from 'zod'

const videoUploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  isPublic: z.boolean().default(true),
})

// Video compression function using Web APIs
const compressVideo = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    video.onloadedmetadata = () => {
      // Set canvas size (reduce resolution for compression)
      const maxWidth = 1280
      const maxHeight = 720
      let { width, height } = video
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
      }
      
      canvas.width = width
      canvas.height = height
      
      video.currentTime = 0
    }
    
    video.onseeked = () => {
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'video/mp4',
              lastModified: Date.now()
            })
            resolve(compressedFile)
          } else {
            reject(new Error('Failed to compress video'))
          }
        }, 'video/mp4', 0.7) // 70% quality
      }
    }
    
    video.onerror = () => reject(new Error('Failed to load video'))
    video.src = URL.createObjectURL(file)
  })
}

export default function UploadVideo() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showTips, setShowTips] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supabase = useSupabaseClient()
  const session = useSession()
  const user = session?.user
  const [, setLocation] = useLocation()

  if (!user) {
    setLocation('/auth')
    return null
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/mkv', 'video/webm']
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid video file (MP4, MOV, AVI, MKV, or WEBM)')
        return
      }

      // Check if compression is needed (files larger than 50MB)
      const maxSizeBeforeCompression = 50 * 1024 * 1024 // 50MB
      
      if (file.size > maxSizeBeforeCompression) {
        setCompressing(true)
        setError(null)
        
        try {
          const compressedFile = await compressVideo(file)
          setSelectedFile(compressedFile)
          setSuccess(`Video compressed from ${(file.size / 1024 / 1024).toFixed(1)}MB to ${(compressedFile.size / 1024 / 1024).toFixed(1)}MB`)
        } catch (err) {
          setError('Failed to compress video. Please try a smaller file.')
        } finally {
          setCompressing(false)
        }
      } else {
        setSelectedFile(file)
        setError(null)
      }
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setError(null)
    setSuccess(null)

    try {
      // Validate form data
      const formData = { title, description, isPublic }
      videoUploadSchema.parse(formData)

      if (!selectedFile) {
        setError('Please select a video file')
        return
      }

      // Generate unique filename
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, selectedFile, {
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100
            setUploadProgress(percent)
          }
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName)

      // Save video metadata to database
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl: urlData.publicUrl,
          isPublic,
          fileName
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save video metadata')
      }

      setSuccess('Video uploaded successfully!')
      setTitle('')
      setDescription('')
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-green-600">Mzansi Football Eyes</h1>
              </Link>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Video Highlights
                </CardTitle>
                <CardDescription>
                  Share your best moments with professional scouts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-6">
                  {/* File Upload */}
                  <div>
                    <Label htmlFor="video">Video File</Label>
                    <div className="mt-2">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="video"
                          accept="video/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          disabled={uploading || compressing}
                        />
                        <label htmlFor="video" className="cursor-pointer">
                          <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-lg font-medium text-gray-900">
                            {compressing ? 'Compressing video...' : 'Click to select video'}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            MP4, MOV, AVI, MKV, or WEBM (max 100MB)
                          </p>
                        </label>
                      </div>
                      
                      {selectedFile && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileVideo className="w-5 h-5 text-green-600 mr-2" />
                              <span className="font-medium">{selectedFile.name}</span>
                            </div>
                            <Badge variant="outline">{formatFileSize(selectedFile.size)}</Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Video Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Match Highlights vs Kaizer Chiefs"
                      disabled={uploading}
                      className="mt-1"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the video content, your performance, or key moments..."
                      rows={3}
                      disabled={uploading}
                      className="mt-1"
                    />
                  </div>

                  {/* Public/Private */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="public"
                      checked={isPublic}
                      onCheckedChange={(checked) => setIsPublic(checked as boolean)}
                      disabled={uploading}
                    />
                    <Label htmlFor="public">Make this video public to scouts</Label>
                  </div>

                  {/* Upload Progress */}
                  {uploading && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Uploading...</span>
                        <span>{uploadProgress.toFixed(1)}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>
                  )}

                  {/* Error/Success Messages */}
                  {error && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={uploading || compressing || !selectedFile || !title.trim()}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Video
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Tips and Guidelines */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Video Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Camera className="w-4 h-4 mr-2" />
                      Recording Tips
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Use a tripod or stable camera position</li>
                      <li>• Ensure good lighting and clear visibility</li>
                      <li>• Record in landscape mode (16:9 ratio)</li>
                      <li>• Keep the ball and player in frame</li>
                      <li>• Avoid shaky or blurry footage</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Technical Skills
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Dribbling and ball control</li>
                      <li>• Passing accuracy and technique</li>
                      <li>• Shooting and finishing</li>
                      <li>• First touch and receiving</li>
                      <li>• Set-piece execution</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Brain className="w-4 h-4 mr-2" />
                      Tactical Awareness
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Positioning and movement</li>
                      <li>• Decision making under pressure</li>
                      <li>• Game reading and anticipation</li>
                      <li>• Team play and communication</li>
                      <li>• Defensive positioning</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Dumbbell className="w-4 h-4 mr-2" />
                      Physical Attributes
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Speed and acceleration</li>
                      <li>• Strength and balance</li>
                      <li>• Endurance and stamina</li>
                      <li>• Agility and flexibility</li>
                      <li>• Jumping and heading</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Mental Strength
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Leadership and communication</li>
                      <li>• Work rate and determination</li>
                      <li>• Confidence and composure</li>
                      <li>• Handling pressure situations</li>
                      <li>• Team spirit and attitude</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Maximum file size:</span>
                    <Badge variant="outline">100MB</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Supported formats:</span>
                    <Badge variant="outline">MP4, MOV, AVI, MKV, WEBM</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Recommended resolution:</span>
                    <Badge variant="outline">720p or higher</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Auto-compression:</span>
                                          <Badge variant="outline">Files &gt; 50MB</Badge>
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
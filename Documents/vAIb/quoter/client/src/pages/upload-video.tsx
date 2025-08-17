import { useState } from 'react'
import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Upload, 
  Youtube,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import BackButton from '../components/back-button'
import TopNavigation from '../components/top-navigation'

export default function UploadVideoPage() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [position, setPosition] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset form after success
    setTimeout(() => {
      setYoutubeUrl('')
      setTitle('')
      setDescription('')
      setPosition('')
      setIsSuccess(false)
    }, 3000)
  }

  const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <TopNavigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Youtube className="w-12 h-12 text-red-500 mr-4" />
            <h1 className="text-4xl font-bold text-white">Upload Your Video</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Share your football highlights on YouTube and get discovered by professional scouts
          </p>
        </div>

        {isSuccess ? (
          <Card className="bg-green-500/20 border-green-500/50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Video Submitted Successfully!</h2>
              <p className="text-green-100">
                Your video has been uploaded to YouTube and shared with our network of scouts.
                You'll receive notifications when scouts view your content.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Video Information</CardTitle>
              <CardDescription className="text-gray-300">
                Provide details about your YouTube video to help scouts find and evaluate your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    YouTube Video URL
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Make sure your video is public or unlisted on YouTube
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Video Title
                  </label>
                  <Input
                    placeholder="Amazing goal from 30 yards out!"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe your performance, skills shown, and any notable achievements..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Position
                  </label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map(pos => (
                        <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-200">Important Notes</h3>
                      <ul className="text-sm text-blue-100 mt-2 space-y-1">
                        <li>• Your video will be uploaded directly to YouTube</li>
                        <li>• Make sure you have the rights to the content</li>
                        <li>• Professional scouts will review your video</li>
                        <li>• You'll receive feedback and ratings</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Link href="/video-wall">
                    <Button type="button" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Cancel
                    </Button>
                  </Link>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload to YouTube
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Tips for Better Visibility</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Video Quality</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Use high-quality video (1080p or higher)</li>
                <li>• Ensure good lighting and clear audio</li>
                <li>• Keep videos between 2-5 minutes</li>
                <li>• Show your best moments first</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Content Tips</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Include your name and position</li>
                <li>• Show different skills and techniques</li>
                <li>• Highlight game intelligence</li>
                <li>• Add timestamps for key moments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
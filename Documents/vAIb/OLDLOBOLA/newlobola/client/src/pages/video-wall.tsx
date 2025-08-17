import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import VideoWall from '../components/video-wall'
import { 
  ArrowLeft, 
  Play, 
  TrendingUp, 
  Star,
  Zap,
  Trophy,
  Users,
  Eye
} from 'lucide-react'

// Mock video data
const mockVideos = [
  {
    id: '1',
    title: 'Epic Goal from 30 Yards Out!',
    description: 'Amazing long-range strike that left the goalkeeper stunned',
    playerName: 'Lerato Mokoena',
    playerPosition: 'Midfielder',
    thumbnail: '/images/video1.jpg',
    duration: '2:45',
    views: 15420,
    likes: 892,
    uploadDate: '2024-08-01',
    isPublic: true,
    youtubeUrl: 'https://youtube.com/watch?v=example1',
    tags: ['goals', 'long-range', 'midfielder'],
    rating: 8.7
  },
  {
    id: '2',
    title: 'Incredible Dribbling Skills',
    description: 'Solo run through the entire defense with perfect ball control',
    playerName: 'Sipho Ndlovu',
    playerPosition: 'Forward',
    thumbnail: '/images/video2.jpg',
    duration: '3:12',
    views: 23450,
    likes: 1245,
    uploadDate: '2024-08-02',
    isPublic: true,
    youtubeUrl: 'https://youtube.com/watch?v=example2',
    tags: ['skills', 'dribbling', 'forward'],
    rating: 9.2
  },
  {
    id: '3',
    title: 'Perfect Free Kick Technique',
    description: 'Curling free kick that finds the top corner',
    playerName: 'Thabo Maseko',
    playerPosition: 'Midfielder',
    thumbnail: '/images/video3.jpg',
    duration: '1:58',
    views: 18920,
    likes: 1103,
    uploadDate: '2024-08-03',
    isPublic: true,
    youtubeUrl: 'https://youtube.com/watch?v=example3',
    tags: ['free-kick', 'technique', 'midfielder'],
    rating: 8.9
  },
  {
    id: '4',
    title: 'Defensive Masterclass',
    description: 'Perfect tackling and positioning throughout the match',
    playerName: 'Nkosi Dlamini',
    playerPosition: 'Defender',
    thumbnail: '/images/video4.jpg',
    duration: '4:23',
    views: 9870,
    likes: 567,
    uploadDate: '2024-08-04',
    isPublic: true,
    youtubeUrl: 'https://youtube.com/watch?v=example4',
    tags: ['defense', 'tackling', 'defender'],
    rating: 8.4
  },
  {
    id: '5',
    title: 'Goalkeeper Heroics',
    description: 'Incredible saves that kept the team in the game',
    playerName: 'Mandla Zulu',
    playerPosition: 'Goalkeeper',
    thumbnail: '/images/video5.jpg',
    duration: '3:45',
    views: 12340,
    likes: 789,
    uploadDate: '2024-08-05',
    isPublic: true,
    youtubeUrl: 'https://youtube.com/watch?v=example5',
    tags: ['goalkeeper', 'saves', 'heroics'],
    rating: 8.6
  },
  {
    id: '6',
    title: 'Team Play Excellence',
    description: 'Beautiful passing sequence leading to a team goal',
    playerName: 'Bongani Khumalo',
    playerPosition: 'Midfielder',
    thumbnail: '/images/video6.jpg',
    duration: '2:30',
    views: 15670,
    likes: 923,
    uploadDate: '2024-08-06',
    isPublic: true,
    youtubeUrl: 'https://youtube.com/watch?v=example6',
    tags: ['team-play', 'passing', 'midfielder'],
    rating: 8.8
  }
]

export default function VideoWallPage() {
  const [videos, setVideos] = useState(mockVideos)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video)
    // Here you would typically open a video player modal or navigate to video page
    console.log('Playing video:', video.title)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-white">Mzansi Football Eyes</h1>
              </Link>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
            <Play className="w-5 h-5" />
            <span className="font-semibold">VIDEO WALL</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow">
            Epic Football Moments
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the most amazing football highlights from South Africa's rising stars. 
            Watch, rate, and share your favorite moments! 🚀⚽
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Play className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{videos.length}</div>
              <div className="text-blue-100">Total Videos</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">
                {videos.reduce((sum, video) => sum + video.views, 0).toLocaleString()}
              </div>
              <div className="text-purple-100">Total Views</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">
                {videos.reduce((sum, video) => sum + video.likes, 0).toLocaleString()}
              </div>
              <div className="text-green-100">Total Likes</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">
                {(videos.reduce((sum, video) => sum + video.rating, 0) / videos.length).toFixed(1)}
              </div>
              <div className="text-yellow-100">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Video Wall Component */}
        <VideoWall videos={videos} onVideoClick={handleVideoClick} />

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Share Your Epic Moments!</h3>
              <p className="text-gray-300 mb-6">
                Upload your best football highlights and join the community of rising stars. 
                Get discovered by scouts and compete with players across South Africa!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/upload-video">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold">
                    <Play className="w-5 h-5 mr-2" />
                    Upload Video
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button variant="outline" size="lg" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                    <Users className="w-5 h-5 mr-2" />
                    Join Community
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
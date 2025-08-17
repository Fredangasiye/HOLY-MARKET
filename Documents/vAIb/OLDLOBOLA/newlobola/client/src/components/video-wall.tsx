import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { 
  Play, 
  Eye, 
  ThumbsUp, 
  Share2, 
  Filter,
  Search,
  Youtube,
  TrendingUp,
  Clock,
  Star,
  Users,
  Zap
} from 'lucide-react'

interface Video {
  id: string
  title: string
  description: string
  playerName: string
  playerPosition: string
  thumbnail: string
  duration: string
  views: number
  likes: number
  uploadDate: string
  isPublic: boolean
  youtubeUrl?: string
  tags: string[]
  rating: number
}

interface VideoWallProps {
  videos: Video[]
  onVideoClick?: (video: Video) => void
}

export default function VideoWall({ videos, onVideoClick }: VideoWallProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [sortBy, setSortBy] = useState('latest')

  const filters = [
    { id: 'all', label: 'All Videos', icon: Play },
    { id: 'goals', label: 'Goals', icon: TrendingUp },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'highlights', label: 'Highlights', icon: Star },
    { id: 'training', label: 'Training', icon: Clock }
  ]

  const sortOptions = [
    { id: 'latest', label: 'Latest' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'views', label: 'Most Views' }
  ]

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || 
                         video.tags.some(tag => tag.toLowerCase().includes(selectedFilter))

    return matchesSearch && matchesFilter
  })

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      case 'popular':
        return b.likes - a.likes
      case 'rating':
        return b.rating - a.rating
      case 'views':
        return b.views - a.views
      default:
        return 0
    }
  })

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return 'text-yellow-400'
    if (rating >= 8) return 'text-purple-400'
    if (rating >= 7) return 'text-blue-400'
    if (rating >= 6) return 'text-green-400'
    return 'text-gray-400'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Video Wall</h2>
          <p className="text-gray-400">Discover amazing football talent from across South Africa</p>
        </div>
        
        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-gray-400"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => {
          const Icon = filter.icon
          return (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className={selectedFilter === filter.id ? 
                "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : 
                "border-slate-600 text-gray-300 hover:bg-slate-700"
              }
            >
              <Icon className="w-4 h-4 mr-2" />
              {filter.label}
            </Button>
          )
        })}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedVideos.map(video => (
          <Card 
            key={video.id} 
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group neon-border"
            onClick={() => onVideoClick?.(video)}
          >
            {/* Video Thumbnail */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                {video.thumbnail ? (
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-50" />
                  </div>
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-slate-900 fill-current" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                  <Star className={`w-3 h-3 ${getRatingColor(video.rating)}`} />
                  <span>{video.rating.toFixed(1)}</span>
                </div>

                {/* YouTube Badge */}
                {video.youtubeUrl && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                    <Youtube className="w-3 h-3" />
                    <span>YT</span>
                  </div>
                )}
              </div>
            </div>

            <CardContent className="p-4">
              {/* Video Title */}
              <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                {video.title}
              </h3>

              {/* Player Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {video.playerName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{video.playerName}</p>
                    <p className="text-gray-400 text-xs">{video.playerPosition}</p>
                  </div>
                </div>
                
                <Badge variant="outline" className="border-green-400 text-green-400 text-xs">
                  {video.isPublic ? 'Public' : 'Private'}
                </Badge>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatNumber(video.views)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{formatNumber(video.likes)}</span>
                  </div>
                </div>
                <span className="text-xs">{new Date(video.uploadDate).toLocaleDateString()}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {video.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} className="bg-slate-700 text-gray-300 text-xs">
                    {tag}
                  </Badge>
                ))}
                {video.tags.length > 3 && (
                  <Badge className="bg-slate-700 text-gray-300 text-xs">
                    +{video.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Watch
                </Button>
                {video.youtubeUrl && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(video.youtubeUrl, '_blank')
                    }}
                  >
                    <Youtube className="w-4 h-4" />
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-slate-600 text-gray-300 hover:bg-slate-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.share?.({
                      title: video.title,
                      text: `Check out this amazing football video by ${video.playerName}!`,
                      url: window.location.href
                    })
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No videos found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Load More Button */}
      {sortedVideos.length > 0 && (
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8"
          >
            <Zap className="w-5 h-5 mr-2" />
            Load More Videos
          </Button>
        </div>
      )}
    </div>
  )
} 
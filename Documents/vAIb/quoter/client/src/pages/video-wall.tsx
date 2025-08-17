import { useState } from 'react'
import TopNavigation from '../components/top-navigation'

const mockVideos = [
  {
    id: '1',
    title: 'Amazing Goal from 30 Yards Out!',
    description: 'Incredible long-range strike that left the goalkeeper stunned',
    thumbnailUrl: 'https://via.placeholder.com/320x180/1f2937/ffffff?text=Goal+Highlight',
    views: 15420,
    duration: '2:34',
    channelTitle: 'Football Highlights'
  },
  {
    id: '2',
    title: 'Perfect Dribbling Skills',
    description: 'Masterful ball control and dribbling technique',
    thumbnailUrl: 'https://via.placeholder.com/320x180/1f2937/ffffff?text=Dribbling+Skills',
    views: 8920,
    duration: '1:45',
    channelTitle: 'Skills Academy'
  }
]

export default function VideoWallPage() {
  const [videos] = useState(mockVideos)

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-red-500 text-2xl">📺</span>
              <h1 className="text-3xl font-bold text-white">Video Wall</h1>
            </div>
            <span className="bg-red-500/20 text-red-400 border border-red-500/50 px-2 py-1 rounded text-xs">
              {videos.length} videos
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
                <p className="text-gray-300 mb-4">{video.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>{video.channelTitle}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>👁️ {formatNumber(video.views)}</span>
                  </div>
                  
                  <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded">
                    Watch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { 
  Trophy, 
  Medal, 
  Star, 
  TrendingUp,
  Users,
  Target,
  Zap,
  Crown,
  Award,
  Calendar,
  Clock,
  Eye,
  Heart,
  Video
} from 'lucide-react'

interface LeaderboardEntry {
  id: string
  rank: number
  playerName: string
  playerId: string
  avatar?: string
  position: string
  club?: string
  score: number
  scoreType: 'rating' | 'views' | 'likes' | 'videos' | 'xp'
  change: number // rank change from previous period
  isCurrentUser: boolean
  stats: {
    videosUploaded: number
    totalViews: number
    totalLikes: number
    averageRating: number
    evaluationsReceived: number
  }
}

interface LeaderboardProps {
  type: 'overall' | 'monthly' | 'weekly' | 'views' | 'likes' | 'videos'
  currentUserId?: string
  onPlayerClick?: (playerId: string) => void
}

export default function Leaderboard({ 
  type, 
  currentUserId, 
  onPlayerClick 
}: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState(type)

  useEffect(() => {
    loadLeaderboardData()
  }, [type, timeframe])

  const loadLeaderboardData = async () => {
    setLoading(true)
    
    // Mock data - in production this would come from API
    const mockData: LeaderboardEntry[] = [
      {
        id: '1',
        rank: 1,
        playerName: 'Lerato Mokoena',
        playerId: 'player1',
        avatar: '/avatars/lerato.jpg',
        position: 'Midfielder',
        club: 'Kaizer Chiefs Academy',
        score: 9.2,
        scoreType: 'rating',
        change: 0,
        isCurrentUser: currentUserId === 'player1',
        stats: {
          videosUploaded: 15,
          totalViews: 45000,
          totalLikes: 2300,
          averageRating: 9.2,
          evaluationsReceived: 8
        }
      },
      {
        id: '2',
        rank: 2,
        playerName: 'Sipho Ndlovu',
        playerId: 'player2',
        avatar: '/avatars/sipho.jpg',
        position: 'Forward',
        club: 'Orlando Pirates Development',
        score: 8.8,
        scoreType: 'rating',
        change: 1,
        isCurrentUser: currentUserId === 'player2',
        stats: {
          videosUploaded: 12,
          totalViews: 38000,
          totalLikes: 2100,
          averageRating: 8.8,
          evaluationsReceived: 6
        }
      },
      {
        id: '3',
        rank: 3,
        playerName: 'Thabo Maseko',
        playerId: 'player3',
        avatar: '/avatars/thabo.jpg',
        position: 'Defender',
        club: 'Mamelodi Sundowns',
        score: 8.6,
        scoreType: 'rating',
        change: -1,
        isCurrentUser: currentUserId === 'player3',
        stats: {
          videosUploaded: 18,
          totalViews: 52000,
          totalLikes: 2800,
          averageRating: 8.6,
          evaluationsReceived: 7
        }
      },
      {
        id: '4',
        rank: 4,
        playerName: 'Nkosi Dlamini',
        playerId: 'player4',
        avatar: '/avatars/nkosi.jpg',
        position: 'Goalkeeper',
        club: 'SuperSport United',
        score: 8.4,
        scoreType: 'rating',
        change: 2,
        isCurrentUser: currentUserId === 'player4',
        stats: {
          videosUploaded: 8,
          totalViews: 25000,
          totalLikes: 1500,
          averageRating: 8.4,
          evaluationsReceived: 5
        }
      },
      {
        id: '5',
        rank: 5,
        playerName: 'Mandla Zulu',
        playerId: 'player5',
        avatar: '/avatars/mandla.jpg',
        position: 'Midfielder',
        club: 'Cape Town City',
        score: 8.2,
        scoreType: 'rating',
        change: -1,
        isCurrentUser: currentUserId === 'player5',
        stats: {
          videosUploaded: 14,
          totalViews: 35000,
          totalLikes: 1900,
          averageRating: 8.2,
          evaluationsReceived: 6
        }
      },
      {
        id: '6',
        rank: 6,
        playerName: 'Bongani Khumalo',
        playerId: 'player6',
        avatar: '/avatars/bongani.jpg',
        position: 'Forward',
        club: 'Free Agent',
        score: 8.0,
        scoreType: 'rating',
        change: 3,
        isCurrentUser: currentUserId === 'player6',
        stats: {
          videosUploaded: 10,
          totalViews: 28000,
          totalLikes: 1600,
          averageRating: 8.0,
          evaluationsReceived: 4
        }
      },
      {
        id: '7',
        rank: 7,
        playerName: 'Destiny Chambers',
        playerId: 'current-user',
        avatar: '/avatars/destiny.jpg',
        position: 'DM/AM/CM',
        club: 'Rangers FC',
        score: 7.8,
        scoreType: 'rating',
        change: 1,
        isCurrentUser: true,
        stats: {
          videosUploaded: 5,
          totalViews: 12000,
          totalLikes: 800,
          averageRating: 7.8,
          evaluationsReceived: 3
        }
      }
    ]

    // Transform data based on leaderboard type
    let transformedData = mockData.map(entry => {
      let score = entry.score
      let scoreType = entry.scoreType

      switch (type) {
        case 'views':
          score = entry.stats.totalViews
          scoreType = 'views'
          break
        case 'likes':
          score = entry.stats.totalLikes
          scoreType = 'likes'
          break
        case 'videos':
          score = entry.stats.videosUploaded
          scoreType = 'videos'
          break
        default:
          score = entry.stats.averageRating
          scoreType = 'rating'
      }

      return { ...entry, score, scoreType }
    })

    // Sort by score (descending)
    transformedData.sort((a, b) => b.score - a.score)

    // Update ranks
    transformedData = transformedData.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }))

    setEntries(transformedData)
    setLoading(false)
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <Star className="w-6 h-6 text-blue-400" />
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500 text-black font-bold">🥇 #{rank}</Badge>
      case 2:
        return <Badge className="bg-gray-400 text-white font-bold">🥈 #{rank}</Badge>
      case 3:
        return <Badge className="bg-amber-600 text-white font-bold">🥉 #{rank}</Badge>
      default:
        return <Badge variant="outline" className="font-bold">#{rank}</Badge>
    }
  }

  const getScoreDisplay = (score: number, scoreType: string) => {
    switch (scoreType) {
      case 'rating':
        return (
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-xl font-bold text-white">{score.toFixed(1)}</span>
          </div>
        )
      case 'views':
        return (
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-xl font-bold text-white">{score.toLocaleString()}</span>
          </div>
        )
      case 'likes':
        return (
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-xl font-bold text-white">{score.toLocaleString()}</span>
          </div>
        )
      case 'videos':
        return (
          <div className="flex items-center space-x-2">
            <Video className="w-4 h-4 text-green-400" />
            <span className="text-xl font-bold text-white">{score}</span>
          </div>
        )
      default:
        return <span className="text-xl font-bold text-white">{score}</span>
    }
  }

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center space-x-1 text-green-400">
          <TrendingUp className="w-3 h-3" />
          <span className="text-xs">+{change}</span>
        </div>
      )
    } else if (change < 0) {
      return (
        <div className="flex items-center space-x-1 text-red-400">
          <TrendingUp className="w-3 h-3 rotate-180" />
          <span className="text-xs">{change}</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center space-x-1 text-gray-400">
          <span className="text-xs">-</span>
        </div>
      )
    }
  }

  const getLeaderboardTitle = () => {
    switch (type) {
      case 'overall':
        return 'Overall Rankings'
      case 'monthly':
        return 'Monthly Champions'
      case 'weekly':
        return 'Weekly Winners'
      case 'views':
        return 'Most Viewed Players'
      case 'likes':
        return 'Most Liked Players'
      case 'videos':
        return 'Most Active Creators'
      default:
        return 'Leaderboard'
    }
  }

  const getLeaderboardDescription = () => {
    switch (type) {
      case 'overall':
        return 'Top players based on scout evaluations and overall performance'
      case 'monthly':
        return 'Best performing players this month'
      case 'weekly':
        return 'This week\'s top performers'
      case 'views':
        return 'Players with the most video views'
      case 'likes':
        return 'Players with the most community engagement'
      case 'videos':
        return 'Most active content creators'
      default:
        return 'Competitive rankings'
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-300">Loading leaderboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
          <h2 className="text-3xl font-bold text-white">{getLeaderboardTitle()}</h2>
        </div>
        <p className="text-gray-300 max-w-2xl mx-auto">{getLeaderboardDescription()}</p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex justify-center">
        <div className="flex space-x-2 bg-slate-800 rounded-lg p-1">
          {['overall', 'monthly', 'weekly'].map((time) => (
            <Button
              key={time}
              variant={timeframe === time ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeframe(time)}
              className={timeframe === time ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}
            >
              {time.charAt(0).toUpperCase() + time.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <CardContent className="p-0">
          <div className="space-y-2">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className={`p-4 transition-all duration-200 hover:bg-slate-700/50 cursor-pointer ${
                  entry.isCurrentUser ? 'bg-blue-900/30 border-l-4 border-blue-400' : ''
                } ${index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10' : ''}`}
                onClick={() => onPlayerClick?.(entry.playerId)}
              >
                <div className="flex items-center justify-between">
                  {/* Rank and Player Info */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(entry.rank)}
                      {getRankBadge(entry.rank)}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 border-2 border-slate-600">
                        <AvatarImage src={entry.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                          {entry.playerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-semibold ${entry.isCurrentUser ? 'text-blue-400' : 'text-white'}`}>
                            {entry.playerName}
                            {entry.isCurrentUser && <Badge className="ml-2 bg-blue-500 text-white text-xs">YOU</Badge>}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{entry.position}</span>
                          {entry.club && (
                            <>
                              <span>•</span>
                              <span>{entry.club}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score and Change */}
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      {getScoreDisplay(entry.score, entry.scoreType)}
                      <div className="text-sm text-gray-400">
                        {entry.scoreType === 'rating' && 'Average Rating'}
                        {entry.scoreType === 'views' && 'Total Views'}
                        {entry.scoreType === 'likes' && 'Total Likes'}
                        {entry.scoreType === 'videos' && 'Videos Uploaded'}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {getChangeIndicator(entry.change)}
                      <div className="text-xs text-gray-500">vs last period</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current User Position */}
      {currentUserId && entries.find(e => e.isCurrentUser) && (
        <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-600">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Your Position</h3>
              <div className="text-3xl font-bold text-blue-300">
                #{entries.find(e => e.isCurrentUser)?.rank}
              </div>
              <p className="text-blue-200 text-sm">
                Keep uploading videos and engaging with the community to climb the rankings!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard Info */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-gray-400">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Updated every hour</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Top 3 get special badges</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Based on {entries.length} active players</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
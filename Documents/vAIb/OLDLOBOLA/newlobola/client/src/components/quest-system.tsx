import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { 
  Target, 
  Star, 
  Zap, 
  Clock, 
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
  Gift,
  TrendingUp,
  Users,
  Video,
  MessageSquare,
  Heart,
  Award
} from 'lucide-react'

interface Quest {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'special'
  category: 'technical' | 'social' | 'scouting' | 'engagement'
  progress: number
  maxProgress: number
  isCompleted: boolean
  isClaimed: boolean
  reward: {
    type: 'xp' | 'coins' | 'badge' | 'title'
    value: number | string
  }
  expiresAt: Date
  difficulty: 'easy' | 'medium' | 'hard'
  icon: string
}

interface QuestSystemProps {
  playerId: string
  playerStats: any
  onQuestCompleted?: (quest: Quest) => void
}

export default function QuestSystem({ 
  playerId, 
  playerStats, 
  onQuestCompleted 
}: QuestSystemProps) {
  const [quests, setQuests] = useState<Quest[]>([])
  const [selectedType, setSelectedType] = useState<'all' | 'daily' | 'weekly' | 'special'>('all')
  const [showCompleted, setShowCompleted] = useState(false)

  useEffect(() => {
    initializeQuests()
  }, [playerStats])

  const initializeQuests = () => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    
    const nextWeek = new Date(now)
    nextWeek.setDate(nextWeek.getDate() + 7)
    nextWeek.setHours(0, 0, 0, 0)

    const baseQuests: Quest[] = [
      // Daily Quests
      {
        id: 'daily-video-upload',
        title: 'Daily Highlight',
        description: 'Upload a highlight video today',
        type: 'daily',
        category: 'technical',
        progress: playerStats?.videosUploadedToday || 0,
        maxProgress: 1,
        isCompleted: (playerStats?.videosUploadedToday || 0) >= 1,
        isClaimed: false,
        reward: { type: 'xp', value: 50 },
        expiresAt: tomorrow,
        difficulty: 'easy',
        icon: '📹'
      },
      {
        id: 'daily-scout-chat',
        title: 'Ask Uncle Scout',
        description: 'Have a conversation with Uncle Scout',
        type: 'daily',
        category: 'engagement',
        progress: playerStats?.uncleScoutChatsToday || 0,
        maxProgress: 1,
        isCompleted: (playerStats?.uncleScoutChatsToday || 0) >= 1,
        isClaimed: false,
        reward: { type: 'xp', value: 30 },
        expiresAt: tomorrow,
        difficulty: 'easy',
        icon: '🤖'
      },
      {
        id: 'daily-video-views',
        title: 'Viral Moment',
        description: 'Get 100+ views on any video today',
        type: 'daily',
        category: 'social',
        progress: Math.min(playerStats?.viewsToday || 0, 100),
        maxProgress: 100,
        isCompleted: (playerStats?.viewsToday || 0) >= 100,
        isClaimed: false,
        reward: { type: 'coins', value: 25 },
        expiresAt: tomorrow,
        difficulty: 'medium',
        icon: '👁️'
      },
      {
        id: 'daily-community-engagement',
        title: 'Community Builder',
        description: 'Like 5 videos from other players',
        type: 'daily',
        category: 'social',
        progress: Math.min(playerStats?.likesGivenToday || 0, 5),
        maxProgress: 5,
        isCompleted: (playerStats?.likesGivenToday || 0) >= 5,
        isClaimed: false,
        reward: { type: 'xp', value: 40 },
        expiresAt: tomorrow,
        difficulty: 'easy',
        icon: '❤️'
      },

      // Weekly Quests
      {
        id: 'weekly-video-uploads',
        title: 'Content Creator',
        description: 'Upload 5 videos this week',
        type: 'weekly',
        category: 'technical',
        progress: Math.min(playerStats?.videosUploadedThisWeek || 0, 5),
        maxProgress: 5,
        isCompleted: (playerStats?.videosUploadedThisWeek || 0) >= 5,
        isClaimed: false,
        reward: { type: 'badge', value: 'Content Creator' },
        expiresAt: nextWeek,
        difficulty: 'medium',
        icon: '🎬'
      },
      {
        id: 'weekly-scout-evaluations',
        title: 'Scout Recognition',
        description: 'Receive 3 scout evaluations this week',
        type: 'weekly',
        category: 'scouting',
        progress: Math.min(playerStats?.evaluationsReceivedThisWeek || 0, 3),
        maxProgress: 3,
        isCompleted: (playerStats?.evaluationsReceivedThisWeek || 0) >= 3,
        isClaimed: false,
        reward: { type: 'xp', value: 200 },
        expiresAt: nextWeek,
        difficulty: 'hard',
        icon: '🎯'
      },
      {
        id: 'weekly-viral-video',
        title: 'Viral Sensation',
        description: 'Get 1000+ views on a single video',
        type: 'weekly',
        category: 'social',
        progress: playerStats?.maxViewsThisWeek || 0,
        maxProgress: 1000,
        isCompleted: (playerStats?.maxViewsThisWeek || 0) >= 1000,
        isClaimed: false,
        reward: { type: 'coins', value: 100 },
        expiresAt: nextWeek,
        difficulty: 'hard',
        icon: '🔥'
      },
      {
        id: 'weekly-skill-improvement',
        title: 'Skill Grinder',
        description: 'Improve any skill by 5+ points',
        type: 'weekly',
        category: 'technical',
        progress: playerStats?.skillImprovementThisWeek || 0,
        maxProgress: 5,
        isCompleted: (playerStats?.skillImprovementThisWeek || 0) >= 5,
        isClaimed: false,
        reward: { type: 'xp', value: 150 },
        expiresAt: nextWeek,
        difficulty: 'medium',
        icon: '📈'
      },

      // Special Quests
      {
        id: 'special-first-evaluation',
        title: 'First Impression',
        description: 'Receive your first scout evaluation',
        type: 'special',
        category: 'scouting',
        progress: playerStats?.evaluationsReceived || 0,
        maxProgress: 1,
        isCompleted: (playerStats?.evaluationsReceived || 0) >= 1,
        isClaimed: false,
        reward: { type: 'badge', value: 'First Impression' },
        expiresAt: new Date('2024-12-31'),
        difficulty: 'medium',
        icon: '⭐'
      },
      {
        id: 'special-club-contact',
        title: 'Pro Prospect',
        description: 'Get contacted by a professional club',
        type: 'special',
        category: 'scouting',
        progress: playerStats?.clubContacts || 0,
        maxProgress: 1,
        isCompleted: (playerStats?.clubContacts || 0) >= 1,
        isClaimed: false,
        reward: { type: 'title', value: 'Pro Prospect' },
        expiresAt: new Date('2024-12-31'),
        difficulty: 'hard',
        icon: '🏆'
      }
    ]

    setQuests(baseQuests)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 text-white'
      case 'medium': return 'bg-yellow-500 text-black'
      case 'hard': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return <Clock className="w-4 h-4" />
      case 'weekly': return <Calendar className="w-4 h-4" />
      case 'special': return <Star className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Video className="w-4 h-4" />
      case 'social': return <Users className="w-4 h-4" />
      case 'scouting': return <Target className="w-4 h-4" />
      case 'engagement': return <MessageSquare className="w-4 h-4" />
      default: return <Star className="w-4 h-4" />
    }
  }

  const formatTimeRemaining = (expiresAt: Date) => {
    const now = new Date()
    const diff = expiresAt.getTime() - now.getTime()
    
    if (diff <= 0) return 'Expired'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h`
    return 'Less than 1h'
  }

  const claimReward = (quest: Quest) => {
    if (!quest.isCompleted || quest.isClaimed) return

    setQuests(prev => prev.map(q => 
      q.id === quest.id ? { ...q, isClaimed: true } : q
    ))

    // Trigger reward animation/notification
    if (onQuestCompleted) {
      onQuestCompleted(quest)
    }
  }

  const filteredQuests = quests.filter(quest => {
    const matchesType = selectedType === 'all' || quest.type === selectedType
    const matchesCompletion = showCompleted ? true : !quest.isCompleted
    return matchesType && matchesCompletion
  })

  const activeQuests = quests.filter(q => !q.isCompleted && !q.isClaimed)
  const completedQuests = quests.filter(q => q.isCompleted && !q.isClaimed)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Quests & Challenges</h2>
          <p className="text-gray-300">Complete quests to earn rewards and level up</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-400">{activeQuests.length}</div>
          <div className="text-sm text-gray-400">Active Quests</div>
        </div>
      </div>

      {/* Quest Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold text-white">
              {quests.filter(q => q.type === 'daily' && !q.isCompleted).length}
            </div>
            <div className="text-blue-100 text-sm">Daily Quests</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold text-white">
              {quests.filter(q => q.type === 'weekly' && !q.isCompleted).length}
            </div>
            <div className="text-purple-100 text-sm">Weekly Quests</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 border-0">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold text-white">{completedQuests.length}</div>
            <div className="text-yellow-100 text-sm">Rewards Ready</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedType === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedType('all')}
        >
          All Quests
        </Button>
        <Button
          variant={selectedType === 'daily' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedType('daily')}
        >
          <Clock className="w-4 h-4 mr-2" />
          Daily
        </Button>
        <Button
          variant={selectedType === 'weekly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedType('weekly')}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Weekly
        </Button>
        <Button
          variant={selectedType === 'special' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedType('special')}
        >
          <Star className="w-4 h-4 mr-2" />
          Special
        </Button>
        <Button
          variant={showCompleted ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? 'Hide Completed' : 'Show Completed'}
        </Button>
      </div>

      {/* Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuests.map((quest) => {
          const progressPercentage = (quest.progress / quest.maxProgress) * 100
          const timeRemaining = formatTimeRemaining(quest.expiresAt)

          return (
            <Card 
              key={quest.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                quest.isCompleted 
                  ? 'bg-gradient-to-br from-green-800 to-green-900 border-green-500' 
                  : quest.isClaimed
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-500'
                  : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
              }`}
            >
              <CardContent className="p-6">
                {/* Quest Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{quest.icon}</div>
                    <div>
                      <h3 className="font-semibold text-white">{quest.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getDifficultyColor(quest.difficulty)}>
                          {quest.difficulty.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getTypeIcon(quest.type)}
                          <span className="ml-1 capitalize">{quest.type}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {quest.isCompleted ? (
                    quest.isClaimed ? (
                      <CheckCircle className="w-6 h-6 text-gray-400" />
                    ) : (
                      <Gift className="w-6 h-6 text-yellow-400 animate-pulse" />
                    )
                  ) : (
                    <XCircle className="w-6 h-6 text-gray-500" />
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4">{quest.description}</p>

                {/* Progress */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">
                      {quest.progress}/{quest.maxProgress}
                    </span>
                  </div>
                  <Progress 
                    value={progressPercentage} 
                    className="h-2 bg-slate-700"
                  />
                </div>

                {/* Time Remaining */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{timeRemaining}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">
                      {quest.reward.value}
                      {quest.reward.type === 'xp' && ' XP'}
                      {quest.reward.type === 'coins' && ' Coins'}
                      {quest.reward.type === 'badge' && ' Badge'}
                      {quest.reward.type === 'title' && ' Title'}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                {quest.isCompleted && !quest.isClaimed && (
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold"
                    onClick={() => claimReward(quest)}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Claim Reward
                  </Button>
                )}
                {quest.isClaimed && (
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-500 text-gray-400"
                    disabled
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Claimed
                  </Button>
                )}
                {!quest.isCompleted && (
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-600 text-gray-400"
                    disabled
                  >
                    <Target className="w-4 h-4 mr-2" />
                    In Progress
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredQuests.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">No quests available</h3>
          <p className="text-gray-500">
            {selectedType !== 'all' 
              ? `No ${selectedType} quests available right now.`
              : 'Check back soon for new quests!'
            }
          </p>
        </div>
      )}

      {/* Quest Refresh Info */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Daily quests refresh at midnight</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Weekly quests refresh on Sundays</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
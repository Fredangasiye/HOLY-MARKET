import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Shield,
  Award,
  Crown,
  Medal,
  TrendingUp,
  Users,
  Video,
  Calendar,
  CheckCircle,
  Lock,
  Brain
} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  category: 'technical' | 'tactical' | 'physical' | 'social' | 'scouting' | 'special'
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  icon: string
  progress: number
  maxProgress: number
  isCompleted: boolean
  isUnlocked: boolean
  reward: {
    type: 'xp' | 'badge' | 'title' | 'feature'
    value: number | string
  }
  dateUnlocked?: Date
}

interface AchievementSystemProps {
  playerId: string
  playerStats: any
  onAchievementUnlocked?: (achievement: Achievement) => void
}

export default function AchievementSystem({ 
  playerId, 
  playerStats, 
  onAchievementUnlocked 
}: AchievementSystemProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    initializeAchievements()
  }, [playerStats])

  const initializeAchievements = () => {
    const baseAchievements: Achievement[] = [
      // Technical Achievements
      {
        id: 'first-video',
        title: 'First Steps',
        description: 'Upload your first highlight video',
        category: 'technical',
        rarity: 'common',
        icon: '🎬',
        progress: playerStats?.videosUploaded || 0,
        maxProgress: 1,
        isCompleted: (playerStats?.videosUploaded || 0) >= 1,
        isUnlocked: true,
        reward: { type: 'xp', value: 100 }
      },
      {
        id: 'video-master',
        title: 'Content Creator',
        description: 'Upload 10 highlight videos',
        category: 'technical',
        rarity: 'uncommon',
        icon: '📹',
        progress: playerStats?.videosUploaded || 0,
        maxProgress: 10,
        isCompleted: (playerStats?.videosUploaded || 0) >= 10,
        isUnlocked: true,
        reward: { type: 'badge', value: 'Content Creator' }
      },
      {
        id: 'skill-master',
        title: 'Skill Master',
        description: 'Achieve 90+ in any technical skill',
        category: 'technical',
        rarity: 'rare',
        icon: '⚽',
        progress: Math.max(
          playerStats?.passing || 0,
          playerStats?.shooting || 0,
          playerStats?.dribbling || 0,
          playerStats?.technique || 0
        ),
        maxProgress: 90,
        isCompleted: Math.max(
          playerStats?.passing || 0,
          playerStats?.shooting || 0,
          playerStats?.dribbling || 0,
          playerStats?.technique || 0
        ) >= 90,
        isUnlocked: true,
        reward: { type: 'title', value: 'Skill Master' }
      },

      // Tactical Achievements
      {
        id: 'first-evaluation',
        title: 'Scout Attention',
        description: 'Receive your first scout evaluation',
        category: 'tactical',
        rarity: 'common',
        icon: '👁️',
        progress: playerStats?.evaluationsReceived || 0,
        maxProgress: 1,
        isCompleted: (playerStats?.evaluationsReceived || 0) >= 1,
        isUnlocked: true,
        reward: { type: 'xp', value: 200 }
      },
      {
        id: 'top-rated',
        title: 'Top Rated',
        description: 'Achieve an average rating of 8.5+',
        category: 'tactical',
        rarity: 'epic',
        icon: '⭐',
        progress: Math.round((playerStats?.averageRating || 0) * 10),
        maxProgress: 85,
        isCompleted: (playerStats?.averageRating || 0) >= 8.5,
        isUnlocked: true,
        reward: { type: 'badge', value: 'Top Rated' }
      },
      {
        id: 'scout-favorite',
        title: 'Scout Favorite',
        description: 'Receive 5+ scout evaluations',
        category: 'tactical',
        rarity: 'rare',
        icon: '🎯',
        progress: playerStats?.evaluationsReceived || 0,
        maxProgress: 5,
        isCompleted: (playerStats?.evaluationsReceived || 0) >= 5,
        isUnlocked: true,
        reward: { type: 'title', value: 'Scout Favorite' }
      },

      // Physical Achievements
      {
        id: 'fitness-freak',
        title: 'Fitness Freak',
        description: 'Achieve 85+ in all physical attributes',
        category: 'physical',
        rarity: 'rare',
        icon: '💪',
        progress: Math.min(
          playerStats?.speed || 0,
          playerStats?.strength || 0,
          playerStats?.stamina || 0
        ),
        maxProgress: 85,
        isCompleted: Math.min(
          playerStats?.speed || 0,
          playerStats?.strength || 0,
          playerStats?.stamina || 0
        ) >= 85,
        isUnlocked: true,
        reward: { type: 'badge', value: 'Fitness Freak' }
      },

      // Social Achievements
      {
        id: 'community-star',
        title: 'Community Star',
        description: 'Reach 1000+ video views',
        category: 'social',
        rarity: 'uncommon',
        icon: '👥',
        progress: playerStats?.totalViews || 0,
        maxProgress: 1000,
        isCompleted: (playerStats?.totalViews || 0) >= 1000,
        isUnlocked: true,
        reward: { type: 'xp', value: 300 }
      },
      {
        id: 'viral-sensation',
        title: 'Viral Sensation',
        description: 'Reach 10,000+ video views',
        category: 'social',
        rarity: 'epic',
        icon: '🔥',
        progress: playerStats?.totalViews || 0,
        maxProgress: 10000,
        isCompleted: (playerStats?.totalViews || 0) >= 10000,
        isUnlocked: true,
        reward: { type: 'title', value: 'Viral Sensation' }
      },

      // Scouting Achievements
      {
        id: 'club-interest',
        title: 'Club Interest',
        description: 'Get contacted by a professional club',
        category: 'scouting',
        rarity: 'legendary',
        icon: '🏆',
        progress: playerStats?.clubContacts || 0,
        maxProgress: 1,
        isCompleted: (playerStats?.clubContacts || 0) >= 1,
        isUnlocked: true,
        reward: { type: 'badge', value: 'Pro Prospect' }
      },
      {
        id: 'trial-invitation',
        title: 'Trial Invitation',
        description: 'Receive an invitation to professional trials',
        category: 'scouting',
        rarity: 'legendary',
        icon: '🎫',
        progress: playerStats?.trialInvitations || 0,
        maxProgress: 1,
        isCompleted: (playerStats?.trialInvitations || 0) >= 1,
        isUnlocked: true,
        reward: { type: 'title', value: 'Trial Player' }
      },

      // Special Achievements
      {
        id: 'early-adopter',
        title: 'Early Adopter',
        description: 'Join the platform in its first month',
        category: 'special',
        rarity: 'rare',
        icon: '🚀',
        progress: 1,
        maxProgress: 1,
        isCompleted: true,
        isUnlocked: true,
        reward: { type: 'badge', value: 'Early Adopter' }
      },
      {
        id: 'uncle-scout-friend',
        title: 'Uncle Scout Friend',
        description: 'Have 10 conversations with Uncle Scout',
        category: 'special',
        rarity: 'uncommon',
        icon: '🤖',
        progress: playerStats?.uncleScoutChats || 0,
        maxProgress: 10,
        isCompleted: (playerStats?.uncleScoutChats || 0) >= 10,
        isUnlocked: true,
        reward: { type: 'xp', value: 250 }
      }
    ]

    setAchievements(baseAchievements)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500'
      case 'epic': return 'from-purple-400 to-pink-500'
      case 'rare': return 'from-blue-400 to-cyan-500'
      case 'uncommon': return 'from-green-400 to-emerald-500'
      case 'common': return 'from-gray-400 to-slate-500'
      default: return 'from-gray-400 to-slate-500'
    }
  }

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return { text: 'LEGENDARY', color: 'bg-yellow-500 text-black' }
      case 'epic': return { text: 'EPIC', color: 'bg-purple-500 text-white' }
      case 'rare': return { text: 'RARE', color: 'bg-blue-500 text-white' }
      case 'uncommon': return { text: 'UNCOMMON', color: 'bg-green-500 text-white' }
      case 'common': return { text: 'COMMON', color: 'bg-gray-500 text-white' }
      default: return { text: 'COMMON', color: 'bg-gray-500 text-white' }
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Target className="w-4 h-4" />
      case 'tactical': return <Brain className="w-4 h-4" />
      case 'physical': return <Zap className="w-4 h-4" />
      case 'social': return <Users className="w-4 h-4" />
      case 'scouting': return <Trophy className="w-4 h-4" />
      case 'special': return <Award className="w-4 h-4" />
      default: return <Star className="w-4 h-4" />
    }
  }

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory
    const matchesCompletion = showCompleted ? true : !achievement.isCompleted
    return matchesCategory && matchesCompletion
  })

  const completedCount = achievements.filter(a => a.isCompleted).length
  const totalCount = achievements.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Achievements</h2>
          <p className="text-gray-300">Track your progress and unlock rewards</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">{completedCount}/{totalCount}</div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Overall Progress</h3>
            <Badge className="bg-green-500 text-white">
              {Math.round((completedCount / totalCount) * 100)}%
            </Badge>
          </div>
          <Progress 
            value={(completedCount / totalCount) * 100} 
            className="h-3 bg-slate-700"
          />
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All Categories
        </Button>
        {['technical', 'tactical', 'physical', 'social', 'scouting', 'special'].map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {getCategoryIcon(category)}
            <span className="ml-2 capitalize">{category}</span>
          </Button>
        ))}
        <Button
          variant={showCompleted ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? 'Hide Completed' : 'Show Completed'}
        </Button>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => {
          const rarity = getRarityBadge(achievement.rarity)
          const progressPercentage = (achievement.progress / achievement.maxProgress) * 100

          return (
            <Card 
              key={achievement.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                achievement.isCompleted 
                  ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-green-500' 
                  : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
              }`}
            >
              {/* Rarity Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(achievement.rarity)} opacity-20 blur-xl`} />
              
              <CardContent className="relative p-6">
                {/* Achievement Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`text-3xl ${achievement.isCompleted ? 'animate-bounce' : ''}`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{achievement.title}</h3>
                      <Badge className={`${rarity.color} text-xs font-bold mt-1`}>
                        {rarity.text}
                      </Badge>
                    </div>
                  </div>
                  {achievement.isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <Lock className="w-6 h-6 text-gray-500" />
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>

                {/* Progress */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <Progress 
                    value={progressPercentage} 
                    className="h-2 bg-slate-700"
                  />
                </div>

                {/* Reward */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">
                      Reward: {achievement.reward.value}
                      {achievement.reward.type === 'xp' && ' XP'}
                      {achievement.reward.type === 'badge' && ' Badge'}
                      {achievement.reward.type === 'title' && ' Title'}
                    </span>
                  </div>
                  {achievement.isCompleted && achievement.dateUnlocked && (
                    <span className="text-xs text-gray-500">
                      {achievement.dateUnlocked.toLocaleDateString()}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">No achievements found</h3>
          <p className="text-gray-500">
            {selectedCategory !== 'all' 
              ? `No ${selectedCategory} achievements available yet.`
              : 'Start playing to unlock achievements!'
            }
          </p>
        </div>
      )}
    </div>
  )
} 
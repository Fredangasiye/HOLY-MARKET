import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Shield, 
  Brain,
  Dumbbell,
  TrendingUp,
  Play,
  Heart,
  Award,
  Crown
} from 'lucide-react'

interface PlayerProfile {
  id: string
  name: string
  position: string
  age: number
  height: number
  weight: number
  club: string
  nationality: string
  preferredFoot: string
  averageRating: number
  totalEvaluations: number
  rank: number
  profilePicture: string
  stats: {
    technical: number
    tactical: number
    physical: number
    mental: number
    passing: number
    shooting: number
    tackling: number
    speed: number
    strength: number
    stamina: number
  }
  achievements: string[]
  level: number
  experience: number
  experienceToNext: number
}

interface GamifiedPlayerProfileProps {
  player: PlayerProfile
  isOwnProfile?: boolean
}

export default function GamifiedPlayerProfile({ player, isOwnProfile = false }: GamifiedPlayerProfileProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'from-yellow-400 to-orange-500'
    if (level >= 80) return 'from-purple-400 to-pink-500'
    if (level >= 70) return 'from-blue-400 to-cyan-500'
    if (level >= 60) return 'from-green-400 to-emerald-500'
    return 'from-gray-400 to-slate-500'
  }

  const getRarityColor = (rating: number) => {
    if (rating >= 90) return 'text-yellow-400' // Legendary
    if (rating >= 80) return 'text-purple-400' // Epic
    if (rating >= 70) return 'text-blue-400'   // Rare
    if (rating >= 60) return 'text-green-400'  // Uncommon
    return 'text-gray-400' // Common
  }

  const getRarityBadge = (rating: number) => {
    if (rating >= 90) return { text: 'LEGENDARY', color: 'bg-yellow-500 text-black' }
    if (rating >= 80) return { text: 'EPIC', color: 'bg-purple-500 text-white' }
    if (rating >= 70) return { text: 'RARE', color: 'bg-blue-500 text-white' }
    if (rating >= 60) return { text: 'UNCOMMON', color: 'bg-green-500 text-white' }
    return { text: 'COMMON', color: 'bg-gray-500 text-white' }
  }

  const rarity = getRarityBadge(player.averageRating)

  return (
    <div className="relative">
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getLevelColor(player.level)} opacity-20 blur-xl rounded-2xl animate-pulse`} />
      
      <Card className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header with Level and Rarity */}
        <CardHeader className="relative pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Level Badge */}
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-yellow-300 shadow-lg">
                  <span className="text-black font-bold text-sm">{player.level}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Heart className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-white flex items-center space-x-2">
                  <span>{player.name}</span>
                  {player.rank <= 3 && (
                    <Crown className={`w-6 h-6 ${player.rank === 1 ? 'text-yellow-400' : player.rank === 2 ? 'text-gray-300' : 'text-orange-600'}`} />
                  )}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={rarity.color + ' font-bold text-xs'}>
                    {rarity.text}
                  </Badge>
                  <span className="text-gray-400 text-sm">#{player.rank}</span>
                </div>
              </div>
            </div>
            
            {/* Experience Bar */}
            <div className="text-right">
              <div className="text-white text-sm font-semibold">XP: {player.experience}/{player.experienceToNext}</div>
              <Progress 
                value={(player.experience / player.experienceToNext) * 100} 
                className="w-32 h-2 bg-slate-700"
              />
            </div>
          </div>

          {/* Position and Nationality */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-blue-400 text-blue-400">
                {player.position}
              </Badge>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">{player.nationality}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className={`w-5 h-5 ${getRarityColor(player.averageRating)}`} />
              <span className={`text-xl font-bold ${getRarityColor(player.averageRating)}`}>
                {player.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Profile Picture with 3D Animated Frame */}
          <div className="flex justify-center">
            <div 
              className={`relative group cursor-pointer transition-all duration-500 ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* 3D Animated Frame */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full p-1 animate-spin-slow">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm opacity-50" />
              </div>
              
              {/* Inner Frame */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-full p-2">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-600 shadow-2xl">
                  {player.profilePicture ? (
                    <img 
                      src={player.profilePicture} 
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold border-2 border-white shadow-lg">
                {player.totalEvaluations}
              </div>
            </div>
          </div>

          {/* Player Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-white font-semibold flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Technical</span>
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Passing</span>
                    <span>{player.stats.passing}%</span>
                  </div>
                  <Progress value={player.stats.passing} className="h-2 bg-slate-700" />
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Shooting</span>
                    <span>{player.stats.shooting}%</span>
                  </div>
                  <Progress value={player.stats.shooting} className="h-2 bg-slate-700" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-semibold flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>Tactical</span>
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Speed</span>
                    <span>{player.stats.speed}%</span>
                  </div>
                  <Progress value={player.stats.speed} className="h-2 bg-slate-700" />
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Stamina</span>
                    <span>{player.stats.stamina}%</span>
                  </div>
                  <Progress value={player.stats.stamina} className="h-2 bg-slate-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Attributes */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold">{player.stats.technical}</div>
              <div className="text-gray-400 text-xs">Technical</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold">{player.stats.tactical}</div>
              <div className="text-gray-400 text-xs">Tactical</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold">{player.stats.physical}</div>
              <div className="text-gray-400 text-xs">Physical</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold">{player.stats.mental}</div>
              <div className="text-gray-400 text-xs">Mental</div>
            </div>
          </div>

          {/* Achievements */}
          {player.achievements.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>Achievements</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {player.achievements.map((achievement, index) => (
                  <Badge key={index} className="bg-yellow-500 text-black text-xs">
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold">
              <Play className="w-4 h-4 mr-2" />
              View Videos
            </Button>
            {isOwnProfile && (
              <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
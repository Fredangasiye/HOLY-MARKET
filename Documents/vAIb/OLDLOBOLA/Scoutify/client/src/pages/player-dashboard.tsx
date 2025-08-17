import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { authService } from '../lib/auth'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  User, 
  Video, 
  Star, 
  Trophy, 
  Upload, 
  Settings, 
  LogOut,
  Plus,
  Eye,
  Users,
  Target,
  TrendingUp,
  Calendar,
  MapPin,
  Award,
  Play,
  Edit,
  Save,
  Camera,
  Heart,
  Zap,
  Shield,
  ChevronRight,
  Target as TargetIcon,
  Brain,
  Dumbbell
} from 'lucide-react'
import BackButton from '../components/back-button'
import TopNavigation from '../components/top-navigation'
import AchievementSystem from '../components/achievement-system'
import QuestSystem from '../components/quest-system'
import Leaderboard from '../components/leaderboard'

interface PlayerProfile {
  id?: number
  userId: string
  firstName: string
  lastName: string
  dateOfBirth: string
  age: number
  location: string
  position: string
  preferredFoot: string
  height?: number
  weight?: number
  bio?: string
  profilePicture?: string
  isVerified: boolean
  parentConsent: boolean
  parentEmail?: string
  createdAt?: string
  updatedAt?: string
  club?: string
  jerseyNumber?: number
  avgRating?: number
  stats?: {
    passing: number
    shooting: number
    tackling: number
    dribbling: number
    speed: number
    strength: number
    stamina: number
    technique: number
  }
}

export default function PlayerDashboard() {
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<PlayerProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [profileForm, setProfileForm] = useState<Partial<PlayerProfile>>({})
  const [, setLocation] = useLocation()

  useEffect(() => {
    const storedSession = authService.getStoredSession()
    if (!storedSession) {
      setLocation('/auth')
      return
    }
    setUser(storedSession.user)
    fetchUserData()
  }, [setLocation])

  const fetchUserData = async () => {
    try {
      const storedSession = authService.getStoredSession()
      if (!storedSession) {
        setLocation('/auth')
        return
      }

      // Check if user is actually a player
      const userRole = storedSession.user.role || storedSession.user.userType || 'player'
      if (userRole !== 'player') {
        setLocation('/dashboard') // Redirect to main dashboard for scouts
        return
      }

      // Mock player data with Destiny Chambers info
      const mockPlayer: PlayerProfile = {
        id: 1,
        userId: storedSession.user.id,
        firstName: 'Destiny',
        lastName: 'Chambers',
        dateOfBirth: '2000-01-01',
        age: 23,
        location: 'Johannesburg, South Africa',
        position: 'DM/AM/CM',
        preferredFoot: 'Right',
        height: 176,
        weight: 64,
        bio: 'Versatile midfielder with excellent passing and vision. Can play as defensive midfielder, attacking midfielder, or central midfielder.',
        isVerified: false,
        parentConsent: false,
        club: 'Rangers FC',
        jerseyNumber: 10,
        avgRating: 80,
        stats: {
          passing: 75,
          shooting: 70,
          tackling: 64,
          dribbling: 68,
          speed: 72,
          strength: 65,
          stamina: 78,
          technique: 73
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      setUserProfile(mockPlayer)
      setProfileForm(mockPlayer)
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      authService.clearStoredSession()
      setLocation('/')
    } catch (error) {
      console.error('Error signing out:', error)
      authService.clearStoredSession()
      setLocation('/')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your player dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <BackButton fallbackPath="/" />
              <Link href="/">
                <h1 className="text-2xl font-bold text-green-600">Scoutlify</h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userProfile?.profilePicture} />
                  <AvatarFallback className="bg-green-100 text-green-600">
                    {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{userProfile?.firstName} {userProfile?.lastName}</p>
                  <Badge variant="secondary" className="text-xs">Player</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gamified Player Profile Card */}
        <div className="mb-8">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 text-white border-0 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-orange-600/50"></div>
            
            <CardContent className="relative p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Section - Player Photo & Basic Info */}
                <div className="lg:col-span-1">
                  <div className="text-center lg:text-left">
                    {/* Player Photo with Gamified Frame */}
                    <div className="relative mx-auto lg:mx-0 mb-6">
                      <div className="relative">
                        {/* Animated 3D Frame */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full p-1 animate-pulse">
                          <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full p-1">
                            <Avatar className="h-32 w-32 mx-auto border-4 border-white shadow-2xl">
                              <AvatarImage src={userProfile?.profilePicture} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold">
                                {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                        
                        {/* Jersey Number Badge */}
                        <div className="absolute -bottom-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-white font-bold text-sm">
                          {userProfile?.jerseyNumber || 10}
                        </div>
                      </div>
                    </div>

                    {/* Player Name */}
                    <h1 className="text-3xl font-bold mb-2">{userProfile?.firstName} {userProfile?.lastName}</h1>
                    
                    {/* Position Badges */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                      {userProfile?.position?.split('/').map((pos, index) => (
                        <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/30">
                          {pos.trim()}
                        </Badge>
                      ))}
                    </div>

                    {/* Platform Logo */}
                    <div className="flex justify-center lg:justify-start mb-4">
                      <div className="bg-white/20 rounded-full p-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">SE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Section - Player Details */}
                <div className="lg:col-span-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-white">Player Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/80">Club:</span>
                        <span className="font-medium">{userProfile?.club}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Location:</span>
                        <span className="font-medium">{userProfile?.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Age:</span>
                        <span className="font-medium">{userProfile?.age} yrs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Height:</span>
                        <span className="font-medium">{userProfile?.height} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Weight:</span>
                        <span className="font-medium">{userProfile?.weight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Fav. foot:</span>
                        <span className="font-medium">{userProfile?.preferredFoot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Avg. rating:</span>
                        <span className="font-medium text-green-400">+ {userProfile?.avgRating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Player Stats */}
                <div className="lg:col-span-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white">Player Stats</h3>
                    <div className="space-y-4">
                      {userProfile?.stats && Object.entries(userProfile.stats).map(([stat, value]) => (
                        <div key={stat} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80 capitalize">{stat}</span>
                            <span className="font-medium">{value}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                              style={{width: `${value}%`}}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                      View More
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="quests">Quests</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Premium feature</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Evaluations</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Premium feature</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">N/A</div>
                  <p className="text-xs text-muted-foreground">Average rating received</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest videos and evaluations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Get evaluated by professional scouts to start your journey!</p>
                  <Link href="/pricing">
                    <Button className="mt-4">
                      <Upload className="w-4 h-4 mr-2" />
                      Get Evaluated - R899
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <AchievementSystem 
              playerId={userProfile?.id?.toString() || ''}
              playerStats={userProfile?.stats}
              onAchievementUnlocked={(achievement) => {
                console.log('Achievement unlocked:', achievement)
                // Here you would trigger notifications, animations, etc.
              }}
            />
          </TabsContent>

          <TabsContent value="quests" className="space-y-6">
            <QuestSystem 
              playerId={userProfile?.id?.toString() || ''}
              playerStats={{
                videosUploadedToday: 0,
                uncleScoutChatsToday: 0,
                viewsToday: 0,
                likesGivenToday: 0,
                videosUploadedThisWeek: 0,
                evaluationsReceivedThisWeek: 0,
                maxViewsThisWeek: 0,
                skillImprovementThisWeek: 0,
                evaluationsReceived: 0,
                clubContacts: 0,
                trialInvitations: 0,
                uncleScoutChats: 0,
                totalViews: 0,
                ...userProfile?.stats
              }}
              onQuestCompleted={(quest) => {
                console.log('Quest completed:', quest)
                // Here you would trigger reward animations, XP gain, etc.
              }}
            />
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Leaderboard 
              type="overall"
              currentUserId={userProfile?.id?.toString()}
              onPlayerClick={(playerId) => {
                console.log('Player clicked:', playerId)
                // Here you would navigate to player profile
              }}
            />
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Videos</h2>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </Button>
            </div>
            
            <Card>
              <CardContent className="text-center py-12">
                <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
                <p className="text-gray-500 mb-4">Upload videos and get evaluated by professional scouts</p>
                <div className="space-y-3">
                  <Badge variant="outline" className="text-sm">
                    <Star className="w-3 h-3 mr-1" />
                    Professional Evaluation
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    <Target className="w-3 h-3 mr-1" />
                    Detailed Feedback
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    <Users className="w-3 h-3 mr-1" />
                    Club Introduction
                  </Badge>
                </div>
                <div className="mt-6">
                  <Link href="/pricing">
                    <Button>
                      <Upload className="w-4 h-4 mr-2" />
                      Get Evaluated - R899
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluations" className="space-y-6">
            <h2 className="text-2xl font-bold">My Evaluations</h2>
            
            <Card>
              <CardContent className="text-center py-12">
                <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No evaluations yet</h3>
                <p className="text-gray-500">Upload videos to receive evaluations from scouts</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <h2 className="text-2xl font-bold">Performance Stats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Dribbling</span>
                    <span className="font-medium">{userProfile?.stats?.dribbling}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passing</span>
                    <span className="font-medium">{userProfile?.stats?.passing}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shooting</span>
                    <span className="font-medium">{userProfile?.stats?.shooting}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technique</span>
                    <span className="font-medium">{userProfile?.stats?.technique}/100</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Physical Attributes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Speed</span>
                    <span className="font-medium">{userProfile?.stats?.speed}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Strength</span>
                    <span className="font-medium">{userProfile?.stats?.strength}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stamina</span>
                    <span className="font-medium">{userProfile?.stats?.stamina}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tackling</span>
                    <span className="font-medium">{userProfile?.stats?.tackling}/100</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
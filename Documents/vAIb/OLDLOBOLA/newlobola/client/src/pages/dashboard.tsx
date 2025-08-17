import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { authService } from '../lib/auth'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
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
  Play
} from 'lucide-react'
// Define types locally since we can't import from shared schema in client
interface Player {
  id: number
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
  createdAt: string
  updatedAt: string
}

interface Scout {
  id: number
  userId: string
  firstName: string
  lastName: string
  organization: string
  position: string
  credentials?: string
  isVerified: boolean
  profilePicture?: string
  createdAt: string
  updatedAt: string
}

interface Video {
  id: number
  playerId: number
  title: string
  description?: string
  videoUrl: string
  thumbnailUrl?: string
  duration?: number
  fileSize?: number
  isPublic: boolean
  createdAt: string
}

interface Evaluation {
  id: number
  playerId: number
  scoutId?: number
  packageId: number
  videoId?: number
  technicalScore?: number
  dribbling?: number
  passing?: number
  shooting?: number
  firstTouch?: number
  tacticalScore?: number
  positioning?: number
  decisionMaking?: number
  gameIntelligence?: number
  physicalScore?: number
  speed?: number
  strength?: number
  stamina?: number
  agility?: number
  mentalScore?: number
  leadership?: number
  workRate?: number
  confidence?: number
  overallScore?: number
  writtenFeedback?: string
  recommendations?: string
  aiAnalysis?: any
  status: string
  createdAt: string
  completedAt?: string
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<Player | Scout | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const [, setLocation] = useLocation()

  useEffect(() => {
    const storedSession = authService.getStoredSession()
    if (!storedSession) {
      setLocation('/auth')
      return
    }

    setUser(storedSession.user)
    
    // Redirect players to player dashboard
    const userRole = storedSession.user.role || storedSession.user.userType || 'player'
    if (userRole === 'player') {
      setLocation('/player-dashboard')
      return
    }
    
    fetchUserData()
  }, [setLocation])

  const fetchUserData = async () => {
    try {
      const storedSession = authService.getStoredSession()
      if (!storedSession) {
        setLocation('/auth')
        return
      }

      // For now, we'll use mock data since the backend API endpoints for profiles aren't fully implemented yet
      const userRole = storedSession.user.role || storedSession.user.userType || 'player'
      
      if (userRole === 'player') {
        // Mock player data
        const mockPlayer: Player = {
          id: 1,
          userId: storedSession.user.id,
          firstName: storedSession.user.firstName || storedSession.user.user_metadata?.firstName || 'Player',
          lastName: storedSession.user.lastName || storedSession.user.user_metadata?.lastName || 'User',
          dateOfBirth: '2000-01-01',
          age: 24,
          location: 'Johannesburg, South Africa',
          position: 'Forward',
          preferredFoot: 'Right',
          height: 175,
          weight: 70,
          bio: 'Passionate football player looking to get scouted.',
          isVerified: false,
          parentConsent: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        setUserProfile(mockPlayer)
        
        // Mock videos
        const mockVideos: Video[] = [
          {
            id: 1,
            playerId: 1,
            title: 'Highlight Reel 2024',
            description: 'Best moments from recent matches',
            videoUrl: 'https://example.com/video1.mp4',
            thumbnailUrl: 'https://example.com/thumb1.jpg',
            duration: 180,
            fileSize: 50000000,
            isPublic: true,
            createdAt: new Date().toISOString()
          }
        ]
        
        setVideos(mockVideos)
      } else {
        // Mock scout data
        const mockScout: Scout = {
          id: 1,
          userId: storedSession.user.id,
          firstName: storedSession.user.firstName || storedSession.user.user_metadata?.firstName || 'Scout',
          lastName: storedSession.user.lastName || storedSession.user.user_metadata?.lastName || 'User',
          organization: 'Premier League Scouts',
          position: 'Senior Scout',
          credentials: 'UEFA A License',
          isVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        setUserProfile(mockScout)
      }

      // Mock evaluations
      const mockEvaluations: Evaluation[] = []
      setEvaluations(mockEvaluations)
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
      // Still clear local session and redirect
      authService.clearStoredSession()
      setLocation('/')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const isPlayer = user?.role === 'player'
  const isScout = user?.role === 'scout'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-green-600">Mzansi Football Eyes</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={userProfile?.profilePicture} />
                  <AvatarFallback>
                    {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">
                    {userProfile?.firstName} {userProfile?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isPlayer ? 'Player' : 'Scout'}
                  </p>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={userProfile?.profilePicture} />
                    <AvatarFallback className="text-lg">
                      {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {userProfile?.firstName} {userProfile?.lastName}
                    </h2>
                    <Badge variant={isPlayer ? "default" : "secondary"}>
                      {isPlayer ? 'Player' : 'Scout'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isPlayer && userProfile && (
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Target className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{(userProfile as Player).position}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{(userProfile as Player).location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{(userProfile as Player).age} years old</span>
                    </div>
                  </div>
                )}
                
                {isScout && userProfile && (
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{(userProfile as Scout).organization}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Award className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{(userProfile as Scout).position}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                {isPlayer && <TabsTrigger value="videos">Videos</TabsTrigger>}
                <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
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
                      <div className="text-2xl font-bold">{videos.length}</div>
                      <p className="text-xs text-muted-foreground">
                        {isPlayer ? 'Your uploaded videos' : 'Videos evaluated'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Evaluations</CardTitle>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{evaluations.length}</div>
                      <p className="text-xs text-muted-foreground">
                        {isPlayer ? 'Received evaluations' : 'Completed evaluations'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                                                  {evaluations.length > 0 
                            ? (evaluations.reduce((sum, evaluation) => sum + (evaluation.overallScore || 0), 0) / evaluations.length).toFixed(1)
                            : 'N/A'
                          }
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isPlayer ? 'Your average rating' : 'Average rating given'}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {evaluations.length > 0 ? (
                      <div className="space-y-4">
                        {evaluations.slice(0, 3).map((evaluation) => (
                          <div key={evaluation.id} className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <Star className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {isPlayer ? 'New evaluation received' : 'Evaluation completed'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(evaluation.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="outline">
                              {evaluation.overallScore?.toFixed(1)}/10
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No recent activity. {isPlayer ? 'Upload your first video to get started!' : 'Start evaluating players to see activity here.'}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {isPlayer && (
                <TabsContent value="videos" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Your Videos</h3>
                    <Link href="/upload-video">
                      <Button>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Video
                      </Button>
                    </Link>
                  </div>

                  {videos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {videos.map((video) => (
                        <Card key={video.id}>
                          <CardHeader>
                            <CardTitle className="text-lg">{video.title}</CardTitle>
                            <CardDescription>{video.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                              <Play className="w-12 h-12 text-gray-400" />
                            </div>
                            <div className="flex justify-between items-center">
                              <Badge variant={video.isPublic ? "default" : "secondary"}>
                                {video.isPublic ? 'Public' : 'Private'}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {new Date(video.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="text-center py-12">
                        <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No videos yet</h3>
                        <p className="text-gray-500 mb-4">
                          Upload your first video to showcase your skills to scouts
                        </p>
                        <Link href="/upload-video">
                          <Button>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Your First Video
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              )}

              <TabsContent value="evaluations" className="space-y-6">
                <h3 className="text-lg font-semibold">
                  {isPlayer ? 'Your Evaluations' : 'Evaluations Completed'}
                </h3>

                {evaluations.length > 0 ? (
                  <div className="space-y-4">
                    {evaluations.map((evaluation) => (
                      <Card key={evaluation.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                Evaluation #{evaluation.id}
                              </CardTitle>
                              <CardDescription>
                                {new Date(evaluation.createdAt).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <Badge variant={evaluation.status === 'completed' ? 'default' : 'secondary'}>
                              {evaluation.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {evaluation.overallScore && (
                            <div className="mb-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm font-medium">Overall Score:</span>
                                <span className="text-2xl font-bold text-green-600">
                                  {evaluation.overallScore.toFixed(1)}/10
                                </span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Technical:</span>
                                  <span className="ml-2 font-medium">{evaluation.technicalScore?.toFixed(1)}/10</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Tactical:</span>
                                  <span className="ml-2 font-medium">{evaluation.tacticalScore?.toFixed(1)}/10</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Physical:</span>
                                  <span className="ml-2 font-medium">{evaluation.physicalScore?.toFixed(1)}/10</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Mental:</span>
                                  <span className="ml-2 font-medium">{evaluation.mentalScore?.toFixed(1)}/10</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {evaluation.writtenFeedback && (
                            <div className="mb-4">
                              <h4 className="font-medium mb-2">Feedback:</h4>
                              <p className="text-gray-700">{evaluation.writtenFeedback}</p>
                            </div>
                          )}

                          {evaluation.recommendations && (
                            <div>
                              <h4 className="font-medium mb-2">Recommendations:</h4>
                              <p className="text-gray-700">{evaluation.recommendations}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No evaluations yet</h3>
                      <p className="text-gray-500">
                        {isPlayer 
                          ? 'Upload videos and purchase evaluations to see feedback here'
                          : 'Start evaluating players to see your completed evaluations here'
                        }
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                      Manage your profile information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Profile Picture</label>
                        <div className="mt-2 flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={userProfile?.profilePicture} />
                            <AvatarFallback>
                              {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <Button variant="outline">Upload New Photo</Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">First Name</label>
                          <input
                            type="text"
                            defaultValue={userProfile?.firstName}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Last Name</label>
                          <input
                            type="text"
                            defaultValue={userProfile?.lastName}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                      </div>

                      {isPlayer && userProfile && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Position</label>
                              <select
                                defaultValue={(userProfile as Player).position}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                              >
                                <option value="Goalkeeper">Goalkeeper</option>
                                <option value="Defender">Defender</option>
                                <option value="Midfielder">Midfielder</option>
                                <option value="Forward">Forward</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Preferred Foot</label>
                              <select
                                defaultValue={(userProfile as Player).preferredFoot}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                              >
                                <option value="Left">Left</option>
                                <option value="Right">Right</option>
                                <option value="Both">Both</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium">Bio</label>
                            <textarea
                              defaultValue={(userProfile as Player).bio}
                              rows={3}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                              placeholder="Tell scouts about yourself..."
                            />
                          </div>
                        </>
                      )}

                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
} 
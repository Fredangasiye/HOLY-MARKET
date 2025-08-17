import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Users, 
  Video, 
  Star, 
  Eye, 
  TrendingUp,
  Calendar,
  DollarSign,
  Shield,
  Settings,
  BarChart3,
  UserCheck,
  FileText
} from 'lucide-react'

// Mock admin data
const mockAdminData = {
  stats: {
    totalPlayers: 156,
    totalScouts: 23,
    totalVideos: 89,
    totalEvaluations: 234,
    totalRevenue: 45600,
    activeUsers: 78
  },
  recentActivity: [
    {
      id: 1,
      type: 'video_upload',
      playerName: 'Lerato Mokoena',
      description: 'Uploaded new video: Match Highlights',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'evaluation',
      playerName: 'Sipho Ndlovu',
      description: 'Received evaluation from Coach Mkhize',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      type: 'registration',
      playerName: 'Thabo Maseko',
      description: 'New player registration',
      timestamp: '6 hours ago'
    },
    {
      id: 4,
      type: 'payment',
      playerName: 'Nkosi Dlamini',
      description: 'Pro package payment received',
      timestamp: '1 day ago'
    }
  ],
  topPlayers: [
    {
      id: 1,
      name: 'Lerato Mokoena',
      position: 'Midfielder',
      averageScore: 8.6,
      totalEvaluations: 5,
      rank: 1
    },
    {
      id: 2,
      name: 'Sipho Ndlovu',
      position: 'Forward',
      averageScore: 8.4,
      totalEvaluations: 4,
      rank: 2
    },
    {
      id: 3,
      name: 'Thabo Maseko',
      position: 'Defender',
      averageScore: 8.2,
      totalEvaluations: 3,
      rank: 3
    }
  ],
  pendingVideos: [
    {
      id: 1,
      playerName: 'Mandla Zulu',
      videoTitle: 'Skills Display',
      uploadedAt: '1 hour ago',
      status: 'pending_review'
    },
    {
      id: 2,
      playerName: 'Bongani Khumalo',
      videoTitle: 'Match Highlights',
      uploadedAt: '3 hours ago',
      status: 'pending_review'
    }
  ]
}

export default function AdminDashboard() {
  const [data, setData] = useState(mockAdminData)
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if user is admin (you would implement proper admin check)
  useEffect(() => {
    // For demo purposes, we'll assume the user is admin
    // In production, you'd check against user roles/permissions
    setIsAdmin(true)
  }, [])

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'video_upload':
        return <Video className="w-4 h-4 text-blue-600" />
      case 'evaluation':
        return <Star className="w-4 h-4 text-green-600" />
      case 'registration':
        return <UserCheck className="w-4 h-4 text-purple-600" />
      case 'payment':
        return <DollarSign className="w-4 h-4 text-yellow-600" />
      default:
        return <Eye className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review':
        return <Badge variant="outline" className="text-yellow-600">Pending Review</Badge>
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-green-600">Mzansi Football Eyes</h1>
              </Link>
              <Badge className="ml-4 bg-red-100 text-red-800">Admin</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage the Mzansi Football Eyes platform</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Players</p>
                  <p className="text-2xl font-bold text-gray-900">{data.stats.totalPlayers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Scouts</p>
                  <p className="text-2xl font-bold text-gray-900">{data.stats.totalScouts}</p>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Videos</p>
                  <p className="text-2xl font-bold text-gray-900">{data.stats.totalVideos}</p>
                </div>
                <Video className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">R{data.stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.playerName}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/rankings">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Rankings
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Manage Events
                  </Button>
                </Link>
                <Link href="/training">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Training Content
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Platform Settings
                </Button>
              </CardContent>
            </Card>

            {/* Top Players */}
            <Card>
              <CardHeader>
                <CardTitle>Top Players</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.topPlayers.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <p className="text-sm text-gray-600">{player.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{player.averageScore}</p>
                        <p className="text-xs text-gray-500">#{player.rank}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Videos */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.pendingVideos.map((video) => (
                    <div key={video.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{video.playerName}</p>
                        {getStatusBadge(video.status)}
                      </div>
                      <p className="text-sm text-gray-600">{video.videoTitle}</p>
                      <p className="text-xs text-gray-500 mt-1">{video.uploadedAt}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 
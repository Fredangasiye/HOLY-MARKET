import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  User, 
  Video, 
  Eye, 
  Star,
  TrendingUp,
  Calendar
} from 'lucide-react'
import TopNavigation from '../components/top-navigation'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Scoutlify</h1>
          <p className="text-xl text-gray-300">Your football scouting dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Upload Videos</CardTitle>
              <CardDescription className="text-gray-300">Share your highlights</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/upload-video">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Video className="w-4 h-4 mr-2" />
                  Upload Video
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">View Rankings</CardTitle>
              <CardDescription className="text-gray-300">See top players</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/rankings">
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600">
                  <Star className="w-4 h-4 mr-2" />
                  View Rankings
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Training</CardTitle>
              <CardDescription className="text-gray-300">Improve your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/training">
                <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Start Training
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
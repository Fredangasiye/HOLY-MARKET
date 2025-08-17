import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import TopNavigation from '../components/top-navigation'

export default function ScoutAccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Scout Access</h1>
          <p className="text-xl text-gray-300">Professional scouting tools and resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Player Database</CardTitle>
              <CardDescription className="text-gray-300">Access player profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/rankings">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                  Browse Players
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Video Library</CardTitle>
              <CardDescription className="text-gray-300">Review player videos</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/video-wall">
                <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600">
                  View Videos
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Evaluation Tools</CardTitle>
              <CardDescription className="text-gray-300">Professional assessment tools</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/scout-evaluation">
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600">
                  Start Evaluation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
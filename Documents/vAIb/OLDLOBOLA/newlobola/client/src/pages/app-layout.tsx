import { Link } from 'wouter'
import { authService } from '../lib/auth'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Trophy, 
  Users, 
  Video, 
  Star, 
  Calendar, 
  Play, 
  Target,
  ArrowRight,
  Eye,
  Shield,
  Zap,
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  Twitch,
  Users as Discord,
  UserCheck
} from 'lucide-react'
import UncleScout from '../components/uncle-scout'
import { useState } from 'react'

export default function AppLayout() {
  const storedSession = authService.getStoredSession()
  const user = storedSession?.user
  const [isUncleScoutOpen, setIsUncleScoutOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-green-600">Mzansi Football Eyes</h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="/events" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Events
                </Link>
                <Link href="/rankings" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Top 10
                </Link>
                <Link href="/training" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Drills & Skills
                </Link>
                <Link href="/video-wall" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Video Wall
                </Link>
                {user ? (
                  <Link href="/dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                ) : (
                  <Link href="/auth">
                    <Button variant="outline" className="ml-4">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
          <div className="absolute inset-0 bg-pattern-dots opacity-20" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 animate-pulse-glow">
              <Eye className="w-4 h-4 mr-2" />
              🎮 GAMIFIED FOOTBALL EXPERIENCE
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-glow">
              Level Up Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Football Game</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join the ultimate football scouting platform! Create your player profile, upload epic highlights, 
              get scouted and compete with players across South Africa. Your journey to becoming a legend starts here! 🚀⚽
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold animate-bounce-glow">
                  🎯 Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                  💎 View Packages
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setIsUncleScoutOpen(true)}
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                👨‍🏫 Ask Uncle Scout
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Mzansi Football Eyes?
            </h2>
            <p className="text-xl text-gray-600">
              The complete platform for football talent discovery in South Africa
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Showcase Your Skills</CardTitle>
                <CardDescription>
                  Upload video highlights and create a professional profile that scouts can discover
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Connect with Scouts</CardTitle>
                <CardDescription>
                  Get evaluated by verified professional scouts from top clubs and academies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Track Your Progress</CardTitle>
                <CardDescription>
                  Monitor your rankings, receive detailed feedback, and track your development
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Meet players who found their breakthrough through our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Lerato Mokoena</h3>
                    <p className="text-sm text-gray-600">Midfielder, Kaizer Chiefs Academy</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Mzansi Football Eyes helped me get noticed by scouts when I was just 16. 
                  The platform gave me the exposure I needed to join a professional academy."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sipho Ndlovu</h3>
                    <p className="text-sm text-gray-600">Forward, Orlando Pirates Development</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The detailed feedback from scouts helped me improve my game significantly. 
                  Now I'm part of a top development program."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Football Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of players who are already showcasing their talent on our platform
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              Create Your Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-glow">Mzansi Football Eyes</h3>
              <p className="text-gray-400">
                The ultimate gamified football platform for South Africa's rising stars! 🚀⚽
              </p>
              
              {/* Social Media Links */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-300">Follow Us</h4>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <Youtube className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <Twitch className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <Discord className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-glow">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/events" className="hover:text-blue-400 transition-colors">🎮 Events</Link></li>
                <li><Link href="/rankings" className="hover:text-blue-400 transition-colors">🏆 Top 10</Link></li>
                <li><Link href="/training" className="hover:text-blue-400 transition-colors">⚽ Drills & Skills</Link></li>
                <li><Link href="/video-wall" className="hover:text-blue-400 transition-colors">🎬 Video Wall</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-glow">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">🤖 Uncle Scout</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">📞 Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">🔒 Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-glow">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">📋 Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">🛡️ POPIA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mzansi Football Eyes. Level up your game! 🚀⚽</p>
          </div>
        </div>
      </footer>

      {/* Uncle Scout Chat */}
      <UncleScout 
        isOpen={isUncleScoutOpen} 
        onClose={() => setIsUncleScoutOpen(false)} 
      />
    </div>
  )
}
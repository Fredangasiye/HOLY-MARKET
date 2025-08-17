import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Check } from 'lucide-react'
import TopNavigation from '../components/top-navigation'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Pricing Plans</h1>
          <p className="text-xl text-gray-300">Choose the perfect plan for your football journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Free</CardTitle>
              <CardDescription className="text-gray-300">Perfect for getting started</CardDescription>
              <div className="text-3xl font-bold text-white">$0<span className="text-lg text-gray-400">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Upload 3 videos per month
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Basic scout feedback
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Access to training content
                </li>
              </ul>
              <Link href="/auth">
                <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 border-2 border-blue-500">
            <CardHeader>
              <Badge className="w-fit bg-blue-500 text-white">Most Popular</Badge>
              <CardTitle className="text-white">Pro</CardTitle>
              <CardDescription className="text-gray-300">For serious players</CardDescription>
              <div className="text-3xl font-bold text-white">$19<span className="text-lg text-gray-400">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Unlimited video uploads
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Priority scout feedback
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Direct scout messaging
                </li>
              </ul>
              <Link href="/auth">
                <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600">
                  Choose Pro
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Elite</CardTitle>
              <CardDescription className="text-gray-300">For professional prospects</CardDescription>
              <div className="text-3xl font-bold text-white">$49<span className="text-lg text-gray-400">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Everything in Pro
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Personal scout advisor
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Club introduction service
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Priority event access
                </li>
              </ul>
              <Link href="/auth">
                <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600">
                  Choose Elite
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
import { useState } from 'react'
import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Check, Star, Video, Users, Target, Zap, Shield, Award, Clock, MapPin } from 'lucide-react'

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const features = [
    {
      title: "Professional Evaluation",
      description: "Get evaluated by our professional scouts within 10 working days",
      icon: Star
    },
    {
      title: "Detailed Feedback",
      description: "Receive comprehensive analysis of your technical, tactical, physical, and mental attributes",
      icon: Target
    },
    {
      title: "Club Introduction",
      description: "If you pass validation, we'll introduce you to local professional club academy scouts",
      icon: Users
    },
    {
      title: "Personal Development",
      description: "Get recommendations to improve your game and reach your potential",
      icon: Zap
    }
  ]

  const plans = [
    {
      id: 'evaluation',
      name: 'Video Evaluation',
      price: 'R899',
      description: 'Submit your own footage and get professional evaluation',
      features: [
        'Upload your own video clips',
        'Professional scout evaluation',
        'Detailed feedback report',
        '10 working days turnaround',
        'Club introduction (if qualified)',
        'Personal development recommendations'
      ],
      popular: true,
      cta: 'GET EVALUATED',
      icon: Video
    },
    {
      id: 'professional',
      name: 'Professional Filming',
      price: 'Inquiry Based',
      description: 'Let our professional scouts film your game with AI technology',
      features: [
        'Professional filming with AI technology',
        'Team game analysis',
        'Premium evaluation package',
        'Location-based pricing',
        'Maximum value optimization',
        'Direct scout consultation'
      ],
      popular: false,
      cta: 'ENQUIRE NOW',
      icon: Shield
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-green-600">Mzansi Football Eyes</h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Got Footage? Get Scouted!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Save time & money - submit a clip of your game and get a quick response from professional scouts. 
            Your journey to professional football starts here.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">We Receive Your Clips</h3>
              <p className="text-gray-600">
                Whether you submit your own clips or use our latest AI technology camera.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Evaluation</h3>
              <p className="text-gray-600">
                One of our scouts will evaluate your footage/profile and get back to you within 10 days.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Sent For Club Review</h3>
              <p className="text-gray-600">
                If you pass our validation, you will be introduced to scouts from your local professional club academy.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'ring-2 ring-green-500 shadow-lg' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <plan.icon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-lg">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.id === 'evaluation' && (
                    <span className="text-gray-500 ml-2">one-time</span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Information */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Detailed Evaluation No Matter What
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Sign up and create your player profile with your clips showcasing your hidden talents, 
              or choose our professional filming package using the latest AI filming technology. 
              Whatever you choose will be your next step to getting yourself noticed!
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Rest assured, we can absolutely guarantee you that your clips will be carefully viewed, 
              analysed, and provided with valuable feedback by our scouts. This will enable us to 
              determine the next crucial step in your journey, enhancing your prospects of securing 
              that vital trial opportunity.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Don't worry if you're not to that required level as we can help you achieve your goals 
              with our 'Scouts Eyes' 1-1 coaching program to work on your weaknesses and build on your 
              strengths. Those who are already at that required level from the start will have their 
              details passed onto a professional club scout to review your footage, and if chosen by 
              them, you will be contacted directly to discuss the next stage in your football journey. 
              But "NEVER GIVE UP" and think it's the end as there's always opportunities at any age 
              or ability so work hard to reach your goals and dreams!
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Scouted?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of players who have taken the next step in their football journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
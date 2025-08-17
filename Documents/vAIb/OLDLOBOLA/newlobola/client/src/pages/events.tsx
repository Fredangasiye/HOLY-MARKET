import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { useSession } from '@supabase/auth-helpers-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ExternalLink, 
  ArrowLeft,
  Search,
  Filter,
  Trophy,
  Users,
  Zap,
  Star,
  Target,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

// Define Event type locally since we can't import from shared schema in client
interface Event {
  id: number
  title: string
  description: string
  eventDate: Date
  location: string
  contactInfo?: string
  registrationLink?: string
  imageUrl?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  type: 'trial' | 'workshop' | 'tournament' | 'scouting'
  maxParticipants?: number
  currentParticipants?: number
  price?: string
}

// Mock events data - in production this would come from the API
const mockEvents: Event[] = [
  {
    id: 1,
    title: "Kaizer Chiefs Youth Trials 2024",
    description: "Open trials for players aged 14-18. Looking for talented midfielders and forwards. Bring your own kit and boots. This is your chance to join one of South Africa's biggest clubs!",
    eventDate: new Date('2024-09-15T09:00:00'),
    location: "Kaizer Chiefs Village, Naturena, Johannesburg",
    contactInfo: "youth@kaizerchiefs.com",
    registrationLink: "https://kaizerchiefs.com/trials",
    imageUrl: "/images/kaizer-chiefs.jpg",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'trial',
    maxParticipants: 200,
    currentParticipants: 145,
    price: 'Free'
  },
  {
    id: 2,
    title: "Orlando Pirates Development Academy Workshop",
    description: "Technical skills workshop for young players. Focus on dribbling, passing, and shooting techniques. Learn from professional coaches and improve your game!",
    eventDate: new Date('2024-09-20T14:00:00'),
    location: "Orlando Stadium, Soweto",
    contactInfo: "academy@orlandopirates.co.za",
    registrationLink: "https://orlandopirates.co.za/workshop",
    imageUrl: "/images/orlando-pirates.jpg",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'workshop',
    maxParticipants: 50,
    currentParticipants: 32,
    price: 'R500'
  },
  {
    id: 3,
    title: "Mamelodi Sundowns Talent Identification Day",
    description: "Scouting event for players aged 16-21. Professional scouts will be in attendance. Showcase your skills and get discovered by top clubs!",
    eventDate: new Date('2024-09-25T10:00:00'),
    location: "Chloorkop Training Ground, Pretoria",
    contactInfo: "scouting@sundowns.co.za",
    registrationLink: "https://sundowns.co.za/talent-day",
    imageUrl: "/images/sundowns.jpg",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'scouting',
    maxParticipants: 150,
    currentParticipants: 89,
    price: 'R300'
  },
  {
    id: 4,
    title: "SAFA Regional Tournament",
    description: "Regional youth tournament for U17 and U19 teams. Winners qualify for national championships. Compete against the best young talent in the region!",
    eventDate: new Date('2024-10-05T08:00:00'),
    location: "Various venues across Gauteng",
    contactInfo: "tournaments@safa.net",
    registrationLink: "https://safa.net/tournament",
    imageUrl: "/images/safa.jpg",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'tournament',
    maxParticipants: 32,
    currentParticipants: 28,
    price: 'R1000 per team'
  },
  {
    id: 5,
    title: "SuperSport United Goalkeeper Trials",
    description: "Specialized trials for goalkeepers aged 15-20. Professional goalkeeper coaches will assess your skills and potential.",
    eventDate: new Date('2024-09-30T13:00:00'),
    location: "SuperSport United Training Ground, Pretoria",
    contactInfo: "goalkeepers@supersportunited.co.za",
    registrationLink: "https://supersportunited.co.za/gk-trials",
    imageUrl: "/images/supersport.jpg",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'trial',
    maxParticipants: 40,
    currentParticipants: 25,
    price: 'Free'
  },
  {
    id: 6,
    title: "Cape Town City Skills Academy",
    description: "Weekend skills development program focusing on technical abilities, tactical understanding, and mental strength.",
    eventDate: new Date('2024-10-12T09:00:00'),
    location: "Cape Town Stadium, Cape Town",
    contactInfo: "academy@capetowncity.co.za",
    registrationLink: "https://capetowncity.co.za/academy",
    imageUrl: "/images/capetown-city.jpg",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'workshop',
    maxParticipants: 60,
    currentParticipants: 45,
    price: 'R750'
  }
]

export default function EventsPage() {
  const session = useSession()
  const user = session?.user
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [eventSubmissionStatus, setEventSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      // For now, use mock data since database isn't set up yet
      setEvents(mockEvents)
    } catch (error) {
      console.error('Error fetching events:', error)
      setEvents(mockEvents)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !locationFilter || locationFilter === 'all' || event.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesType = !typeFilter || typeFilter === 'all' || event.type === typeFilter
    return matchesSearch && matchesLocation && matchesType
  })

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-ZA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const isUpcoming = (date: Date) => {
    return new Date(date) > new Date()
  }

  const getLocationCity = (location: string) => {
    const cities = ['Johannesburg', 'Soweto', 'Pretoria', 'Cape Town', 'Durban', 'Port Elizabeth']
    for (const city of cities) {
      if (location.includes(city)) {
        return city
      }
    }
    return 'Other'
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'trial': return <Target className="w-4 h-4" />
      case 'workshop': return <Zap className="w-4 h-4" />
      case 'tournament': return <Trophy className="w-4 h-4" />
      case 'scouting': return <Star className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'trial': return 'bg-blue-500 text-white'
      case 'workshop': return 'bg-purple-500 text-white'
      case 'tournament': return 'bg-yellow-500 text-black'
      case 'scouting': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const uniqueCities = Array.from(new Set(events.map(event => getLocationCity(event.location))))

  const handleSubmitEvent = async () => {
    if (!user) {
      // Redirect to auth page if not logged in
      window.location.href = '/auth'
      return
    }

    setEventSubmissionStatus('submitting')
    
    try {
      // Simulate API call for event submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setEventSubmissionStatus('success')
      setTimeout(() => {
        setEventSubmissionStatus('idle')
        setShowEventModal(false)
      }, 3000)
    } catch (error) {
      setEventSubmissionStatus('error')
      setTimeout(() => {
        setEventSubmissionStatus('idle')
      }, 3000)
    }
  }

  const getSubmitButtonContent = () => {
    if (!user) {
      return (
        <>
          <AlertCircle className="w-5 h-5 mr-2" />
          Sign In to Submit Event
        </>
      )
    }
    
    switch (eventSubmissionStatus) {
      case 'submitting':
        return (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Submitting...
          </>
        )
      case 'success':
        return (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            Event Submitted!
          </>
        )
      case 'error':
        return (
          <>
            <AlertCircle className="w-5 h-5 mr-2" />
            Error - Try Again
          </>
        )
      default:
        return (
          <>
            <Zap className="w-5 h-5 mr-2" />
            Submit Your Event
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-white">Mzansi Football Eyes</h1>
              </Link>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
            <Calendar className="w-5 h-5" />
            <span className="font-semibold">FOOTBALL EVENTS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow">
            Epic Football Opportunities
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover trials, workshops, tournaments, and scouting events across South Africa. 
            Level up your game and get discovered by professional clubs! 🚀⚽
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{events.length}</div>
              <div className="text-blue-100">Total Events</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">
                {events.filter(e => e.type === 'trial').length}
              </div>
              <div className="text-purple-100">Trials</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">
                {events.filter(e => e.type === 'tournament').length}
              </div>
              <div className="text-green-100">Tournaments</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 border-0">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">
                {events.reduce((sum, event) => sum + (event.currentParticipants || 0), 0)}
              </div>
              <div className="text-yellow-100">Participants</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 mb-8 neon-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-gray-400"
              />
            </div>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueCities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="trial">Trials</SelectItem>
                <SelectItem value="workshop">Workshops</SelectItem>
                <SelectItem value="tournament">Tournaments</SelectItem>
                <SelectItem value="scouting">Scouting</SelectItem>
              </SelectContent>
            </Select>

                          <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setLocationFilter('all')
                  setTypeFilter('all')
                }}
                className="border-slate-600 text-gray-300 hover:bg-slate-700"
              >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading events...</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 neon-border">
                {/* Event Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-pattern-dots opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="text-sm font-semibold">{event.title.split(' ').slice(0, 3).join(' ')}</div>
                    </div>
                  </div>
                  
                  {/* Event Type Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={`${getEventTypeColor(event.type)} text-xs font-bold`}>
                      {getEventTypeIcon(event.type)}
                      <span className="ml-1">{event.type.toUpperCase()}</span>
                    </Badge>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant={isUpcoming(event.eventDate) ? "default" : "secondary"} className="text-xs">
                      {isUpcoming(event.eventDate) ? 'UPCOMING' : 'PAST'}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-white mb-2 line-clamp-2">{event.title}</CardTitle>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-green-400 text-green-400 text-xs">
                        {event.price}
                      </Badge>
                    </div>
                    {event.maxParticipants && (
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <Users className="w-3 h-3" />
                        <span>{event.currentParticipants}/{event.maxParticipants}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                      {formatDate(event.eventDate)}
                    </div>
                    
                    <div className="flex items-center text-gray-400">
                      <MapPin className="w-4 h-4 mr-2 text-green-400" />
                      {event.location}
                    </div>
                    
                    {event.contactInfo && (
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-4 h-4 mr-2 text-purple-400" />
                        Contact: {event.contactInfo}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    {event.registrationLink && (
                      <a 
                        href={event.registrationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Register Now
                        </Button>
                      </a>
                    )}
                    
                    <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 hover:bg-slate-700">
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-gray-400">
              {searchTerm || (locationFilter && locationFilter !== 'all') || (typeFilter && typeFilter !== 'all')
                ? 'Try adjusting your search criteria' 
                : 'Check back soon for new events'
              }
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 text-center neon-border">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Have an Epic Event to Share?
          </h2>
          <p className="text-gray-300 mb-6">
            Are you organizing a football trial, workshop, or tournament? 
            {!user ? (
              <span className="text-yellow-400 font-semibold"> Sign in to submit your event and help promote it to our community of rising stars!</span>
            ) : (
              <span> Let us know and we'll help promote it to our community of rising stars!</span>
            )}
          </p>
          
          {!user && (
            <div className="mb-6 p-4 bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-yellow-400">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">You need to create a profile first to submit events</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className={`font-bold ${
                user 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white' 
                  : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
              }`}
              onClick={handleSubmitEvent}
              disabled={eventSubmissionStatus === 'submitting'}
            >
              {getSubmitButtonContent()}
            </Button>
            
            {!user && (
              <Link href="/auth">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-bold"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Create Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {eventSubmissionStatus === 'success' && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg shadow-lg border border-green-400 animate-float">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6" />
              <div>
                <div className="font-semibold">Event Submitted Successfully!</div>
                <div className="text-sm text-green-100">Your event will be reviewed and published soon.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {eventSubmissionStatus === 'error' && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-lg shadow-lg border border-red-400 animate-float">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6" />
              <div>
                <div className="font-semibold">Submission Failed</div>
                <div className="text-sm text-red-100">Please try again or contact support.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
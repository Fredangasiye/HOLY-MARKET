import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Trophy, 
  Medal, 
  Star, 
  ArrowLeft,
  TrendingUp,
  Calendar
} from 'lucide-react'

// Mock scout evaluations data
const mockScoutEvaluations = [
  {
    id: 1,
    playerName: "Lerato Mokoena",
    position: "Midfielder",
    age: 18,
    location: "Johannesburg",
    evaluations: [
      {
        scoutName: "Coach Mkhize",
        technicalScore: 9.0,
        tacticalScore: 8.5,
        physicalScore: 8.0,
        mentalScore: 8.8,
        overallScore: 8.6,
        date: "2024-08-01"
      },
      {
        scoutName: "Scout Dlamini",
        technicalScore: 8.8,
        tacticalScore: 9.0,
        physicalScore: 8.2,
        mentalScore: 8.5,
        overallScore: 8.6,
        date: "2024-08-02"
      }
    ],
    averageOverallScore: 8.6,
    totalEvaluations: 2,
    rank: 1
  },
  {
    id: 2,
    playerName: "Sipho Ndlovu",
    position: "Forward",
    age: 17,
    location: "Soweto",
    evaluations: [
      {
        scoutName: "Coach Mkhize",
        technicalScore: 8.5,
        tacticalScore: 8.0,
        physicalScore: 8.8,
        mentalScore: 8.2,
        overallScore: 8.4,
        date: "2024-08-01"
      },
      {
        scoutName: "Scout Nkosi",
        technicalScore: 8.7,
        tacticalScore: 7.8,
        physicalScore: 9.0,
        mentalScore: 8.0,
        overallScore: 8.4,
        date: "2024-08-03"
      }
    ],
    averageOverallScore: 8.4,
    totalEvaluations: 2,
    rank: 2
  },
  {
    id: 3,
    playerName: "Thabo Maseko",
    position: "Defender",
    age: 19,
    location: "Pretoria",
    evaluations: [
      {
        scoutName: "Scout Dlamini",
        technicalScore: 8.2,
        tacticalScore: 9.2,
        physicalScore: 8.5,
        mentalScore: 8.8,
        overallScore: 8.7,
        date: "2024-08-02"
      }
    ],
    averageOverallScore: 8.7,
    totalEvaluations: 1,
    rank: 3
  },
  {
    id: 4,
    playerName: "Nkosi Dlamini",
    position: "Goalkeeper",
    age: 18,
    location: "Cape Town",
    evaluations: [
      {
        scoutName: "Coach Mkhize",
        technicalScore: 8.8,
        tacticalScore: 8.2,
        physicalScore: 8.0,
        mentalScore: 8.5,
        overallScore: 8.4,
        date: "2024-08-01"
      }
    ],
    averageOverallScore: 8.4,
    totalEvaluations: 1,
    rank: 4
  },
  {
    id: 5,
    playerName: "Mandla Zulu",
    position: "Midfielder",
    age: 16,
    location: "Durban",
    evaluations: [
      {
        scoutName: "Scout Nkosi",
        technicalScore: 8.0,
        tacticalScore: 8.3,
        physicalScore: 8.1,
        mentalScore: 8.4,
        overallScore: 8.2,
        date: "2024-08-03"
      }
    ],
    averageOverallScore: 8.2,
    totalEvaluations: 1,
    rank: 5
  }
]

export default function RankingsPage() {
  const [rankings, setRankings] = useState(mockScoutEvaluations)
  const [currentMonth, setCurrentMonth] = useState('August 2024')
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <Star className="w-6 h-6 text-blue-500" />
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500 text-white">🥇 1st</Badge>
      case 2:
        return <Badge className="bg-gray-400 text-white">🥈 2nd</Badge>
      case 3:
        return <Badge className="bg-amber-600 text-white">🥉 3rd</Badge>
      default:
        return <Badge variant="outline">#{rank}</Badge>
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
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
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
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-500 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Top 10 Players</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The best performing players this month based on scout evaluations and AI analysis
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {currentMonth} Rankings
          </div>
        </div>

        {/* Rankings List */}
        <div className="space-y-4">
          {rankings.map((player) => (
            <Card key={player.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                      {getRankIcon(player.rank)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold">{player.playerName}</h3>
                        {getRankBadge(player.rank)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{player.position}</span>
                        <span>•</span>
                        <span>{player.age} years old</span>
                        <span>•</span>
                        <span>{player.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">
                        {player.averageOverallScore.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {player.totalEvaluations} scout evaluations
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedPlayer(selectedPlayer === player.id ? null : player.id)}
                      className="mt-2"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                
                {/* Detailed Evaluations */}
                {selectedPlayer === player.id && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-4">Scout Evaluations</h4>
                    <div className="space-y-4">
                      {player.evaluations.map((evaluation, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-medium">{evaluation.scoutName}</p>
                              <p className="text-sm text-gray-500">{evaluation.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">
                                {evaluation.overallScore.toFixed(1)}
                              </p>
                              <p className="text-sm text-gray-500">Overall</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <p className="text-sm font-medium text-blue-600">Technical</p>
                              <p className="text-lg font-bold">{evaluation.technicalScore.toFixed(1)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium text-purple-600">Tactical</p>
                              <p className="text-lg font-bold">{evaluation.tacticalScore.toFixed(1)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium text-orange-600">Physical</p>
                              <p className="text-lg font-bold">{evaluation.physicalScore.toFixed(1)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium text-green-600">Mental</p>
                              <p className="text-lg font-bold">{evaluation.mentalScore.toFixed(1)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">How Scout Rankings Work</h2>
          <div className="grid md:grid-cols-4 gap-6 text-left">
            <div>
              <h3 className="font-semibold mb-2">Technical Skills</h3>
              <p className="text-gray-600">
                Ball control, passing, shooting, dribbling, and technical ability.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tactical Awareness</h3>
              <p className="text-gray-600">
                Game understanding, positioning, decision making, and tactical intelligence.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Physical Attributes</h3>
              <p className="text-gray-600">
                Speed, strength, endurance, agility, and physical conditioning.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Mental Strength</h3>
              <p className="text-gray-600">
                Focus, confidence, leadership, and mental resilience under pressure.
              </p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              <strong>Scoring System:</strong> Each attribute is scored from 1-10, with the overall score being the average of all four categories.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-green-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Want to Be on This List?
          </h2>
          <p className="text-green-100 mb-6">
            Upload your videos and get evaluated by professional scouts to climb the rankings
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 
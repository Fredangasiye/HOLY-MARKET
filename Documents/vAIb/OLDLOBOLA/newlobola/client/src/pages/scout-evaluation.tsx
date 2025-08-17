import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Slider } from '../components/ui/slider'
import { Badge } from '../components/ui/badge'
import { 
  ArrowLeft,
  Search,
  User,
  Target,
  Brain,
  Dumbbell,
  Zap,
  Star,
  Send,
  Play
} from 'lucide-react'

// Mock available videos for evaluation (only unassigned videos)
const mockAvailableVideos = [
  {
    id: 1,
    playerName: "Lerato Mokoena",
    playerPosition: "Midfielder",
    playerAge: 18,
    playerLocation: "Johannesburg",
    videoTitle: "Match Highlights vs Kaizer Chiefs",
    videoDescription: "Full match highlights showing technical skills and tactical awareness",
    videoDuration: "3:45",
    videoUrl: "#",
    uploadedAt: "2024-08-01",
    isAssigned: false
  },
  {
    id: 2,
    playerName: "Sipho Ndlovu",
    playerPosition: "Forward",
    playerAge: 17,
    playerLocation: "Soweto",
    videoTitle: "Goal Scoring Compilation",
    videoDescription: "Collection of goals scored in recent matches",
    videoDuration: "2:30",
    videoUrl: "#",
    uploadedAt: "2024-08-02",
    isAssigned: false
  },
  {
    id: 3,
    playerName: "Thabo Maseko",
    playerPosition: "Defender",
    playerAge: 19,
    playerLocation: "Pretoria",
    videoTitle: "Defensive Masterclass",
    videoDescription: "Tackling, positioning, and defensive organization",
    videoDuration: "4:15",
    videoUrl: "#",
    uploadedAt: "2024-08-03",
    isAssigned: false
  },
  {
    id: 4,
    playerName: "Nkosi Dlamini",
    playerPosition: "Goalkeeper",
    playerAge: 18,
    playerLocation: "Cape Town",
    videoTitle: "Goalkeeping Skills",
    videoDescription: "Saves, distribution, and command of the area",
    videoDuration: "3:20",
    videoUrl: "#",
    uploadedAt: "2024-08-04",
    isAssigned: false
  }
]

export default function ScoutEvaluationPage() {
  const [videos, setVideos] = useState(mockAvailableVideos)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isScoutAuthenticated, setIsScoutAuthenticated] = useState(false)
  const [scoutInfo, setScoutInfo] = useState<any>(null)
  const [evaluation, setEvaluation] = useState({
    technicalScore: 5,
    tacticalScore: 5,
    physicalScore: 5,
    mentalScore: 5,
    comments: '',
    recommendation: 'neutral'
  })

  // Check if scout is authenticated
  useEffect(() => {
    const accessToken = localStorage.getItem('scoutAccessToken')
    const scoutId = localStorage.getItem('scoutId')
    const scoutName = localStorage.getItem('scoutName')
    
    if (accessToken && scoutId && scoutName) {
      setIsScoutAuthenticated(true)
      setScoutInfo({ id: scoutId, name: scoutName })
    } else {
      // Redirect to scout access page if not authenticated
      window.location.href = '/scout-access'
    }
  }, [])

  const filteredVideos = videos.filter(video =>
    video.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.playerPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.playerLocation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const overallScore = (
    evaluation.technicalScore + 
    evaluation.tacticalScore + 
    evaluation.physicalScore + 
    evaluation.mentalScore
  ) / 4

  const handleAssignVideo = async (videoId: number) => {
    try {
      // Assign video to this scout
      const response = await fetch('/api/scout/assign-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('scoutAccessToken')}`
        },
        body: JSON.stringify({
          videoId,
          scoutId: scoutInfo.id
        })
      })

      if (response.ok) {
        // Update local state to mark video as assigned
        setVideos(prev => prev.map(video => 
          video.id === videoId ? { ...video, isAssigned: true } : video
        ))
        setSelectedVideo(videos.find(v => v.id === videoId))
      } else {
        throw new Error('Failed to assign video')
      }
    } catch (error) {
      console.error('Error assigning video:', error)
      alert('Failed to assign video. Please try again.')
    }
  }

  const handleSubmitEvaluation = async () => {
    if (!selectedVideo) return

    const evaluationData = {
      videoId: selectedVideo.id,
      playerId: selectedVideo.playerId,
      playerName: selectedVideo.playerName,
      scoutId: scoutInfo.id,
      scoutName: scoutInfo.name,
      ...evaluation,
      overallScore: Math.round(overallScore * 10) / 10,
      date: new Date().toISOString().split('T')[0]
    }

    try {
      const response = await fetch('/api/scout/submit-evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('scoutAccessToken')}`
        },
        body: JSON.stringify(evaluationData)
      })

      if (response.ok) {
        alert('Evaluation submitted successfully!')
        
        // Remove video from available list
        setVideos(prev => prev.filter(video => video.id !== selectedVideo.id))
        
        // Reset form
        setSelectedVideo(null)
        setEvaluation({
          technicalScore: 5,
          tacticalScore: 5,
          physicalScore: 5,
          mentalScore: 5,
          comments: '',
          recommendation: 'neutral'
        })
      } else {
        throw new Error('Failed to submit evaluation')
      }
    } catch (error) {
      console.error('Error submitting evaluation:', error)
      alert('Failed to submit evaluation. Please try again.')
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 9) return 'Excellent'
    if (score >= 8) return 'Very Good'
    if (score >= 7) return 'Good'
    if (score >= 6) return 'Average'
    if (score >= 5) return 'Below Average'
    return 'Poor'
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
            <Star className="w-12 h-12 text-green-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Scout Evaluation</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Evaluate players based on their technical, tactical, physical, and mental attributes. 
            Your assessments help players improve and get discovered.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Selection */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Available Videos for Evaluation</CardTitle>
                <CardDescription>
                  Select a video to evaluate. Once assigned, it will be removed from other scouts' lists.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search videos, players, or positions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-3">
                  {filteredVideos.map((video) => (
                    <Card 
                      key={video.id} 
                      className={`cursor-pointer transition-all ${
                        selectedVideo?.id === video.id 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{video.videoTitle}</h3>
                            <p className="text-sm text-gray-600 mb-1">{video.playerName}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Badge variant="outline">{video.playerPosition}</Badge>
                              <span>{video.playerAge} years old</span>
                              <span>•</span>
                              <span>{video.playerLocation}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{video.videoDuration}</p>
                            <Badge variant="secondary" className="mt-1">Available</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredVideos.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Video className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No videos available for evaluation</p>
                      <p className="text-sm">Check back later for new submissions</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Evaluation Form */}
          <div>
            {selectedVideo ? (
              <Card>
                <CardHeader>
                  <CardTitle>Evaluate {selectedVideo.playerName}</CardTitle>
                  <CardDescription>
                    Score each attribute from 1-10 and provide feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Video Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{selectedVideo.videoTitle}</h3>
                        <p className="text-sm text-gray-600 mb-2">{selectedVideo.videoDescription}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Badge variant="outline">{selectedVideo.playerPosition}</Badge>
                          <span>{selectedVideo.playerAge} years old</span>
                          <span>•</span>
                          <span>{selectedVideo.playerLocation}</span>
                          <span>•</span>
                          <span>{selectedVideo.videoDuration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Player */}
                  <div>
                    <h4 className="font-semibold mb-3">Video Preview</h4>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Video player would be embedded here</p>
                        <p className="text-xs text-gray-400">Click to play {selectedVideo.videoTitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Scoring */}
                  <div className="space-y-6">
                    <h4 className="font-semibold">Attribute Scoring</h4>
                    
                    {/* Technical */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span>Technical Skills</span>
                        </Label>
                        <div className="text-right">
                          <span className={`font-bold ${getScoreColor(evaluation.technicalScore)}`}>
                            {evaluation.technicalScore.toFixed(1)}
                          </span>
                          <p className="text-xs text-gray-500">{getScoreLabel(evaluation.technicalScore)}</p>
                        </div>
                      </div>
                      <Slider
                        value={[evaluation.technicalScore]}
                        onValueChange={(value) => setEvaluation({...evaluation, technicalScore: value[0]})}
                        max={10}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    {/* Tactical */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="flex items-center space-x-2">
                          <Brain className="w-4 h-4 text-purple-600" />
                          <span>Tactical Awareness</span>
                        </Label>
                        <div className="text-right">
                          <span className={`font-bold ${getScoreColor(evaluation.tacticalScore)}`}>
                            {evaluation.tacticalScore.toFixed(1)}
                          </span>
                          <p className="text-xs text-gray-500">{getScoreLabel(evaluation.tacticalScore)}</p>
                        </div>
                      </div>
                      <Slider
                        value={[evaluation.tacticalScore]}
                        onValueChange={(value) => setEvaluation({...evaluation, tacticalScore: value[0]})}
                        max={10}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    {/* Physical */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="flex items-center space-x-2">
                          <Dumbbell className="w-4 h-4 text-orange-600" />
                          <span>Physical Attributes</span>
                        </Label>
                        <div className="text-right">
                          <span className={`font-bold ${getScoreColor(evaluation.physicalScore)}`}>
                            {evaluation.physicalScore.toFixed(1)}
                          </span>
                          <p className="text-xs text-gray-500">{getScoreLabel(evaluation.physicalScore)}</p>
                        </div>
                      </div>
                      <Slider
                        value={[evaluation.physicalScore]}
                        onValueChange={(value) => setEvaluation({...evaluation, physicalScore: value[0]})}
                        max={10}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    {/* Mental */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-green-600" />
                          <span>Mental Strength</span>
                        </Label>
                        <div className="text-right">
                          <span className={`font-bold ${getScoreColor(evaluation.mentalScore)}`}>
                            {evaluation.mentalScore.toFixed(1)}
                          </span>
                          <p className="text-xs text-gray-500">{getScoreLabel(evaluation.mentalScore)}</p>
                        </div>
                      </div>
                      <Slider
                        value={[evaluation.mentalScore]}
                        onValueChange={(value) => setEvaluation({...evaluation, mentalScore: value[0]})}
                        max={10}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    {/* Overall Score */}
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Overall Score</p>
                      <p className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                        {overallScore.toFixed(1)}
                      </p>
                      <p className="text-sm text-gray-600">{getScoreLabel(overallScore)}</p>
                    </div>

                    {/* Recommendation */}
                    <div>
                      <Label>Recommendation</Label>
                      <Select 
                        value={evaluation.recommendation} 
                        onValueChange={(value) => setEvaluation({...evaluation, recommendation: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strongly_recommend">Strongly Recommend</SelectItem>
                          <SelectItem value="recommend">Recommend</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="not_recommend">Not Recommend</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Comments */}
                    <div>
                      <Label>Additional Comments</Label>
                      <Textarea
                        placeholder="Provide detailed feedback and suggestions for improvement..."
                        value={evaluation.comments}
                        onChange={(e) => setEvaluation({...evaluation, comments: e.target.value})}
                        rows={4}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {!selectedVideo.isAssigned && (
                        <Button 
                          onClick={() => handleAssignVideo(selectedVideo.id)}
                          className="w-full"
                          variant="outline"
                        >
                          <Target className="w-4 h-4 mr-2" />
                          Assign Video to Me
                        </Button>
                      )}
                      
                      <Button 
                        onClick={handleSubmitEvaluation}
                        className="w-full"
                        size="lg"
                        disabled={!selectedVideo.isAssigned}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {selectedVideo.isAssigned ? 'Submit Evaluation' : 'Assign Video First'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Video</h3>
                  <p className="text-gray-500">
                    Choose a video from the list to begin your evaluation
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
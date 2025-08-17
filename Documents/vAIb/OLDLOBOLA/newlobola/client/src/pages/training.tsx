import { useState } from 'react'
import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Play, 
  Clock, 
  Target, 
  ArrowLeft,
  Search,
  Filter,
  BookOpen,
  Zap,
  Brain,
  Dumbbell
} from 'lucide-react'

// Mock training content
const mockTrainingContent = [
  {
    id: 1,
    title: "Basic Dribbling Techniques",
    description: "Master the fundamentals of ball control and dribbling with these essential drills.",
    category: "Technical",
    difficulty: "Beginner",
    duration: 15,
    videoUrl: "#",
    thumbnailUrl: "/images/dribbling.jpg"
  },
  {
    id: 2,
    title: "Passing Accuracy Drills",
    description: "Improve your passing precision with targeted exercises for short and long passes.",
    category: "Technical",
    difficulty: "Beginner",
    duration: 20,
    videoUrl: "#",
    thumbnailUrl: "/images/passing.jpg"
  },
  {
    id: 3,
    title: "Shooting Power & Accuracy",
    description: "Develop powerful and accurate shooting techniques for different game situations.",
    category: "Technical",
    difficulty: "Intermediate",
    duration: 25,
    videoUrl: "#",
    thumbnailUrl: "/images/shooting.jpg"
  },
  {
    id: 4,
    title: "Positional Awareness",
    description: "Learn to read the game and position yourself effectively on the field.",
    category: "Tactical",
    difficulty: "Intermediate",
    duration: 30,
    videoUrl: "#",
    thumbnailUrl: "/images/positioning.jpg"
  },
  {
    id: 5,
    title: "Speed & Agility Training",
    description: "Enhance your physical attributes with speed and agility exercises.",
    category: "Physical",
    difficulty: "Intermediate",
    duration: 20,
    videoUrl: "#",
    thumbnailUrl: "/images/agility.jpg"
  },
  {
    id: 6,
    title: "Mental Toughness",
    description: "Build mental resilience and decision-making skills under pressure.",
    category: "Mental",
    difficulty: "Advanced",
    duration: 35,
    videoUrl: "#",
    thumbnailUrl: "/images/mental.jpg"
  },
  {
    id: 7,
    title: "First Touch Mastery",
    description: "Perfect your first touch to maintain possession and create opportunities.",
    category: "Technical",
    difficulty: "Advanced",
    duration: 18,
    videoUrl: "#",
    thumbnailUrl: "/images/first-touch.jpg"
  },
  {
    id: 8,
    title: "Defensive Positioning",
    description: "Master defensive techniques and positioning to become a solid defender.",
    category: "Tactical",
    difficulty: "Intermediate",
    duration: 22,
    videoUrl: "#",
    thumbnailUrl: "/images/defense.jpg"
  }
]

const categories = ["All", "Technical", "Tactical", "Physical", "Mental"]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

export default function TrainingPage() {
  const [content, setContent] = useState(mockTrainingContent)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technical':
        return <Target className="w-5 h-5" />
      case 'Tactical':
        return <Brain className="w-5 h-5" />
      case 'Physical':
        return <Dumbbell className="w-5 h-5" />
      case 'Mental':
        return <Zap className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
            <BookOpen className="w-12 h-12 text-green-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Drills & Skills</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Free training videos and drills to improve your football skills. 
            From basic techniques to advanced tactics, we've got you covered.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search drills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
                setSelectedDifficulty('All')
              }}
              className="flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Training Content Grid */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <Play className="w-12 h-12 text-gray-400" />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(item.category)}
                      <span className="text-sm font-medium text-gray-600">{item.category}</span>
                    </div>
                    <Badge className={getDifficultyColor(item.difficulty)}>
                      {item.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.duration} min
                    </div>
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No training content found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or check back soon for new content
            </p>
          </div>
        )}

        {/* Categories Overview */}
        <div className="mt-12 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Training Categories</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Technical</h3>
              <p className="text-sm text-gray-600">
                Ball control, passing, shooting, and dribbling skills
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Tactical</h3>
              <p className="text-sm text-gray-600">
                Game understanding, positioning, and decision making
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Physical</h3>
              <p className="text-sm text-gray-600">
                Speed, strength, endurance, and agility training
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Mental</h3>
              <p className="text-sm text-gray-600">
                Focus, confidence, and mental toughness
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-green-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Take Your Game to the Next Level?
          </h2>
          <p className="text-green-100 mb-6">
            Get personalized training plans and professional evaluations from our expert scouts
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              Get Professional Evaluation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 
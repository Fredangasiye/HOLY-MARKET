import { useState } from 'react'
import TopNavigation from '../components/top-navigation'

const mockTrainingContent = [
  {
    id: 1,
    title: "Basic Dribbling Techniques",
    description: "Master the fundamentals of ball control and dribbling with these essential drills.",
    category: "Technical",
    difficulty: "Beginner",
    duration: 15
  },
  {
    id: 2,
    title: "Passing Accuracy Drills",
    description: "Improve your passing precision with targeted exercises for short and long passes.",
    category: "Technical",
    difficulty: "Beginner",
    duration: 20
  }
]

export default function TrainingPage() {
  const [content] = useState(mockTrainingContent)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Drills & Skills</h1>
          <p className="text-xl text-gray-300">Free training videos and drills to improve your football skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => (
            <div key={item.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-gray-400 text-6xl">▶️</div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">{item.category}</span>
                  <span className="bg-green-500/20 text-green-400 border border-green-500/50 px-2 py-1 rounded text-xs">
                    {item.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400">
                    <span>⏱️ {item.duration} min</span>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded">
                    Watch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
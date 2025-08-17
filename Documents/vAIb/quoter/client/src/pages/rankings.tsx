import { useState } from 'react'
import TopNavigation from '../components/top-navigation'

const mockPlayers = [
  {
    id: 1,
    name: "Marcus Johnson",
    position: "Forward",
    age: 18,
    club: "Manchester United U18",
    rating: 9.2,
    goals: 24,
    assists: 8
  },
  {
    id: 2,
    name: "David Rodriguez",
    position: "Midfielder",
    age: 17,
    club: "Liverpool Academy",
    rating: 8.9,
    goals: 12,
    assists: 15
  }
]

export default function RankingsPage() {
  const [players] = useState(mockPlayers)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Top 10 Players</h1>
          <p className="text-xl text-gray-300">Discover the most promising young talents</p>
        </div>

        <div className="space-y-4">
          {players.map((player, index) => (
            <div key={player.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-black font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{player.name}</h3>
                    <p className="text-gray-300">{player.club}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-2 py-1 rounded text-xs">
                        {player.position}
                      </span>
                      <span className="text-sm text-gray-400">{player.age} years</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-yellow-400">
                        {player.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Rating</p>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-lg font-semibold text-white">{player.goals}</span>
                    <p className="text-xs text-gray-400">Goals</p>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-lg font-semibold text-white">{player.assists}</span>
                    <p className="text-xs text-gray-400">Assists</p>
                  </div>
                  
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded">
                    View Profile
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
import { useState } from 'react'
import TopNavigation from '../components/top-navigation'

const mockEvents = [
  {
    id: 1,
    title: "Premier League Trials",
    description: "Open trials for Premier League clubs looking for young talent",
    date: "2024-02-15",
    location: "London, UK",
    type: "Trials",
    price: "Free"
  },
  {
    id: 2,
    title: "Championship Scouting Event",
    description: "Professional scouts from Championship clubs will be present",
    date: "2024-02-20",
    location: "Manchester, UK",
    type: "Scouting",
    price: "£50"
  }
]

export default function EventsPage() {
  const [events] = useState(mockEvents)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Football Events</h1>
          <p className="text-xl text-gray-300">Discover trials and scouting events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <div className="mb-4">
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-2 py-1 rounded text-xs">
                  {event.type}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
              <p className="text-gray-300 mb-4">{event.description}</p>
              <div className="text-sm text-gray-400 mb-4">
                <p>{event.date} • {event.location}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-white">{event.price}</span>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded">
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
import { useState } from 'react'
import TopNavigation from '../components/top-navigation'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <TopNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Football Events</h1>
          <p className="text-xl text-gray-300">Discover trials and scouting events</p>
        </div>
        <div className="text-center">
          <p className="text-white">Events coming soon...</p>
        </div>
      </div>
    </div>
  )
}

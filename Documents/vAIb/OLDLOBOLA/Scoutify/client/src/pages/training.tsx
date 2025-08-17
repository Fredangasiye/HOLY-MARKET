import { useState } from 'react'
import TopNavigation from '../components/top-navigation'

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <TopNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Drills & Skills</h1>
          <p className="text-xl text-gray-300">Free training videos and drills to improve your football skills</p>
        </div>
        <div className="text-center">
          <p className="text-white">Training content coming soon...</p>
        </div>
      </div>
    </div>
  )
}

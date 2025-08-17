import { Link } from 'wouter'

export default function TopNavigation() {
  return (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              Scoutlify
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/events" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Events
              </Link>
              <Link href="/rankings" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Top 10
              </Link>
              <Link href="/training" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Drills & Skills
              </Link>
              <Link href="/video-wall" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Vid
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

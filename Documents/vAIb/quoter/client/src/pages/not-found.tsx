import { useLocation } from 'wouter'
import { Button } from '../components/ui/button'

export default function NotFound() {
  const [, setLocation] = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-9xl mb-4">⚽</div>
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. 
          Let's get you back to Scoutlify!
        </p>
        <div className="space-x-4">
          <Button
            onClick={() => setLocation('/')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            Go to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => setLocation('/training')}
            className="border-white/20 text-white hover:bg-white/10"
          >
            View Training
          </Button>
        </div>
      </div>
    </div>
  )
}
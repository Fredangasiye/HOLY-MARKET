import { useEffect } from 'react'
import { useLocation, useRoute } from 'wouter'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function AuthCallback() {
  const [location, setLocation] = useLocation()
  const supabase = useSupabaseClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession()
      if (error) {
        console.error('Auth callback error:', error)
        setLocation('/auth')
      } else {
        setLocation('/')
      }
    }

    handleAuthCallback()
  }, [supabase, setLocation])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we complete your sign-in.</p>
      </div>
    </div>
  )
} 
import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function AuthCallback() {
  const [, setLocation] = useLocation()
  const [status, setStatus] = useState('🔄 Authenticating...')
  const [error, setError] = useState<string | null>(null)
  const supabase = useSupabaseClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for error in URL parameters first
        const urlParams = new URLSearchParams(window.location.search)
        const errorCode = urlParams.get('error')
        const errorDescription = urlParams.get('error_description')
        
        if (errorCode) {
          console.error('OAuth Error:', errorCode, errorDescription)
          setError(errorDescription || 'Authentication failed')
          setTimeout(() => setLocation('/auth'), 3000)
          return
        }

        setStatus('🔍 Processing authentication...')
        
        // Handle the authentication callback
        const { data, error: authError } = await supabase.auth.getSession()
        
        if (authError) {
          console.error('Auth callback error:', authError)
          setError(authError.message)
          setTimeout(() => setLocation('/auth'), 3000)
        } else if (data.session) {
          setStatus('✅ Success! Redirecting to dashboard...')
          console.log('Authentication successful:', data.session.user)
          setTimeout(() => setLocation('/'), 1000)
        } else {
          // Try to get user from hash params (for OAuth)
          const hashParams = new URLSearchParams(window.location.hash.substring(1))
          const accessToken = hashParams.get('access_token')
          
          if (accessToken) {
            setStatus('✅ Success! Redirecting to dashboard...')
            setTimeout(() => setLocation('/'), 1000)
          } else {
            console.log('No session or access token found')
            setError('Authentication failed - no session created')
            setTimeout(() => setLocation('/auth'), 3000)
          }
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred')
        setTimeout(() => setLocation('/auth'), 3000)
      }
    }

    handleAuthCallback()
  }, [supabase, setLocation])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md w-full mx-4">
        {error ? (
          <>
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h2 className="text-xl font-semibold mb-3 text-red-600">Authentication Error</h2>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{error}</p>
            <p className="text-xs text-gray-500">Redirecting to login page in 3 seconds...</p>
          </>
        ) : (
          <>
            <div className="animate-spin text-6xl mb-4">🔄</div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">{status}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Please wait while we complete your sign-in process.
            </p>
          </>
        )}
        
        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-3 bg-gray-100 text-xs text-gray-600 rounded text-left">
            <strong>🔧 Debug Info:</strong><br/>
            <div className="break-all">URL: {window.location.href}</div>
          </div>
        )}
      </div>
    </div>
  )
}
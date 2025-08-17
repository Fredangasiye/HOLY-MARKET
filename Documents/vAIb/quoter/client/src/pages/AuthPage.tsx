import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export default function AuthPage() {
  const supabaseClient = useSupabaseClient()
  const [redirectUrl, setRedirectUrl] = useState('')
  
  useEffect(() => {
    // Dynamic redirect URL based on environment
    const getRedirectUrl = () => {
      const origin = window.location.origin
      return `${origin}/auth/callback`
    }
    
    setRedirectUrl(getRedirectUrl())
  }, [])
  
  return (
    <div className="max-w-md mx-auto py-12">
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
        <h3 className="text-xl font-bold text-purple-800 mb-2">🔐 Welcome to Lobola Calculator</h3>
        <p className="text-purple-600 text-sm">
          Sign in to save your calculations and access premium features
        </p>
      </div>
      
      <Auth
        supabaseClient={supabaseClient}
        appearance={{ 
          theme: ThemeSupa,
          style: {
            button: { 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white',
              borderRadius: '8px',
              fontSize: '16px',
              padding: '12px 24px'
            },
            anchor: { color: '#667eea' },
            container: { borderRadius: '12px' },
          }
        }}
        providers={['google']}
        redirectTo={redirectUrl}
        showLinks={true}
        view="sign_in"
        localization={{
          variables: {
            sign_in: {
              social_provider_text: 'Continue with {{provider}}',
              button_label: 'Sign in with {{provider}}',
            },
          },
        }}
      />
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-gray-100 text-xs text-gray-600 rounded border">
          <strong>🔧 Debug Info:</strong><br/>
          Origin: {window.location.origin}<br/>
          Redirect URL: {redirectUrl}
        </div>
      )}
    </div>
  )
}
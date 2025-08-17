# Supabase Configuration Fixes

## Issues to Fix:

### 1. Email Authentication Not Sending Emails
**Problem**: Email sign-up not sending authentication emails

**Solution**:
1. Go to your Supabase Dashboard
2. Navigate to Authentication → Settings
3. Under "SMTP Settings", configure your email provider:
   - **SMTP Host**: smtp.gmail.com (if using Gmail)
   - **SMTP Port**: 587
   - **SMTP User**: your-email@gmail.com
   - **SMTP Pass**: your-app-password
   - **Sender Name**: Your App Name
   - **Sender Email**: your-email@gmail.com

### 2. Google Sign-In "Requested Path is Invalid"
**Problem**: Google OAuth redirect URL not configured

**Solution**:
1. Go to Supabase Dashboard → Authentication → Providers
2. Click on "Google" provider
3. Add these URLs to "Redirect URLs":
   ```
   https://your-vercel-domain.vercel.app/auth/callback
   https://your-vercel-domain.vercel.app/
   http://localhost:5173/auth/callback
   http://localhost:5173/
   ```

### 3. Cookie Domain Issues
**Problem**: Cookie "__cf_bm" rejected for invalid domain

**Solution**:
1. Go to Supabase Dashboard → Settings → API
2. Under "Site URL", set:
   ```
   https://your-vercel-domain.vercel.app
   ```
3. Under "Redirect URLs", add:
   ```
   https://your-vercel-domain.vercel.app/auth/callback
   https://your-vercel-domain.vercel.app/
   ```

### 4. Update AuthPage Component
The AuthPage needs to handle the redirect properly:

```tsx
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function AuthPage() {
  const supabaseClient = useSupabaseClient()
  
  return (
    <div className="max-w-md mx-auto py-12">
      <Auth
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
        redirectTo={`${window.location.origin}/auth/callback`}
        showLinks={true}
        view="sign_in"
      />
    </div>
  )
}
```

### 5. Add Auth Callback Route
Create a new route to handle authentication callbacks:

```tsx
// client/src/pages/auth-callback.tsx
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'wouter'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function AuthCallback() {
  const location = useLocation()
  const navigate = useNavigate()
  const supabase = useSupabaseClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession()
      if (error) {
        console.error('Auth callback error:', error)
        navigate('/auth')
      } else {
        navigate('/')
      }
    }

    handleAuthCallback()
  }, [supabase, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we complete your sign-in.</p>
      </div>
    </div>
  )
}
```

### 6. Update App.tsx Routes
Add the auth callback route:

```tsx
// In App.tsx, add this route:
<Route path="/auth/callback" component={AuthCallback} />
```

## Environment Variables Check
Make sure these are set in Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Testing Steps
1. Configure Supabase settings as above
2. Deploy the updated code
3. Test email sign-up
4. Test Google sign-in
5. Check browser console for errors 
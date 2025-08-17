import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Alert, AlertDescription } from '../components/ui/alert'
import { 
  Shield, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Loader2
} from 'lucide-react'

export default function ScoutAccessPage() {
  const [, setLocation] = useLocation()
  const [token, setToken] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(false)

  // Check for token in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlToken = urlParams.get('token')
    if (urlToken) {
      setToken(urlToken)
      validateToken(urlToken)
    }
  }, [])

  const validateToken = async (accessToken: string) => {
    setIsValidating(true)
    setError('')

    try {
      const response = await fetch('/api/scout/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: accessToken }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsValid(true)
        // Store token in localStorage for session management
        localStorage.setItem('scoutAccessToken', accessToken)
        localStorage.setItem('scoutId', data.scoutId.toString())
        localStorage.setItem('scoutName', data.scoutName)
        
        // Redirect to scout evaluation after a short delay
        setTimeout(() => {
          setLocation('/scout-evaluation')
        }, 2000)
      } else {
        setError(data.message || 'Invalid access token')
        setIsValid(false)
      }
    } catch (err) {
      setError('Failed to validate token. Please try again.')
      setIsValid(false)
    } finally {
      setIsValidating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token.trim()) {
      validateToken(token.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Scout Access</CardTitle>
          <CardDescription>
            Enter your access token to evaluate players
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isValid ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Access Granted!</h3>
              <p className="text-gray-600 mb-4">
                Redirecting you to the evaluation system...
              </p>
              <Loader2 className="w-6 h-6 text-green-600 mx-auto animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="token">Access Token</Label>
                <Input
                  id="token"
                  type="text"
                  placeholder="Enter your access token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  disabled={isValidating}
                  className="mt-1"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isValidating || !token.trim()}
              >
                {isValidating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Access Evaluation System
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t">
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">
                <strong>Professional Scout Access Only</strong>
              </p>
              <p>
                This system is restricted to verified professional scouts. 
                If you need access, please contact the platform administrator.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
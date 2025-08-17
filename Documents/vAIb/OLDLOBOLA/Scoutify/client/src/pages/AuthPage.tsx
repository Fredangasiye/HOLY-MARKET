import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { authService } from '../lib/auth'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Checkbox } from '../components/ui/checkbox'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Badge } from '../components/ui/badge'
import { 
  Eye, 
  EyeOff, 
  Shield, 
  User, 
  Users, 
  Calendar,
  Mail,
  Lock,
  ArrowLeft
} from 'lucide-react'
import { playerProfileSchema, scoutProfileSchema } from '../../shared/schema'
import { z } from 'zod'

type AuthMode = 'signin' | 'signup'
type UserType = 'player' | 'scout'

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  userType: z.enum(['player', 'scout']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [userType, setUserType] = useState<UserType>('player')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [age, setAge] = useState<number | null>(null)
  const [parentConsent, setParentConsent] = useState(false)
  const [parentEmail, setParentEmail] = useState('')

  const [, setLocation] = useLocation()

  // Check if already authenticated
  useEffect(() => {
    const storedSession = authService.getStoredSession()
    if (storedSession) {
      setLocation('/dashboard')
    }
  }, [setLocation])

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const validatedData = signInSchema.parse({ email, password })
      
      const response = await authService.signIn({
        email: validatedData.email,
        password: validatedData.password,
      })

      // Store session
      authService.storeSession(response.session, response.user)
      
      setSuccess('Successfully signed in!')
      setTimeout(() => {
        setLocation('/dashboard')
      }, 1000)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    try {
      const validatedData = signUpSchema.parse({ 
        email, 
        password, 
        confirmPassword, 
        firstName,
        lastName,
        userType 
      })

      // Check age for players
      if (userType === 'player' && age !== null && age < 18 && !parentConsent) {
        setError('Parental consent is required for players under 18')
        return
      }

      const response = await authService.signUp({
        email: validatedData.email,
        password: validatedData.password,
        firstName,
        lastName,
        userType: validatedData.userType,
      })

      // Store session if provided
      if (response.session && response.user) {
        authService.storeSession(response.session, response.user)
      }

      setSuccess(response.message || 'Account created successfully! You can now sign in.')
      setMode('signin')
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'signin' 
              ? 'Sign in to your Scoutlify account' 
              : 'Join thousands of players and scouts across South Africa'
            }
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </CardTitle>
            <CardDescription className="text-center">
              {mode === 'signin' 
                ? 'Access your dashboard and manage your profile' 
                : 'Choose your role and start your journey'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {mode === 'signup' && (
              <div className="mb-6">
                <Label className="text-sm font-medium">I am a:</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    type="button"
                    variant={userType === 'player' ? 'default' : 'outline'}
                    onClick={() => setUserType('player')}
                    className="flex-1"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Player
                  </Button>
                  <Button
                    type="button"
                    variant={userType === 'scout' ? 'default' : 'outline'}
                    onClick={() => setUserType('scout')}
                    className="flex-1"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Scout
                  </Button>
                </div>
              </div>
            )}

            <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="pl-10 pr-10"
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        className="pl-10 pr-10"
                        placeholder="Confirm your password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {userType === 'player' && (
                    <>
                      <div>
                        <Label htmlFor="birthDate">Date of Birth</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="birthDate"
                            name="birthDate"
                            type="date"
                            required
                            className="pl-10"
                            onChange={(e) => {
                              const age = calculateAge(e.target.value)
                              setAge(age)
                            }}
                          />
                        </div>
                      </div>

                      {age !== null && age < 18 && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-blue-900">
                                Parental Consent Required
                              </h4>
                              <p className="text-sm text-blue-700 mt-1">
                                Since you're under 18, we need parental consent to comply with POPIA regulations.
                              </p>
                              
                              <div className="mt-3 space-y-3">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="parentConsent"
                                    checked={parentConsent}
                                    onCheckedChange={(checked) => setParentConsent(checked as boolean)}
                                  />
                                  <Label htmlFor="parentConsent" className="text-sm">
                                    I have parental/guardian consent
                                  </Label>
                                </div>

                                {parentConsent && (
                                  <div>
                                    <Label htmlFor="parentEmail" className="text-sm">
                                      Parent/Guardian Email
                                    </Label>
                                    <Input
                                      id="parentEmail"
                                      type="email"
                                      value={parentEmail}
                                      onChange={(e) => setParentEmail(e.target.value)}
                                      placeholder="parent@example.com"
                                      className="mt-1"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold"
                  onClick={() => {
                    setMode(mode === 'signin' ? 'signup' : 'signin')
                    setError(null)
                    setSuccess(null)
                  }}
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </Button>
              </p>
            </div>

            {mode === 'signin' && (
              <div className="mt-4 text-center">
                <Button variant="link" className="text-sm">
                  Forgot your password?
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Badge variant="outline" className="mb-2">
            <Shield className="w-3 h-3 mr-1" />
            POPIA Compliant
          </Badge>
          <p className="text-xs text-gray-500">
            Your data is protected under South Africa's Protection of Personal Information Act
          </p>
        </div>
      </div>
    </div>
  )
}
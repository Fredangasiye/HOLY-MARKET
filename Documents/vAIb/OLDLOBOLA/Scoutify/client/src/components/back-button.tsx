import { Link, useLocation } from 'wouter'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  fallbackPath?: string
  className?: string
  children?: React.ReactNode
}

export default function BackButton({ 
  fallbackPath = '/', 
  className = '',
  children = 'Back'
}: BackButtonProps) {
  const [, setLocation] = useLocation()

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      setLocation(fallbackPath)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleBack}
      className={`border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
} 
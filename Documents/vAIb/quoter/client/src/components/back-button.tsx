import { useLocation } from 'wouter'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  fallbackPath?: string
}

export default function BackButton({ fallbackPath = '/' }: BackButtonProps) {
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
      className="border-white/20 text-white hover:bg-white/10"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  )
} 
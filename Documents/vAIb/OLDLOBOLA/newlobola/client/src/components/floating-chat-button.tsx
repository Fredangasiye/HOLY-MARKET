import { useState } from 'react'
import { Button } from './ui/button'
import { UserCheck } from 'lucide-react'
import UncleScout from './uncle-scout'

export default function FloatingChatButton() {
  const [isUncleScoutOpen, setIsUncleScoutOpen] = useState(false)

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
                          <Button
                    onClick={() => setIsUncleScoutOpen(true)}
                    size="lg"
                    className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    <UserCheck className="w-6 h-6" />
                  </Button>
      </div>

      {/* Uncle Scout Chat */}
      <UncleScout 
        isOpen={isUncleScoutOpen} 
        onClose={() => setIsUncleScoutOpen(false)} 
      />
    </>
  )
} 
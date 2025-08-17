import { useState, useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Award,
  Gift,
  CheckCircle,
  X,
  Bell,
  TrendingUp,
  Users,
  Video,
  MessageSquare,
  Heart,
  Crown,
  Medal
} from 'lucide-react'

interface Notification {
  id: string
  type: 'achievement' | 'quest' | 'level-up' | 'ranking' | 'scout' | 'general'
  title: string
  message: string
  icon: string
  color: string
  timestamp: Date
  isRead: boolean
  action?: {
    label: string
    onClick: () => void
  }
  reward?: {
    type: 'xp' | 'coins' | 'badge' | 'title'
    value: number | string
  }
}

interface NotificationSystemProps {
  notifications: Notification[]
  onMarkAsRead: (notificationId: string) => void
  onDismiss: (notificationId: string) => void
  onAction: (notificationId: string, action: () => void) => void
}

export default function NotificationSystem({
  notifications,
  onMarkAsRead,
  onDismiss,
  onAction
}: NotificationSystemProps) {
  const [showAll, setShowAll] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'achievement' | 'quest'>('all')

  const unreadCount = notifications.filter(n => !n.isRead).length
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead
    if (filter === 'achievement') return notification.type === 'achievement'
    if (filter === 'quest') return notification.type === 'quest'
    return true
  })

  const displayedNotifications = showAll ? filteredNotifications : filteredNotifications.slice(0, 5)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-5 h-5 text-yellow-400" />
      case 'quest':
        return <Target className="w-5 h-5 text-green-400" />
      case 'level-up':
        return <TrendingUp className="w-5 h-5 text-blue-400" />
      case 'ranking':
        return <Crown className="w-5 h-5 text-purple-400" />
      case 'scout':
        return <Star className="w-5 h-5 text-orange-400" />
      default:
        return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'border-yellow-500 bg-yellow-500/10'
      case 'quest':
        return 'border-green-500 bg-green-500/10'
      case 'level-up':
        return 'border-blue-500 bg-blue-500/10'
      case 'ranking':
        return 'border-purple-500 bg-purple-500/10'
      case 'scout':
        return 'border-orange-500 bg-orange-500/10'
      default:
        return 'border-gray-500 bg-gray-500/10'
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bell className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">Notifications</h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-300'}
          >
            All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter('unread')}
            className={filter === 'unread' ? 'bg-blue-600 text-white' : 'text-gray-300'}
          >
            Unread
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter('achievement')}
            className={filter === 'achievement' ? 'bg-blue-600 text-white' : 'text-gray-300'}
          >
            Achievements
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter('quest')}
            className={filter === 'quest' ? 'bg-blue-600 text-white' : 'text-gray-300'}
          >
            Quests
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {displayedNotifications.length > 0 ? (
          displayedNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`relative transition-all duration-200 hover:scale-105 ${
                notification.isRead 
                  ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' 
                  : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600 shadow-lg'
              } ${getNotificationColor(notification.type)}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-semibold ${notification.isRead ? 'text-gray-300' : 'text-white'}`}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                        
                        {notification.reward && (
                          <div className="flex items-center space-x-2">
                            <Award className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs text-yellow-400">
                              +{notification.reward.value}
                              {notification.reward.type === 'xp' && ' XP'}
                              {notification.reward.type === 'coins' && ' Coins'}
                              {notification.reward.type === 'badge' && ' Badge'}
                              {notification.reward.type === 'title' && ' Title'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {notification.action && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onAction(notification.id, notification.action!.onClick)}
                        className="text-xs"
                      >
                        {notification.action.label}
                      </Button>
                    )}
                    
                    {!notification.isRead && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onMarkAsRead(notification.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDismiss(notification.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">No notifications</h3>
            <p className="text-gray-500">
              {filter === 'unread' 
                ? 'All caught up! No unread notifications.'
                : filter === 'achievement'
                ? 'No achievement notifications yet.'
                : filter === 'quest'
                ? 'No quest notifications yet.'
                : 'You\'re all caught up!'
              }
            </p>
          </div>
        )}
      </div>

      {/* Show More/Less Button */}
      {filteredNotifications.length > 5 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            {showAll ? 'Show Less' : `Show ${filteredNotifications.length - 5} More`}
          </Button>
        </div>
      )}

      {/* Quick Actions */}
      {unreadCount > 0 && (
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              notifications.forEach(n => {
                if (!n.isRead) onMarkAsRead(n.id)
              })
            }}
            className="text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All as Read
          </Button>
        </div>
      )}
    </div>
  )
}

// Toast notification component for real-time notifications
export function ToastNotification({ notification }: { notification: Notification }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <Card className={`w-80 shadow-2xl border-2 ${getNotificationColor(notification.type)}`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white mb-1">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                {notification.message}
              </p>
              
              {notification.reward && (
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400 font-semibold">
                    +{notification.reward.value}
                    {notification.reward.type === 'xp' && ' XP'}
                    {notification.reward.type === 'coins' && ' Coins'}
                    {notification.reward.type === 'badge' && ' Badge'}
                    {notification.reward.type === 'title' && ' Title'}
                  </span>
                </div>
              )}
            </div>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to get notification color (used by both components)
function getNotificationColor(type: string) {
  switch (type) {
    case 'achievement':
      return 'border-yellow-500 bg-yellow-500/10'
    case 'quest':
      return 'border-green-500 bg-green-500/10'
    case 'level-up':
      return 'border-blue-500 bg-blue-500/10'
    case 'ranking':
      return 'border-purple-500 bg-purple-500/10'
    case 'scout':
      return 'border-orange-500 bg-orange-500/10'
    default:
      return 'border-gray-500 bg-gray-500/10'
  }
} 
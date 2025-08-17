import { QueryClientProvider } from '@tanstack/react-query'
import { Router, Route, Switch } from 'wouter'
import AppLayout from './pages/app-layout'
import AuthPage from './pages/AuthPage'
import AuthCallback from './pages/auth-callback'
import NotFound from './pages/not-found'
import PricingPage from './pages/pricing'
import Dashboard from './pages/dashboard'
import PlayerDashboard from './pages/player-dashboard'
import UploadVideo from './pages/upload-video'
import EventsPage from './pages/events'
import RankingsPage from './pages/rankings'
import TrainingPage from './pages/training'
import ScoutEvaluationPage from './pages/scout-evaluation'
import ScoutAccessPage from './pages/scout-access'
import AdminDashboard from './pages/admin-dashboard'
import VideoWallPage from './pages/video-wall'
import FloatingChatButton from './components/floating-chat-button'
import { queryClient } from './lib/queryClient'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" component={AppLayout} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/auth/callback" component={AuthCallback} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/player-dashboard" component={PlayerDashboard} />
          <Route path="/upload-video" component={UploadVideo} />
          <Route path="/events" component={EventsPage} />
          <Route path="/rankings" component={RankingsPage} />
          <Route path="/training" component={TrainingPage} />
          <Route path="/video-wall" component={VideoWallPage} />
          <Route path="/scout-evaluation" component={ScoutEvaluationPage} />
          <Route path="/scout-access" component={ScoutAccessPage} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/pricing" component={PricingPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      
      {/* Floating Chat Button - Available on all pages */}
      <FloatingChatButton />
    </QueryClientProvider>
  )
}

export default App
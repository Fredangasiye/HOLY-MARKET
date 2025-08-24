import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Index() {
  const { authState } = useAuth();

  if (authState.isLoading) {
    return <LoadingSpinner />;
  }

  // Always redirect to main app - authentication will be handled per feature
  return <Redirect href="/(tabs)" />;
}

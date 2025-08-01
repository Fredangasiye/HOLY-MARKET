import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Index() {
  const { authState } = useAuth();

  if (authState.isLoading) {
    return <LoadingSpinner />;
  }

  if (authState.isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
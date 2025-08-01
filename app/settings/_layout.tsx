import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="help" />
      <Stack.Screen name="legal" />
    </Stack>
  );
}
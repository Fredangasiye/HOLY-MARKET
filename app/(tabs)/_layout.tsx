import { Tabs } from 'expo-router';
import { Chrome as Home, Building2, User, Info } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.gray400,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.gray200,
          paddingBottom: Platform.OS === 'ios' ? 34 : 8,
          paddingTop: 12,
          height: Platform.OS === 'ios' ? 98 : 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 4 : 0,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'ios' ? 4 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color, focused }) => (
            <Home size={size} color={focused ? Colors.secondary : Colors.gray400} />
          ),
        }}
      />
      <Tabs.Screen
        name="company"
        options={{
          title: 'My Company',
          tabBarIcon: ({ size, color, focused }) => (
            <Building2 size={size} color={focused ? Colors.secondary : Colors.gray400} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ size, color, focused }) => (
            <Info size={size} color={focused ? Colors.secondary : Colors.gray400} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color, focused }) => (
            <User size={size} color={focused ? Colors.secondary : Colors.gray400} />
          ),
        }}
      />
      <Tabs.Screen
        name="company-profile"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
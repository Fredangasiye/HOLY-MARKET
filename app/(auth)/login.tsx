import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, authState } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    const success = await login(email, password);
    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.logoContainer}>
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>CBN</Text>
              </View>
              <Text style={styles.appName}>Christian Business Network</Text>
              <Text style={styles.tagline}>Connecting Faith-Based Businesses</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to connect with Christian businesses</Text>

              <Input
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                required
              />

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                error={errors.password}
                required
              />

              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={authState.isLoading}
                style={styles.loginButton}
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Don't have an account?{' '}
                  <Link href="/(auth)/register" style={styles.link}>
                    Sign Up
                  </Link>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
    minHeight: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.white,
  },
  appName: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.gray900,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  tagline: {
    fontSize: Typography.sm,
    color: Colors.gray700,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.gray900,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sm,
    color: Colors.gray600,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  loginButton: {
    marginTop: Spacing.md,
  },
  footer: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: Typography.sm,
    color: Colors.gray600,
  },
  link: {
    color: Colors.secondary,
    fontWeight: '600',
  },
});
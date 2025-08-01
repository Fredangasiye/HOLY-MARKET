import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';
import { formatPhoneNumber, displayPhoneNumber } from '@/constants/SouthAfricaData';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showStrongPassword, setShowStrongPassword] = useState(false);
  const { register, authState } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{9,10}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid South African phone number';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    
    // Show first error in order
    const errorFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'];
    const firstError = errorFields.find(field => newErrors[field]);
    if (firstError) {
      Alert.alert('Required Field Missing', newErrors[firstError]);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&';
    const length = 12;
    let password = '';
    
    // Ensure at least one of each required character type
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // Uppercase
    password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // Lowercase
    password += '0123456789'[Math.floor(Math.random() * 10)]; // Number
    password += '@$!%*?&'[Math.floor(Math.random() * 7)]; // Special character
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    setFormData(prev => ({ 
      ...prev, 
      password: password,
      confirmPassword: password 
    }));
    setShowStrongPassword(true);
    
    // Clear any existing password errors
    if (errors.password || errors.confirmPassword) {
      setErrors(prev => ({ 
        ...prev, 
        password: '', 
        confirmPassword: '' 
      }));
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    // Format phone number with South African country code
    const formattedData = {
      ...formData,
      phone: formatPhoneNumber(formData.phone),
      whatsappNumber: formatPhoneNumber(formData.phone), // Use same number for WhatsApp
    };

    const success = await register(formattedData);
    if (success) {
      router.replace('/(auth)/business-choice');
    } else {
      Alert.alert('Registration Failed', 'Please try again.');
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (field === 'password' && showStrongPassword) {
      setShowStrongPassword(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    // Only allow numbers and basic formatting
    const cleaned = value.replace(/[^\d]/g, '');
    updateField('phone', cleaned);
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
              <Text style={styles.appName}>Join Our Community</Text>
              <Text style={styles.tagline}>Connect with Christian businesses in South Africa</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Setup your profile to get started</Text>

              <View style={styles.row}>
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChangeText={(text) => updateField('firstName', text)}
                  placeholder="John"
                  error={errors.firstName}
                  required
                  containerStyle={styles.halfWidth}
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChangeText={(text) => updateField('lastName', text)}
                  placeholder="Smith"
                  error={errors.lastName}
                  required
                  containerStyle={styles.halfWidth}
                />
              </View>

              <Input
                label="Email Address"
                value={formData.email}
                onChangeText={(text) => updateField('email', text)}
                placeholder="john@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                required
              />

              <View style={styles.phoneContainer}>
                <Text style={styles.phoneLabel}>
                  Phone Number <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.phoneInputContainer}>
                  <View style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>+27</Text>
                  </View>
                  <Input
                    value={formData.phone}
                    onChangeText={handlePhoneChange}
                    placeholder="82 123 4567"
                    keyboardType="phone-pad"
                    error={errors.phone}
                    containerStyle={styles.phoneInput}
                  />
                </View>
              </View>

              <View style={styles.passwordSection}>
                <Input
                  label="Password"
                  value={formData.password}
                  onChangeText={(text) => updateField('password', text)}
                  placeholder="Create a strong password"
                  secureTextEntry={!showStrongPassword}
                  error={errors.password}
                  required
                />
                <Button
                  title="Generate Strong Password"
                  onPress={generateStrongPassword}
                  variant="outline"
                  size="sm"
                  style={styles.generateButton}
                />
              </View>

              <Input
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(text) => updateField('confirmPassword', text)}
                placeholder="Confirm your password"
                secureTextEntry={!showStrongPassword}
                error={errors.confirmPassword}
                required
              />

              <Button
                title="Create Account"
                onPress={handleRegister}
                loading={authState.isLoading}
                style={styles.registerButton}
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Already have an account?{' '}
                  <Link href="/(auth)/login" style={styles.link}>
                    Sign In
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
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    fontSize: Typography.lg,
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
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  phoneContainer: {
    marginBottom: Spacing.md,
  },
  phoneLabel: {
    fontSize: Typography.sm,
    fontWeight: '600',
    color: Colors.gray700,
    marginBottom: Spacing.xs,
  },
  required: {
    color: Colors.error,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  countryCode: {
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.gray50,
    marginRight: Spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: Typography.base,
    color: Colors.gray700,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    marginBottom: 0,
  },
  passwordSection: {
    marginBottom: Spacing.md,
  },
  generateButton: {
    marginTop: Spacing.sm,
    alignSelf: 'flex-start',
  },
  registerButton: {
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
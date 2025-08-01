import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Save } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';
import { formatPhoneNumber, displayPhoneNumber } from '@/constants/SouthAfricaData';

export default function AccountSettingsScreen() {
  const { authState, updateUser } = useAuth();
  const { user, company } = authState;

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone ? displayPhoneNumber(user.phone) : '',
    businessName: user?.businessName || '',
    website: user?.website || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const updatedData = {
      ...formData,
      phone: formatPhoneNumber(formData.phone),
    };

    const success = await updateUser(updatedData);
    setIsLoading(false);

    if (success) {
      Alert.alert('Success', 'Your account information has been updated.');
      router.back();
    } else {
      Alert.alert('Error', 'Failed to update account information. Please try again.');
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^\d]/g, '');
    updateField('phone', cleaned);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.gray900} />
        </TouchableOpacity>
        <Text style={styles.title}>Account Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          style={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
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
          </View>

          {company && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Business Information</Text>
              
              <Input
                label="Business Name"
                value={formData.businessName}
                onChangeText={(text) => updateField('businessName', text)}
                placeholder="Your Business Name"
              />

              <Input
                label="Website"
                value={formData.website}
                onChangeText={(text) => updateField('website', text)}
                placeholder="https://yourwebsite.com"
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Actions</Text>
            
            <Button
              title="Change Password"
              onPress={() => Alert.alert('Coming Soon', 'Password change functionality will be available soon.')}
              variant="outline"
              style={styles.actionButton}
            />

            <Button
              title="Delete Account"
              onPress={() => Alert.alert('Delete Account', 'This feature will be available soon.')}
              variant="outline"
              style={[styles.actionButton, styles.deleteButton]}
            />
          </View>

          <Button
            title="Save Changes"
            onPress={handleSave}
            loading={isLoading}
            style={styles.saveButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.gray900,
  },
  placeholder: {
    width: 40,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginBottom: Spacing.md,
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
  actionButton: {
    marginBottom: Spacing.md,
  },
  deleteButton: {
    borderColor: Colors.error,
  },
  saveButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
});
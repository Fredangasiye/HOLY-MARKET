import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Building2, Search, Plus } from 'lucide-react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';

export default function BusinessChoiceScreen() {
  const handleAddBusiness = () => {
    router.push('/(auth)/setup-company');
  };

  const handleBrowseBusiness = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>CBN</Text>
            </View>
            <Text style={styles.title}>Welcome to CBN!</Text>
            <Text style={styles.subtitle}>
              What would you like to do first?
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionCard}
              onPress={handleAddBusiness}
              activeOpacity={0.8}
            >
              <View style={styles.optionIcon}>
                <Plus size={32} color={Colors.white} />
              </View>
              <Text style={styles.optionTitle}>Add My Business</Text>
              <Text style={styles.optionDescription}>
                Register your Christian business and connect with the community
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionCard}
              onPress={handleBrowseBusiness}
              activeOpacity={0.8}
            >
              <View style={[styles.optionIcon, styles.browseIcon]}>
                <Search size={32} color={Colors.white} />
              </View>
              <Text style={styles.optionTitle}>Browse Businesses</Text>
              <Text style={styles.optionDescription}>
                Discover and connect with Christian-led businesses in South Africa
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              You can always add your business later from your profile
            </Text>
          </View>
        </View>
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
    backgroundColor: Colors.secondary,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  title: {
    fontSize: Typography['3xl'],
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.base,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: Spacing.lg,
  },
  optionCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
  },
  optionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  browseIcon: {
    backgroundColor: Colors.goldAccent,
    shadowColor: Colors.goldAccent,
  },
  optionTitle: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: Typography.base,
    color: Colors.gray600,
    lineHeight: 24,
    textAlign: 'center',
  },
  footer: {
    marginTop: Spacing.xxl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: Typography.sm,
    color: Colors.white,
    opacity: 0.8,
    textAlign: 'center',
  },
});
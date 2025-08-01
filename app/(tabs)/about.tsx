import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Users, Shield, Globe } from 'lucide-react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Christian Business Network</Text>
          <Text style={styles.subtitle}>Connecting Faith-Based Businesses Worldwide</Text>
        </View>

        {/* Mission Section */}
        <View style={styles.missionSection}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.missionText}>
            To create a thriving community where Christian-led businesses can connect, 
            collaborate, and grow together while sharing their faith-based values.
          </Text>
          
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <Heart size={32} color={Colors.error} />
              <Text style={styles.featureTitle}>Faith-Centered</Text>
              <Text style={styles.featureText}>All businesses share Christian values</Text>
            </View>
            <View style={styles.featureItem}>
              <Users size={32} color={Colors.secondary} />
              <Text style={styles.featureTitle}>Community</Text>
              <Text style={styles.featureText}>Building lasting partnerships</Text>
            </View>
            <View style={styles.featureItem}>
              <Shield size={32} color={Colors.success} />
              <Text style={styles.featureTitle}>Verified</Text>
              <Text style={styles.featureText}>All businesses are vetted</Text>
            </View>
            <View style={styles.featureItem}>
              <Globe size={32} color={Colors.goldAccent} />
              <Text style={styles.featureTitle}>Global</Text>
              <Text style={styles.featureText}>Worldwide network</Text>
            </View>
          </View>
        </View>

        {/* Vision Section */}
        <View style={styles.visionSection}>
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.visionText}>
            We envision a world where Christian businesses thrive together, creating economic opportunities 
            while advancing Kingdom values. Through our platform, we aim to build bridges between 
            faith-driven entrepreneurs and customers who value integrity, excellence, and service.
          </Text>
        </View>

        {/* Values Section */}
        <View style={styles.valuesSection}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          
          <View style={styles.valueItem}>
            <Text style={styles.valueTitle}>Integrity</Text>
            <Text style={styles.valueText}>
              We operate with honesty and transparency in all our dealings, reflecting Christ's character 
              in our business practices.
            </Text>
          </View>

          <View style={styles.valueItem}>
            <Text style={styles.valueTitle}>Excellence</Text>
            <Text style={styles.valueText}>
              We strive for the highest quality in everything we do, honoring God through our work 
              and service to others.
            </Text>
          </View>

          <View style={styles.valueItem}>
            <Text style={styles.valueTitle}>Community</Text>
            <Text style={styles.valueText}>
              We believe in the power of Christian fellowship and mutual support to strengthen 
              businesses and advance God's kingdom.
            </Text>
          </View>

          <View style={styles.valueItem}>
            <Text style={styles.valueTitle}>Service</Text>
            <Text style={styles.valueText}>
              We are committed to serving others with love and compassion, following Christ's 
              example of servant leadership.
            </Text>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Get In Touch</Text>
          <Text style={styles.contactText}>
            Have questions or want to learn more about our community? We'd love to hear from you.
          </Text>
          <Text style={styles.contactEmail}>support@thriveapp.co.za</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    backgroundColor: Colors.secondary,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: Typography['3xl'],
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sm,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  missionSection: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.gray900,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  missionText: {
    fontSize: Typography.base,
    color: Colors.gray700,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  featureTitle: {
    fontSize: Typography.base,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  featureText: {
    fontSize: Typography.sm,
    color: Colors.gray600,
    textAlign: 'center',
  },
  visionSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  visionText: {
    fontSize: Typography.base,
    color: Colors.gray700,
    lineHeight: 24,
    textAlign: 'center',
  },
  valuesSection: {
    padding: Spacing.lg,
  },
  valueItem: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  valueTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: Spacing.sm,
  },
  valueText: {
    fontSize: Typography.base,
    color: Colors.gray700,
    lineHeight: 22,
  },
  contactSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  contactText: {
    fontSize: Typography.base,
    color: Colors.gray700,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  contactEmail: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
});
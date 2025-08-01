import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Phone, Mail, MessageCircle, Globe, Star, EggFried as Verified, Building2, Users, Heart } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useCompanies, useAuth } from '@/hooks/useAuth';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';

export default function CompanyProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { companies } = useCompanies();
  const { authState } = useAuth();
  const { company: userCompany } = authState;
  
  const company = companies.find(c => c.id === id);

  if (!company) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Company not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleWhatsApp = () => {
    // Check if user has an approved business
    if (!userCompany || userCompany.status !== 'approved') {
      Alert.alert(
        'Business Required',
        'You must add your business to access this function.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (company.whatsappNumber) {
      const message = encodeURIComponent(`Hi, I found your business ${company.businessName} on the Christian Business Network app. I'd like to learn more about your services.`);
      Linking.openURL(`https://wa.me/${company.whatsappNumber.replace(/[^\d]/g, '')}?text=${message}`);
    }
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${company.email}`);
  };

  const handlePhone = () => {
    Linking.openURL(`tel:${company.phone}`);
  };

  const handleWebsite = () => {
    if (company.website) {
      Linking.openURL(company.website);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Business Profile</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.profileSection}>
            {company.profileImage ? (
              <Image source={{ uri: company.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>
                  {company.businessName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.verifiedBadge}>
              <Verified size={16} color={Colors.white} />
            </View>
          </View>
          
          <View style={styles.heroInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.businessName}>
                {company.businessName}
              </Text>
              <View style={styles.ratingContainer}>
                <Star size={14} color={Colors.warning} fill={Colors.warning} />
                <Text style={styles.rating}>4.8</Text>
              </View>
            </View>
            
            <Text style={styles.ownerName}>{company.ownerName}</Text>
            
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>
                {company.category}
              </Text>
            </View>
            
            <View style={styles.locationContainer}>
              <MapPin size={14} color={Colors.gray500} />
              <Text style={styles.location}>{company.location}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.contactButtons}>
            {company.whatsappNumber && (
              <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
                <MessageCircle size={18} color={Colors.white} />
                <Text style={styles.whatsappText}>WhatsApp</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
              <Mail size={18} color={Colors.secondary} />
              <Text style={styles.contactButtonText}>Email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactButton} onPress={handlePhone}>
              <Phone size={18} color={Colors.secondary} />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
            
            {company.website && (
              <TouchableOpacity style={styles.contactButton} onPress={handleWebsite}>
                <Globe size={18} color={Colors.secondary} />
                <Text style={styles.contactButtonText}>Website</Text>
              </TouchableOpacity>
            )}
          </View>
        </Card>

        {/* About Section */}
        <Card style={styles.aboutCard}>
          <Text style={styles.sectionTitle}>About Our Business</Text>
          <Text style={styles.description}>{company.description}</Text>
        </Card>

        {/* Business Details */}
        <Card style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Business Information</Text>
          
          <View style={styles.detailRow}>
            <Building2 size={20} color={Colors.gray600} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>{company.category}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <MapPin size={20} color={Colors.gray600} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{company.location}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Mail size={20} color={Colors.gray600} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Email</Text>
              <TouchableOpacity onPress={handleEmail}>
                <Text style={[styles.detailValue, styles.linkText]}>{company.email}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Phone size={20} color={Colors.gray600} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Phone</Text>
              <TouchableOpacity onPress={handlePhone}>
                <Text style={[styles.detailValue, styles.linkText]}>{company.phone}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {company.website && (
            <View style={styles.detailRow}>
              <Globe size={20} color={Colors.gray600} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Website</Text>
                <TouchableOpacity onPress={handleWebsite}>
                  <Text style={[styles.detailValue, styles.linkText]}>{company.website}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Card>

        {/* Faith Information */}
        <Card style={styles.faithCard}>
          <View style={styles.faithHeader}>
            <Heart size={20} color={Colors.error} />
            <Text style={styles.sectionTitle}>Faith Information</Text>
          </View>
          
          <View style={styles.faithRow}>
            <Text style={styles.faithLabel}>Church:</Text>
            <Text style={styles.faithValue}>{company.churchName}</Text>
          </View>
          
          <View style={styles.faithRow}>
            <Text style={styles.faithLabel}>Christian for:</Text>
            <Text style={styles.faithValue}>{company.christianDuration}</Text>
          </View>
          
          {company.churchInvolvement && (
            <View style={styles.faithRow}>
              <Text style={styles.faithLabel}>Church Role:</Text>
              <Text style={styles.faithValue}>{company.churchInvolvement}</Text>
            </View>
          )}
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Member since {company.createdAt.toLocaleDateString()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.secondary,
    paddingTop: Spacing.xl,
  },
  headerBackButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.white,
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    fontSize: Typography.lg,
    color: Colors.gray600,
    marginBottom: Spacing.lg,
  },
  backButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  backButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  heroSection: {
    backgroundColor: Colors.secondary,
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.xl,
    borderWidth: 4,
    borderColor: Colors.white,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Colors.white,
  },
  placeholderText: {
    fontSize: Typography['3xl'],
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  heroInfo: {
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
    flexWrap: 'wrap',
  },
  businessName: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginRight: Spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  rating: {
    fontSize: Typography.sm,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: Spacing.xs,
  },
  ownerName: {
    fontSize: Typography.base,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: Spacing.md,
  },
  categoryContainer: {
    marginBottom: Spacing.sm,
  },
  category: {
    fontSize: Typography.sm,
    color: Colors.secondary,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: Typography.sm,
    color: Colors.white,
    opacity: 0.9,
    marginLeft: Spacing.xs,
    fontWeight: '500',
  },
  actionsCard: {
    margin: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginBottom: Spacing.md,
  },
  contactButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  whatsappButton: {
    backgroundColor: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  whatsappText: {
    color: Colors.white,
    fontSize: Typography.sm,
    fontWeight: '600',
    marginLeft: Spacing.xs,
  },
  contactButton: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.secondary + '30',
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactButtonText: {
    color: Colors.secondary,
    fontSize: Typography.sm,
    fontWeight: '600',
    marginLeft: Spacing.xs,
  },
  aboutCard: {
    margin: Spacing.lg,
    marginTop: 0,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.base,
    color: Colors.gray700,
    lineHeight: 24,
  },
  detailsCard: {
    margin: Spacing.lg,
    marginTop: 0,
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  detailContent: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  detailLabel: {
    fontSize: Typography.xs,
    color: Colors.gray500,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  detailValue: {
    fontSize: Typography.base,
    color: Colors.gray900,
  },
  linkText: {
    color: Colors.secondary,
    textDecorationLine: 'underline',
  },
  faithCard: {
    margin: Spacing.lg,
    marginTop: 0,
    marginBottom: Spacing.md,
  },
  faithHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  faithRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  faithLabel: {
    fontSize: Typography.sm,
    color: Colors.gray600,
    fontWeight: '600',
    width: 100,
  },
  faithValue: {
    fontSize: Typography.sm,
    color: Colors.gray900,
    flex: 1,
  },
  footer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: Typography.xs,
    color: Colors.gray500,
  },
});
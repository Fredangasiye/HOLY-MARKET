import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Building2, MapPin, Phone, Mail, MessageCircle, Globe, Clock, CreditCard as Edit } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';

export default function CompanyScreen() {
  const { authState } = useAuth();
  const { company } = authState;

  if (!company) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Building2 size={64} color={Colors.gray400} />
          <Text style={styles.emptyTitle}>No Company Profile</Text>
          <Text style={styles.emptyText}>
            You haven't set up your company profile yet. Create one to showcase your business to the community.
          </Text>
          <Button
            title="Setup Company Profile"
            onPress={() => router.push('/(auth)/setup-company')}
            style={styles.setupButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleWhatsApp = () => {
    if (company.whatsappNumber) {
      const message = encodeURIComponent(`Hi, I found your business ${company.businessName} on the Christian Business Network app.`);
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

  const getStatusColor = () => {
    switch (company.status) {
      case 'approved':
        return Colors.success;
      case 'pending':
        return Colors.warning;
      case 'rejected':
        return Colors.error;
      default:
        return Colors.gray400;
    }
  };

  const getStatusText = () => {
    switch (company.status) {
      case 'approved':
        return 'Approved & Live';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Needs Revision';
      default:
        return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Company</Text>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color={Colors.secondary} />
          </TouchableOpacity>
        </View>

        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            {company.profileImage ? (
              <Image source={{ uri: company.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>
                  {company.businessName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.profileInfo}>
              <Text style={styles.businessName}>{company.businessName}</Text>
              <Text style={styles.ownerName}>{company.ownerName}</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                <Text style={[styles.statusText, { color: getStatusColor() }]}>
                  {getStatusText()}
                </Text>
              </View>
            </View>
          </View>

          {company.status === 'pending' && (
            <View style={styles.pendingNotice}>
              <Clock size={16} color={Colors.warning} />
              <Text style={styles.pendingText}>
                Your profile is under review. You'll receive an email notification once it's approved.
              </Text>
            </View>
          )}
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Business Information</Text>
          
          <View style={styles.infoRow}>
            <Building2 size={20} color={Colors.gray600} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>{company.category}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MapPin size={20} color={Colors.gray600} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{company.location}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Mail size={20} color={Colors.gray600} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <TouchableOpacity onPress={handleEmail}>
                <Text style={[styles.infoValue, styles.linkText]}>{company.email}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Phone size={20} color={Colors.gray600} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <TouchableOpacity onPress={handlePhone}>
                <Text style={[styles.infoValue, styles.linkText]}>{company.phone}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {company.whatsappNumber && (
            <View style={styles.infoRow}>
              <MessageCircle size={20} color={Colors.success} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>WhatsApp</Text>
                <TouchableOpacity onPress={handleWhatsApp}>
                  <Text style={[styles.infoValue, styles.linkText]}>{company.whatsappNumber}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {company.website && (
            <View style={styles.infoRow}>
              <Globe size={20} color={Colors.gray600} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Website</Text>
                <TouchableOpacity onPress={handleWebsite}>
                  <Text style={[styles.infoValue, styles.linkText]}>{company.website}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Card>

        <Card style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>About Our Business</Text>
          <Text style={styles.description}>{company.description}</Text>
        </Card>

        <Card style={styles.faithCard}>
          <Text style={styles.sectionTitle}>Faith Information</Text>
          
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

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Profile created on {company.createdAt.toLocaleDateString()}
          </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  title: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.gray900,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyTitle: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.base,
    color: Colors.gray600,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  setupButton: {
    minWidth: 200,
  },
  profileCard: {
    margin: Spacing.lg,
    marginBottom: Spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.md,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  placeholderText: {
    fontSize: Typography['3xl'],
    fontWeight: 'bold',
    color: Colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginBottom: Spacing.xs,
  },
  ownerName: {
    fontSize: Typography.base,
    color: Colors.gray600,
    marginBottom: Spacing.sm,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  statusText: {
    fontSize: Typography.sm,
    fontWeight: '600',
  },
  pendingNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning + '20',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  pendingText: {
    fontSize: Typography.sm,
    color: Colors.warning,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  infoCard: {
    margin: Spacing.lg,
    marginTop: 0,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  infoContent: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  infoLabel: {
    fontSize: Typography.xs,
    color: Colors.gray500,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  infoValue: {
    fontSize: Typography.base,
    color: Colors.gray900,
  },
  linkText: {
    color: Colors.secondary,
    textDecorationLine: 'underline',
  },
  descriptionCard: {
    margin: Spacing.lg,
    marginTop: 0,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.base,
    color: Colors.gray700,
    lineHeight: 24,
  },
  faithCard: {
    margin: Spacing.lg,
    marginTop: 0,
    marginBottom: Spacing.md,
  },
  faithRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
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
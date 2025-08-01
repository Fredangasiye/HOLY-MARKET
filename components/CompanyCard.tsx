import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Company } from '@/types';
import { Colors, BorderRadius, Spacing, Typography } from '@/constants/Colors';

interface CompanyCardProps {
  company: Company;
  onPress?: () => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          {company.profileImage ? (
            <Image source={{ uri: company.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>
                {company.businessName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        
        {/* Business Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.businessName} numberOfLines={2}>
            {company.businessName}
          </Text>
          <Text style={styles.category} numberOfLines={1}>
            {company.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.gray100,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  imageContainer: {
    marginBottom: Spacing.sm,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.gray200,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.gray200,
  },
  placeholderText: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.white,
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  businessName: {
    fontSize: Typography.base,
    fontWeight: 'bold',
    color: Colors.gray900,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  category: {
    fontSize: Typography.sm,
    color: Colors.secondary,
    backgroundColor: Colors.secondary + '15',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
});
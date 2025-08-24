import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Plus, Search, X } from 'lucide-react-native';
import { CompanyCard } from '@/components/CompanyCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useCompanies } from '@/hooks/useAuth';
import { Company } from '@/types';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';

export default function HomeScreen() {
  const { companies, isLoading } = useCompanies();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  // Fuzzy matching function
  const fuzzyMatch = (text: string, query: string): boolean => {
    if (!query) return true;
    
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    // Direct substring match
    if (textLower.includes(queryLower)) return true;
    
    // Fuzzy character matching
    let queryIndex = 0;
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === queryLower.length;
  };

  // Filter companies based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCompanies(companies.slice(0, 6));
      return;
    }

    const filtered = companies.filter(company => {
      return (
        fuzzyMatch(company.businessName, searchQuery) ||
        fuzzyMatch(company.category, searchQuery) ||
        fuzzyMatch(company.description, searchQuery) ||
        fuzzyMatch(company.location, searchQuery) ||
        fuzzyMatch(company.ownerName, searchQuery)
      );
    });

    setFilteredCompanies(filtered);
  }, [searchQuery, companies]);

  const handleAddBusiness = () => {
    router.push('/(auth)/setup-company');
  };

  const handleCompanyPress = (companyId: string) => {
    router.push({
      pathname: '/(tabs)/company-profile',
      params: { id: companyId }
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appTitle}>Christian Business Network</Text>
          <Text style={styles.subtitle}>Connecting Faith-Based Businesses in South Africa</Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color={Colors.gray400} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search businesses, categories, or locations..."
                placeholderTextColor={Colors.gray400}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                  <X size={20} color={Colors.gray400} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Featured Companies */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? `Search Results (${filteredCompanies.length})` : 'Featured Businesses'}
            </Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddBusiness}>
              <Plus size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
          
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <LoadingSpinner color={Colors.white} />
            </View>
          ) : filteredCompanies.length > 0 ? (
            <View style={styles.companiesGrid}>
              {filteredCompanies.map(company => (
                <View key={company.id} style={styles.companyCardWrapper}>
                  <CompanyCard 
                    company={company} 
                    onPress={() => handleCompanyPress(company.id)}
                  />
                </View>
              ))}
            </View>
          ) : searchQuery ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsTitle}>No businesses found</Text>
              <Text style={styles.noResultsText}>
                Try adjusting your search terms or browse all businesses
              </Text>
              <TouchableOpacity onPress={clearSearch} style={styles.clearSearchButton}>
                <Text style={styles.clearSearchText}>Clear Search</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsTitle}>No businesses available</Text>
              <Text style={styles.noResultsText}>
                Be the first to add your business to our community
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    backgroundColor: Colors.secondary,
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  welcomeText: {
    fontSize: Typography.base,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
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
    marginBottom: Spacing.xl,
  },
  searchSection: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  searchContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.base,
    color: Colors.gray900,
    paddingVertical: Spacing.sm,
  },
  clearButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  featuredSection: {
    padding: Spacing.lg,
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.white,
    flex: 1,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: '#32CD32',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  companiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  companyCardWrapper: {
    width: '48%',
    marginBottom: Spacing.md,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  noResultsTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: Typography.base,
    color: Colors.white,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  clearSearchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  clearSearchText: {
    color: Colors.white,
    fontSize: Typography.base,
    fontWeight: '600',
  },
});
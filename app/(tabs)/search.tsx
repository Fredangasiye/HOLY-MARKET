import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Search, Filter, X } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CompanyCard } from '@/components/CompanyCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useCompanies } from '@/hooks/useAuth';
import { BusinessCategory } from '@/types';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';
import { SOUTH_AFRICAN_CITIES } from '@/constants/SouthAfricaData';

const businessCategories: BusinessCategory[] = [
  'Retail', 'Consulting', 'Technology', 'Healthcare', 'Education',
  'Construction', 'Food & Beverage', 'Professional Services',
  'Manufacturing', 'Transportation', 'Real Estate', 'Finance',
  'Media & Marketing', 'Other'
];

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | ''>('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { companies, isLoading, getCompanies } = useCompanies();

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    const filters = {
      keyword: keyword.trim(),
      category: selectedCategory || undefined,
      location: selectedCity || undefined,
    };
    getCompanies(filters);
  };

  const clearFilters = () => {
    setKeyword('');
    setSelectedCategory('');
    setSelectedCity('');
    getCompanies();
  };

  const hasActiveFilters = keyword || selectedCategory || selectedCity;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Businesses</Text>
        <Text style={styles.subtitle}>Find Christian-led businesses in South Africa</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.gray400} style={styles.searchIcon} />
          <Input
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Search businesses, services, or keywords..."
            style={styles.searchInput}
            containerStyle={styles.searchInputWrapper}
          />
        </View>

        <View style={styles.searchActions}>
          <TouchableOpacity
            style={[styles.filterButton, showFilters && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color={showFilters ? Colors.white : Colors.secondary} />
          </TouchableOpacity>
          <Button
            title="Search"
            onPress={handleSearch}
            style={styles.searchButton}
          />
        </View>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterRow}>
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Category</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={setSelectedCategory}
                  style={styles.picker}
                  mode="dropdown"
                >
                  <Picker.Item label="All Categories" value="" />
                  {businessCategories.map(category => (
                    <Picker.Item key={category} label={category} value={category} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>City</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedCity}
                  onValueChange={setSelectedCity}
                  style={styles.picker}
                  mode="dropdown"
                >
                  <Picker.Item label="All Cities" value="" />
                  {SOUTH_AFRICAN_CITIES.map(city => (
                    <Picker.Item key={city} label={city} value={city} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          {hasActiveFilters && (
            <TouchableOpacity style={styles.clearFilters} onPress={clearFilters}>
              <X size={16} color={Colors.gray600} />
              <Text style={styles.clearFiltersText}>Clear Filters</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {isLoading ? 'Searching...' : `${companies.length} businesses found`}
          </Text>
        </View>

        {isLoading ? (
          <LoadingSpinner />
        ) : companies.length > 0 ? (
          <View style={styles.companiesContainer}>
            {companies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </View>
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsTitle}>No businesses found</Text>
            <Text style={styles.noResultsText}>
              Try adjusting your search criteria or browse all businesses
            </Text>
            <Button
              title="View All Businesses"
              onPress={() => {
                clearFilters();
                handleSearch();
              }}
              variant="outline"
              style={styles.viewAllButton}
            />
          </View>
        )}
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
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  title: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.gray900,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sm,
    color: Colors.gray600,
  },
  searchContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  searchInputContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  searchIcon: {
    position: 'absolute',
    left: Spacing.md,
    top: 22,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 48,
  },
  searchInputWrapper: {
    marginBottom: 0,
  },
  searchActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  filterButtonActive: {
    backgroundColor: Colors.secondary,
  },
  searchButton: {
    flex: 1,
  },
  filtersContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterItem: {
    flex: 1,
    marginRight: Spacing.md,
  },
  filterLabel: {
    fontSize: Typography.sm,
    fontWeight: '600',
    color: Colors.gray700,
    marginBottom: Spacing.xs,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    minHeight: 44,
  },
  picker: {
    height: 44,
    color: Colors.gray900,
  },
  clearFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  clearFiltersText: {
    fontSize: Typography.sm,
    color: Colors.gray600,
    marginLeft: Spacing.xs,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  resultsCount: {
    fontSize: Typography.sm,
    color: Colors.gray600,
    fontWeight: '500',
  },
  companiesContainer: {
    padding: Spacing.lg,
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  noResultsTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginBottom: Spacing.sm,
  },
  noResultsText: {
    fontSize: Typography.sm,
    color: Colors.gray600,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  viewAllButton: {
    minWidth: 200,
  },
});
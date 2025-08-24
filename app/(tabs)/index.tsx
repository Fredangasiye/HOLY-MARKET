import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Plus, Search, X, Moon, Sun } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { CompanyCard } from '@/components/CompanyCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useCompanies, useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/contexts/ToastContext';
import { Company } from '@/types';

export default function HomeScreen() {
  const { companies, isLoading } = useCompanies();
  const { authState } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  // DEBUG: This should show a bright red text if code is updating
  console.log('HomeScreen rendered with theme:', theme.isDark ? 'dark' : 'light');

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
    if (!authState.isAuthenticated) {
      showToast('Sign in required to add business');
      setTimeout(() => {
        router.push({ 
          pathname: '/(auth)/login', 
          params: { redirect: 'setup-company' } 
        });
      }, 1000);
      return;
    }

    router.push('/(auth)/setup-company');
  };

  const handleCompanyPress = (companyId: string) => {
    router.push({
      pathname: '/(tabs)/company-profile',
      params: { id: companyId },
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleThemeToggle = () => {
    toggleTheme();
    Haptics.selectionAsync();
    showToast('Theme toggled!');
  };

  const handleFABPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    showToast('FAB Clicked 🚀');
    handleAddBusiness();
  };

  return (
    <LinearGradient
      colors={
        theme.isDark
          ? ["#0D0D0D", "#1A202C"]
          : ["#2B6CB0", "#63B3ED"]
      }
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>HOLY-MARKET</Text>
            <Text style={[styles.subtitle, { color: theme.colors.text, opacity: 0.8 }]}>Christian Business Community</Text>
            
            {/* DEBUG: This should be very visible if code is updating */}
            <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>
              🔥 DEBUG: CODE IS UPDATING! 🔥
            </Text>
            
            {/* Theme Toggle */}
            <TouchableOpacity
              style={[styles.themeToggle, { backgroundColor: theme.colors.secondary }]}
              onPress={handleThemeToggle}
            >
              {theme.isDark ? <Sun size={24} color={theme.colors.text} /> : <Moon size={24} color={theme.colors.text} />}
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={[styles.searchBar, { backgroundColor: theme.colors.card }]}>
              <Search size={20} color={theme.colors.text} style={styles.searchIcon} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search businesses, categories, locations..."
                placeholderTextColor={theme.colors.text + '80'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                  <X size={20} color={theme.colors.text} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Featured Businesses Section */}
          <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                {searchQuery ? `Search Results (${filteredCompanies.length})` : 'Featured Businesses'}
              </Text>
            </View>
            
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <LoadingSpinner />
              </View>
            ) : filteredCompanies.length > 0 ? (
              <View style={styles.companiesGrid}>
                {filteredCompanies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    onPress={() => handleCompanyPress(company.id)}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={[styles.noResultsTitle, { color: theme.colors.text }]}>No businesses available</Text>
                <Text style={[styles.noResultsText, { color: theme.colors.text, opacity: 0.7 }]}>
                  Be the first to add your business to our community
                </Text>
                <TouchableOpacity style={[styles.addFirstButton, { backgroundColor: theme.colors.primary }]} onPress={handleAddBusiness}>
                  <Plus size={20} color="white" />
                  <Text style={styles.addFirstButtonText}>Add Your Business</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>

        {/* FAB */}
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={handleFABPress}
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 8,
    marginLeft: 8,
  },
  section: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
    flex: 1,
    minHeight: '70%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
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
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: 280,
  },
  addFirstButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addFirstButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});

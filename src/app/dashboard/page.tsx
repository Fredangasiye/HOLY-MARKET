"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Building2, 
  User, 
  Info, 
  Plus, 
  Search, 
  X, 
  Moon, 
  Sun,
  MapPin,
  Phone,
  Mail,
  Globe
} from "lucide-react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import Link from "next/link";

// Mock data for companies
const mockCompanies = [
  {
    id: "1",
    businessName: "Graceful Gardens",
    category: "Landscaping",
    description: "Christian-owned landscaping services with a focus on sustainable practices and community beautification.",
    location: "Cape Town",
    ownerName: "John Smith",
    phone: "+27 21 555 0123",
    email: "john@gracefulgardens.co.za",
    website: "www.gracefulgardens.co.za",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
  },
  {
    id: "2", 
    businessName: "Faithful Finance",
    category: "Financial Services",
    description: "Biblical financial planning and advice for individuals and families seeking God-centered money management.",
    location: "Johannesburg",
    ownerName: "Sarah Johnson",
    phone: "+27 11 555 0456",
    email: "sarah@faithfulfinance.co.za",
    website: "www.faithfulfinance.co.za",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    businessName: "Blessed Bakery",
    category: "Food & Beverage", 
    description: "Fresh baked goods made with love and the finest ingredients, serving our community with joy.",
    location: "Durban",
    ownerName: "Michael Brown",
    phone: "+27 31 555 0789",
    email: "michael@blessedbakery.co.za",
    website: "www.blessedbakery.co.za",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop"
  },
  {
    id: "4",
    businessName: "Divine Design",
    category: "Web Development",
    description: "Christian web development and digital solutions that reflect your values and mission.",
    location: "Pretoria",
    ownerName: "David Wilson",
    phone: "+27 12 555 0321",
    email: "david@divinedesign.co.za",
    website: "www.divinedesign.co.za",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
  },
  {
    id: "5",
    businessName: "Kingdom Consulting",
    category: "Business Consulting",
    description: "Strategic business consulting with Christian principles and ethical business practices.",
    location: "Port Elizabeth",
    ownerName: "Lisa Davis",
    phone: "+27 41 555 0654",
    email: "lisa@kingdomconsulting.co.za",
    website: "www.kingdomconsulting.co.za",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop"
  },
  {
    id: "6",
    businessName: "Mercy Medical",
    category: "Healthcare",
    description: "Compassionate healthcare services provided with Christian values and professional excellence.",
    location: "Bloemfontein",
    ownerName: "Dr. Robert Taylor",
    phone: "+27 51 555 0987",
    email: "robert@mercymedical.co.za",
    website: "www.mercymedical.co.za",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
  }
];

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = ["All", "Landscaping", "Financial Services", "Food & Beverage", "Web Development", "Business Consulting", "Healthcare"];

  // Fuzzy matching function
  const fuzzyMatch = (text: string, query: string): boolean => {
    if (!query) return true;
    
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    if (textLower.includes(queryLower)) return true;
    
    let queryIndex = 0;
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === queryLower.length;
  };

  // Filter companies based on search query and category
  useEffect(() => {
    let filtered = mockCompanies;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(company => company.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(company => {
        return (
          fuzzyMatch(company.businessName, searchQuery) ||
          fuzzyMatch(company.category, searchQuery) ||
          fuzzyMatch(company.description, searchQuery) ||
          fuzzyMatch(company.location, searchQuery) ||
          fuzzyMatch(company.ownerName, searchQuery)
        );
      });
    }

    setFilteredCompanies(filtered);
  }, [searchQuery, selectedCategory]);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.success(theme === "dark" ? "Switched to light mode" : "Switched to dark mode");
  };

  const handleFABPress = () => {
    toast.success("Add your business to HOLY-MARKET! 🚀");
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">✝️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">HOLY-MARKET</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Christian Business Community</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <Link
                href="/profile"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Christian businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Category Filter */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredCompanies.length} {filteredCompanies.length === 1 ? "business" : "businesses"} found
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="card bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={company.image}
                    alt={`${company.businessName} business`}
                    className="w-full h-48 object-cover rounded-t-lg"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                      {company.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {company.businessName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {company.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      {company.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <User className="w-4 h-4 mr-2" />
                      {company.ownerName}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <a
                        href={`tel:${company.phone}`}
                        className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label={`Call ${company.businessName}`}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${company.email}`}
                        className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label={`Email ${company.businessName}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label={`Visit ${company.businessName} website`}
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    </div>
                    
                    <Link
                      href={`/company/${company.id}`}
                      className="btn btn-primary text-sm px-4 py-2"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No businesses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search terms or category filter
            </p>
            <button
              onClick={clearSearch}
              className="btn btn-secondary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </main>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleFABPress}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50"
        aria-label="Add your business"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
        <div className="flex justify-around py-2">
          <Link
            href="/dashboard"
            className="flex flex-col items-center p-2 text-blue-600 dark:text-blue-400"
            aria-label="Dashboard"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/search"
            className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
            <span className="text-xs mt-1">Search</span>
          </Link>
          <Link
            href="/company"
            className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="Companies"
          >
            <Building2 className="w-6 h-6" />
            <span className="text-xs mt-1">Companies</span>
          </Link>
          <Link
            href="/about"
            className="flex flex-col items-center p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="About"
          >
            <Info className="w-6 h-6" />
            <span className="text-xs mt-1">About</span>
          </Link>
        </div>
      </nav>
    </div>
  );
} 
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  Building2, 
  User, 
  Info, 
  Plus, 
  Search, 
  X, 
  Moon, 
  Sun 
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
    description: "Christian-owned landscaping services",
    location: "Cape Town",
    ownerName: "John Smith",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
  },
  {
    id: "2", 
    businessName: "Faithful Finance",
    category: "Financial Services",
    description: "Biblical financial planning and advice",
    location: "Johannesburg",
    ownerName: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400"
  },
  {
    id: "3",
    businessName: "Blessed Bakery",
    category: "Food & Beverage", 
    description: "Fresh baked goods with love",
    location: "Durban",
    ownerName: "Michael Brown",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"
  }
];

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);

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

  // Filter companies based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCompanies(mockCompanies);
      return;
    }

    const filtered = mockCompanies.filter(company => {
      return (
        fuzzyMatch(company.businessName, searchQuery) ||
        fuzzyMatch(company.category, searchQuery) ||
        fuzzyMatch(company.description, searchQuery) ||
        fuzzyMatch(company.location, searchQuery) ||
        fuzzyMatch(company.ownerName, searchQuery)
      );
    });

    setFilteredCompanies(filtered);
  }, [searchQuery]);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.success("Theme toggled!");
  };

  const handleFABPress = () => {
    toast.success("FAB Clicked 🚀");
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative p-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">HOLY-MARKET</h1>
          <p className="text-lg text-gray-300">Christian Business Community</p>
        </motion.div>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="absolute top-12 right-6 p-3 bg-yellow-500 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          {theme === "dark" ? (
            <Sun size={24} className="text-gray-800" />
          ) : (
            <Moon size={24} className="text-gray-800" />
          )}
        </button>
      </header>

      {/* Search Bar */}
      <div className="px-6 pb-6">
        <div className="relative bg-white dark:bg-gray-800 rounded-full shadow-lg">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search businesses, categories, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />
          {searchQuery.length > 0 && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-900 rounded-t-3xl p-6 min-h-[70vh]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {searchQuery ? `Search Results (${filteredCompanies.length})` : "Featured Businesses"}
          </h2>
        </div>

        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <motion.div
                key={company.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                  <img
                    src={company.image}
                    alt={company.businessName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {company.businessName}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                    {company.category}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {company.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    📍 {company.location} • 👤 {company.ownerName}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No businesses available
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Be the first to add your business to our community
            </p>
            <button
              onClick={handleFABPress}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Add Your Business
            </button>
          </div>
        )}
      </main>

      {/* Navigation Tabs */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
        <div className="flex justify-around py-2">
          <Link
            href="/dashboard"
            className="flex flex-col items-center py-2 px-4 text-blue-600 dark:text-blue-400"
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/company"
            className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <Building2 size={24} />
            <span className="text-xs mt-1">My Company</span>
          </Link>
          <Link
            href="/about"
            className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <Info size={24} />
            <span className="text-xs mt-1">About</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleFABPress}
        className="fixed bottom-20 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg"
      >
        <Plus size={24} className="text-white" />
      </motion.button>
    </div>
  );
} 
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Church, 
  Building2, 
  User, 
  Info, 
  Plus, 
  Search, 
  X, 
  Moon, 
  Sun,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Settings
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
    phone: "+27 123 456 789",
    whatsappNumber: "+27 123 456 789",
    email: "info@gracefulgardens.co.za",
    website: "www.gracefulgardens.co.za",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
  },
  {
    id: "2", 
    businessName: "Faithful Finance",
    category: "Financial Services",
    description: "Biblical financial planning and advice",
    location: "Johannesburg",
    ownerName: "Sarah Johnson",
    phone: "+27 987 654 321",
    whatsappNumber: "+27 987 654 321",
    email: "contact@faithfulfinance.co.za",
    website: "www.faithfulfinance.co.za",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400"
  },
  {
    id: "3",
    businessName: "Blessed Bakery",
    category: "Food & Beverage", 
    description: "Fresh baked goods with love",
    location: "Durban",
    ownerName: "Michael Brown",
    phone: "+27 555 123 456",
    whatsappNumber: "+27 555 123 456",
    email: "orders@blessedbakery.co.za",
    website: "www.blessedbakery.co.za",
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

  const handleWhatsApp = (company: any) => {
    if (company.whatsappNumber) {
      const message = encodeURIComponent(`Hi, I found your business ${company.businessName} on the Christian Business Network app. I'd like to learn more about your services.`);
      window.open(`https://wa.me/${company.whatsappNumber.replace(/[^\d]/g, '')}?text=${message}`, '_blank');
    }
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handlePhone = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  const handleWebsite = (website: string) => {
    if (website) {
      window.open(website.startsWith('http') ? website : `https://${website}`, '_blank');
    }
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
          <h1 className="text-4xl font-display font-bold text-white mb-2">HOLY-MARKET</h1>
          <p className="text-lg text-blue-100">Christian Business Community</p>
        </motion.div>

        {/* Theme Toggle & Settings */}
        <div className="absolute top-12 right-6 flex gap-3">
          <Link
            href="/settings"
            className="p-3 bg-blue-500 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Settings size={24} className="text-white" />
          </Link>
          <button
            onClick={handleThemeToggle}
            className="p-3 bg-yellow-500 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            {theme === "dark" ? (
              <Sun size={24} className="text-gray-800" />
            ) : (
              <Moon size={24} className="text-gray-800" />
            )}
          </button>
        </div>
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
      <main className="flex-1 bg-white dark:bg-gray-900 rounded-t-3xl p-6 min-h-[70vh]">
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
                  <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {company.businessName}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                    {company.category}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {company.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    📍 {company.location} • 👤 {company.ownerName}
                  </p>
                  
                                            {/* Contact Buttons */}
                          <div className="flex gap-3 mt-4">
                            {company.whatsappNumber && (
                              <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleWhatsApp(company)}
                                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                              >
                                <MessageCircle size={16} />
                                WhatsApp
                              </motion.button>
                            )}

                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEmail(company.email)}
                              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              <Mail size={16} />
                              Email
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handlePhone(company.phone)}
                              className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              <Phone size={16} />
                              Call
                            </motion.button>
                          </div>
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
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around py-2">
          <Link
            href="/dashboard"
            className="flex flex-col items-center py-2 px-4 text-blue-600 dark:text-blue-400"
          >
            <Church size={24} />
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

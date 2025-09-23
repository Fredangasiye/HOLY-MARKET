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
  Settings,
  BookOpen,
  Edit,
  Star,
  Users,
  Calendar,
  TrendingUp,
  Award,
  Heart,
  MapPin,
  ExternalLink,
  LogOut,
  ArrowLeft
} from "lucide-react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

// Mock user profile data
const userProfile = {
  id: "user_001",
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+27 123 456 789",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  location: "Cape Town, South Africa",
  memberSince: "January 2023",
  bio: "Passionate Christian entrepreneur dedicated to building businesses that honor God and serve communities.",
  interests: ["Business Development", "Christian Leadership", "Community Service"],
  stats: {
    businessesOwned: 1,
    connections: 47,
    reviews: 23,
    rating: 4.8
  }
};

// Mock business profile data
const userBusiness = {
  id: "business_001",
  businessName: "Graceful Gardens",
  category: "Landscaping",
  description: "Christian-owned landscaping services creating beautiful outdoor spaces with integrity and excellence.",
  location: "Cape Town, South Africa",
  phone: "+27 123 456 789",
  whatsappNumber: "+27 123 456 789",
  email: "info@gracefulgardens.co.za",
  website: "www.gracefulgardens.co.za",
  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
  founded: "2019",
  employees: "5-10",
  services: ["Garden Design", "Landscaping", "Maintenance", "Tree Services"],
  mission: "To create beautiful outdoor spaces that reflect God's creation while serving our community with excellence and integrity.",
  socialMedia: {
    facebook: "https://facebook.com/gracefulgardens",
    instagram: "https://instagram.com/gracefulgardens",
    linkedin: "https://linkedin.com/company/gracefulgardens"
  },
  stats: {
    totalProjects: 156,
    happyCustomers: 142,
    averageRating: 4.9,
    yearsInBusiness: 5
  }
};

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();
  const { user, signOut, loading } = useAuth();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.success("Theme toggled!");
  };

  const handleEditProfile = () => {
    router.push("/add-business");
    toast.success("Redirecting to business form...");
  };

  const handleEditBusiness = () => {
    router.push("/add-business");
    toast.success("Redirecting to business form...");
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully!");
    router.push("/");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-faith-blue via-faith-dark to-faith-gold flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-faith-blue via-faith-dark to-faith-gold">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-faith-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <ArrowLeft className="w-6 h-6 text-faith-blue dark:text-white" />
              </Link>
              <div className="flex items-center space-x-2">
                <Building2 className="w-8 h-8 text-faith-gold" />
                <h1 className="text-2xl font-display font-bold text-faith-blue dark:text-white">
                  Dashboard
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Login Prompt */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-12 border border-white/20"
              >
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-faith-gold/20 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-faith-gold" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    Access Your Dashboard
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Please sign in to access your personal dashboard and manage your business listings.
                  </p>
                </div>

                <div className="space-y-4">
                  <Link href="/auth/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-faith-gold text-faith-blue font-semibold py-4 px-8 rounded-lg hover:bg-faith-gold/80 transition-colors text-lg"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  
                  <Link href="/auth/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-white/10 text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/20 transition-colors text-lg border border-white/20"
                    >
                      Create Account
                    </motion.button>
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-white/60 text-sm">
                    Don't have an account? <Link href="/auth/register" className="text-faith-gold hover:text-faith-gold/80 font-semibold">Create one here</Link>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-white/10 shadow-lg">
          <div className="flex justify-around items-center py-3">
            <Link href="/" className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 flex items-center justify-center">
                <Church size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs text-gray-900 dark:text-blue-400 font-medium">Home</span>
            </Link>
            
            <Link href="/dashboard" className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 flex items-center justify-center">
                <Building2 size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs text-gray-900 dark:text-blue-400 font-medium">Dashboard</span>
            </Link>
            
            <Link href="/about" className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 flex items-center justify-center">
                <Info size={20} className="text-gray-600 dark:text-white" />
              </div>
              <span className="text-xs text-gray-900 dark:text-white font-medium">About</span>
            </Link>
            
            <Link href="/christian-businesses" className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 flex items-center justify-center">
                <User size={20} className="text-gray-600 dark:text-white" />
              </div>
              <span className="text-xs text-gray-900 dark:text-white font-medium">Browse</span>
            </Link>
            
            <Link href="/christian-catalogue" className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 flex items-center justify-center">
                <BookOpen size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs text-gray-900 dark:text-green-400 font-medium">Catalogue</span>
            </Link>
          </div>
        </nav>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-faith-blue via-faith-dark to-faith-gold">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-faith-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Church className="w-6 h-6 text-faith-blue dark:text-white" />
            </Link>
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-faith-gold" />
              <h1 className="text-2xl font-display font-bold text-faith-blue dark:text-white">
                Dashboard
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleThemeToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-faith-gold/20 hover:bg-faith-gold/30 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-faith-gold" />
              ) : (
                <Moon className="w-5 h-5 text-faith-blue" />
              )}
            </motion.button>
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-400" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <section className="py-6 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === "profile"
                  ? "bg-faith-gold text-faith-blue font-semibold"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === "business"
                  ? "bg-faith-gold text-faith-blue font-semibold"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <Building2 className="w-4 h-4" />
              My Business
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Profile Card */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-faith-gold/20 to-faith-blue/20">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-display font-bold text-white mb-2">{user?.name || 'User'}</h2>
                        <p className="text-faith-gold font-medium mb-2">{user?.email || 'user@example.com'}</p>
                        <div className="flex items-center gap-2 text-white/70 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{user?.phone || 'No phone number'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar className="w-4 h-4" />
                          <span>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleEditProfile}
                        className="bg-faith-gold text-faith-blue font-semibold px-4 py-2 rounded-lg hover:bg-faith-gold/80 transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </button>
                    </div>
                    
                    <p className="text-white/80 text-lg leading-relaxed mb-6">
                      {user?.authProvider === 'google' 
                        ? 'Welcome to the Christian business community! Connect with like-minded entrepreneurs and grow your business with Kingdom values.'
                        : 'Passionate Christian entrepreneur dedicated to building businesses that honor God and serve communities.'
                      }
                    </p>
                    
                    {/* Auth Provider */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Account Type</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                          {user?.authProvider === 'google' ? 'Google Account' : 'Email Account'}
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                          Christian Business Member
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-faith-gold mb-1">0</div>
                    <div className="text-white/70 text-sm">Businesses</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-faith-gold mb-1">0</div>
                    <div className="text-white/70 text-sm">Connections</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-faith-gold mb-1">0</div>
                    <div className="text-white/70 text-sm">Reviews</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-faith-gold mb-1">5.0</div>
                    <div className="text-white/70 text-sm">Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "business" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Business Card */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-faith-gold/20 to-faith-blue/20">
                    <img
                      src={userBusiness.image}
                      alt={userBusiness.businessName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-display font-bold text-white mb-2">{userBusiness.businessName}</h2>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{userBusiness.category}</p>
                        <div className="flex items-center gap-2 text-white/70 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{userBusiness.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar className="w-4 h-4" />
                          <span>Founded {userBusiness.founded}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleEditBusiness}
                        className="bg-faith-gold text-faith-blue font-semibold px-4 py-2 rounded-lg hover:bg-faith-gold/80 transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Business
                      </button>
                    </div>
                    
                    <p className="text-white/80 text-lg leading-relaxed mb-6">{userBusiness.description}</p>
                    
                    {/* Services */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Services</h3>
                      <div className="flex flex-wrap gap-2">
                        {userBusiness.services.map((service, index) => (
                          <span key={index} className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Mission */}
                    <div className="bg-white/5 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">Mission Statement</h3>
                      <p className="text-white/90 italic">"{userBusiness.mission}"</p>
                    </div>
                  </div>
                </div>
                
                {/* Business Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-faith-gold mb-1">{userBusiness.stats.totalProjects}</div>
                    <div className="text-white/70 text-sm">Projects</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-faith-gold mb-1">{userBusiness.stats.happyCustomers}</div>
                    <div className="text-white/70 text-sm">Customers</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-faith-gold mb-1">{userBusiness.stats.averageRating}</div>
                    <div className="text-white/70 text-sm">Rating</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-faith-gold mb-1">{userBusiness.stats.yearsInBusiness}</div>
                    <div className="text-white/70 text-sm">Years</div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/70">
                        <Phone className="w-4 h-4" />
                        <span>{userBusiness.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Mail className="w-4 h-4" />
                        <span>{userBusiness.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Globe className="w-4 h-4" />
                        <span>{userBusiness.website}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Social Media</h3>
                    <div className="space-y-2">
                      <a href={userBusiness.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span>Facebook</span>
                      </a>
                      <a href={userBusiness.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span>Instagram</span>
                      </a>
                      <a href={userBusiness.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-white/10 shadow-lg">
        <div className="flex justify-around items-center py-3">
          <Link href="/" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <Church size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs text-gray-900 dark:text-blue-400 font-medium">Home</span>
          </Link>
          
          <Link href="/dashboard" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <Building2 size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs text-gray-900 dark:text-blue-400 font-medium">Dashboard</span>
          </Link>
          
          <Link href="/about" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <Info size={20} className="text-gray-600 dark:text-white" />
            </div>
            <span className="text-xs text-gray-900 dark:text-white font-medium">About</span>
          </Link>
          
          <Link href="/christian-businesses" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <User size={20} className="text-gray-600 dark:text-white" />
            </div>
            <span className="text-xs text-gray-900 dark:text-white font-medium">Browse</span>
          </Link>
          
          <Link href="/christian-catalogue" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <BookOpen size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <span className="text-xs text-gray-900 dark:text-green-400 font-medium">Catalogue</span>
          </Link>
        </div>
        </nav>
      </div>
  );
}

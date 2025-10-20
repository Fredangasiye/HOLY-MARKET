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
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";

// Removed mock data: show real user data or empty state

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();
  const { user, signOut, loading } = useAuth();


  const handleEditProfile = () => {
    router.push("/profile");
    toast.success("Opening profile editor...");
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
        <header className="sticky top-0 z-50 bg-gray-200 dark:bg-gray-300 backdrop-blur-md border-b border-gray-300 dark:border-gray-400">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 rounded-full hover:bg-black/10 transition-colors">
                <ArrowLeft className="w-6 h-6 text-black" />
              </Link>
              <div className="flex items-center space-x-2">
                <Building2 className="w-8 h-8 text-faith-gold" />
                <h1 className="text-2xl font-display font-bold text-black">
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

        <MobileNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-faith-blue via-faith-dark to-faith-gold">
      <Header title="Dashboard" showBackButton={true} backPath="/" />

      {/* Tab Navigation */}
      <section className="py-6 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${activeTab === "profile"
                  ? "bg-faith-gold text-faith-blue font-semibold"
                  : "bg-white/20 text-white hover:bg-white/30"
                }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${activeTab === "business"
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
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-faith-gold/20 to-faith-blue/20" />

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
                        <h2 className="text-3xl font-display font-bold text-white mb-2">Your Business</h2>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">Not set yet</p>
                        <div className="flex items-center gap-2 text-white/70 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>Location not set</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar className="w-4 h-4" />
                          <span>Founded —</span>
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

                    <p className="text-white/80 text-lg leading-relaxed mb-6">No description yet. Use Add Business to create your profile.</p>

                    {/* Services */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Services</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">No services yet</span>
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
                    <div className="text-2xl font-bold text-faith-gold mb-1">0</div>
                    <div className="text-white/70 text-sm">Projects</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-faith-gold mb-1">0</div>
                    <div className="text-white/70 text-sm">Customers</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-faith-gold mb-1">0.0</div>
                    <div className="text-white/70 text-sm">Rating</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-faith-gold mb-1">0</div>
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
                        <span>-</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Mail className="w-4 h-4" />
                        <span>-</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Globe className="w-4 h-4" />
                        <span>-</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Social Media</h3>
                    <div className="space-y-2">
                      <a href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors pointer-events-none opacity-50">
                        <ExternalLink className="w-4 h-4" />
                        <span>Facebook</span>
                      </a>
                      <a href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors pointer-events-none opacity-50">
                        <ExternalLink className="w-4 h-4" />
                        <span>Instagram</span>
                      </a>
                      <a href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors pointer-events-none opacity-50">
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

      <MobileNavigation />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Plus, Sun, Moon, Search, Users, Building2, Heart, Church, User, Info, BookOpen, Settings, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleFABClick = () => {
    router.push("/add-business");
    toast.success("Adding new business...");
    // Add haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.success(`Switched to ${theme === "dark" ? "light" : "dark"} mode`);
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-purple-600/80 dark:bg-purple-700/80 backdrop-blur-md border-b border-purple-500 dark:border-purple-600">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Heart className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-display font-bold text-white">
              HOLY-MARKET
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-green-500/20 hover:bg-green-500/30 transition-colors"
                  >
                    <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </motion.button>
                </Link>
                <motion.button
                  onClick={async () => {
                    await signOut();
                    toast.success("Signed out successfully!");
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors"
                >
                  <LogIn className="w-5 h-5 text-red-600 dark:text-red-400" />
                </motion.button>
              </>
            ) : (
              <Link href="/add-business">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-faith-gold text-faith-blue font-semibold rounded-lg hover:bg-faith-gold/80 transition-colors"
                >
                  Add Your Business
                </motion.button>
              </Link>
            )}
            <Link href="/settings">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
              >
                <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </motion.button>
            </Link>
            <motion.button
              onClick={toggleTheme}
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            HOLY-MARKET ✝️
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A Christian Business Network for Kingdom Entrepreneurs
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/add-business" className="px-8 py-4 bg-purple-600 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
              Add a Business
            </Link>
            <Link href="/christian-businesses" className="px-8 py-4 bg-white/20 text-white font-bold rounded-full hover:scale-105 transition-transform backdrop-blur-sm">
              Browse Christian Businesses
            </Link>
            <Link href="/christian-catalogue" className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
              <BookOpen size={20} />
              Christian Catalogue
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-display font-bold text-white text-center mb-12"
          >
            Explore Our Platform
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <Link href="/christian-businesses" className="group">
              <motion.div 
                className="text-center p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-faith-gold/50 transition-all duration-300 cursor-pointer h-full"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Building2 className="w-16 h-16 text-faith-gold mx-auto mb-6 group-hover:text-faith-gold/80 transition-colors" />
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-faith-gold transition-colors">Christian Businesses</h3>
                <p className="text-white/80 mb-4">Connect with faith-based entrepreneurs and discover businesses that align with your values</p>
                <div className="text-faith-gold text-sm font-medium group-hover:text-faith-gold/80 transition-colors">
                  Explore Businesses →
                </div>
              </motion.div>
            </Link>
            
            <Link href="/community" className="group">
              <motion.div 
                className="text-center p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-faith-gold/50 transition-all duration-300 cursor-pointer h-full"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-16 h-16 text-faith-gold mx-auto mb-6 group-hover:text-faith-gold/80 transition-colors" />
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-faith-gold transition-colors">Community</h3>
                <p className="text-white/80 mb-4">Build meaningful relationships with like-minded Christian entrepreneurs</p>
                <div className="text-faith-gold text-sm font-medium group-hover:text-faith-gold/80 transition-colors">
                  Join Community →
                </div>
              </motion.div>
            </Link>
            
            <Link href="/kingdom-values" className="group">
              <motion.div 
                className="text-center p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-faith-gold/50 transition-all duration-300 cursor-pointer h-full"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-16 h-16 text-faith-gold mx-auto mb-6 group-hover:text-faith-gold/80 transition-colors" />
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-faith-gold transition-colors">Kingdom Values</h3>
                <p className="text-white/80 mb-4">Learn about conducting business with purpose, integrity, and Christian principles</p>
                <div className="text-faith-gold text-sm font-medium group-hover:text-faith-gold/80 transition-colors">
                  Discover Values →
                </div>
              </motion.div>
            </Link>
            
            <Link href="/christian-catalogue" className="group">
              <motion.div 
                className="text-center p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer h-full"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-16 h-16 text-emerald-400 mx-auto mb-6 group-hover:text-emerald-400/80 transition-colors" />
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">Christian Catalogue</h3>
                <p className="text-white/80 mb-4">Access a comprehensive directory of Christian resources, books, and materials</p>
                <div className="text-emerald-400 text-sm font-medium group-hover:text-emerald-400/80 transition-colors">
                  Browse Catalogue →
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Navigation Bar */}
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
              <Building2 size={20} className="text-gray-600 dark:text-white" />
            </div>
            <span className="text-xs text-gray-900 dark:text-white font-medium">Dashboard</span>
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

      {/* FAB */}
      <motion.button
        onClick={handleFABClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-faith-gold flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-50"
      >
        <Plus className="text-faith-blue w-6 h-6" />
      </motion.button>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { Plus, Sun, Moon, Search, Users, Building2, Heart, Church, User, Info, BookOpen, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Redirect to dashboard after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  const handleFABClick = () => {
    toast.success("FAB Clicked 🚀");
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
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-faith-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Heart className="w-8 h-8 text-faith-gold" />
            <h1 className="text-2xl font-display font-bold text-faith-blue dark:text-white">
              HOLY-MARKET
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-2">
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
            <Link href="/dashboard" className="px-8 py-4 bg-faith-gold text-faith-blue font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
              Enter Dashboard
            </Link>
            <Link href="/auth/login" className="px-8 py-4 bg-white/20 text-white font-bold rounded-full hover:scale-105 transition-transform backdrop-blur-sm">
              Login
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <div className="text-center p-6 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm">
              <Building2 className="w-12 h-12 text-faith-gold mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-white mb-2">Christian Businesses</h3>
              <p className="text-white/80">Connect with faith-based entrepreneurs</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm">
              <Users className="w-12 h-12 text-faith-gold mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-white mb-2">Community</h3>
              <p className="text-white/80">Build meaningful relationships</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm">
              <Heart className="w-12 h-12 text-faith-gold mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-white mb-2">Kingdom Values</h3>
              <p className="text-white/80">Business with purpose and integrity</p>
            </div>
            
            <Link href="/christian-catalogue" className="text-center p-6 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
              <BookOpen className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-white mb-2">Christian Catalogue</h3>
              <p className="text-white/80">Directory of Christian resources</p>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-around py-3">
          <Link
            href="/dashboard"
            className="flex flex-col items-center py-2 px-4 text-faith-blue dark:text-faith-gold"
          >
            <Church size={24} />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link
            href="/christian-catalogue"
            className="flex flex-col items-center py-2 px-4 text-emerald-500 hover:text-emerald-600"
          >
            <BookOpen size={24} />
            <span className="text-xs mt-1">Catalogue</span>
          </Link>
          <Link
            href="/about"
            className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-faith-blue dark:text-gray-400 dark:hover:text-faith-gold"
          >
            <Info size={24} />
            <span className="text-xs mt-1">About</span>
          </Link>
          <Link
            href="/auth/login"
            className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-faith-blue dark:text-gray-400 dark:hover:text-faith-gold"
          >
            <User size={24} />
            <span className="text-xs mt-1">Login</span>
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

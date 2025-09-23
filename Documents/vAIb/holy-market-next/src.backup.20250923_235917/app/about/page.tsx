"use client";

import { motion } from "framer-motion";
import { Heart, Users, Shield, Globe, Star, Award, Church, Building2, User, Info, BookOpen } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function AboutPage() {
  const { theme } = useTheme();

  const features = [
    {
      icon: Heart,
      title: "Christian Values",
      description: "Built on biblical principles of integrity, honesty, and service to others."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Connect with like-minded Christian entrepreneurs and business owners."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Safe and secure platform for Christian business networking."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with Christian businesses across South Africa and beyond."
    },
    {
      icon: Star,
      title: "Quality Assurance",
      description: "Verified Christian businesses committed to excellence."
    },
    {
      icon: Award,
      title: "Kingdom Impact",
      description: "Supporting businesses that make a positive difference in the world."
    }
  ];

  const stats = [
    { number: "500+", label: "Christian Businesses" },
    { number: "50+", label: "Cities Covered" },
    { number: "100%", label: "Faith-Based" },
    { number: "24/7", label: "Community Support" }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative p-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">About HOLY-MARKET</h1>
          <p className="text-lg text-blue-100">Christian Business Community</p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="bg-white dark:bg-gray-900 rounded-t-3xl p-6 min-h-[80vh]">
        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              HOLY-MARKET is a Christian business network dedicated to connecting Kingdom entrepreneurs 
              and supporting businesses that operate with biblical values. We believe in the power of 
              community and the impact that Christian businesses can have on society.
            </p>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-blue-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Why Choose HOLY-MARKET?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                    <feature.icon className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Join Our Christian Business Community
            </h2>
            <p className="text-blue-100 mb-6">
              Connect with like-minded entrepreneurs and grow your business with biblical values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/dashboard"
                className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Businesses
              </Link>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-white/10">
        <div className="flex justify-around items-center py-3">
          <Link href="/" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <Church size={20} className="text-white" />
            </div>
            <span className="text-xs text-white font-medium">Home</span>
          </Link>
          
          <Link href="/dashboard" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <Building2 size={20} className="text-white" />
            </div>
            <span className="text-xs text-white font-medium">Dashboard</span>
          </Link>
          
          <Link href="/about" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <Info size={20} className="text-blue-400" />
            </div>
            <span className="text-xs text-blue-400 font-medium">About</span>
          </Link>
          
          <Link href="/christian-businesses" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <span className="text-xs text-white font-medium">Browse Christian Businesses</span>
          </Link>
          
          <Link href="/christian-catalogue" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <BookOpen size={20} className="text-green-400" />
            </div>
            <span className="text-xs text-green-400 font-medium">Catalogue</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

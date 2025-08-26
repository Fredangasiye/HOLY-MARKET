"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowLeft, Clock, Globe, Heart, Users } from "lucide-react";
import Link from "next/link";

export default function ChristianCataloguePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative p-6 pt-12">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="p-2 bg-white/20 rounded-full"
          >
            <ArrowLeft size={24} className="text-white" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Christian Catalogue</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-white rounded-t-3xl p-6 min-h-[80vh]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <BookOpen size={48} className="text-emerald-600" />
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Christian Catalogue
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A comprehensive directory of Christian resources, ministries, and organizations
            </p>
            

          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            <div className="text-center p-6 rounded-xl bg-gray-50">
              <Globe className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Ministries</h3>
              <p className="text-gray-600">Discover Christian ministries and organizations</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gray-50">
              <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Resources</h3>
              <p className="text-gray-600">Find books, podcasts, and educational materials</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gray-50">
              <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Connect with like-minded believers</p>
            </div>
          </motion.div>

          {/* What to Expect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-left max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Ministry Directory</h4>
                  <p className="text-gray-600">Browse and discover Christian ministries, churches, and organizations by category and location.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Resource Library</h4>
                  <p className="text-gray-600">Access a curated collection of Christian books, podcasts, videos, and educational materials.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Event Calendar</h4>
                  <p className="text-gray-600">Stay updated with Christian conferences, workshops, and community events.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Community Reviews</h4>
                  <p className="text-gray-600">Read reviews and recommendations from the Christian community.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-emerald-100 mb-6">
                Be the first to know when the Christian Catalogue launches
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Back to Dashboard
                </Link>
                <Link
                  href="/about"
                  className="px-6 py-3 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after a brief moment
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-600 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-600 rounded-full opacity-30 animate-bounce"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center text-white relative z-10"
      >
        <motion.div
          className="mb-8"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
            HOLY-MARKET
          </h1>
          <div className="text-4xl mb-4">✝️</div>
        </motion.div>
        
        <motion.p 
          className="text-2xl text-gray-300 mb-8 font-light"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Christian Business Community
        </motion.p>
        
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <div className="absolute inset-0 animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
        </div>
        
        <motion.p 
          className="text-gray-400 text-lg"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading your spiritual business journey...
        </motion.p>
      </motion.div>
    </div>
  );
} 
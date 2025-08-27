"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Heart, Users, Shield, Globe, Star, Award } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simulate loading and show features before redirect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Auto-advance through features
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % 3);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    // Redirect to dashboard after showing features
    const redirectTimer = setTimeout(() => {
      router.push("/dashboard");
    }, 8000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  const features = [
    {
      icon: Heart,
      title: "Christian Values",
      description: "Built on biblical principles of integrity and service"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Connect with like-minded Christian entrepreneurs"
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Safe platform for Christian business networking"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white max-w-md mx-auto"
        >
          <motion.div
            className="mb-8"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
              HOLY-MARKET
            </h1>
            <div className="text-3xl md:text-4xl mb-4" role="img" aria-label="cross">✝️</div>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-blue-100 mb-8 font-light"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Christian Business Community
          </motion.p>
          
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-4 border-blue-400 border-t-transparent"></div>
              <div className="absolute inset-0 animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-4 border-purple-400 border-t-transparent" 
                   style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
          </div>
          
          <motion.p 
            className="text-blue-200 text-base md:text-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading your spiritual business journey...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Header */}
      <header className="relative p-4 md:p-6 pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
            HOLY-MARKET
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-4">Christian Business Community</p>
          <div className="text-2xl md:text-3xl mb-6" role="img" aria-label="cross">✝️</div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            HOLY-MARKET is a Christian business network dedicated to connecting Kingdom entrepreneurs 
            and supporting businesses that operate with biblical values. We believe in the power of 
            community and the impact that Christian businesses can have on society.
          </p>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="card bg-white/10 backdrop-blur-sm border-white/20 text-white text-center p-6 md:p-8"
              >
                <div className="mb-4 flex justify-center">
                  <feature.icon className="w-12 h-12 md:w-16 md:h-16 text-blue-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-blue-100 text-sm md:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { number: "500+", label: "Christian Businesses" },
              { number: "50+", label: "Cities Covered" },
              { number: "100%", label: "Faith-Based" },
              { number: "24/7", label: "Community Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-white/10 backdrop-blur-sm border-white/20 rounded-xl"
              >
                <div className="text-2xl md:text-3xl font-bold text-blue-300 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-blue-100">{stat.label}</div>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/dashboard")}
            className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
          >
            Enter HOLY-MARKET
          </motion.button>
          <p className="text-blue-200 mt-4 text-sm">
            Redirecting automatically in a few seconds...
          </p>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-blue-200 text-sm">
        <p>© 2025 HOLY-MARKET. Building Kingdom businesses together.</p>
      </footer>
    </div>
  );
} 
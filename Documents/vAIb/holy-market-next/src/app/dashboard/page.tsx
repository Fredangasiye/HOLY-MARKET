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
  const [hasBusiness, setHasBusiness] = useState(false);
  const [business, setBusiness] = useState<any | null>(null);

  useEffect(() => {
    try {
      setHasBusiness(localStorage.getItem('hasBusiness') === 'true');
      const saved = localStorage.getItem('businessProfile');
      setBusiness(saved ? JSON.parse(saved) : null);
    } catch { }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'business' || tab === 'profile') {
        setActiveTab(tab);
      }
    } catch { }
  }, []);


  const handleEditProfile = () => {
    router.push("/profile");
  };

  const handleEditBusiness = () => {
    router.push("/add-business");
  };

  const handleSignOut = async () => {
    await signOut();
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
        <header className="sticky top-0 z-50 bg-purple-600/80 dark:bg-purple-700/80 backdrop-blur-md border-b border-purple-500 dark:border-purple-600">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <ArrowLeft className="w-6 h-6 text-white" />
              </Link>
              <div className="flex items-center space-x-2">
                <Building2 className="w-8 h-8 text-faith-gold" />
                <h1 className="text-2xl font-display font-bold text-white">
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
    <div className="min-h-screen bg-gradient-to-br from-faith-blue via-faith-dark to-faith-gold overflow-x-hidden">
      <Header title="Dashboard" showBackButton={true} backPath="/" />

      {/* Tab Navigation */}
      <section className="py-6 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center" role="tablist" aria-label="Dashboard tabs">
            <button
              onClick={() => setActiveTab("profile")}
              role="tab"
              aria-selected={activeTab === "profile"}
              className={`flex items-center gap-2 px-7 py-3 rounded-full transition-all duration-300 border-2 ${activeTab === "profile"
                ? "bg-faith-gold text-faith-blue font-semibold border-faith-gold shadow-md"
                : "bg-transparent text-white hover:bg-white/10 border-transparent"
                }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("business")}
              role="tab"
              aria-selected={activeTab === "business"}
              className={`flex items-center gap-2 px-7 py-3 rounded-full transition-all duration-300 border-2 ${activeTab === "business"
                ? "bg-faith-gold text-faith-blue font-semibold border-faith-gold shadow-md"
                : "bg-transparent text-white hover:bg-white/10 border-transparent"
                }`}
            >
              <Building2 className="w-4 h-4" />
              My Business
            </button>
          </div>
        </div>
      </section>

      {/* Hero Welcome Strip */}
      <section className="pt-4">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-faith-gold/30 via-white/10 to-faith-gold/20 dark:from-faith-gold/20 dark:via-white/5 dark:to-faith-gold/10 border border-white/20 shadow-xl">
            <div className="px-5 py-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <User className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-xs">Welcome back</p>
                <h2 className="text-white text-lg font-semibold leading-tight">{user?.name || 'Kingdom Entrepreneur'}</h2>
              </div>
              <div className="hidden sm:flex gap-2">
                <Link
                  href={hasBusiness ? "/dashboard?tab=business" : "/add-business"}
                  className="px-3 py-2 rounded-lg bg-faith-gold text-faith-blue text-sm font-semibold hover:bg-faith-gold/80 transition-colors"
                >
                  {hasBusiness ? 'My Business' : 'Add Business'}
                </Link>
                <Link href="/favorites" className="px-3 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 border border-white/20 transition-colors">Favorites</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 pb-28">
        <div className="container mx-auto px-4">
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Profile Card */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-faith-gold/20 to-faith-blue/20 ring-2 ring-faith-gold/60">
                    {user?.profilePhoto ? (
                      <img 
                        src={user.profilePhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const localPhoto = typeof window !== 'undefined' ? localStorage.getItem('profilePhoto') : null;
                          if (localPhoto) {
                            (e.target as HTMLImageElement).src = localPhoto;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-faith-gold/30 flex items-center justify-center text-white text-2xl font-bold">
                        {(user?.name?.[0] || 'U').toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white">{user?.name || 'User'}</h2>
                        <p className="text-white/80 text-sm md:text-base">{user?.email || 'user@example.com'}</p>
                        <div className="flex items-center gap-2 text-white/70">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm md:text-base">{user?.phone || 'No phone number'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                          <Calendar className="w-4 h-4" />
                          <span className="text-xs md:text-sm">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}</span>
                        </div>
                      </div>

                      {/* Removed top-right edit to keep primary action below info */}
                    </div>
                    {/* Primary Edit Profile action below details (mobile-first) */}
                    <div className="mt-4 mb-4">
                      <button
                        aria-label="Edit Profile"
                        onClick={handleEditProfile}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-faith-gold text-faith-blue font-semibold hover:bg-faith-gold/80 transition-colors shadow-lg hover:shadow-xl"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </button>
                    </div>

                    <p className="text-white/80 text-base leading-relaxed mb-6">
                      {user?.authProvider === 'google'
                        ? 'Welcome to the Christian business community! Connect with like-minded entrepreneurs and grow your business with Kingdom values.'
                        : 'Passionate Christian entrepreneur dedicated to building businesses that honor God and serve communities.'
                      }
                    </p>

                    {/* Account Type */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-white/90 mb-2 tracking-wide">ACCOUNT</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-full text-xs border border-white/20">
                          <User className="w-3.5 h-3.5" /> {user?.authProvider === 'google' ? 'Google Account' : 'Email Account'}
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-full text-xs border border-white/20">
                          <Building2 className="w-3.5 h-3.5" /> Christian Business Member
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Businesses', value: 0, icon: Building2 },
                    { label: 'Connections', value: 0, icon: Users },
                    { label: 'Reviews', value: 0, icon: MessageCircle },
                    { label: 'Rating', value: '5.0', icon: Star }
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <s.icon className="w-4 h-4 text-faith-gold" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-faith-gold leading-none">{s.value}</div>
                        <div className="text-xs text-white/70">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Settings, title: 'Account Settings', href: '/settings/account' },
                    { icon: Building2, title: 'My Businesses', href: '/company' },
                    { icon: Heart, title: 'Favorites', href: '/favorites' },
                    { icon: Info, title: 'Privacy & Security', href: '/settings/privacy' },
                  ].map((item) => (
                    <Link key={item.title} href={item.href} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition">
                      <div className="p-2 bg-blue-100/30 rounded-lg">
                        <item.icon className="text-blue-300" size={18} />
                      </div>
                      <span className="text-sm text-white">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "business" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Business Card */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-faith-gold/20 to-faith-blue/20" />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-display font-bold text-white mb-2">{business?.businessName || 'Your Business'}</h2>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{business?.category || 'Not set yet'}</p>
                        <div className="flex items-center gap-2 text-white/70 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{business?.city && business?.province ? `${business.city}, ${business.province}` : 'Location not set'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar className="w-4 h-4" />
                          <span>Founded {business?.foundedYear || '—'}</span>
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

                    <p className="text-white/80 text-lg leading-relaxed mb-6">{business?.description || 'No description yet. Use Add Business to create your profile.'}</p>

                    {/* Services */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Services</h3>
                      <div className="flex flex-wrap gap-2">
                        {business?.services && business.services.length > 0 ? (
                          business.services.map((s: string) => (
                            <span key={s} className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">{s}</span>
                          ))
                        ) : (
                          <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">No services yet</span>
                        )}
                      </div>
                    </div>

                    {/* Mission */}
                    <div className="bg-white/5 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">Mission Statement</h3>
                      <p className="text-white/90 italic">{business?.missionStatement ? `"${business.missionStatement}"` : '"No mission statement yet"'}</p>
                    </div>
                  </div>
                </div>

                {/* Business Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'Projects', value: 0, icon: TrendingUp },
                    { label: 'Customers', value: 0, icon: Users },
                    { label: 'Rating', value: '0.0', icon: Star },
                    { label: 'Years', value: 0, icon: Calendar }
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <s.icon className="w-4 h-4 text-faith-gold" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-faith-gold leading-none">{s.value}</div>
                        <div className="text-xs text-white/70">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/70">
                        <Phone className="w-4 h-4" />
                        <span>{business?.phone || '-'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Mail className="w-4 h-4" />
                        <span>{business?.email || '-'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Globe className="w-4 h-4" />
                        <span>{business?.website || '-'}</span>
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

              {/* Contact & Links Card */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Contact & Links</h3>
                <div className="grid grid-cols-1 gap-3 text-white/80 text-sm">
                  <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>-</span></div>
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4" /><span>-</span></div>
                  <div className="flex items-center gap-2"><Globe className="w-4 h-4" /><span>-</span></div>
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

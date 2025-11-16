"use client";

import { motion } from "framer-motion";
import { Building2, Search, Filter, MapPin, Phone, Mail, Globe, Heart, Church, User, Info, BookOpen, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/auth-context";

export default function ChristianBusinessesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleWhatsApp = (business: any) => {
    const hasBusiness = typeof window !== 'undefined' && localStorage.getItem('hasBusiness') === 'true';
    if (!user || !hasBusiness) {
      toast.error('Add your business first to contact others via WhatsApp.');
      window.location.href = '/add-business';
      return;
    }
    const message = `Hello! I'm interested in learning more about ${business.name}.`;
    const whatsappUrl = `https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success(`Opening WhatsApp chat with ${business.name}`);
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
    toast.success('Opening email client');
  };

  const handlePhone = (phone: string) => {
    window.location.href = `tel:${phone}`;
    toast.success('Opening phone dialer');
  };

  const categories = [
    { id: "all", name: "All Categories", icon: Building2 },
    { id: "food", name: "Food & Dining", icon: Heart },
    { id: "retail", name: "Retail & Shopping", icon: Building2 },
    { id: "services", name: "Professional Services", icon: User },
    { id: "health", name: "Health & Wellness", icon: Heart },
    { id: "education", name: "Education", icon: BookOpen },
  ];

  const businesses = [
    {
      id: 1,
      name: "Graceful Gardens",
      category: "food",
      description: "Christian-owned landscaping services",
      location: "Cape Town",
      ownerName: "John Smith",
      phone: "+27 123 456 789",
      whatsappNumber: "+27 123 456 789",
      email: "info@gracefulgardens.co.za",
      website: "www.gracefulgardens.co.za",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      rating: 4.8,
      reviews: 127,
      founded: "2019",
      mission: "To nourish both body and soul through wholesome, prayerfully prepared meals"
    },
    {
      id: 2,
      name: "Faithful Finance",
      category: "services",
      description: "Biblical financial planning and advice",
      location: "Johannesburg",
      ownerName: "Sarah Johnson",
      phone: "+27 987 654 321",
      whatsappNumber: "+27 987 654 321",
      email: "contact@faithfulfinance.co.za",
      website: "www.faithfulfinance.co.za",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
      rating: 4.9,
      reviews: 89,
      founded: "2015",
      mission: "Building structures that honor God and serve our communities"
    },
    {
      id: 3,
      name: "Blessed Bakery",
      category: "food",
      description: "Fresh baked goods with love",
      location: "Durban",
      ownerName: "Michael Brown",
      phone: "+27 555 123 456",
      whatsappNumber: "+27 555 123 456",
      email: "hello@blessedbakery.co.za",
      website: "www.blessedbakery.co.za",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
      rating: 4.7,
      reviews: 156,
      founded: "2017",
      mission: "Empowering Christians to be faithful stewards of God's resources"
    },
    {
      id: 4,
      name: "Heavenly Health Clinic",
      category: "health",
      description: "Medical clinic providing compassionate healthcare with Christian values",
      location: "Nakuru, Kenya",
      phone: "+254 700 456 789",
      whatsappNumber: "+254 700 456 789",
      email: "care@heavenlyhealth.co.ke",
      website: "www.heavenlyhealth.co.ke",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
      rating: 4.9,
      reviews: 203,
      founded: "2018",
      mission: "Healing bodies and souls through Christ-centered medical care"
    },
    {
      id: 5,
      name: "Blessed Books & More",
      category: "retail",
      description: "Christian bookstore offering Bibles, books, and inspirational gifts",
      location: "Eldoret, Kenya",
      phone: "+254 700 567 890",
      whatsappNumber: "+254 700 567 890",
      email: "books@blessedbooks.co.ke",
      website: "www.blessedbooks.co.ke",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      rating: 4.6,
      reviews: 78,
      founded: "2020",
      mission: "Spreading God's word through quality Christian literature and resources"
    },
    {
      id: 6,
      name: "Divine Design Studio",
      category: "services",
      description: "Graphic design and branding services with Christian creativity and excellence",
      location: "Thika, Kenya",
      phone: "+254 700 678 901",
      whatsappNumber: "+254 700 678 901",
      email: "design@divinedesign.co.ke",
      website: "www.divinedesign.co.ke",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400",
      rating: 4.8,
      reviews: 94,
      founded: "2016",
      mission: "Creating beautiful designs that glorify God and serve His purposes"
    }
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-faith-blue via-faith-dark to-faith-gold">
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
                Christian Businesses
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <button
                type="button"
                aria-label="Search"
                onClick={() => searchInputRef.current?.focus()}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 border border-white/20 shadow-sm transition-colors"
              >
                <Search className="text-white w-4 h-4" />
              </button>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search businesses, locations, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${selectedCategory === category.id
                      ? "bg-faith-gold text-faith-blue font-semibold"
                      : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Results Count */}
            <p className="text-white/80 text-center">
              Showing {filteredBusinesses.length} of {businesses.length} Christian businesses
            </p>
          </motion.div>
        </div>
      </section>

      {/* Business Listings */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-faith-gold/50 transition-all duration-300 hover:scale-105"
              >
                {/* Business Image */}
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 relative overflow-hidden">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Business Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-display font-bold text-white">{business.name}</h3>
                    <div className="flex items-center gap-1 text-faith-gold">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{business.rating}</span>
                    </div>
                  </div>

                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    {business.category}
                  </p>

                  <p className="text-white/80 text-sm leading-relaxed">{business.description}</p>

                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{business.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/70">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{business.ownerName}</span>
                  </div>

                  {/* Mission Statement */}
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/90 text-sm italic">"{business.mission}"</p>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-3 mt-4">
                    {business.whatsappNumber && (
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleWhatsApp(business)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <MessageCircle size={16} />
                        WhatsApp
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEmail(business.email)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Mail size={16} />
                      Email
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePhone(business.phone)}
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

          {filteredBusinesses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Building2 className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-white mb-2">No businesses found</h3>
              <p className="text-white/70">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

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
              <Info size={20} className="text-white" />
            </div>
            <span className="text-xs text-white font-medium">About</span>
          </Link>

          <Link href="/christian-businesses" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <User size={20} className="text-blue-400" />
            </div>
            <span className="text-xs text-blue-400 font-medium">Browse Christian Businesses</span>
          </Link>

          <Link href="/christian-catalogue" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <BookOpen size={20} className="text-green-400" />
            </div>
            <span className="text-xs text-green-400 font-medium">Catalogue</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Building2, MapPin, Phone, Mail, MessageCircle, Star } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    {
      id: "1",
      businessName: "Graceful Gardens",
      category: "Landscaping",
      description: "Christian-owned landscaping services with a focus on sustainable practices",
      location: "Cape Town, Western Cape",
      ownerName: "Sarah Johnson",
      phone: "+27 82 123 4567",
      email: "sarah@gracefulgardens.co.za",
      whatsappNumber: "+27 82 123 4567",
      website: "https://gracefulgardens.co.za",
      rating: 4.8,
      isFavorite: true,
      image: "/api/placeholder/300/200"
    },
    {
      id: "2",
      businessName: "Faithful Accounting",
      category: "Professional Services",
      description: "Christian accounting firm providing honest and reliable financial services",
      location: "Johannesburg, Gauteng",
      ownerName: "Michael Chen",
      phone: "+27 11 234 5678",
      email: "michael@faithfulaccounting.co.za",
      whatsappNumber: "+27 82 234 5678",
      website: "https://faithfulaccounting.co.za",
      rating: 4.9,
      isFavorite: true,
      image: "/api/placeholder/300/200"
    },
    {
      id: "3",
      businessName: "Kingdom Coffee",
      category: "Food & Beverage",
      description: "Artisan coffee roasters with a mission to support local farmers",
      location: "Durban, KwaZulu-Natal",
      ownerName: "David Mthembu",
      phone: "+27 31 345 6789",
      email: "david@kingdomcoffee.co.za",
      whatsappNumber: "+27 82 345 6789",
      website: "https://kingdomcoffee.co.za",
      rating: 4.7,
      isFavorite: true,
      image: "/api/placeholder/300/200"
    }
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
    toast.success("Removed from favorites");
  };

  const handleWhatsApp = (company: any) => {
    if (company.whatsappNumber) {
      const message = encodeURIComponent(`Hi, I found your business ${company.businessName} on the Christian Business Network app. I'd like to learn more about your services.`);
      window.open(`https://wa.me/${company.whatsappNumber.replace(/[^\d]/g, '')}?text=${message}`, '_blank');
    }
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handlePhone = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  const handleWebsite = (website: string) => {
    if (website) {
      window.open(website.startsWith('http') ? website : `https://${website}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative p-6 pt-12">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="p-2 bg-white/20 rounded-full"
          >
            <ArrowLeft size={24} className="text-white" />
          </Link>
          <h1 className="text-2xl font-bold text-white">My Favorites</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-white rounded-t-3xl p-6 min-h-[80vh]">
        <div className="max-w-4xl mx-auto">
          {favorites.length > 0 ? (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Favorite Businesses</h2>
                <p className="text-gray-600">Businesses you've saved for easy access</p>
              </div>

              <div className="grid gap-6">
                {favorites.map((company) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {company.businessName}
                            </h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {company.rating}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                            {company.category}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {company.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              <span>{company.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building2 size={16} />
                              <span>{company.ownerName}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFavorite(company.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                        >
                          <Heart size={20} className="fill-current" />
                        </button>
                      </div>

                      {/* Contact Buttons */}
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {company.whatsappNumber && (
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleWhatsApp(company)}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            <MessageCircle size={16} />
                            WhatsApp
                          </motion.button>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEmail(company.email)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <Mail size={16} />
                          Email
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePhone(company.phone)}
                          className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <Phone size={16} />
                          Call
                        </motion.button>

                        {company.website && (
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleWebsite(company.website)}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            <Building2 size={16} />
                            Website
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Heart size={48} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Favorites Yet</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start exploring businesses and save your favorites for easy access later.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Building2 size={20} className="mr-2" />
                Explore Businesses
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
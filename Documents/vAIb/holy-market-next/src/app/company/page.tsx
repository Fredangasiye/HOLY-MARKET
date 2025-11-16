"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  X,
  MessageCircle,
  Clock,
  DollarSign,
  Award,
  Star,
  Church,
  User,
  Info,
  BookOpen
} from "lucide-react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CompanyPage() {
  const { theme } = useTheme();
  const router = useRouter();

  // User's actual business from localStorage
  const [hasBusiness, setHasBusiness] = useState(false);
  const [userBusiness, setUserBusiness] = useState<any | null>(null);

  useEffect(() => {
    try {
      const has = typeof window !== 'undefined' && localStorage.getItem('hasBusiness') === 'true';
      setHasBusiness(has);
      if (has) {
        const saved = localStorage.getItem('businessProfile');
        if (saved) {
          setUserBusiness(JSON.parse(saved));
        }
      }
    } catch { }
  }, []);

  const handleAddCompany = () => {
    router.push("/add-business");
    toast.success("Redirecting to business form...");
  };

  const handleEditCompany = () => {
    router.push("/add-business");
    toast.success("Redirecting to business form...");
  };

  const handleDeleteCompany = () => {
    if (confirm("Are you sure you want to delete your business?")) {
      try {
        localStorage.removeItem('businessProfile');
        localStorage.setItem('hasBusiness', 'false');
      } catch { }
      setUserBusiness(null);
      setHasBusiness(false);
      toast.success("Business removed.");
    }
  };

  const handleViewCompany = () => {
    router.push('/dashboard?tab=business');
    toast.success("Opening your business...");
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative p-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">My Companies</h1>
          <p className="text-lg text-blue-100">Manage your businesses</p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="bg-white dark:bg-gray-900 rounded-t-3xl p-6 min-h-[80vh]">
        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-gray-800 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {hasBusiness && userBusiness ? 1 : 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Companies</div>
            </div>
          </div>
        </motion.section>

        {/* Add Company Button */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={handleAddCompany}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={24} />
            Add New Company
          </button>
        </motion.section>

        {/* Companies List */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Businesses
          </h2>

          {hasBusiness && userBusiness ? (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="flex">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                    <Building2 className="text-gray-500" size={28} />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {userBusiness.businessName || 'Untitled Business'}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          {userBusiness.category || '—'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleViewCompany}
                          className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={handleEditCompany}
                          className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={handleDeleteCompany}
                          className="p-2 bg-red-100 dark:bg-red-900 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {userBusiness.description || 'No description provided.'}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <MapPin size={12} className="mr-1" />
                        {(userBusiness.city || '') + (userBusiness.province ? `, ${userBusiness.province}` : '')}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Phone size={12} className="mr-1" />
                        {userBusiness.phone || '—'}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Mail size={12} className="mr-1" />
                        {userBusiness.email || '—'}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Globe size={12} className="mr-1" />
                        {userBusiness.website || '—'}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Calendar size={12} className="mr-1" />
                        Est. {userBusiness.foundedYear || '—'}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Users size={12} className="mr-1" />
                        {userBusiness.employees || '—'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No companies yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start by adding your first business to the community
              </p>
              <button
                onClick={handleAddCompany}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
              >
                <Plus size={20} />
                Add Your First Company
              </button>
            </div>
          )}
        </motion.section>
      </main>

      {/* Footer handled globally by MobileNavigation */}
    </div>
  );
}

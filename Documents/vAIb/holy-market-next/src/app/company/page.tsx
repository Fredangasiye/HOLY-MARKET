"use client";

import { useState } from "react";
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
  Star
} from "lucide-react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CompanyPage() {
  const { theme } = useTheme();
  const [isAddingCompany, setIsAddingCompany] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  
  // Business form state
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    city: '',
    category: 'Other',
    website: '',
    description: '',
    faithAffirmation: false,
    churchName: '',
    christianDuration: '<1 year',
    churchInvolvement: '',
    profileImage: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showBusinessProfile, setShowBusinessProfile] = useState(false);

  // Business categories and options
  const businessCategories = [
    'Retail', 'Consulting', 'Technology', 'Healthcare', 'Education',
    'Construction', 'Food & Beverage', 'Professional Services',
    'Manufacturing', 'Transportation', 'Real Estate', 'Finance',
    'Media & Marketing', 'Other'
  ];

  const christianDurations = [
    '<1 year', '1-5 years', '5-10 years', '>10 years'
  ];

  const southAfricanCities = [
    'Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Port Elizabeth',
    'Bloemfontein', 'East London', 'Nelspruit', 'Polokwane', 'Kimberley'
  ];
  const [businessForm, setBusinessForm] = useState({
    businessName: "",
    category: "",
    description: "",
    location: "",
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    established: "",
    employees: "",
    services: "",
    pricing: "",
    hours: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: ""
    },
    images: [],
    isVerified: false,
    isActive: true
  });

  // Mock company data
  const [companies, setCompanies] = useState([
    {
      id: "1",
      businessName: "Graceful Gardens",
      category: "Landscaping",
      description: "Christian-owned landscaping services with a focus on sustainable practices.",
      location: "Cape Town, Western Cape",
      phone: "+27 123 456 789",
      email: "info@gracefulgardens.co.za",
      website: "www.gracefulgardens.co.za",
      established: "2020",
      employees: "5-10",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      isVerified: true,
      isActive: true
    },
    {
      id: "2",
      businessName: "Faithful Finance",
      category: "Financial Services",
      description: "Biblical financial planning and investment advice for Christian families.",
      location: "Johannesburg, Gauteng",
      phone: "+27 987 654 321",
      email: "contact@faithfulfinance.co.za",
      website: "www.faithfulfinance.co.za",
      established: "2018",
      employees: "2-5",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
      isVerified: true,
      isActive: true
    }
  ]);

  const handleAddCompany = () => {
    setIsAddingCompany(true);
    toast.success("Add company form opened!");
  };

  const handleEditCompany = (id: string) => {
    toast.success(`Editing company ${id}`);
  };

  const handleDeleteCompany = (id: string) => {
    if (confirm("Are you sure you want to delete this company?")) {
      setCompanies(companies.filter(company => company.id !== id));
      toast.success("Company deleted successfully!");
    }
  };

  const handleViewCompany = (id: string) => {
    toast.success(`Viewing company ${id}`);
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
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-gray-800 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {companies.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Companies</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-gray-800 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {companies.filter(c => c.isVerified).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Verified</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-gray-800 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {companies.filter(c => c.isActive).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Active</div>
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
          
          {companies.length > 0 ? (
            <div className="space-y-6">
              {companies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="flex">
                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      <img
                        src={company.image}
                        alt={company.businessName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {company.businessName}
                          </h3>
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            {company.category}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewCompany(company.id)}
                            className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleEditCompany(company.id)}
                            className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCompany(company.id)}
                            className="p-2 bg-red-100 dark:bg-red-900 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {company.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <MapPin size={12} className="mr-1" />
                          {company.location}
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Phone size={12} className="mr-1" />
                          {company.phone}
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Mail size={12} className="mr-1" />
                          {company.email}
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Globe size={12} className="mr-1" />
                          {company.website}
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Calendar size={12} className="mr-1" />
                          Est. {company.established}
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Users size={12} className="mr-1" />
                          {company.employees}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        {company.isVerified && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs rounded-full">
                            ✓ Verified
                          </span>
                        )}
                        {company.isActive && (
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around py-2">
          <Link
            href="/dashboard"
            className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <span className="text-xs">Home</span>
          </Link>
          <Link
            href="/company"
            className="flex flex-col items-center py-2 px-4 text-blue-600 dark:text-blue-400"
          >
            <span className="text-xs">My Company</span>
          </Link>
          <Link
            href="/about"
            className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <span className="text-xs">About</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

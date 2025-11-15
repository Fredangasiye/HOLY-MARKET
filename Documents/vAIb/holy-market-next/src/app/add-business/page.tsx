"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Heart,
  Church,
  Info,
  BookOpen,
  ArrowLeft,
  Check,
  Upload,
  X,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Camera
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function AddBusinessPage() {
  const { user, loading } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load persisted form data from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('businessProfile');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
      }
    } catch { }
  }, []);

  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    category: '',
    description: '',
    foundedYear: '',
    employees: '',
    website: '',

    // Owner Information
    ownerName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    whatsappNumber: '',

    // Location Information
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'South Africa',

    // Faith Information
    faithAffirmation: false,
    churchName: '',
    christianDuration: '',
    churchInvolvement: '',
    missionStatement: '',

    // Services
    services: [] as string[],
    customService: '',

    // Social Media
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    youtube: '',
    tiktok: '',

    // Images
    profileImage: null as File | null,
    businessImages: [] as File[],

    // Additional Information
    businessHours: {
      monday: { open: '', close: '', closed: false },
      tuesday: { open: '', close: '', closed: false },
      wednesday: { open: '', close: '', closed: false },
      thursday: { open: '', close: '', closed: false },
      friday: { open: '', close: '', closed: false },
      saturday: { open: '', close: '', closed: false },
      sunday: { open: '', close: '', closed: false }
    },
    paymentMethods: [] as string[],
    languages: [] as string[],
    certifications: '',
    awards: '',
    specialOffers: ''
  });

  const categories = [
    'Food & Dining',
    'Retail & Shopping',
    'Professional Services',
    'Health & Wellness',
    'Education & Training',
    'Technology',
    'Construction & Home',
    'Automotive',
    'Beauty & Personal Care',
    'Entertainment & Events',
    'Travel & Tourism',
    'Agriculture & Farming',
    'Manufacturing',
    'Other'
  ];

  const provinces = [
    'Western Cape',
    'Eastern Cape',
    'Northern Cape',
    'Free State',
    'KwaZulu-Natal',
    'North West',
    'Gauteng',
    'Mpumalanga',
    'Limpopo'
  ];

  const christianDurations = [
    'Less than 1 year',
    '1-2 years',
    '3-5 years',
    '6-10 years',
    '10+ years',
    'Lifetime Christian'
  ];

  const commonServices = [
    'Consultation',
    'Design',
    'Installation',
    'Maintenance',
    'Repair',
    'Training',
    'Delivery',
    'Custom Work',
    'Emergency Service',
    'Free Estimates'
  ];

  const paymentMethods = [
    'Cash',
    'Credit Card',
    'Debit Card',
    'Bank Transfer',
    'Mobile Payment',
    'Cheque',
    'Payment Plans'
  ];

  const languages = [
    'English',
    'Afrikaans',
    'Zulu',
    'Xhosa',
    'Sotho',
    'Tswana',
    'Venda',
    'Tsonga',
    'Swati',
    'Ndebele'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
      // Persist to localStorage on every change
      try {
        localStorage.setItem('businessProfile', JSON.stringify(updated));
      } catch { }
      return updated;
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleAddCustomService = () => {
    if (formData.customService.trim()) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, prev.customService.trim()],
        customService: ''
      }));
    }
  };

  const handleImageUpload = (field: 'profileImage' | 'businessImages', file: File) => {
    if (field === 'profileImage') {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        businessImages: [...prev.businessImages, file]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      businessImages: prev.businessImages.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Business Information
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    // Owner Information
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    // Location Information
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.province) newErrors.province = 'Province is required';

    // Faith Information
    if (!formData.faithAffirmation) newErrors.faithAffirmation = 'Faith affirmation is required';
    if (!formData.churchName.trim()) newErrors.churchName = 'Church name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = Object.values(errors)[0];
      if (firstError) {
        toast.error(firstError);
      } else {
        toast.error('Please fill in all required fields');
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      try {
        localStorage.setItem('hasBusiness', 'true');
        localStorage.setItem('businessProfile', JSON.stringify(formData));
      } catch { }
      // Redirect to dashboard (My Business tab) after successful submission
      router.push('/dashboard?tab=business');
      return;


    } catch (error) {
      // Error handling without toast
    } finally {
      setIsSubmitting(false);
    }
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
              <button onClick={() => router.back()} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center space-x-2">
                <Building2 className="w-8 h-8 text-faith-gold" />
                <h1 className="text-2xl font-display font-bold text-white">
                  Add Your Business
                </h1>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => formRef.current?.requestSubmit()}
                disabled={isSubmitting}
                className={`px-5 py-2 rounded-lg font-semibold transition-colors ${isSubmitting ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-faith-gold text-faith-blue hover:bg-faith-gold/80'
                  }`}
              >
                {isSubmitting ? 'Saving…' : 'Save Changes'}
              </button>
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
                    <Building2 className="w-12 h-12 text-faith-gold" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    Join Our Christian Business Community
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    To add your business to our directory, please sign in or create an account.
                    This helps us maintain a trusted community of Christian entrepreneurs.
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
                    Already have an account? <Link href="/auth/login" className="text-faith-gold hover:text-faith-gold/80 font-semibold">Sign in here</Link>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer handled globally by MobileNavigation */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-faith-blue via-faith-dark to-faith-gold">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-purple-600/80 dark:bg-purple-700/80 backdrop-blur-md border-b border-purple-500 dark:border-purple-600">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-faith-gold" />
              <h1 className="text-2xl font-display font-bold text-white">
                Add Your Business
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Form Content */}
      <section className="py-8 pb-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Business Information Section */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-faith-gold" />
                  Business Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Business Name *</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="Enter your business name"
                    />
                    {errors.businessName && <p className="text-red-400 text-sm mt-1">{errors.businessName}</p>}
                  </div>



                  <div>
                    <label className="block text-white font-medium mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-faith-gold"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category} className="bg-gray-800">{category}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Founded Year</label>
                    <select
                      value={formData.foundedYear}
                      onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-faith-gold"
                    >
                      <option value="">Select year</option>
                      {Array.from({ length: 201 }).map((_, idx) => {
                        const year = new Date().getFullYear() - idx;
                        return (
                          <option key={year} value={String(year)} className="bg-gray-800">
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Number of Employees</label>
                    <select
                      value={formData.employees}
                      onChange={(e) => handleInputChange('employees', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-faith-gold"
                    >
                      <option value="">Select range</option>
                      <option value="1" className="bg-gray-800">Just me</option>
                      <option value="2-5" className="bg-gray-800">2-5 employees</option>
                      <option value="6-10" className="bg-gray-800">6-10 employees</option>
                      <option value="11-25" className="bg-gray-800">11-25 employees</option>
                      <option value="26-50" className="bg-gray-800">26-50 employees</option>
                      <option value="50+" className="bg-gray-800">50+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-white font-medium mb-2">Business Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold resize-none"
                    placeholder="Describe your business and what makes it special..."
                  />
                  {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                </div>
              </div>

              {/* Owner Information Section */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-faith-gold" />
                  Owner Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Owner Name *</label>
                    <input
                      type="text"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="Your full name"
                    />
                    {errors.ownerName && <p className="text-red-400 text-sm mt-1">{errors.ownerName}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="+27 123 456 789"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="+27 123 456 789"
                    />
                  </div>
                </div>
              </div>

              {/* Location Information Section */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-faith-gold" />
                  Location Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Address *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="Street address"
                    />
                    {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">City *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                        placeholder="City"
                      />
                      {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Province *</label>
                      <select
                        value={formData.province}
                        onChange={(e) => handleInputChange('province', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      >
                        <option value="">Select province</option>
                        {provinces.map(province => (
                          <option key={province} value={province} className="bg-gray-800">{province}</option>
                        ))}
                      </select>
                      {errors.province && <p className="text-red-400 text-sm mt-1">{errors.province}</p>}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Postal Code</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                        placeholder="0000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Faith Information Section */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-faith-gold" />
                  Faith Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="faithAffirmation"
                      checked={formData.faithAffirmation}
                      onChange={(e) => handleInputChange('faithAffirmation', e.target.checked)}
                      className="w-5 h-5 text-faith-gold bg-white/10 border-white/20 rounded focus:ring-faith-gold"
                    />
                    <label htmlFor="faithAffirmation" className="text-white font-medium">
                      I affirm that I am a Christian and will conduct my business according to Christian principles *
                    </label>
                  </div>
                  {errors.faithAffirmation && <p className="text-red-400 text-sm">{errors.faithAffirmation}</p>}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Church Name *</label>
                      <input
                        type="text"
                        value={formData.churchName}
                        onChange={(e) => handleInputChange('churchName', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                        placeholder="Your church name"
                      />
                      {errors.churchName && <p className="text-red-400 text-sm mt-1">{errors.churchName}</p>}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">How long have you been a Christian? (Optional)</label>
                      <select
                        value={formData.christianDuration}
                        onChange={(e) => handleInputChange('christianDuration', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      >
                        <option value="">Select duration</option>
                        {christianDurations.map(duration => (
                          <option key={duration} value={duration} className="bg-gray-800">{duration}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Church Involvement (Optional)</label>
                    <textarea
                      value={formData.churchInvolvement}
                      onChange={(e) => handleInputChange('churchInvolvement', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold resize-none"
                      placeholder="Describe your involvement in your church community..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Mission Statement (Optional)</label>
                    <textarea
                      value={formData.missionStatement}
                      onChange={(e) => handleInputChange('missionStatement', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold resize-none"
                      placeholder="How does your faith influence your business mission and values?"
                    />
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
                  <Check className="w-6 h-6 text-faith-gold" />
                  Services Offered
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-4">Select Services</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {commonServices.map(service => (
                        <label key={service} className="flex items-center gap-2 text-white">
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service)}
                            onChange={() => handleServiceToggle(service)}
                            className="w-4 h-4 text-faith-gold bg-white/10 border-white/20 rounded focus:ring-faith-gold"
                          />
                          <span className="text-sm">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Add Custom Service</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.customService}
                        onChange={(e) => handleInputChange('customService', e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                        placeholder="Enter custom service"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomService}
                        className="px-4 py-3 bg-faith-gold text-faith-blue font-semibold rounded-lg hover:bg-faith-gold/80 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {formData.services.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Selected Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.services.map((service, index) => (
                          <span key={index} className="px-3 py-1 bg-faith-gold/20 text-faith-gold rounded-full text-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media Section */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-faith-gold" />
                  Social Media & Online Presence
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Facebook</label>
                    <input
                      type="url"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange('facebook', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Instagram</label>
                    <input
                      type="url"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="https://instagram.com/yourpage"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Twitter</label>
                    <input
                      type="url"
                      value={formData.twitter}
                      onChange={(e) => handleInputChange('twitter', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">YouTube</label>
                    <input
                      type="url"
                      value={formData.youtube}
                      onChange={(e) => handleInputChange('youtube', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="https://youtube.com/yourchannel"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">TikTok</label>
                    <input
                      type="url"
                      value={formData.tiktok}
                      onChange={(e) => handleInputChange('tiktok', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                      placeholder="https://tiktok.com/@yourhandle"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
                  <Info className="w-6 h-6 text-faith-gold" />
                  Additional Information (Optional)
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-4">Payment Methods</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {paymentMethods.map(method => (
                        <label key={method} className="flex items-center gap-2 text-white">
                          <input
                            type="checkbox"
                            checked={formData.paymentMethods.includes(method)}
                            onChange={(e) => {
                              const methods = e.target.checked
                                ? [...formData.paymentMethods, method]
                                : formData.paymentMethods.filter(m => m !== method);
                              handleInputChange('paymentMethods', methods);
                            }}
                            className="w-4 h-4 text-faith-gold bg-white/10 border-white/20 rounded focus:ring-faith-gold"
                          />
                          <span className="text-sm">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-4">Languages Spoken</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {languages.map(language => (
                        <label key={language} className="flex items-center gap-2 text-white">
                          <input
                            type="checkbox"
                            checked={formData.languages.includes(language)}
                            onChange={(e) => {
                              const langs = e.target.checked
                                ? [...formData.languages, language]
                                : formData.languages.filter(l => l !== language);
                              handleInputChange('languages', langs);
                            }}
                            className="w-4 h-4 text-faith-gold bg-white/10 border-white/20 rounded focus:ring-faith-gold"
                          />
                          <span className="text-sm">{language}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Certifications</label>
                    <textarea
                      value={formData.certifications}
                      onChange={(e) => handleInputChange('certifications', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold resize-none"
                      placeholder="List any professional certifications or qualifications..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Awards & Recognition</label>
                    <textarea
                      value={formData.awards}
                      onChange={(e) => handleInputChange('awards', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold resize-none"
                      placeholder="List any awards, recognition, or achievements..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Special Offers</label>
                    <textarea
                      value={formData.specialOffers}
                      onChange={(e) => handleInputChange('specialOffers', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold resize-none"
                      placeholder="Describe any special offers, discounts, or promotions..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-8 mb-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-faith-gold focus:ring-offset-2 ${isSubmitting
                    ? 'bg-white/20 text-white/50 cursor-not-allowed border border-white/10'
                    : 'bg-purple-600 hover:bg-purple-700 text-white border border-white/20 shadow-xl hover:shadow-2xl'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>Submit</>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>



      {/* Footer handled globally by MobileNavigation */}
    </div>
  );
}
"use client";

import { useState } from "react";
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
  ArrowRight, 
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

export default function AddBusinessPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    category: '',
    description: '',
    foundedYear: '',
    employees: '',
    website: '',
    
    // Owner Information
    ownerName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    
    // Location
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const steps = [
    { number: 1, title: 'Business Info', icon: Building2 },
    { number: 2, title: 'Owner Details', icon: User },
    { number: 3, title: 'Location', icon: MapPin },
    { number: 4, title: 'Faith Info', icon: Heart },
    { number: 5, title: 'Services', icon: Check },
    { number: 6, title: 'Social Media', icon: Globe },
    { number: 7, title: 'Images', icon: Camera },
    { number: 8, title: 'Additional', icon: Info }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        break;
      case 2:
        if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        break;
      case 3:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.province) newErrors.province = 'Province is required';
        break;
      case 4:
        if (!formData.faithAffirmation) newErrors.faithAffirmation = 'Faith affirmation is required';
        if (!formData.churchName.trim()) newErrors.churchName = 'Church name is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Business profile created successfully!');
      
      // Reset form
      setFormData({
        businessName: '',
        businessType: '',
        category: '',
        description: '',
        foundedYear: '',
        employees: '',
        website: '',
        ownerName: '',
        email: '',
        phone: '',
        whatsappNumber: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        country: 'South Africa',
        faithAffirmation: false,
        churchName: '',
        christianDuration: '',
        churchInvolvement: '',
        missionStatement: '',
        services: [],
        customService: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        youtube: '',
        tiktok: '',
        profileImage: null,
        businessImages: [],
        businessHours: {
          monday: { open: '', close: '', closed: false },
          tuesday: { open: '', close: '', closed: false },
          wednesday: { open: '', close: '', closed: false },
          thursday: { open: '', close: '', closed: false },
          friday: { open: '', close: '', closed: false },
          saturday: { open: '', close: '', closed: false },
          sunday: { open: '', close: '', closed: false }
        },
        paymentMethods: [],
        languages: [],
        certifications: '',
        awards: '',
        specialOffers: ''
      });
      
      setCurrentStep(1);
      
    } catch (error) {
      toast.error('Failed to create business profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
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
              <label className="block text-white font-medium mb-2">Business Type</label>
              <input
                type="text"
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                placeholder="e.g., Sole Proprietorship, Partnership, Company"
              />
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
              <label className="block text-white font-medium mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold resize-none"
                placeholder="Describe your business and what makes it special..."
              />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Founded Year</label>
                <input
                  type="number"
                  value={formData.foundedYear}
                  onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="2020"
                  min="1900"
                  max="2024"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Number of Employees</label>
                <input
                  type="text"
                  value={formData.employees}
                  onChange={(e) => handleInputChange('employees', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="e.g., 1-5, 10-20"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                placeholder="https://www.yourbusiness.com"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Owner/Manager Name *</label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => handleInputChange('ownerName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                placeholder="Enter your full name"
              />
              {errors.ownerName && <p className="text-red-400 text-sm mt-1">{errors.ownerName}</p>}
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
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
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Business Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold resize-none"
                placeholder="Enter your complete business address"
              />
              {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="Cape Town"
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Postal Code</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="8000"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="South Africa"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Faith Information</h3>
              
              <div className="mb-4">
                <label className="flex items-center gap-3 text-white">
                  <input
                    type="checkbox"
                    checked={formData.faithAffirmation}
                    onChange={(e) => handleInputChange('faithAffirmation', e.target.checked)}
                    className="w-5 h-5 text-faith-gold bg-white/10 border-white/20 rounded focus:ring-faith-gold"
                  />
                  <span>I affirm that this business operates according to Christian values and principles *</span>
                </label>
                {errors.faithAffirmation && <p className="text-red-400 text-sm mt-1">{errors.faithAffirmation}</p>}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Church Name *</label>
                <input
                  type="text"
                  value={formData.churchName}
                  onChange={(e) => handleInputChange('churchName', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="Name of your church or congregation"
                />
                {errors.churchName && <p className="text-red-400 text-sm mt-1">{errors.churchName}</p>}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">How long have you been a Christian?</label>
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

              <div>
                <label className="block text-white font-medium mb-2">Church Involvement</label>
                <textarea
                  value={formData.churchInvolvement}
                  onChange={(e) => handleInputChange('churchInvolvement', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold resize-none"
                  placeholder="Describe your involvement in church activities..."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Mission Statement</label>
                <textarea
                  value={formData.missionStatement}
                  onChange={(e) => handleInputChange('missionStatement', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold resize-none"
                  placeholder="How does your business serve God's purposes?"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-4">Services Offered</label>
              <div className="grid grid-cols-2 gap-3 mb-4">
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
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.customService}
                  onChange={(e) => handleInputChange('customService', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="Add custom service"
                />
                <button
                  type="button"
                  onClick={handleAddCustomService}
                  className="px-4 py-2 bg-faith-gold text-faith-blue font-semibold rounded-lg hover:bg-faith-gold/80 transition-colors"
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
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Facebook</label>
                <input
                  type="url"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="https://facebook.com/yourbusiness"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Instagram</label>
                <input
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="https://instagram.com/yourbusiness"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="https://linkedin.com/company/yourbusiness"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Twitter</label>
                <input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="https://twitter.com/yourbusiness"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">YouTube</label>
                <input
                  type="url"
                  value={formData.youtube}
                  onChange={(e) => handleInputChange('youtube', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="https://youtube.com/c/yourbusiness"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">TikTok</label>
                <input
                  type="url"
                  value={formData.tiktok}
                  onChange={(e) => handleInputChange('tiktok', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-faith-gold"
                  placeholder="https://tiktok.com/@yourbusiness"
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Profile Image</label>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                <Camera className="w-12 h-12 text-white/50 mx-auto mb-4" />
                <p className="text-white/70 mb-4">Upload a profile image for your business</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload('profileImage', e.target.files[0])}
                  className="hidden"
                  id="profile-image"
                />
                <label
                  htmlFor="profile-image"
                  className="inline-block px-4 py-2 bg-faith-gold text-faith-blue font-semibold rounded-lg hover:bg-faith-gold/80 transition-colors cursor-pointer"
                >
                  Choose Image
                </label>
              </div>
              {formData.profileImage && (
                <p className="text-faith-gold text-sm mt-2">✓ {formData.profileImage.name}</p>
              )}
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Business Images</label>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
                <p className="text-white/70 mb-4">Upload additional images of your business</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      Array.from(e.target.files).forEach(file => handleImageUpload('businessImages', file));
                    }
                  }}
                  className="hidden"
                  id="business-images"
                />
                <label
                  htmlFor="business-images"
                  className="inline-block px-4 py-2 bg-faith-gold text-faith-blue font-semibold rounded-lg hover:bg-faith-gold/80 transition-colors cursor-pointer"
                >
                  Choose Images
                </label>
              </div>
              
              {formData.businessImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-white font-medium mb-2">Selected Images:</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.businessImages.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 px-3 py-1 bg-faith-gold/20 text-faith-gold rounded-full text-sm">
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-4">Payment Methods</label>
              <div className="grid grid-cols-2 gap-3">
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
              <div className="grid grid-cols-2 gap-3">
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-faith-blue via-faith-dark to-faith-gold">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-faith-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-6 h-6 text-faith-blue dark:text-white" />
            </Link>
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-faith-gold" />
              <h1 className="text-2xl font-display font-bold text-faith-blue dark:text-white">
                Add Your Business
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <section className="py-6 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-faith-gold text-faith-blue' 
                      : isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/20 text-white/60'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <IconComponent className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    isActive ? 'text-faith-gold' : 'text-white/60'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-display font-bold text-white mb-6">
                {steps[currentStep - 1].title}
              </h2>
              
              {renderStepContent()}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Buttons */}
      <section className="py-6 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between max-w-2xl mx-auto">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                currentStep === 1
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-faith-gold text-faith-blue font-semibold rounded-lg hover:bg-faith-gold/80 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-colors ${
                  isSubmitting
                    ? 'bg-white/20 text-white/50 cursor-not-allowed'
                    : 'bg-faith-gold text-faith-blue hover:bg-faith-gold/80'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Create Business
                  </>
                )}
              </button>
            )}
          </div>
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
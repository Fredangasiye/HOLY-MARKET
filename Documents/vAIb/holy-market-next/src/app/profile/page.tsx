"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  LogOut,
  Settings,
  Heart,
  Building2,
  Calendar,
  Shield,
  Church,
  Info,
  BookOpen
} from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const { user, updateUserProfile, updateProfileImage, signOut, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    joinDate: "",
    businessCount: 0,
    isVerified: false
  });

  const [editData, setEditData] = useState(userData);

  useEffect(() => {
    if (!user) return;
    const parts = (user.name || "").trim().split(" ");
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";
    const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "";
    const hydrated = {
      firstName,
      lastName,
      email: user.email,
      phone: user.phone || "",
      location: "",
      joinDate,
      businessCount: 0,
      isVerified: true
    };
    setUserData(hydrated);
    setEditData(hydrated);
  }, [user]);

  // Clear preview when user photo updates from context (after successful upload)
  useEffect(() => {
    if (user?.profilePhoto && photoPreview) {
      setPhotoPreview(null);
    }
  }, [user?.profilePhoto, photoPreview]);

  const handleSave = async () => {
    if (!user) return;
    const fullName = [editData.firstName, editData.lastName].filter(Boolean).join(" ");
    const ok = await updateUserProfile({ name: fullName, phone: editData.phone });
    if (ok) {
      setUserData(editData);
      setIsEditing(false);
    } else {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const onPickPhoto = () => fileInputRef.current?.click();
  const onChangePhoto: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }
    setIsUploadingPhoto(true);
    
    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPhotoPreview(dataUrl);
        if (typeof window !== 'undefined') {
          localStorage.setItem('profilePhoto', dataUrl);
        }
      }
    };
    reader.readAsDataURL(file);
    
    const ok = await updateProfileImage(file);
    setIsUploadingPhoto(false);
    if (ok) {
      // Photo updated successfully - user state will update via auth context
      // Keep preview until user state updates
    } else {
      setPhotoPreview(null);
      toast.error('Failed to update photo. Please try again.');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const menuItems = [
    {
      icon: Settings,
      title: "Account Settings",
      href: "/settings/account",
      description: "Manage your account preferences"
    },
    {
      icon: Building2,
      title: "My Businesses",
      href: "/company",
      description: "View and manage your businesses"
    },
    {
      icon: Heart,
      title: "Favorites",
      href: "/favorites",
      description: "Your saved businesses"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      href: "/settings/privacy",
      description: "Manage your privacy settings"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Header with Back */}
      <header className="relative p-6 pt-12">
        <div className="absolute left-4 top-12 z-10">
          <Link
            href={typeof document !== 'undefined' && document.referrer.includes('/dashboard') ? '/dashboard' : '/'}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 shadow-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
          <p className="text-lg text-blue-100">Manage your account</p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="bg-white dark:bg-gray-900 rounded-t-3xl p-6 min-h-[80vh] pb-28">
        {/* Profile Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="relative mr-4">
                  {(photoPreview || user?.profilePhoto || (typeof window !== 'undefined' && localStorage.getItem('profilePhoto'))) ? (
                    <img 
                      src={photoPreview || user?.profilePhoto || (typeof window !== 'undefined' ? localStorage.getItem('profilePhoto') : '') || ''} 
                      alt="Profile" 
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-3 border-blue-500 shadow-lg" 
                      onError={(e) => {
                        // Fallback to localStorage if Firebase URL fails
                        const localPhoto = typeof window !== 'undefined' ? localStorage.getItem('profilePhoto') : null;
                        if (localPhoto && (e.target as HTMLImageElement).src !== localPhoto) {
                          (e.target as HTMLImageElement).src = localPhoto;
                        } else {
                          // Show initial if all fail
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent && !parent.querySelector('.profile-initial')) {
                            const initial = document.createElement('div');
                            initial.className = 'profile-initial w-20 h-20 sm:w-24 sm:h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold';
                            initial.textContent = ((userData.firstName[0] || "") + (userData.lastName[0] || "")).toUpperCase() || 'U';
                            parent.appendChild(initial);
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {(userData.firstName[0] || "").toUpperCase()}{(userData.lastName[0] || "").toUpperCase()}
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onChangePhoto} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Member since {userData.joinDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              >
                <Edit size={20} />
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {(photoPreview || user?.profilePhoto || (typeof window !== 'undefined' && localStorage.getItem('profilePhoto'))) ? (
                        <img 
                          src={photoPreview || user?.profilePhoto || (typeof window !== 'undefined' ? localStorage.getItem('profilePhoto') : '') || ''} 
                          alt="Current" 
                          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-md"
                          onError={(e) => {
                            const localPhoto = typeof window !== 'undefined' ? localStorage.getItem('profilePhoto') : null;
                            if (localPhoto && (e.target as HTMLImageElement).src !== localPhoto) {
                              (e.target as HTMLImageElement).src = localPhoto;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {(userData.firstName[0] || "").toUpperCase()}{(userData.lastName[0] || "").toUpperCase()}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={onPickPhoto}
                      disabled={isUploadingPhoto}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 font-medium"
                    >
                      {isUploadingPhoto ? 'Uploading…' : 'Change Photo'}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={editData.firstName}
                      onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={editData.lastName}
                      onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location (South Africa)
                  </label>
                  <select
                    value={editData.location}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select city</option>
                    {[
                      'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'East London', 'Bloemfontein', 'Polokwane', 'Nelspruit', 'Kimberley', 'Rustenburg', 'Pietermaritzburg', 'George', 'Welkom', 'Vereeniging', 'Krugersdorp', 'Benoni', 'Boksburg', 'Brakpan', 'Springs', 'Kempton Park', 'Germiston', 'Randburg', 'Roodepoort', 'Soweto', 'Tembisa', 'Midrand', 'Centurion', 'Mthatha', 'Gqeberha', 'Stellenbosch', 'Somerset West', 'Mossel Bay', 'Knysna', 'Richards Bay', 'Newcastle', 'Klerksdorp', 'Potchefstroom', 'Vanderbijlpark', 'Secunda'
                    ].map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="text-gray-400 mr-3" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-gray-400 mr-3" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">{userData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-gray-400 mr-3" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">{userData.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-gray-400 mr-3" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">Member since {userData.joinDate}</span>
                </div>
                <div className="flex items-center">
                  <Building2 className="text-gray-400 mr-3" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">{userData.businessCount} businesses</span>
                </div>
                {userData.isVerified && (
                  <div className="flex items-center">
                    <Shield className="text-green-500 mr-3" size={20} />
                    <span className="text-green-600 dark:text-green-400 font-semibold">Verified Account</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.section>

        {/* Menu Items */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <item.icon className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Theme Toggle */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Dark Mode</span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-blue-600 transition-colors"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
          </div>
        </motion.section>

        {/* Logout */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <LogOut className="mr-2" size={20} />
            Sign Out
          </button>
        </motion.section>
      </main>

      {/* Footer handled globally by MobileNavigation */}
    </div>
  );
}

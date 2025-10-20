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
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const { user, updateUserProfile, updateProfileImage, signOut, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
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

  const handleSave = async () => {
    if (!user) return;
    const fullName = [editData.firstName, editData.lastName].filter(Boolean).join(" ");
    const ok = await updateUserProfile({ name: fullName, phone: editData.phone });
    if (ok) {
      setUserData(editData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
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
    const ok = await updateProfileImage(file);
    setIsUploadingPhoto(false);
    if (ok) {
      toast.success('Profile photo updated');
    } else {
      toast.error('Failed to update photo');
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
      {/* Header */}
      <header className="relative p-6 pt-12">
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
                  {user?.profilePhoto ? (
                    <img src={user.profilePhoto} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onPickPhoto}
                      disabled={isUploadingPhoto}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg disabled:opacity-50"
                    >
                      {isUploadingPhoto ? 'Uploading…' : 'Change Photo'}
                    </button>
                    {user?.profilePhoto && (
                      <img src={user.profilePhoto} alt="Current" className="w-10 h-10 rounded-full object-cover" />
                    )}
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
                    Location
                  </label>
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
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

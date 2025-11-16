"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  User, 
  Building2, 
  Heart, 
  Shield, 
  Settings as SettingsIcon,
  Bell,
  Eye,
  Users,
  Moon,
  LogOut,
  Trash2,
  Download,
  HelpCircle,
  FileText,
  Save
} from "lucide-react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, signOut, updateUserProfile } = useAuth();
  const router = useRouter();
  const [business, setBusiness] = useState<any | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('businessProfile');
      setBusiness(saved ? JSON.parse(saved) : null);
    } catch { }
  }, []);

  const [settings, setSettings] = useState({
    profileVisibility: true,
    contactInfoVisible: true,
    businessInfoVisible: true,
    allowDirectMessages: true,
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    dataCollection: true,
    analyticsTracking: false,
    darkMode: theme === 'dark',
  });

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      const parts = (user.name || "").trim().split(" ");
      setUserData(prev => ({
        ...prev,
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
    if (business) {
      setUserData(prev => ({
        ...prev,
        businessName: business.businessName || "",
        website: business.website || "",
      }));
    }
  }, [user, business]);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    if (key === 'darkMode') {
      setTheme(value ? 'dark' : 'light');
    }
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings));
    } catch { }
  };

  const handleSaveAccount = async () => {
    if (!user) return;
    // Validate form
    const newErrors: Record<string, string> = {};
    if (!editData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!editData.lastName.trim()) newErrors.lastName = 'Last name is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const fullName = [editData.firstName, editData.lastName].filter(Boolean).join(" ");
    const ok = await updateUserProfile({ name: fullName, phone: editData.phone });
    
    if (ok) {
      // Update business profile if changed
      if (business && (editData.businessName !== business.businessName || editData.website !== business.website)) {
        try {
          const updatedBusiness = { ...business, businessName: editData.businessName, website: editData.website };
          localStorage.setItem('businessProfile', JSON.stringify(updatedBusiness));
          setBusiness(updatedBusiness);
        } catch { }
      }
      setUserData(editData);
      setIsEditing(false);
    } else {
      toast.error("Failed to update account. Please try again.");
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.error("Please contact support at help@holymarket.co.za to delete your account.");
    }
  };

  const SettingRow = ({ 
    icon, 
    title, 
    description, 
    value, 
    onValueChange 
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onValueChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );

  const ActionRow = ({ 
    icon, 
    title, 
    description, 
    onPress,
    danger = false
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    onPress: () => void;
    danger?: boolean;
  }) => (
    <button
      onClick={onPress}
      className={`w-full flex items-center py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
        danger ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
        danger ? 'bg-red-100 dark:bg-red-900/20' : 'bg-gray-100 dark:bg-gray-800'
      }`}>
        {icon}
      </div>
      <div className="text-left">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </button>
  );

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
          <h1 className="text-2xl font-display font-bold text-white">Settings</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-white rounded-t-3xl p-6 min-h-[80vh]">
        <div className="max-w-4xl mx-auto">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/settings/account"
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Account Settings</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account preferences</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/company"
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-4">
                    <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">My Businesses</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View and manage your businesses</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/favorites"
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Favorites</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your saved businesses</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/settings/privacy"
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Privacy & Security</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage your privacy settings</p>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            id="account-settings"
            className="mb-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editData.firstName : userData.firstName}
                      onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editData.lastName : userData.lastName}
                      onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={isEditing ? editData.email : userData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={isEditing ? editData.phone : userData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={isEditing ? editData.businessName : userData.businessName}
                    onChange={(e) => setEditData({...editData, businessName: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={isEditing ? editData.website : userData.website}
                    onChange={(e) => setEditData({...editData, website: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveAccount}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Save size={16} />
                      Save Changes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setEditData(userData);
                        setIsEditing(false);
                        setErrors({});
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Cancel
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Privacy & Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            id="privacy-security"
            className="mb-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Security</h2>
              
              <div className="space-y-1">
                <SettingRow
                  icon={<Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  title="Public Profile"
                  description="Allow other users to view your profile"
                  value={settings.profileVisibility}
                  onValueChange={(value) => updateSetting('profileVisibility', value)}
                />

                <SettingRow
                  icon={<Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  title="Contact Information"
                  description="Show your contact details to other users"
                  value={settings.contactInfoVisible}
                  onValueChange={(value) => updateSetting('contactInfoVisible', value)}
                />

                <SettingRow
                  icon={<Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  title="Business Information"
                  description="Display your business details publicly"
                  value={settings.businessInfoVisible}
                  onValueChange={(value) => updateSetting('businessInfoVisible', value)}
                />

                <SettingRow
                  icon={<Users className="w-5 h-5 text-green-600 dark:text-green-400" />}
                  title="Direct Messages"
                  description="Allow other users to send you messages"
                  value={settings.allowDirectMessages}
                  onValueChange={(value) => updateSetting('allowDirectMessages', value)}
                />

                <SettingRow
                  icon={<Bell className="w-5 h-5 text-green-600 dark:text-green-400" />}
                  title="Email Notifications"
                  description="Receive important updates via email"
                  value={settings.emailNotifications}
                  onValueChange={(value) => updateSetting('emailNotifications', value)}
                />

                <SettingRow
                  icon={<Bell className="w-5 h-5 text-green-600 dark:text-green-400" />}
                  title="Push Notifications"
                  description="Get notifications on your device"
                  value={settings.pushNotifications}
                  onValueChange={(value) => updateSetting('pushNotifications', value)}
                />

                <SettingRow
                  icon={<Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />}
                  title="Marketing Emails"
                  description="Receive promotional content and updates"
                  value={settings.marketingEmails}
                  onValueChange={(value) => updateSetting('marketingEmails', value)}
                />

                <SettingRow
                  icon={<Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                  title="Dark Mode"
                  description="Use dark theme throughout the app"
                  value={settings.darkMode}
                  onValueChange={(value) => updateSetting('darkMode', value)}
                />

                <SettingRow
                  icon={<Shield className="w-5 h-5 text-red-600 dark:text-red-400" />}
                  title="Data Collection"
                  description="Allow collection of usage data to improve the app"
                  value={settings.dataCollection}
                  onValueChange={(value) => updateSetting('dataCollection', value)}
                />

                <SettingRow
                  icon={<Eye className="w-5 h-5 text-red-600 dark:text-red-400" />}
                  title="Analytics Tracking"
                  description="Share anonymous analytics data"
                  value={settings.analyticsTracking}
                  onValueChange={(value) => updateSetting('analyticsTracking', value)}
                />
              </div>
            </div>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Actions</h2>
              
              <div className="space-y-1">
                <ActionRow
                  icon={<HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  title="Help & Support"
                  description="Get help or contact support"
                  onPress={() => {
                    window.location.href = "mailto:help@holymarket.co.za?subject=Support Request";
                  }}
                />

                <ActionRow
                  icon={<FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  title="Privacy Policy / Terms of Service"
                  description="View our privacy policy and terms"
                  onPress={() => {
                    window.open("https://holy-market-next.vercel.app/about", "_blank");
                  }}
                />

                <ActionRow
                  icon={<Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  title="Download My Data"
                  description="Export your account data"
                  onPress={() => {
                    try {
                      const userData = {
                        profile: user,
                        business: business,
                        settings: settings
                      };
                      const dataStr = JSON.stringify(userData, null, 2);
                      const dataBlob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(dataBlob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `holymarket-data-${new Date().toISOString().split('T')[0]}.json`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    } catch (error) {
                      toast.error("Failed to export data. Please try again.");
                    }
                  }}
                />

                <ActionRow
                  icon={<LogOut className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />}
                  title="Logout"
                  description="Sign out of your account"
                  onPress={handleLogout}
                />

                <ActionRow
                  icon={<Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />}
                  title="Delete Account"
                  description="Permanently delete your account and all data"
                  onPress={handleDeleteAccount}
                  danger={true}
                />
              </div>
            </div>
          </motion.div>

          {/* Save Settings Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveSettings}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Save All Settings
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
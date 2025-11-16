"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Phone, Lock, Building2, Globe } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function AccountSettingsPage() {
    const { user, updateUserProfile, resetPassword } = useAuth();
    const router = useRouter();
    const [business, setBusiness] = useState<any | null>(null);
    
    useEffect(() => {
        try {
            const saved = localStorage.getItem('businessProfile');
            setBusiness(saved ? JSON.parse(saved) : null);
        } catch { }
    }, []);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        website: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            }));
        }
        if (business) {
            setForm(prev => ({
                ...prev,
                businessName: business.businessName || "",
                website: business.website || "",
            }));
        }
    }, [user, business]);

    const onSave = async () => {
        if (!form.name.trim()) {
            toast.error("Name is required");
            return;
        }
        setSaving(true);
        const ok = await updateUserProfile({ name: form.name, phone: form.phone });
        setSaving(false);
        if (ok) {
            // Update business profile if business name or website changed
            if (business && (form.businessName !== business.businessName || form.website !== business.website)) {
                try {
                    const updatedBusiness = { ...business, businessName: form.businessName, website: form.website };
                    localStorage.setItem('businessProfile', JSON.stringify(updatedBusiness));
                } catch { }
            }
        }
    };

    const onPasswordReset = async () => {
        if (!form.email) {
            toast.error("Email is required");
            return;
        }
        const ok = await resetPassword(form.email);
        if (ok) {
            // Success - no toast needed per requirements
        } else {
            toast.error("Failed to send password reset email. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <header className="relative p-6 pt-12">
                <div className="flex items-center justify-between">
                    <Link href="/dashboard" className="p-2 bg-white/20 rounded-full">
                        <ArrowLeft size={24} className="text-white" />
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Account Settings</h1>
                    <div className="w-10" />
                </div>
            </header>

            <main className="bg-white rounded-t-3xl p-6 min-h-[80vh]">
                <div className="max-w-2xl mx-auto space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold mb-4">Profile</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full pl-10 pr-3 py-3 border rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input value={form.email} disabled className="w-full pl-10 pr-3 py-3 border rounded-lg bg-gray-50 text-gray-600" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full pl-10 pr-3 py-3 border rounded-lg" />
                                </div>
                            </div>
                            {business && (
                                <>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Business Name</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} className="w-full pl-10 pr-3 py-3 border rounded-lg" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Website</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="w-full pl-10 pr-3 py-3 border rounded-lg" placeholder="https://yourwebsite.com" />
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="flex gap-3">
                                <button onClick={onSave} disabled={saving} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <button onClick={onPasswordReset} className="px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                                    <Lock size={18} /> Send Password Reset
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}


"use client";

import { motion } from "framer-motion";
import { Heart, User, Settings, LogIn, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import toast from "react-hot-toast";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  backPath?: string;
}

export default function Header({ title, showBackButton = false, backPath }: HeaderProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleBackClick = () => {
    if (backPath) {
      router.push(backPath);
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-200 dark:bg-gray-300 backdrop-blur-md border-b border-gray-300 dark:border-gray-400">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          {showBackButton && (
            <motion.button
              onClick={handleBackClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </motion.button>
          )}
          <Heart className="w-8 h-8 text-black" />
          <h1 className="text-2xl font-display font-bold text-black">
            {title || "HOLY-MARKET"}
          </h1>
        </motion.div>
        
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                >
                  <User className="w-5 h-5 text-black" />
                </motion.button>
              </Link>
              <motion.button
                onClick={async () => {
                  await signOut();
                  toast.success("Signed out successfully!");
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
              >
                <LogIn className="w-5 h-5 text-black" />
              </motion.button>
            </>
          ) : (
            <Link href="/add-business">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-black/10 text-black font-semibold rounded-lg hover:bg-black/20 transition-colors"
              >
                Add Your Business
              </motion.button>
            </Link>
          )}
          <Link href="/settings">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            >
              <Settings className="w-5 h-5 text-black" />
            </motion.button>
          </Link>
        </div>
      </div>
    </header>
  );
}
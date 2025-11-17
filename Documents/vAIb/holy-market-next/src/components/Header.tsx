"use client";

import { motion } from "framer-motion";
import { User, Settings, LogIn, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import toast from "react-hot-toast";
import CrossDollarIcon from "./CrossDollarIcon";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  backPath?: string;
}

export default function Header({ title, showBackButton = false, backPath }: HeaderProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <header className="sticky top-0 z-50 bg-purple-600/80 dark:bg-purple-700/80 backdrop-blur-md border-b border-purple-500 dark:border-purple-600">
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
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
          )}
          <CrossDollarIcon className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-display font-bold text-white">
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
                  className="p-2 rounded-full bg-green-500/20 hover:bg-green-500/30 transition-colors"
                >
                  <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                </motion.button>
              </Link>
              <motion.button
                onClick={async () => {
                  await signOut();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors"
              >
                <LogIn className="w-5 h-5 text-red-600 dark:text-red-400" />
              </motion.button>
            </>
          ) : (
            <Link href={typeof window !== 'undefined' && localStorage.getItem('hasBusiness') === 'true' ? "/dashboard?tab=business" : "/add-business"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors"
              >
                {typeof window !== 'undefined' && localStorage.getItem('hasBusiness') === 'true' ? 'My Business' : 'Add Your Business'}
              </motion.button>
            </Link>
          )}
          <Link href="/settings">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
            >
              <Settings className="w-5 h-5 text-white" />
            </motion.button>
          </Link>
        </div>
      </div>
    </header>
  );
}
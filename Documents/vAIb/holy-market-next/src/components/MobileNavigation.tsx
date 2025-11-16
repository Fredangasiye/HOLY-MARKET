"use client";

import { motion } from "framer-motion";
import { Church, Building2, Info, Users, BookOpen, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      icon: Church,
      label: "Home",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      href: "/dashboard",
      icon: Building2,
      label: "Dashboard",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      href: "/christian-businesses",
      icon: Users,
      label: "Browse",
      color: "text-green-600 dark:text-green-400"
    },
    {
      href: "/christian-catalogue",
      icon: BookOpen,
      label: "Catalogue",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      href: "/about",
      icon: Info,
      label: "About",
      color: "text-gray-600 dark:text-gray-400"
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-white/10 shadow-2xl z-40" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex justify-around items-center py-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200">
              <motion.div
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${isActive
                  ? 'bg-gray-900 dark:bg-white/10 shadow-lg'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon
                  size={20}
                  className={`transition-colors duration-200 ${isActive
                    ? 'text-white'
                    : item.color
                    }`}
                />
              </motion.div>
              <span className={`text-xs font-medium transition-colors duration-200 ${isActive
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400'
                }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
    </nav>
  );
}
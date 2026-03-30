"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Settings,
  LogOut,
  Plus,
  Menu,
  X,
  CreditCard,
} from "lucide-react";
import { useState, ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    {
      name: "My Contributions",
      icon: Layers,
      href: "/dashboard/contributions",
    },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-[260px] bg-[#0D1F14] flex-col justify-between fixed h-screen z-40">
        <div className="p-8 pb-12">
          <Link
            href="/"
            className="text-[#C8F275] font-black text-2xl tracking-tighter"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            chipam
          </Link>

          <nav className="mt-12 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all group ${
                    isActive
                      ? "bg-white/10 text-[#C8F275] border-l-4 border-[#C8F275] rounded-l-none"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={
                      isActive
                        ? "text-[#C8F275]"
                        : "text-white/30 group-hover:text-white/60"
                    }
                  />
                  <span className="text-sm font-bold tracking-tight">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-[10px] bg-white/5 mb-4">
            <div className="w-10 h-10 rounded-[8px] bg-[#1A7A4A] flex items-center justify-center text-white font-black text-xs">
              AO
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-xs font-bold truncate">Amaka Obi</p>
              <p className="text-white/40 text-[10px] truncate">
                amaka@ui.edu.ng
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 w-full px-4 py-3 text-white/50 hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded-[10px] transition-all group"
          >
            <LogOut size={18} />
            <span className="text-xs font-bold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen min-w-0 w-full overflow-x-hidden">
        {/* Top Bar */}
        <header className="h-16 md:h-20 bg-[#F7F5EF]/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              className="md:hidden p-2 text-[#0D1F14] -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1
              className="text-lg md:text-2xl font-black text-[#0D1F14] tracking-tight truncate max-w-[150px] sm:max-w-none"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {title}
            </h1>
          </div>

          <button
            onClick={() => router.push("/dashboard/create")}
            className="bg-[#1A7A4A] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-[10px] text-[10px] md:text-xs font-bold flex items-center gap-2 hover:scale-[1.02] transition-all active:scale-[0.98]"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Contribution</span>
            <span className="sm:hidden">New</span>
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-10 flex-1">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#0D1F14] z-[60] md:hidden flex flex-col justify-between p-8"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <span
                    className="text-[#C8F275] font-black text-2xl tracking-tighter"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    chipam
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/40 p-1"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-4 rounded-[10px] ${
                          isActive
                            ? "bg-[#C8F275] text-[#0D1F14]"
                            : "text-white/50"
                        }`}
                      >
                        <item.icon size={20} />
                        <span className="text-base font-bold tracking-tight">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div>
                <div className="flex items-center gap-3 p-4 rounded-[10px] bg-white/5 mb-6">
                  <div className="w-12 h-12 rounded-[8px] bg-[#1A7A4A] flex items-center justify-center text-white font-black">
                    AO
                  </div>
                  <div>
                    <p className="text-white font-bold leading-none mb-1">
                      Amaka Obi
                    </p>
                    <p className="text-white/40 text-xs">amaka@ui.edu.ng</p>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/")}
                  className="flex items-center gap-3 w-full px-4 py-4 text-[#FF3B30] bg-[#FF3B30]/10 rounded-[10px]"
                >
                  <LogOut size={20} />
                  <span className="font-bold">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

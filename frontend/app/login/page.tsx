"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false); // For demonstrating error state

  return (
    <AuthLayout tagline="Welcome back. Your group is waiting.">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <div className="mb-10 text-center md:text-left">
          <h2
            className="text-3xl font-black mb-3 text-[#0D1F14]"
            style={{ fontFamily: "Lexend, sans-serif" }}
          >
            Welcome back
          </h2>
          <p className="text-[#6B7280] font-medium text-sm opacity-70">
            "No more drama over who paid." Ready to collect?
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#FFF0F0] border border-[#FF3B30]/20 rounded-[10px] flex items-center gap-3 text-[#FF3B30] text-sm font-medium animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={18} />
            Invalid email or password. Please try again.
          </div>
        )}

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setError(true); // Mock error on first try
          }}
        >
          <div className="space-y-2 text-left">
            <label className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#1A7A4A] focus:border-[#1A7A4A] outline-none transition-all placeholder:text-[#6B7280]/40"
              autoFocus
            />
          </div>

          <div className="space-y-2 text-left">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[10px] font-bold uppercase tracking-widest text-[#1A7A4A] hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative text-left">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#1A7A4A] focus:border-[#1A7A4A] outline-none transition-all placeholder:text-[#6B7280]/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="pill-button w-full bg-[#0D1F14] text-white py-3.5 font-bold text-sm mt-4 hover:opacity-90 transition-all active:scale-[0.98]">
            Log in
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-[rgba(0,0,0,0.05)] text-center">
          <p className="text-sm text-[#6B7280]">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#1A7A4A] font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </AuthLayout>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const strengthLevels = ["Weak", "Fair", "Strong", "Great"];
  const getStrength = (pwd: string) => {
    if (pwd.length === 0) return -1;
    if (pwd.length < 5) return 0;
    if (pwd.length < 8) return 1;
    if (pwd.length < 12) return 2;
    return 3;
  };

  const strength = getStrength(password);
  const strengthColors = [
    "bg-[#FF3B30]",
    "bg-[#FFCC00]",
    "bg-[#4CD964]",
    "bg-[#1A7A4A]",
  ];

  return (
    <AuthLayout tagline="No more drama over who paid.">
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
            Create your account
          </h2>
          <p className="text-[#6B7280] font-medium text-sm">
            Start collecting in minutes.
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Amaka Obi"
              className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#1A7A4A] focus:border-[#1A7A4A] outline-none transition-all placeholder:text-[#6B7280]/40"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#1A7A4A] focus:border-[#1A7A4A] outline-none transition-all placeholder:text-[#6B7280]/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
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

            {/* Strength Indicator */}
            {password.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1 h-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-[10px] transition-colors ${i <= strength ? strengthColors[strength] : "bg-[rgba(0,0,0,0.05)]"}`}
                    />
                  ))}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] flex justify-between">
                  <span>{strength >= 0 ? strengthLevels[strength] : ""}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Repeat your password"
                className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#1A7A4A] focus:border-[#1A7A4A] outline-none transition-all placeholder:text-[#6B7280]/40"
              />
            </div>
          </div>

          <button className="pill-button w-full bg-[#0D1F14] text-white py-3.5 font-bold text-sm mt-4 hover:opacity-90 transition-all active:scale-[0.98]">
            Create account
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-[rgba(0,0,0,0.05)] text-center">
          <p className="text-sm text-[#6B7280]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#1A7A4A] font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
          <div className="mt-8 text-[10px] text-[#6B7280]/60 max-w-[300px] mx-auto leading-relaxed">
            By signing up you agree to our{" "}
            <Link href="#" className="text-[#1A7A4A] font-bold hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-[#1A7A4A] font-bold hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  );
}

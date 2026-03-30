"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Lock, Mail, CheckCircle } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setCountdown(60);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="text-center">
        {!isSuccess ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
                      <div className="mb-10 text-center md:text-left">

              <h1
                className="text-2xl font-black mb-4 text-[#1A1A1A]"
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
                Forgot your password?
              </h1>
              <p className="text-[#6B7280] text-sm mb-10 font-medium leading-relaxed">
                Enter your email and we'll send you a reset link. No drama
                should come from losing access.
              </p>
              </div>

              <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                      size={18}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-xl px-4 py-4 pl-12 text-sm focus:ring-2 focus:ring-[#1A7A4A] focus:border-[#1A7A4A] outline-none transition-all placeholder:text-[#6B7280]/40"
                      autoFocus
                    />
                  </div>
                </div>

                <button className="pill-button w-full bg-[#0D1F14] text-white py-4 font-bold text-sm shadow-xl hover:shadow-[#0D1F14]/20 transition-all active:scale-[0.98]">
                  Send reset link
                </button>
              </form>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A7A4A] mt-8 hover:gap-3 transition-all"
              >
                <ArrowLeft size={16} /> Back to login
              </Link>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6"
          >
            <div className="w-20 h-20 bg-[#E6F5ED] rounded-full flex items-center justify-center text-[#2EA366] mx-auto mb-8 relative">
              <CheckCircle size={40} />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-[#C8F275]/40"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>

            <h1
              className="text-2xl font-black mb-4 text-[#1A1A1A]"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              Check your inbox
            </h1>
            <p className="text-sm text-[#6B7280] mb-10 font-medium px-4">
              We sent a reset link to{" "}
              <span className="text-[#1A1A1A] font-bold">{email}</span>. Check
              your spam if you don't see it.
            </p>

            <button
              disabled={countdown > 0}
              className={`text-xs font-black uppercase tracking-widest transition-colors ${countdown > 0 ? "text-[#6B7280]/40 cursor-not-allowed" : "text-[#1A7A4A] hover:underline"}`}
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend email"}
            </button>
          </motion.div>
        )}
      </div>
    </AuthLayout>
  );
}

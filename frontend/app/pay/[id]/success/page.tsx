"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Share2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
 

      <div className="max-w-md w-full relative z-10 space-y-10">
        <Link
          href="/"
          className="inline-block text-[#1A7A4A] font-black text-3xl tracking-tighter mb-4"
          style={{ fontFamily: "Lexend, sans-serif" }}
        >
          chipam
        </Link>

        <div className="bg-white rounded-[10px] p-10 md:p-12 shadow-2xl shadow-[rgba(26,122,74,0.1)] border border-[rgba(26,122,74,0.08)] transform hover:scale-[1.01] transition-transform">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              damping: 12,
              stiffness: 200,
              delay: 0.2,
            }}
            className="w-24 h-24 bg-[#E6F5ED] rounded-[10px] flex items-center justify-center text-[#1A7A4A] mx-auto mb-8 shadow-inner"
          >
            <CheckCircle2 size={48} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1
              className="text-3xl font-black text-[#1A1A1A] mb-4 tracking-tighter"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              Payment Received!
            </h1>
            <p className="text-[#6B7280] text-base font-medium leading-relaxed mb-10">
              Your contribution has been verified by Paystack and credited to
              the pool. A receipt has been sent to your email.
            </p>

            <div className="space-y-4 pt-8 border-t border-[#F7F5EF]">
              <div className="flex items-center justify-between text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                  Amount Paid
                </span>
                <span className="text-lg font-black text-[#1A7A4A]">
                  ₦15,000.00
                </span>
              </div>
              <div className="flex items-center justify-between text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                  Time Received
                </span>
                <span className="text-xs font-bold text-[#1A1A1A]">
                  Just now
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col gap-4"
        >
          <button className="pill-button bg-[#0D1F14] text-white py-4 px-8 font-bold text-sm flex items-center justify-center gap-3 shadow-xl hover:shadow-[#0D1F14]/20 transition-all">
            Share this contribution <Share2 size={18} />
          </button>
          <Link
            href="/"
            className="text-xs font-black uppercase tracking-widest text-[#1A7A4A] hover:underline flex items-center justify-center gap-2"
          >
            Back to homepage <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="pt-10 flex items-center justify-center gap-2 opacity-30">
          <ShieldCheck size={14} className="text-[#1A7A4A]" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            SECURE TRANSACTION
          </span>
        </div>
      </div>
    </div>
  );
}

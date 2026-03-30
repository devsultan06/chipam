"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Users,
  Calendar,
  Info,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublicPaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const contribution = {
    name: "Final Year Dinner 🎓",
    description:
      "End of year celebration and networking event for all 400L students of Department of Economics. Fee covers dinner, awards, and the alumni brochure.",
    amount: 15000,
    collected: 105000,
    target: 150000,
    membersPaid: 7,
    expectedMembers: 10,
    deadline: "Dec 30, 2026",
    creator: "Amaka Obi",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Mock Paystack behavior
    setTimeout(() => {
      router.push(`/pay/${params.id}/success`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col items-center py-12 px-6 sm:py-20 overflow-x-hidden relative">
      {/* Background Ornament */}
      <div
        className="absolute top-0 inset-x-0 h-64 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1A7A4A 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10 space-y-10"
      >
        <div className="text-center group">
          <Link
            href="/"
            className="inline-block text-[#1A7A4A] font-black text-3xl tracking-tighter mb-4"
            style={{ fontFamily: "Lexend, sans-serif" }}
          >
            chipam
          </Link>
        </div>

        <div className="bg-white rounded-[10px] shadow-2xl shadow-[rgba(0,0,0,0.05)] border border-[rgba(26,122,74,0.1)] overflow-hidden">
          {/* Header Section */}
          <div className="p-8 md:p-12 border-b border-[rgba(26,122,74,0.08)] bg-white">
            <h1
              className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-4 tracking-tighter text-balance"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              {contribution.name}
            </h1>
            <p className="text-[#6B7280] text-sm font-medium leading-relaxed max-w-lg mb-8 opacity-80">
              {contribution.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[rgba(26,122,74,0.08)] text-[10px] font-black tracking-widest uppercase text-[#1A7A4A]">
                <Users size={12} /> {contribution.membersPaid} /{" "}
                {contribution.expectedMembers} PAID
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[rgba(26,122,74,0.08)] text-[10px] font-black tracking-widest uppercase text-[#6B7280]">
                <Calendar size={12} /> DEADLINE {contribution.deadline}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Progress */}
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                  Current Pool
                </p>
                <h2
                  className="text-4xl font-black text-[#1A1A1A] tracking-tighter"
                  style={{ fontFamily: "Lexend, sans-serif" }}
                >
                  ₦{contribution.collected.toLocaleString()}
                  <span className="text-sm font-normal text-[#6B7280] ml-2 opacity-50 tracking-normal">
                    collected
                  </span>
                </h2>
                <div className="w-full h-2 bg-[#F7F5EF] rounded-full overflow-hidden mt-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-[#1A7A4A] rounded-full"
                  />
                </div>
              </div>

              <div className="p-5 bg-[#F0EBD8] rounded-[10px] border border-[#D97706]/10 flex gap-4">
                <Info size={20} className="text-[#D97706] shrink-0" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#D97706] mb-1">
                    Creator Note
                  </p>
                  <p className="text-xs text-[#614D0E] font-medium leading-relaxed">
                    Payments are verified instantly via Paystack. Your receipt
                    will be sent to your email.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E6F5ED] flex items-center justify-center text-[#1A7A4A] font-black text-xs">
                  AO
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] opacity-60">
                    Created by
                  </p>
                  <p className="text-sm font-black text-[#1A1A1A]">
                    {contribution.creator}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">
                  Your Recognition Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amaka Obi"
                  required
                  className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-4 px-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">
                  Email for Receipt
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-4 px-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all"
                />
              </div>

              <div className="p-6 bg-[#0D1F14] rounded-[10px] text-center space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#C8F275] opacity-60">
                  Amount to Pay
                </p>
                <p
                  className="text-4xl font-black text-white tracking-tighter"
                  style={{ fontFamily: "Lexend, sans-serif" }}
                >
                  ₦{contribution.amount.toLocaleString()}
                </p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`pill-button w-full bg-[#1A7A4A] text-[#C8F275] py-5 px-10 font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-[0.98] ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-[#C8F275] border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Pay with Paystack <ArrowRight size={20} />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-[#6B7280] font-bold uppercase tracking-widest">
                No hidden fees for you.
              </p>
            </form>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] opacity-40 leading-relaxed">
            Securely processed by Paystack. <br />
            Chipam is not a bank. Funds are held and verified by Paystack
            (E-licensed).
          </p>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  Users,
  Info,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateContribution() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    deadline: "",
    expectedMembers: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock submit
    setTimeout(() => {
      router.push("/dashboard/contributions/1");
    }, 1500);
  };

  const targetAmount =
    (Number(formData.amount) || 0) * (Number(formData.expectedMembers) || 0);

  return (
    <DashboardLayout title="Create Contribution">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#1A7A4A] transition-colors"
        >
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <div className="bg-white rounded-[10px] p-6 md:p-12 shadow-2xl shadow-[rgba(0,0,0,0.05)] border border-[rgba(26,122,74,0.1)] relative overflow-hidden">
          <div className="mb-8 md:mb-12">
            <h1
              className="text-2xl md:text-4xl font-black text-[#1A1A1A] mb-3 md:mb-4 tracking-tighter"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              New Contribution
            </h1>
            <p className="text-[#6B7280] font-medium text-[13px] md:text-sm max-w-md">
              Fill in the details below to start collecting. You'll get a
              shareable link instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 text-left">
            {/* Section: Basic Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#1A7A4A] mb-2">
                <Sparkles size={18} />
                <h3 className="text-xs font-black uppercase tracking-widest">
                  Basic Information
                </h3>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
                  What's it for?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Final Year Dinner 🎓"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-5 px-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
                  Description (Optional)
                </label>
                <textarea
                  placeholder="Tell people why they're contributing..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-5 px-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all resize-none"
                />
              </div>
            </div>

            {/* Section: Money & People */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[rgba(26,122,74,0.08)]">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#1A7A4A] mb-2">
                  <span className="text-lg">₦</span>
                  <h3 className="text-xs font-black uppercase tracking-widest">
                    Amount & Goal
                  </h3>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
                    Amount per person (₦)
                  </label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6B7280] font-bold">
                      ₦
                    </span>
                    <input
                      type="number"
                      placeholder="5,000"
                      required
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-5 pl-10 pr-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
                    Expected members
                  </label>
                  <div className="relative">
                    <Users
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6B7280]"
                      size={18}
                    />
                    <input
                      type="number"
                      placeholder="20"
                      value={formData.expectedMembers}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expectedMembers: e.target.value,
                        })
                      }
                      className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-5 pl-14 pr-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#1A7A4A] mb-2">
                  <Calendar size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest">
                    Timeline
                  </h3>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
                    Collection Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                    className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-5 px-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all"
                  />
                </div>

                {/* Live Preview Card */}
                <div className="mt-6 p-6 bg-[#E6F5ED] rounded-[10px] border border-[#1A7A4A]/10">
                  <p className="text-[10px] font-black text-[#1A7A4A] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Info size={12} /> Target Estimate
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <h4
                        className="text-2xl font-black text-[#0D1F14] tracking-tighter"
                        style={{ fontFamily: "Lexend, sans-serif" }}
                      >
                        ₦{targetAmount.toLocaleString()}
                      </h4>
                      <p className="text-[10px] text-[#1A7A4A] font-bold">
                        Total potential pool
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-[#0D1F14]">₦50</p>
                      <p className="text-[10px] text-[#6B7280] font-bold">
                        Fee / pay
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-[#0D1F14] text-[#C8F275] py-5 px-10 rounded-[10px] font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-[0.98] w-full ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
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
                    Create Contribution <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#6B7280] opacity-50">
                <Lock size={12} /> Encrypted
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#6B7280] opacity-50">
                <CheckCircle2 size={12} /> Paystack Ready
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

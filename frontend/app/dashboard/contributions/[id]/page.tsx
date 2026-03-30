"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Share2,
  Edit,
  Trash2,
  Copy,
  Mail,
  Calendar,
  Users,
  Target,
  ArrowLeft,
  MessageCircle,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { useState } from "react";

export default function ContributionDetail() {
  const [activeTab, setActiveTab] = useState("members");
  const [copied, setCopied] = useState(false);

  const contribution = {
    id: 1,
    name: "Final Year Dinner 🎓",
    description:
      "End of year celebration and networking event for all 400L students of Department of Economics. Fee covers dinner, awards, and the alumni brochure.",
    amount: 15000,
    collected: 105000,
    target: 150000,
    expectedMembers: 10,
    paidMembers: 7,
    deadline: "Dec 30, 2026",
    daysLeft: 5,
    status: "Active",
    link: "localhost:3000/pay/final-year-dinner-2026",
  };

  const members = [
    {
      name: "Amaka Obi",
      email: "amaka@ui.edu.ng",
      amount: 15000,
      status: "Paid",
      date: "Oct 12, 2026",
      ref: "PS_TRX_92837492",
    },
    {
      name: "Bayo Salami",
      email: "bayo.s@gmail.com",
      amount: 15000,
      status: "Pending",
      date: "—",
      ref: "—",
    },
    {
      name: "Chiamaka Nze",
      email: "nze.chia@yahoo.com",
      amount: 15000,
      status: "Paid",
      date: "Oct 14, 2026",
      ref: "PS_TRX_83749210",
    },
    {
      name: "Dapo Akande",
      email: "d.akande@unilag.edu.ng",
      amount: 15000,
      status: "Pending",
      date: "—",
      ref: "—",
    },
    {
      name: "Ebele Okorie",
      email: "ebelek@gmail.com",
      amount: 15000,
      status: "Paid",
      date: "Oct 15, 2026",
      ref: "PS_TRX_73629103",
    },
    {
      name: "Femi Adesina",
      email: "femi.ade@outlook.com",
      amount: 15000,
      status: "Paid",
      date: "Oct 15, 2026",
      ref: "PS_TRX_62518092",
    },
    {
      name: "Gloria Udoh",
      email: "g.udoh@uniben.edu.ng",
      amount: 15000,
      status: "Paid",
      date: "Oct 16, 2026",
      ref: "PS_TRX_51407981",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(contribution.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout title="Contribution Detail">
      <div className="space-y-6 md:space-y-10 max-w-6xl mx-auto">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/contributions"
            className="group flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#1A7A4A] transition-colors"
          >
            <div className="w-8 h-8 rounded-[8px] bg-white border border-[rgba(26,122,74,0.1)] flex items-center justify-center group-hover:bg-[#F7F5EF] transition-all shadow-sm">
              <ArrowLeft size={16} />
            </div>
            <span>My Contributions</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="pill-button px-5 py-2.5 text-xs font-black uppercase tracking-widest text-[#6B7280] bg-white border border-[rgba(26,122,74,0.1)] flex items-center gap-2 hover:bg-[#F7F5EF] transition-all">
              <Edit size={14} /> Edit
            </button>
            <button className="pill-button px-5 py-2.5 text-xs font-black uppercase tracking-widest text-[#FF3B30] bg-[#FFF0F0] border border-[#FF3B30]/10 flex items-center gap-2 hover:bg-[#FF3B30] hover:text-white transition-all">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-[10px] p-6 md:p-12 shadow-xl shadow-[rgba(0,0,0,0.05)] border border-[rgba(26,122,74,0.1)] relative overflow-hidden">
          {/* Subtle Glow Blob */}
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#C8F275]/10 rounded-full blur-[80px] -z-0" />

          <div className="relative z-10 flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-8">
              <div>
                <span className="px-3 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-widest text-[#1A7A4A] bg-[#E6F5ED] mb-6 inline-block shadow-sm">
                  Active
                </span>
                <h1
                  className="text-3xl md:text-5xl font-black text-[#1A1A1A] mb-4 md:mb-6 tracking-tighter leading-none"
                  style={{ fontFamily: "Lexend, sans-serif" }}
                >
                  {contribution.name}
                </h1>
                <p className="text-[#6B7280] text-lg font-medium leading-relaxed max-w-2xl opacity-80">
                  {contribution.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] opacity-60">
                    Per Person
                  </p>
                  <p className="text-xl font-bold text-[#1A1A1A]">
                    ₦{contribution.amount.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] opacity-60">
                    Total Collected
                  </p>
                  <p className="text-xl font-bold text-[#1A7A4A]">
                    ₦{contribution.collected.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] opacity-60">
                    Target
                  </p>
                  <p className="text-xl font-bold text-[#1A1A1A]">
                    ₦{contribution.target.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] opacity-60">
                    Deadline
                  </p>
                  <p className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
                    <Clock size={18} className="text-[#6B7280]" />{" "}
                    {contribution.daysLeft}d left
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                  <span className="text-[#1A7A4A] bg-[#C8F275]/30 px-3 py-1 rounded-[10px]">
                    65% COMPLETED
                  </span>
                  <span className="text-[#6B7280] flex items-center gap-1">
                    <Users size={14} /> {contribution.paidMembers} of{" "}
                    {contribution.expectedMembers} people paid
                  </span>
                </div>
                <div className="w-full h-4 bg-[#F7F5EF] rounded-[10px] overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1 }}
                    className="h-full bg-[#1A7A4A] rounded-[10px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-6 items-center bg-[#0D1F14] rounded-[10px] p-6 md:p-8 border border-white/5 relative overflow-hidden">
          {/* Tile Grid Effect */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10">
            <h3
              className="text-xl font-black text-[#C8F275] mb-2 leading-none uppercase tracking-widest text-sm"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              Collect Payments
            </h3>
            <p className="text-white/50 text-xs font-medium mb-6">
              Everyone can pay via this link — no account needed for them.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 group">
                <input
                  type="text"
                  value={contribution.link}
                  readOnly
                  className="w-full bg-white/10 border border-white/10 rounded-[10px] py-4 pl-4 pr-32 text-sm text-white font-mono outline-none group-hover:bg-white/[0.15] transition-all"
                />
                <button
                  onClick={handleCopy}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#C8F275] text-[#0D1F14] px-4 py-2.5 rounded-[10px] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all active:scale-[0.98]"
                >
                  <Copy size={14} /> {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>

              <button className="pill-button bg-[#25D366] text-white px-8 py-4 font-bold text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                <MessageCircle size={20} /> Share on WhatsApp
              </button>
            </div>
          </div>

          <div className="relative z-10 hidden md:block pl-10 border-l border-white/10">
            <div className="w-32 h-32 bg-white rounded-[10px] p-4 shadow-2xl scale-110">
              <div className="w-full h-full bg-[#F7F5EF] rounded-[8px] flex items-center justify-center text-[#6B7280]">
                <span className="text-[10px] font-black uppercase tracking-widest text-center leading-none">
                  Scan to
                  <br />
                  Pay <span className="text-xl block mt-1">📱</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-between border-b border-[rgba(26,122,74,0.1)] pb-2">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("members")}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === "members" ? "text-[#1A7A4A]" : "text-[#6B7280]"}`}
            >
              Member List ({members.length})
              {activeTab === "members" && (
                <motion.div
                  layoutId="tab"
                  className="absolute bottom-[-1px] left-0 right-0 h-1 bg-[#1A7A4A] rounded-[10px]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("payout")}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === "payout" ? "text-[#1A7A4A]" : "text-[#6B7280]"}`}
            >
              Payout Summary
              {activeTab === "payout" && (
                <motion.div
                  layoutId="tab"
                  className="absolute bottom-[-1px] left-0 right-0 h-1 bg-[#1A7A4A] rounded-[10px]"
                />
              )}
            </button>
          </div>

          <button className="pill-button px-5 py-2.5 bg-[#1A7A4A] text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all">
            Remind all pending
          </button>
        </div>

        {/* Members List Table */}
        <AnimatePresence mode="wait">
          {activeTab === "members" ? (
            <motion.div
              key="members"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-[10px] border border-[rgba(26,122,74,0.12)] overflow-hidden shadow-xl shadow-[rgba(0,0,0,0.03)]"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[rgba(26,122,74,0.08)] bg-[#F7F5EF]/50">
                      <th className="px-6 md:px-8 py-5 md:py-6 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                        Name
                      </th>
                      <th className="hidden lg:table-cell px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                        Email
                      </th>
                      <th className="px-6 md:px-8 py-5 md:py-6 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                        Amount
                      </th>
                      <th className="px-6 md:px-8 py-5 md:py-6 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                        Status
                      </th>
                      <th className="hidden sm:table-cell px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                        Date Paid
                      </th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(26,122,74,0.05)]">
                    {members.map((member, i) => (
                      <tr
                        key={i}
                        className="hover:bg-[#F7F5EF]/30 transition-colors"
                      >
                        <td className="px-6 md:px-8 py-5 md:py-6">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-[8px] flex items-center justify-center font-black text-[10px] ${member.status === "Paid" ? "bg-[#E6F5ED] text-[#1A7A4A]" : "bg-[#F0EBD8] text-[#D97706]"}`}
                            >
                              {member.name.charAt(0)}
                            </div>
                            <span className="text-sm font-black text-[#1A1A1A]">
                              {member.name}
                            </span>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell px-8 py-6">
                          <span className="text-sm font-medium text-[#6B7280]">
                            {member.email}
                          </span>
                        </td>
                        <td className="px-6 md:px-8 py-5 md:py-6">
                          <span className="text-sm font-black text-[#1A1A1A]">
                            ₦{member.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 md:px-8 py-5 md:py-6">
                          <span
                            className={`px-3 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-widest shadow-sm ${member.status === "Paid" ? "bg-[#E6F5ED] text-[#1A7A4A]" : "bg-[#F0EBD8] text-[#D97706]"}`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell px-8 py-6">
                          <p className="text-sm font-medium text-[#6B7280]">
                            {member.date}
                          </p>
                          {member.ref !== "—" && (
                            <p className="text-[10px] font-mono text-[#6B7280] opacity-40">
                              {member.ref}
                            </p>
                          )}
                        </td>
                        <td className="px-8 py-6">
                          {member.status === "Pending" ? (
                            <button className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#D97706] border border-[#D97706]/20 px-3 py-1.5 rounded-[10px] hover:bg-[#D97706] hover:text-white transition-all">
                              Remind <Mail size={14} />
                            </button>
                          ) : (
                            <div className="text-[#1A7A4A] flex items-center gap-2">
                              <CheckCircle2 size={16} />{" "}
                              <span className="text-[10px] font-black uppercase tracking-widest">
                                Received
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="payout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[10px] p-12 border border-[rgba(26,122,74,0.12)] shadow-xl text-center"
            >
              <div className="w-20 h-20 bg-[#C8F275]/20 rounded-[10px] flex items-center justify-center text-[#1A7A4A] mx-auto mb-8">
                <TrendingUp size={40} />
              </div>
              <h3
                className="text-3xl font-black text-[#0D1F14] mb-8 tracking-tighter"
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
                ₦105,000 collected
              </h3>

              <div className="max-w-md mx-auto space-y-4 mb-12">
                <div className="flex justify-between items-center py-4 border-b border-[rgba(26,122,74,0.1)]">
                  <span className="text-sm font-bold text-[#6B7280]">
                    Total Gross Collected
                  </span>
                  <span className="text-sm font-black text-[#1A1A1A]">
                    ₦105,000.00
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-[rgba(26,122,74,0.1)] text-[#FF3B30]">
                  <span className="text-sm font-bold opacity-70">
                    Platform Fees (7 × ₦50)
                  </span>
                  <span className="text-sm font-black">-₦350.00</span>
                </div>
                <div className="flex justify-between items-center py-6">
                  <span
                    className="text-lg font-black text-[#0D1F14]"
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    Your Payout
                  </span>
                  <span
                    className="text-2xl font-black text-[#1A7A4A]"
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    ₦104,650.00
                  </span>
                </div>
              </div>

              <button className="pill-button bg-[#1A7A4A] text-white px-12 py-5 font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
                Request Withdrawal
              </button>
              <p className="mt-8 text-[10px] text-[#6B7280] font-bold uppercase tracking-widest opacity-60">
                Withdrawals take 24-48 hours via Paystack
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

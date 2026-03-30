"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  CreditCard,
  Mail,
  Trash2,
  Globe,
  ShieldCheck,
  Bell,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaved, setIsSaved] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "password", label: "Password", icon: Lock },
    { id: "bank", label: "Bank Details", icon: CreditCard },
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-[10px] p-10 border border-[rgba(26,122,74,0.1)] shadow-xl shadow-[rgba(0,0,0,0.03)] overflow-hidden relative">
          {/* Subtle Branded Glow */}
          <div className="absolute top-0 right-0 w-32 h-full bg-[#1A7A4A]/5 rotate-12 -z-0" />

          <div className="relative z-10 w-24 h-24 rounded-[10px] bg-[#E6F5ED] flex items-center justify-center text-[#1A7A4A] border-4 border-white shadow-xl">
            <span className="text-3xl font-black">AO</span>
          </div>
          <div className="text-center md:text-left relative z-10">
            <h2
              className="text-3xl font-black text-[#1A1A1A] mb-2 tracking-tighter"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              Amaka Obi
            </h2>
            <p className="text-[#6B7280] text-sm font-medium mb-4">
              amaka@ui.edu.ng · Member since Oct 2026
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1A7A4A]/10 text-[#1A7A4A] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#1A7A4A]/10">
                <ShieldCheck size={12} /> Verified account
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E6F5ED] text-[#1A7A4A] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#1A7A4A]/10">
                <Globe size={12} /> Creator lvl 1
              </span>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">
          {/* Sidebar Nav */}
          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-[10px] text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? "bg-[#1A7A4A] text-white"
                    : "text-[#6B7280] hover:bg-white hover:text-[#1A1A1A] border border-transparent hover:border-[rgba(26,122,74,0.1)]"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Form Content */}
          <div className="bg-white rounded-[10px] p-10 border border-[rgba(26,122,74,0.1)] shadow-xl shadow-[rgba(0,0,0,0.03)] min-h-[500px] flex flex-col justify-between overflow-hidden relative">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-xl font-black text-[#1A1A1A] mb-8 uppercase tracking-widest text-xs">
                    Profile Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                        Full Legal Name
                      </label>
                      <input
                        defaultValue="Amaka Obi"
                        className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-4 px-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                        University Email
                      </label>
                      <input
                        disabled
                        defaultValue="amaka@ui.edu.ng"
                        className="w-full bg-[#F7F5EF]/50 border-none rounded-[10px] py-4 px-6 text-sm font-bold text-[#6B7280] opacity-60 outline-none cursor-not-allowed"
                      />
                      <p className="text-[10px] font-bold text-[#6B7280] opacity-50 flex items-center gap-1.5">
                        <AlertCircle size={10} /> Email changes require
                        university validation.
                      </p>
                    </div>

                    <div className="pt-8 border-t border-[#F7F5EF] mt-8">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A] mb-6">
                        Notifications
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-[#F7F5EF]/50 rounded-[10px]">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-[10px] shadow-sm">
                              <Bell size={16} className="text-[#1A7A4A]" />
                            </div>
                            <span className="text-sm font-bold text-[#1A1A1A]">
                              New payment notifications
                            </span>
                          </div>
                          <div className="w-12 h-6 bg-[#1A7A4A] rounded-full p-1 cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "password" && (
                <motion.div
                  key="password"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-xl font-black text-[#1A1A1A] mb-8 uppercase tracking-widest text-xs">
                    Security
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-4 px-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-4 px-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "bank" && (
                <motion.div
                  key="bank"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-xl font-black text-[#1A1A1A] mb-8 uppercase tracking-widest text-xs">
                    Payout Details
                  </h3>
                  <div className="p-6 bg-[#F0EBD8] rounded-[10px] border border-[#D97706]/20 mb-10 flex gap-4">
                    <AlertCircle
                      size={24}
                      className="text-[#D97706] shrink-0"
                    />
                    <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                      Please ensure your bank name matches your Chipam account
                      name exactly. Payouts are instant to your bank account.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                          Bank Name
                        </label>
                        <select className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-4 px-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all">
                          <option>Select Bank</option>
                          <option>Access Bank</option>
                          <option>GTBank</option>
                          <option>Kuda MFB</option>
                          <option>OPay</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                          Account Number
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 0123456789"
                          className="w-full bg-[#F7F5EF] border-none rounded-[10px] py-4 px-6 text-sm font-bold text-[#1A1A1A] outline-none shadow-inner focus:ring-2 focus:ring-[#1A7A4A] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 pt-8 border-t border-[#F7F5EF] flex flex-col sm:flex-row items-center justify-between gap-6">
              <button className="text-xs font-black uppercase tracking-widest text-[#FF3B30] flex items-center gap-2 hover:underline">
                <Trash2 size={16} /> Delete Account
              </button>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                {isSaved && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-[#1A7A4A] text-xs font-bold"
                  >
                    <CheckCircle2 size={16} /> Changes saved
                  </motion.div>
                )}
                <button
                  onClick={handleSave}
                  className="bg-[#0D1F14] text-[#C8F275] px-10 py-4 rounded-[10px] font-bold text-sm active:scale-[0.98] transition-all w-full sm:w-auto"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

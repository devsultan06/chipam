"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  Share2,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { useState } from "react";

export default function ContributionsList() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Active", "Completed", "Expired"];
  const contributions = [
    {
      id: 1,
      name: "Final Year Dinner 🎓",
      amount: 15000,
      collected: 105000,
      target: 150000,
      progress: 70,
      membersPaid: 7,
      totalExpected: 10,
      deadline: "5 days left",
      status: "Active",
    },
    {
      id: 2,
      name: "Hostel Fuel Fund ⛽",
      amount: 2000,
      collected: 12000,
      target: 12000,
      progress: 100,
      membersPaid: 6,
      totalExpected: 6,
      deadline: "Completed",
      status: "Completed",
    },
    {
      id: 3,
      name: "Group Project Printing 📚",
      amount: 1500,
      collected: 4500,
      target: 7500,
      progress: 60,
      membersPaid: 3,
      totalExpected: 5,
      deadline: "2 days left",
      status: "Active",
    },
    {
      id: 4,
      name: "Birthday Pool: Chioma 🎂",
      amount: 5000,
      collected: 25000,
      target: 45000,
      progress: 55,
      membersPaid: 5,
      totalExpected: 9,
      deadline: "Expired",
      status: "Expired",
    },
    {
      id: 5,
      name: "Convocation Suit Hire 🎓",
      amount: 12000,
      collected: 120000,
      target: 120000,
      progress: 100,
      membersPaid: 10,
      totalExpected: 10,
      deadline: "Completed",
      status: "Completed",
    },
    {
      id: 6,
      name: "Department Dues 📚",
      amount: 3000,
      collected: 15000,
      target: 60000,
      progress: 25,
      membersPaid: 5,
      totalExpected: 20,
      deadline: "12 days left",
      status: "Active",
    },
  ];

  const filteredContributions =
    activeFilter === "All"
      ? contributions
      : contributions.filter((c) => c.status === activeFilter);

  return (
    <DashboardLayout title="My Contributions">
      <div className="space-y-8">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="p-1 bg-white border border-[rgba(26,122,74,0.1)] rounded-[10px] flex items-center shadow-sm w-full sm:w-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-[10px] text-xs font-black uppercase tracking-widest transition-all ${
                  activeFilter === filter
                    ? "bg-[#1A7A4A] text-white"
                    : "text-[#6B7280] hover:bg-[#F7F5EF] hover:text-[#1A1A1A]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
              size={16}
            />
            <input
              type="text"
              placeholder="Search contribution..."
              className="w-full bg-white border border-[rgba(26,122,74,0.08)] rounded-[10px] py-3 pl-12 pr-4 text-xs font-bold text-[#1A1A1A] outline-none shadow-sm focus:ring-2 focus:ring-[#1A7A4A] transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredContributions.map((c, i) => {
            const statusColors = {
              Active: "bg-[#E6F5ED] text-[#1A7A4A]",
              Completed: "bg-[#C8F275] text-[#0D1F14]",
              Expired: "bg-[#F7F5EF] text-[#6B7280]",
            };

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[10px] p-6 md:p-8 border border-[rgba(26,122,74,0.1)] shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className="mb-8">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <h3
                      className="text-2xl font-black text-[#1A1A1A] leading-tight flex-1"
                      style={{ fontFamily: "Lexend, sans-serif" }}
                    >
                      {c.name}
                    </h3>
                    <span
                      className={`flex-shrink-0 px-3 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-sm h-fit ${statusColors[c.status as keyof typeof statusColors]}`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mb-1 opacity-60">
                          Total Collected
                        </p>
                        <h4
                          className="text-3xl font-black text-[#1A1A1A] tracking-tighter"
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          ₦{(c.collected / 1000).toFixed(1)}k
                          <span className="text-sm font-normal text-[#6B7280] tracking-normal ml-2 ">
                            / ₦{(c.target / 1000).toFixed(1)}k
                          </span>
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mb-1 opacity-60">
                          Members
                        </p>
                        <span className="text-sm font-black text-[#1A1A1A] tracking-tight">
                          {c.membersPaid} of {c.totalExpected} paid
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-[#F7F5EF] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.progress}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full ${c.progress === 100 ? "bg-[#C8F275]" : "bg-[#1A7A4A]"} rounded-full shadow-lg h-full`}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-[rgba(26,122,74,0.08)] flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mb-1 ">
                      Deadline
                    </p>
                    <span className="text-sm font-bold text-[#1A1A1A]">
                      {c.deadline}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/contributions/1`}
                      className="px-5 py-3 text-xs font-black uppercase tracking-widest text-[#1A7A4A] border border-[#1A7A4A]/20 rounded-[10px] hover:bg-[#F7F5EF] transition-all"
                    >
                      View
                    </Link>
                    <button className="px-5 py-3 text-xs font-black uppercase tracking-widest bg-[#1A7A4A] text-white rounded-[10px] flex items-center gap-2 hover:bg-[#1A7A4A]/90 transition-all active:scale-[0.98]">
                      Share <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredContributions.length === 0 && activeFilter !== "All" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 bg-white rounded-[10px] border border-dashed border-[rgba(26,122,74,0.2)]"
          >
            <div className="text-8xl mb-6">🏝️</div>
            <h3
              className="text-2xl font-black text-[#1A1A1A] mb-2"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              No {activeFilter} contributions
            </h3>
            <p className="text-[#6B7280] text-sm mb-10 max-w-sm text-center font-medium">
              It's quiet in here. You don't have any contributions under this
              category yet.
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="bg-[#0D1F14] text-white px-10 py-4 rounded-[10px] font-bold text-sm transition-all active:scale-[0.98]"
            >
              Bring them back
            </button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Calendar,
  ChevronRight,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";

export default function DashboardOverview() {
  const stats = [
    {
      label: "Total contributions",
      value: "12",
      icon: Plus,
      color: "text-[#1A7A4A]",
      bg: "bg-[#E6F5ED]",
    },
    {
      label: "Total collected",
      value: "₦1.2M",
      icon: TrendingUp,
      color: "text-[#1A7A4A]",
      bg: "bg-[#C8F275]/20",
    },
    {
      label: "Active contributions",
      value: "4",
      icon: Calendar,
      color: "text-[#1A7A4A]",
      bg: "bg-[#E6F5ED]",
    },
    {
      label: "Pending payments",
      value: "24",
      icon: Users,
      color: "text-[#1A7A4A]",
      bg: "bg-[#F0EBD8]",
    },
  ];

  const recentContributions = [
    {
      name: "Final Year Dinner 🎓",
      amount: "₦15,000",
      collected: "₦105k",
      target: "₦150k",
      progress: 70,
      deadline: "5 days left",
      status: "Active",
    },
    {
      name: "Hostel Fuel Fund ⛽",
      amount: "₦2,000",
      collected: "₦12k",
      target: "₦12k",
      progress: 100,
      deadline: "Completed",
      status: "Completed",
    },
    {
      name: "Group Project Printing 📚",
      amount: "₦1,500",
      collected: "₦4.5k",
      target: "₦7.5k",
      progress: 60,
      deadline: "2 days left",
      status: "Active",
    },
    {
      name: "Birthday Pool: Chioma 🎂",
      amount: "₦5,000",
      collected: "₦25k",
      target: "₦45k",
      progress: 55,
      deadline: "Expired",
      status: "Expired",
    },
    {
      name: "Convocation Suit Hire 🎓",
      amount: "₦12,000",
      collected: "₦120k",
      target: "₦120k",
      progress: 100,
      deadline: "Completed",
      status: "Completed",
    },
  ];

  return (
    <DashboardLayout title="Overview">
      <div className="space-y-6 md:space-y-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[10px] p-6 border border-[rgba(26,122,74,0.12)] shadow-sm hover:shadow-md transition-all group"
            >
              <div
                className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-[10px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={24} />
              </div>
              <p className="text-[#6B7280] text-xs font-black uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <h3
                className="text-3xl font-black text-[#1A1A1A] tracking-tighter"
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
                {stat.value}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Recent Contributions Table */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2
              className="text-lg md:text-xl font-black text-[#0D1F14] tracking-tight"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              Recent Contributions
            </h2>
            <Link
              href="/dashboard/contributions"
              className="text-xs md:text-sm font-bold text-[#1A7A4A] flex items-center gap-1 hover:underline"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-[10px] border border-[rgba(26,122,74,0.12)] overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[rgba(26,122,74,0.08)] bg-[#F7F5EF]/50">
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                      Name
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                      Per person
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                      Collected
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                      Progress
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                      Status
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(26,122,74,0.05)]">
                  {recentContributions.map((item, i) => {
                    const statusColors = {
                      Active: "bg-[#E6F5ED] text-[#1A7A4A]",
                      Completed: "bg-[#C8F275] text-[#0D1F14]",
                      Expired: "bg-[#F7F5EF] text-[#6B7280]",
                    };

                    return (
                      <tr
                        key={i}
                        className={`transition-colors hover:bg-[#F7F5EF]/30 ${i % 2 !== 0 ? "bg-[#F7F5EF]/20" : ""}`}
                      >
                        <td className="px-4 md:px-6 py-4 md:py-5">
                          <p className="text-sm font-black text-[#1A1A1A]">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest mt-0.5">
                            {item.deadline}
                          </p>
                        </td>
                        <td className="hidden sm:table-cell px-6 py-5">
                          <span className="text-sm font-bold text-[#1A1A1A]">
                            {item.amount}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-sm font-bold text-[#1A1A1A]">
                            {item.collected}
                          </span>
                          <span className="text-[10px] text-[#6B7280] ml-1 opacity-60">
                            / {item.target}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="w-24">
                            <div className="flex justify-between text-[10px] font-bold text-[#6B7280] mb-1">
                              <span>{item.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-[rgba(0,0,0,0.05)] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.progress}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`h-full ${item.progress === 100 ? "bg-[#C8F275]" : "bg-[#1A7A4A]"} rounded-full`}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${statusColors[item.status as keyof typeof statusColors]}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                          <Link
                            href={`/dashboard/contributions/1`}
                            className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest text-[#1A7A4A] border border-[#1A7A4A]/20 px-3 py-1.5 rounded-full hover:bg-[#1A7A4A] hover:text-white transition-all whitespace-nowrap"
                          >
                            View <ArrowUpRight size={14} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

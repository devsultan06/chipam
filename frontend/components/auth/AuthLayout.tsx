"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  tagline?: string;
}

export default function AuthLayout({ children, tagline }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1A7A4A 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="w-full max-w-[440px] relative z-10">
        <div className="text-center md:text-left mb-10 md:pl-12">
          <Link
            href="/"
            className="inline-block text-[#1A7A4A] font-black text-3xl tracking-tighter"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            chipam
          </Link>
          {tagline && (
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A7A4A] mt-2 opacity-60">
              {tagline}
            </p>
          )}
        </div>

        <div className=" rounded-[40px] p-8 sm:p-12 ">{children}</div>

        <div className="mt-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] opacity-40 leading-relaxed">
            Secure payments with Paystack. <br />
            Authorized by Nigerian students since 2026.
          </p>
        </div>
      </div>
    </div>
  );
}

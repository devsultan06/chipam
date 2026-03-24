"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-[#0D1F14] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          <div className="col-span-1 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-3xl font-black tracking-tighter mb-6"
            >
              <img
                src="/icon.svg"
                alt="Chipam Icon"
                className="w-10 h-10 brightness-0 invert"
              />
              <div className="flex items-center gap-1">
                <span className="text-[#C8F275]">chip</span>
                <span className="text-white">am</span>
              </div>
            </Link>
            <p className="text-white/50 max-w-sm text-sm leading-relaxed font-light mb-8">
              The easiest way for groups to collect contributions, track
              payments, and send reminders — all in one place. Powered by
              Paystack.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8F275] mb-6">
              Company
            </h4>
            <div className="flex flex-col gap-4 text-sm text-white/40">
              <Link href="#" className="hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact Support
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8F275] mb-6">
              Product
            </h4>
            <div className="flex flex-col gap-4 text-sm text-white/40">
              <Link
                href="#how-it-works"
                className="hover:text-white transition-colors"
              >
                How it works
              </Link>
              <Link
                href="#use-cases"
                className="hover:text-white transition-colors"
              >
                Use cases
              </Link>
              <Link
                href="#pricing"
                className="hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <div className="flex items-center gap-2">
            <span>© 2026 Chipam. Made in Nigeria 🇳🇬</span>
          </div>
          <div className="flex gap-8 items-center">
            <span className="hover:text-white transition-colors cursor-pointer">
              Twitter (X)
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Instagram
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              LinkedIn
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

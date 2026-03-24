"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#F7F5EF]/90 backdrop-blur-md py-4 border-b border-[rgba(26,122,74,0.1)]" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-tighter"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          <img src="/icon.svg" alt="Chipam Icon" className="w-8 h-8" />
          <div className="flex items-center gap-1">
            <span className="text-[#1A7A4A]">chip</span>
            <span className="text-[#1A1A1A]">am</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[11px] font-black text-[#1A1A1A] uppercase tracking-[0.25em]">
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="hover:text-[#1A7A4A] transition-colors"
          >
            How it works
          </button>
          <button
            onClick={() => scrollToSection("use-cases")}
            className="hover:text-[#1A7A4A] transition-colors"
          >
            Use cases
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="hover:text-[#1A7A4A] transition-colors"
          >
            Pricing
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A] hover:text-[#1A7A4A] transition-colors hidden md:block"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="pill-button bg-[#0D1F14] text-[#C8F275] px-5 py-2 text-[10px] font-black uppercase tracking-widest hidden md:block"
          >
            Get started free
          </Link>

          <button
            className="md:hidden p-2 text-[#1A7A4A]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-0.5 bg-current transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`h-0.5 bg-current transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 bg-current transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#F7F5EF] border-b border-[rgba(26,122,74,0.1)] overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-6 text-xl font-black text-[#1A1A1A] uppercase tracking-tighter">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection("use-cases")}
                className="text-left"
              >
                Use cases
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-left"
              >
                Pricing
              </button>
              <Link
                href="/signup"
                className="pill-button bg-[#1A7A4A] text-white py-4 text-center mt-4"
              >
                Get started free
              </Link>
              <Link
                href="/login"
                className="text-center text-sm font-black text-[#1A1A1A] uppercase tracking-widest mt-4"
              >
                Log in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

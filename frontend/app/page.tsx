"use client";

import { motion } from "framer-motion";
import { Check, Play, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const Hero = () => (
  <section className="pt-40 pb-20 px-6 bg-[#F7F5EF] bg-noise min-h-[90vh] flex items-center">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start"
      >
        <span className="pill-badge bg-[#E6F5ED] text-[#1A7A4A] mb-6 border border-[rgba(26,122,74,0.1)]">
          Built for Nigerian students
        </span>
        <h1 className="text-6xl md:text-8xl mb-6 text-[#1A1A1A] text-balance text-tight">
          No more
          <br />
          drama over
          <br />
          who paid.
        </h1>
        <p className="text-lg md:text-xl text-[#6B7280] mb-10 max-w-lg leading-relaxed font-normal opacity-80">
          Chipam lets your group collect contributions, track payments, and send
          reminders — all in one place. Powered by Paystack.
        </p>
        <div className="flex flex-wrap gap-4 mb-12">
          <Link
            href="/signup"
            className="pill-button bg-[#0D1F14] text-white px-7 py-3.5 font-bold flex items-center justify-center gap-2 text-sm hover:scale-[1.02] transition-all w-fit"
          >
            Create a contribution
          </Link>
          <button className="pill-button bg-white text-[#1A1A1A] border border-[rgba(0,0,0,0.1)] px-7 py-3.5 font-bold flex items-center justify-center gap-2 text-sm">
            <Play size={16} fill="currentColor" /> See how it works
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-[#F7F5EF] overflow-hidden bg-zinc-200"
              >
                <img
                  src={`https://i.pravatar.cc/100?u=${i + 10}`}
                  alt="student"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-[#6B7280] max-w-[240px] leading-snug">
            <span className="font-bold text-[#1A1A1A]">240+ students</span>{" "}
            already on the waitlist from UI, UNILAG, UNIBEN & more
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-dot-grid w-full aspect-[4/5] rounded-[32px] p-8 shadow-2xl overflow-hidden border border-white/10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl text-white mb-1">Final Year Dinner 🎓</h3>
              <div className="pill-badge bg-[#E6F5ED]/10 text-[#C8F275] border border-[#C8F275]/20 inline-block text-[10px] uppercase font-bold tracking-widest">
                Live
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-3xl font-bold text-white tracking-tight">
                ₦150,000{" "}
                <span className="text-sm font-normal text-white/50">
                  target
                </span>
              </span>
              <span className="text-[#C8F275] font-bold">68%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#C8F275] w-[68%] rounded-full" />
            </div>
            <p className="text-white/50 text-xs mt-3">
              ₦102,000 collected · 5 days left
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/5">
            {[
              {
                name: "Amaka Obi",
                status: "Paid via Paystack",
                amount: "₦15k",
                time: "✓",
                color: "text-[#C8F275]",
              },
              {
                name: "Bayo Salami",
                status: "Reminder sent",
                amount: "₦15k",
                time: "2hrs ago ⏳",
                color: "text-[#FCD34D]",
              },
              {
                name: "Chiamaka Nze",
                status: "Paid via Paystack",
                amount: "₦15k",
                time: "✓",
                color: "text-[#C8F275]",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-xs text-center border border-white/10">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">
                      {member.name}
                    </h4>
                    <p className="text-white/40 text-[10px]">{member.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-sm">
                    {member.amount}
                  </div>
                  <div className={`text-[10px] ${member.color} font-bold`}>
                    {member.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 px-6 bg-diagonal-stripes">
    <div className="max-w-7xl mx-auto text-center mb-16">
      <span className="section-label">How it works</span>
      <h2 className="text-4xl md:text-6xl mb-4">Set up in under 2 minutes</h2>
      <p className="text-lg text-[#6B7280] max-w-2xl mx-auto font-light leading-relaxed">
        No spreadsheets. No chasing people on WhatsApp. Chipam handles
        everything.
      </p>
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          step: "01",
          title: "Create a contribution",
          desc: "Name it, set the amount per person, add a deadline. Takes 30 seconds. No account needed to start.",
        },
        {
          step: "02",
          title: "Invite your group",
          desc: "Share one link. Members join and pay directly via Paystack — card, bank transfer, or USSD.",
        },
        {
          step: "03",
          title: "Track everything live",
          desc: "See who paid, who hasn't. Auto-reminders go out to pending members so you don't have to be the bad guy.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-card bg-white p-10 border border-[rgba(26,122,74,0.1)] shadow-sm"
        >
          <span className="text-7xl font-black text-[#1A7A4A]/10 block mb-6">
            {item.step}
          </span>
          <h3 className="text-2xl mb-4">{item.title}</h3>
          <p className="text-[#6B7280] leading-relaxed font-light">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const UseCases = () => (
  <section id="use-cases" className="py-24 px-6 bg-corner-glow">
    <div className="max-w-7xl mx-auto text-center mb-16">
      <span className="section-label text-[#C8F275]">Use cases</span>
      <h2 className="text-4xl md:text-6xl text-white mb-4">
        Made for every student contribution
      </h2>
      <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
        If you've ever had to chase your friends for money, Chipam was built for
        you.
      </p>
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        {
          icon: "🎂",
          title: "Birthday contributions",
          desc: 'Pool money for a friend\'s birthday gift or outing without the awkward "have you paid?" conversations.',
        },
        {
          icon: "🏠",
          title: "Hostel & house expenses",
          desc: "Shared generator fuel, water, internet subscription — track who owes what and collect fast.",
        },
        {
          icon: "📚",
          title: "Group project costs",
          desc: "Printing, binding, materials — split the cost fairly and keep records nobody can argue with.",
        },
        {
          icon: "🎓",
          title: "Department events",
          desc: "SUG dues, departmental dinner, convocation — manage large group collections without losing track.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-card bg-white/5 border border-white/10 p-10 hover:bg-white/[0.08] transition-colors"
        >
          <div className="text-4xl mb-6">{item.icon}</div>
          <h3 className="text-2xl text-white mb-4">{item.title}</h3>
          <p className="text-white/60 leading-relaxed font-light">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24 px-6 bg-large-faded-grid">
    <div className="max-w-7xl mx-auto text-center mb-16">
      <span className="section-label text-[#C8F275]">Pricing</span>
      <h2 className="text-4xl md:text-6xl text-white mb-4">No upfront cost.</h2>
      <h2 className="text-4xl md:text-3xl text-white/80 mb-4 opacity-70">
        We only earn when you collect.
      </h2>
      <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
        Pay nothing until money moves. We take a small fee per transaction.
      </p>
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
      {[
        {
          label: "Free",
          price: "₦0",
          desc: "to create & manage",
          features: [
            "Unlimited contributions",
            "Up to 20 members",
            "Paystack payment links",
            "Basic tracking",
          ],
          button: "Get started",
          featured: false,
        },
        {
          label: "Per transaction",
          price: "₦50",
          desc: "per payment collected",
          features: [
            "Everything in free",
            "Auto reminders",
            "Unlimited members",
            "Export payment records",
          ],
          button: "Start collecting",
          featured: true,
        },
        {
          label: "Groups & Associations",
          price: "Custom",
          desc: "for SUGs, fellowships & more",
          features: [
            "Everything included",
            "Custom subdomain",
            "Priority support",
            "Dedicated dashboard",
          ],
          button: "Contact us",
          featured: false,
        },
      ].map((tier, i) => (
        <div
          key={i}
          className={`rounded-card p-10 flex flex-col h-full ${tier.featured ? "bg-[#1A7A4A] border-[#C8F275]/30 transform lg:scale-110 shadow-2xl z-10" : "bg-white border-transparent"}`}
        >
          <div
            className={`text-xs font-bold uppercase tracking-widest mb-6 ${tier.featured ? "text-[#C8F275]" : "text-[#1A7A4A]"}`}
          >
            {tier.label}
          </div>
          <div
            className={`text-5xl font-black mb-1 ${tier.featured ? "text-white" : "text-[#1A1A1A]"}`}
          >
            {tier.price}
          </div>
          <div
            className={`text-sm mb-10 ${tier.featured ? "text-white/70" : "text-[#6B7280]"}`}
          >
            {tier.desc}
          </div>
          <div className="space-y-4 mb-10 flex-grow">
            {tier.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Check
                  size={16}
                  className={
                    tier.featured ? "text-[#C8F275]" : "text-[#1A7A4A]"
                  }
                />
                <span
                  className={`text-sm ${tier.featured ? "text-white/80" : "text-[#1A1A1A] font-medium"}`}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/signup"
            className={`pill-button w-full py-3.5 font-bold text-sm text-center flex items-center justify-center ${tier.featured ? "bg-[#C8F275] text-[#1A7A4A]" : "bg-[#0D1F14] text-[#C8F275]"}`}
          >
            {tier.button}
          </Link>
        </div>
      ))}
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 px-6 bg-white bg-noise">
    <div className="max-w-7xl mx-auto text-center mb-16">
      <span className="section-label">What students say</span>
      <h2 className="text-4xl md:text-6xl mb-4 text-balance">
        Real students, real problems solved
      </h2>
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          text: "I used to spend 3 days chasing people for our departmental dinner money. Chipam sent reminders automatically and everyone paid within 24 hours.",
          author: "Adaeze Okafor",
          info: "500L, University of Ibadan",
          color: "bg-[#E6F5ED]",
        },
        {
          text: "Our hostel of 6 people splits bills every month. This used to cause genuine fights. Now we just share the Chipam link and it's done.",
          author: "Kola Adeyemi",
          info: "300L, UNILAG",
          color: "bg-[#F0EBD8]",
        },
        {
          text: "As class rep, collecting dues was my biggest headache. Chipam literally gave me my peace back. I can see who paid at a glance.",
          author: "Temi Nwosu",
          info: "400L, UNIBEN",
          color: "bg-white",
        },
      ].map((item, i) => (
        <div
          key={i}
          className={`rounded-card p-10 border border-[rgba(26,122,74,0.1)] flex flex-col ${item.color}`}
        >
          <div className="flex gap-1 mb-6 text-[#1A7A4A]">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} fill="currentColor" />
            ))}
          </div>
          <p className="text-lg text-[#1A1A1A] mb-8 leading-relaxed font-light">
            "{item.text}"
          </p>
          <div className="mt-auto">
            <h4 className="font-bold text-[#1A1A1A]">{item.author}</h4>
            <p className="text-xs text-[#6B7280]">{item.info}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const CTA = () => (
  <section className="py-32 px-6 bg-radial-glow relative overflow-hidden">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h2 className="text-5xl md:text-8xl text-white mb-8 text-tight">
        Stop chasing. Start collecting.
      </h2>
      <p className="text-xl md:text-2xl text-[#C8F275] mb-12 font-medium">
        Join hundreds of Nigerian students who've ditched the WhatsApp drama.
      </p>
      <Link
        href="/signup"
        className="pill-button bg-white text-[#1A7A4A] px-8 py-4 text-base font-bold flex items-center justify-center gap-3 mx-auto w-fit hover:scale-[1.05] transition-all"
      >
        Create your first contribution <ArrowRight size={20} />
      </Link>
      <p className="mt-8 text-white/60 text-sm">
        Free to start. No credit card required.
      </p>
    </div>
  </section>
);

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-[#C8F275] selection:text-[#1A7A4A]">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <UseCases />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

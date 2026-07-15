'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { IconArrowRight, IconCheck, IconEye, IconFilter, IconLock, IconShieldCheck } from '@tabler/icons-react';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const BENEFITS = [
  { icon: <IconEye size={20} />, title: 'Pre-Vetted Deal Flow', desc: 'Every idea in the feed has been AI-evaluated across 8 dimensions. No more sifting through unstructured pitch decks.' },
  { icon: <IconFilter size={20} />, title: 'Smart Filtering', desc: 'Filter by domain, minimum score, market, and sort by newest or highest-rated to find exactly what you\'re looking for.' },
  { icon: <IconLock size={20} />, title: 'Approval-Gated Access', desc: 'Express interest in an idea. Once the founder approves, you unlock the full AI breakdown — competitor landscape, financials, and more.' },
  { icon: <IconShieldCheck size={20} />, title: 'Verified Investors Only', desc: 'The Explore feed is restricted to verified, accredited investors. Your profile is reviewed by our team before access is granted.' },
];

const STEPS = [
  { num: '01', title: 'Create Your Investor Profile', desc: 'Sign up and fill out your investor profile — investor type, check size, sectors of interest, and LinkedIn.' },
  { num: '02', title: 'Get Verified', desc: 'Our team reviews your profile. Once approved, you gain access to the Explore feed of AI-evaluated startups.' },
  { num: '03', title: 'Browse & Express Interest', desc: 'Browse AI-evaluated ideas filtered by your thesis. When you find one you like, express interest with an optional message.' },
  { num: '04', title: 'Unlock Full Breakdown', desc: 'The founder reviews your profile and approves your request. You now see the complete 8-agent analysis and connect directly.' },
];

export default function ForInvestorsPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="py-28 sm:py-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-6">For Investors</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-fg tracking-tight leading-[1.08] mb-6">
              Discover AI-vetted<br />startups.
            </h1>
            <p className="text-lg text-fg-muted max-w-xl mx-auto leading-relaxed mb-10">
              Skip the noise. Browse pre-evaluated startup pitches, filter by your thesis, and connect with founders — all powered by AI.
            </p>
            <Link
              href="/sign-up"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full bg-fg text-bg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Sign Up as Investor <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits — Bento Grid */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-4">Why Ventiq</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-fg tracking-tight leading-[1.1] max-w-2xl">
              Smarter deal flow.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.06}>
                <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-border-strong transition-colors duration-500">
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-fg-muted mb-5">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-fg mb-2 tracking-tight">{benefit.title}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">{benefit.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works for Investors */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-4">Process</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-fg tracking-tight">Four steps to deal flow.</h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-px bg-border/50 rounded-2xl overflow-hidden border border-border">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.06}>
                <div className="bg-card p-8 sm:p-10 group">
                  <span className="text-[11px] font-mono text-fg-faint tracking-widest block mb-3">{step.num}</span>
                  <h3 className="text-xl font-semibold text-fg mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight mb-4">Ready to find your next investment?</h2>
            <p className="text-fg-muted mb-10">Create your investor profile and get verified to access AI-evaluated deal flow.</p>
            <Link href="/sign-up" className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full bg-fg text-bg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              Get Started <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

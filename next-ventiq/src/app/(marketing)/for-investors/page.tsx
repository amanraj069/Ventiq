'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { IconArrowRight, IconCheck, IconEye, IconFilter, IconLock, IconShieldCheck } from '@tabler/icons-react';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 const ref = useRef(null);
 const isInView = useInView(ref, { once: true, margin: '-60px' });
 return (
 <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className={className}>
 {children}
 </motion.div>
 );
}

const BENEFITS = [
 { icon: <IconEye size={24} />, title: 'Pre-Vetted Deal Flow', desc: 'Every idea in the feed has been AI-evaluated across 8 dimensions. No more sifting through unstructured pitch decks.' },
 { icon: <IconFilter size={24} />, title: 'Smart Filtering', desc: 'Filter by domain, minimum score, market, and sort by newest or highest-rated to find exactly what you\'re looking for.' },
 { icon: <IconLock size={24} />, title: 'Approval-Gated Access', desc: 'Express interest in an idea. Once the founder approves, you unlock the full AI breakdown — competitor landscape, financials, and more.' },
 { icon: <IconShieldCheck size={24} />, title: 'Verified Investors Only', desc: 'The Explore feed is restricted to verified, accredited investors. Your profile is reviewed by our admin team before access is granted.' },
];

const STEPS = [
 { step: '1', title: 'Create Your Investor Profile', desc: 'Sign up and fill out your investor profile — investor type, check size, sectors of interest, and LinkedIn.' },
 { step: '2', title: 'Get Verified', desc: 'Our team reviews your profile. Once approved, you gain access to the Explore feed.' },
 { step: '3', title: 'Browse & Express Interest', desc: 'Browse AI-evaluated ideas. When you find one you like, express interest with an optional message.' },
 { step: '4', title: 'Unlock Full Breakdown', desc: 'The founder reviews your profile and approves your request. You now see the complete 8-agent analysis.' },
];

export default function ForInvestorsPage() {
 return (
 <div className="relative overflow-hidden">
 {/* Hero */}
 <section className="py-20 sm:py-28 relative">
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 </div>
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-elevated border border-border text-fg-secondary text-xs font-medium mb-6">
 <IconEye size={14} />
 For Investors
 </div>
 <h1 className="text-4xl sm:text-5xl font-bold text-fg mb-5">
 Discover AI-Vetted Startups
 </h1>
 <p className="text-lg text-fg-muted max-w-2xl mx-auto leading-relaxed">
 Skip the noise. Browse pre-evaluated startup pitches, filter by your thesis, and connect with founders — all powered by AI.
 </p>
 <div className="mt-8">
 <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-fg text-bg hover:opacity-90 transition-opacity transition-colors">
 Sign Up as Investor <IconArrowRight size={16} />
 </Link>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Benefits */}
 <section className="pb-24">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 {BENEFITS.map((b) => (
 <AnimatedSection key={b.title}>
 <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-border transition-colors">
 <div className="w-11 h-11 rounded-xl bg-bg-elevated text-fg-secondary flex items-center justify-center mb-4">{b.icon}</div>
 <h3 className="text-lg font-semibold text-fg mb-2">{b.title}</h3>
 <p className="text-sm text-fg-muted leading-relaxed">{b.desc}</p>
 </div>
 </AnimatedSection>
 ))}
 </div>
 </div>
 </section>

 {/* How It Works for Investors */}
 <section className="py-24 relative">
 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-border to-transparent pointer-events-none" />
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <AnimatedSection className="text-center mb-14">
 <h2 className="text-3xl font-bold text-fg mb-4">How It Works for Investors</h2>
 <p className="text-fg-muted max-w-xl mx-auto">Four simple steps from sign-up to full access.</p>
 </AnimatedSection>

 <div className="space-y-6">
 {STEPS.map((s) => (
 <AnimatedSection key={s.step}>
 <div className="flex gap-5 items-start">
 <div className="w-10 h-10 rounded-full bg-bg-elevated border border-border text-fg-secondary flex items-center justify-center text-sm font-bold flex-shrink-0">
 {s.step}
 </div>
 <div>
 <h3 className="text-base font-semibold text-fg mb-1">{s.title}</h3>
 <p className="text-sm text-fg-muted leading-relaxed">{s.desc}</p>
 </div>
 </div>
 </AnimatedSection>
 ))}
 </div>
 </div>
 </section>

 {/* CTA */}
 <section className="py-20">
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <AnimatedSection>
 <h2 className="text-3xl font-bold text-fg mb-4">Join Ventiq as an Investor</h2>
 <p className="text-fg-muted mb-8 max-w-lg mx-auto">Get access to AI-evaluated deal flow. Only verified, accredited investors are granted access.</p>
 <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-fg text-bg hover:opacity-90 transition-opacity transition-colors">
 Get Started <IconArrowRight size={16} />
 </Link>
 </AnimatedSection>
 </div>
 </section>
 </div>
 );
}

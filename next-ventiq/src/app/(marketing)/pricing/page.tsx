'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { IconCheck, IconArrowRight } from '@tabler/icons-react';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 const ref = useRef(null);
 const isInView = useInView(ref, { once: true, margin: '-60px' });
 return (
 <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className={className}>
 {children}
 </motion.div>
 );
}

const TIERS = [
 {
 name: 'Free',
 price: '$0',
 period: '/mo',
 desc: 'Perfect for testing the waters.',
 features: ['1 evaluation per month', 'Basic score breakdown', '6 dimensions scored', 'Email support'],
 limits: ['No re-evaluations', 'No competitor landscape', 'No financial projections'],
 cta: 'Start Free',
 highlight: false,
 },
 {
 name: 'Pro',
 price: '$29',
 period: '/mo',
 desc: 'For serious founders building real businesses.',
 features: ['Unlimited evaluations', 'Full 8-agent breakdown', 'Re-evaluation support', 'Competitor landscape analysis', 'Financial projection modeling', 'Red-team critique', 'Priority support', 'Idea similarity check'],
 limits: [],
 cta: 'Upgrade to Pro',
 highlight: true,
 },
 {
 name: 'Enterprise',
 price: 'Custom',
 period: '',
 desc: 'For accelerators and venture studios.',
 features: ['Everything in Pro', 'Bulk evaluations', 'Custom evaluation agents', 'API access', 'Dedicated account manager', 'White-label options', 'SSO / team management'],
 limits: [],
 cta: 'Contact Sales',
 highlight: false,
 },
];

const FAQS = [
 { q: 'How accurate is the AI evaluation?', a: 'Our 8-agent pipeline covers the same dimensions top VCs evaluate. While no AI replaces human judgment, Ventiq provides a rigorous, data-driven starting point — think of it as a highly experienced pre-screening tool.' },
 { q: 'Can I re-evaluate after making changes?', a: 'Yes! Pro users can re-evaluate unlimited times. Your previous scores are preserved in version history so you can track improvement over time.' },
 { q: 'How does investor matching work?', a: 'Verified investors browse evaluated ideas in the Explore feed. They can filter by domain and score, then express interest. Founders approve access, which unlocks the full breakdown for that investor.' },
 { q: 'Is my idea safe? Can others see it?', a: 'Your pitch data is encrypted and stored securely. Only verified, approved investors can see your full breakdown — and only after you explicitly approve their interest request.' },
 { q: 'What if I\'m not happy with my score?', a: 'Low scores come with actionable feedback. Use the agent insights to strengthen your pitch, then re-evaluate. Many founders see 15-25 point improvements after iteration.' },
];

export default function PricingPage() {
 const [openFaq, setOpenFaq] = useState<number | null>(null);

 return (
 <div className="relative overflow-hidden">
 {/* Hero */}
 <section className="py-20 sm:py-28 relative">
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 </div>
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
 <h1 className="text-4xl sm:text-5xl font-bold text-fg mb-5">Simple, Transparent Pricing</h1>
 <p className="text-lg text-fg-muted max-w-xl mx-auto">Start free. Upgrade when you need more power.</p>
 </motion.div>
 </div>
 </section>

 {/* Pricing Cards */}
 <section className="pb-24">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {TIERS.map((tier) => (
 <AnimatedSection key={tier.name}>
 <div className={`rounded-2xl p-6 sm:p-8 h-full flex flex-col ${
 tier.highlight
 ? 'bg-bg-elevated border-2 border-border relative'
 : 'bg-card border border-border'
 }`}>
 {tier.highlight && (
 <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-fg text-bg text-[10px] font-bold uppercase tracking-wider">
 Most Popular
 </div>
 )}
 <div className="mb-6">
 <h3 className="text-xl font-semibold text-fg mb-1">{tier.name}</h3>
 <p className="text-fg-faint text-sm mb-5">{tier.desc}</p>
 <div className="flex items-baseline gap-1">
 <span className="text-4xl font-bold text-fg">{tier.price}</span>
 <span className="text-fg-faint text-sm">{tier.period}</span>
 </div>
 </div>
 <ul className="space-y-2.5 mb-6 flex-1">
 {tier.features.map((f) => (
 <li key={f} className="flex items-start gap-2.5 text-sm text-fg-muted">
 <IconCheck size={15} className="text-green-700 dark:text-green-700 dark:text-green-400 mt-0.5 flex-shrink-0" />
 <span>{f}</span>
 </li>
 ))}
 {tier.limits.map((l) => (
 <li key={l} className="flex items-start gap-2.5 text-sm text-fg-faint">
 <span className="mt-0.5 flex-shrink-0 text-white/20">✕</span>
 <span>{l}</span>
 </li>
 ))}
 </ul>
 <Link href={tier.name === 'Enterprise' ? '/about' : '/sign-up'} className={`w-full py-3 text-center text-sm font-medium rounded-xl transition-colors block ${
 tier.highlight
 ? 'bg-fg text-bg hover:opacity-90 transition-opacity'
 : 'bg-bg-elevated text-fg border border-border hover:bg-bg-sunken transition-colors'
 }`}>
 {tier.cta}
 </Link>
 </div>
 </AnimatedSection>
 ))}
 </div>
 </div>
 </section>

 {/* FAQ */}
 <section className="py-24 relative">
 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-border to-transparent pointer-events-none" />
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <AnimatedSection className="text-center mb-12">
 <h2 className="text-3xl font-bold text-fg mb-4">Frequently Asked Questions</h2>
 </AnimatedSection>

 <div className="space-y-3">
 {FAQS.map((faq, i) => (
 <AnimatedSection key={i}>
 <div className="bg-card border border-border rounded-xl overflow-hidden">
 <button
 onClick={() => setOpenFaq(openFaq === i ? null : i)}
 className="w-full px-6 py-4 text-left flex items-center justify-between text-sm font-medium text-fg cursor-pointer hover:bg-bg-elevated transition-colors"
 >
 <span>{faq.q}</span>
 <motion.span
 animate={{ rotate: openFaq === i ? 180 : 0 }}
 transition={{ duration: 0.2 }}
 className="text-fg-faint flex-shrink-0 ml-4"
 >
 ▾
 </motion.span>
 </button>
 <motion.div
 initial={false}
 animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
 transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
 className="overflow-hidden"
 >
 <p className="px-6 pb-4 text-sm text-fg-muted leading-relaxed">{faq.a}</p>
 </motion.div>
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
 <h2 className="text-3xl font-bold text-fg mb-4">Start for free today</h2>
 <p className="text-fg-muted mb-8">No credit card required. Get your first AI evaluation in minutes.</p>
 <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-fg text-bg hover:opacity-90 transition-opacity transition-colors">
 Get Started Free <IconArrowRight size={16} />
 </Link>
 </AnimatedSection>
 </div>
 </section>
 </div>
 );
}

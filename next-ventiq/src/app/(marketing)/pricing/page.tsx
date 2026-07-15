'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { IconCheck, IconArrowRight, IconX } from '@tabler/icons-react';

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

const TIERS = [
  {
    name: 'Free',
    price: '₹0',
    period: '/mo',
    desc: 'Test the waters.',
    features: ['1 evaluation per month', 'Basic score breakdown', '6 dimensions scored', 'Email support'],
    limits: ['No re-evaluations', 'No competitor landscape', 'No financial projections'],
    cta: 'Start Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹2,499',
    period: '/mo',
    desc: 'For serious founders.',
    features: ['Unlimited evaluations', 'Full 8-agent breakdown', 'Re-evaluation support', 'Competitor landscape analysis', 'Financial projection modeling', 'Red-team critique', 'Priority support', 'Idea similarity check'],
    limits: [],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For accelerators & studios.',
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
  { q: 'What if I\'m not happy with my score?', a: 'Low scores come with actionable feedback. Use the agent insights to strengthen your pitch, then re-evaluate. Many founders see significant improvements after iteration.' },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="py-28 sm:py-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-6">Pricing</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-fg tracking-tight leading-[1.08] mb-6">
              Start free.<br />Scale when ready.
            </h1>
            <p className="text-lg text-fg-muted max-w-md mx-auto leading-relaxed">
              No surprise fees. No credit card required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.08}>
                <div
                  className={`rounded-2xl p-8 h-full flex flex-col ${
                    tier.highlight
                      ? 'bg-fg text-bg relative border-2 border-fg shadow-2xl'
                      : 'bg-card border border-border hover:border-border-strong transition-colors duration-500'
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-bg text-fg text-[10px] font-bold uppercase tracking-wider">
                      Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-base font-semibold mb-1 ${tier.highlight ? 'text-bg' : 'text-fg'}`}>{tier.name}</h3>
                    <p className={`text-sm mb-4 ${tier.highlight ? 'text-bg/50' : 'text-fg-faint'}`}>{tier.desc}</p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-bold tracking-tight ${tier.highlight ? 'text-bg' : 'text-fg'}`}>{tier.price}</span>
                      <span className={`text-sm ${tier.highlight ? 'text-bg/40' : 'text-fg-faint'}`}>{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-4 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2.5 text-sm ${tier.highlight ? 'text-bg/70' : 'text-fg-muted'}`}>
                        <IconCheck size={14} className={`flex-shrink-0 ${tier.highlight ? 'text-bg/50' : 'text-fg-secondary'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {tier.limits.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {tier.limits.map((l) => (
                        <li key={l} className="flex items-center gap-2.5 text-sm text-fg-faint">
                          <IconX size={14} className="flex-shrink-0 text-border" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={tier.name === 'Enterprise' ? '/about' : '/sign-up'}
                    className={`w-full py-3 text-center text-sm font-medium rounded-xl transition-all block ${
                      tier.highlight
                        ? 'bg-bg text-fg hover:opacity-90'
                        : 'bg-bg-elevated text-fg border border-border hover:bg-bg-sunken'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-4">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight">Common questions.</h2>
          </Reveal>

          <div className="space-y-0 border border-border rounded-2xl overflow-hidden">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className={`bg-card ${i < FAQS.length - 1 ? 'border-b border-border' : ''}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-fg">{faq.q}</span>
                    <span className="text-fg-faint text-lg flex-shrink-0">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-fg-muted leading-relaxed">{faq.a}</p>
                  </motion.div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight mb-4">Ready to get started?</h2>
            <p className="text-fg-muted mb-10">Submit your first pitch for free. No credit card required.</p>
            <Link href="/sign-up" className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full bg-fg text-bg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              Start Free <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

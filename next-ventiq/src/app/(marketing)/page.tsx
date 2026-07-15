'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  IconBrain,
  IconTarget,
  IconUsers,
  IconTrendingUp,
  IconCurrencyDollar,
  IconShield,
  IconChartRadar,
  IconMessageChatbot,
  IconArrowRight,
  IconCheck,
  IconRocket,
  IconEye,
  IconHeartHandshake,
  IconSparkles,
} from '@tabler/icons-react';

/* ─── Fade-in on scroll ─── */
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

/* ─── Horizontal marquee ─── */
function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden whitespace-nowrap select-none">
      <motion.div
        className="inline-flex gap-12"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Data ─── */
const AGENTS = [
  { name: 'Market Analyst', icon: <IconTarget size={20} />, focus: 'TAM · SAM · SOM · Growth Rate' },
  { name: 'Team Evaluator', icon: <IconUsers size={20} />, focus: 'Founder-Market Fit · Experience' },
  { name: 'Traction Auditor', icon: <IconTrendingUp size={20} />, focus: 'Revenue · Users · Momentum' },
  { name: 'Financial Modeler', icon: <IconCurrencyDollar size={20} />, focus: 'Unit Economics · Burn Rate' },
  { name: 'Differentiation', icon: <IconBrain size={20} />, focus: 'Moats · IP · Network Effects' },
  { name: 'Pitch Clarity', icon: <IconMessageChatbot size={20} />, focus: 'Narrative · Structure · Vision' },
  { name: 'Competitive Intel', icon: <IconChartRadar size={20} />, focus: 'Positioning · Threats · Gaps' },
  { name: 'Red-Team Critic', icon: <IconShield size={20} />, focus: 'Stress-Tests · Adversarial Review' },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LANDING PAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function LandingPage() {
  /* parallax refs */
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const bentoRef = useRef(null);
  const { scrollYProgress: bentoProgress } = useScroll({
    target: bentoRef,
    offset: ['start end', 'end start'],
  });
  const bentoY = useTransform(bentoProgress, [0, 1], ['40px', '-40px']);

  return (
    <div className="relative">

      {/* ──────────────────────────────────────────────
          HERO — Big statement, no fluff
          ────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-fg/[0.02] rounded-full blur-[150px]" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-fg-muted text-xs font-medium mb-10 tracking-wide">
              <IconSparkles size={12} />
              AI-Powered Startup Evaluation
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold text-fg leading-[1.05] tracking-[-0.03em] mb-8"
          >
            Know your pitch&apos;s
            <br />
            real score.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-fg-muted max-w-xl mx-auto leading-relaxed mb-12"
          >
            8 AI agents evaluate your startup pitch across market, team, traction, and financials — then match you with the right investors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/sign-up"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full bg-fg text-bg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Get Your Score
              <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-full text-fg border border-border hover:bg-card transition-colors duration-300"
            >
              How It Works
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-fg/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-fg/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ──────────────────────────────────────────────
          AGENT MARQUEE — Continuous horizontal scroll
          ────────────────────────────────────────────── */}
      <section className="py-16 border-y border-border/50 overflow-hidden">
        <Marquee>
          {AGENTS.map((agent) => (
            <div key={agent.name} className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-card/50">
              <span className="text-fg-muted">{agent.icon}</span>
              <span className="text-sm font-medium text-fg">{agent.name}</span>
              <span className="text-xs text-fg-faint">·</span>
              <span className="text-xs text-fg-faint">{agent.focus}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ──────────────────────────────────────────────
          BENTO GRID — The product in a glance
          ────────────────────────────────────────────── */}
      <section className="py-32" ref={bentoRef}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-20">
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-4">Why Ventiq</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-fg tracking-tight leading-[1.1] max-w-2xl">
              The due diligence your idea deserves, in minutes.
            </h2>
          </Reveal>

          <motion.div style={{ y: bentoY }} className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Card 1 — Large (spans 4) */}
            <Reveal className="md:col-span-4">
              <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 h-full min-h-[280px] flex flex-col justify-between group hover:border-border-strong transition-colors duration-500">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-fg-muted mb-6">
                    <IconBrain size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-fg mb-2">Multi-agent evaluation</h3>
                  <p className="text-sm text-fg-muted leading-relaxed max-w-md">
                    Your pitch isn&apos;t scored by one model — it&apos;s evaluated by 8 specialized AI agents in parallel. Market analysis, team assessment, financial modeling, and adversarial critique, all at once.
                  </p>
                </div>
                <div className="flex gap-2 mt-6 flex-wrap">
                  {['Market', 'Team', 'Traction', 'Finance', 'Moat', 'Clarity', 'Intel', 'Critique'].map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-bg-elevated text-fg-faint border border-border/50">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Card 2 — Small (spans 2) */}
            <Reveal className="md:col-span-2" delay={0.1}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full min-h-[280px] flex flex-col justify-between hover:border-border-strong transition-colors duration-500">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-fg-muted mb-6">
                    <IconTrendingUp size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-fg mb-2">Track progress</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">
                    Re-evaluate after pivots. Your score history is preserved so you can see exactly how your pitch improves over time.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 3 — Small (spans 2) */}
            <Reveal className="md:col-span-2" delay={0.05}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full min-h-[280px] flex flex-col justify-between hover:border-border-strong transition-colors duration-500">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-fg-muted mb-6">
                    <IconEye size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-fg mb-2">Investor matching</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">
                    Verified investors browse evaluated ideas and express interest. You approve access — always on your terms.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 4 — Large (spans 4) */}
            <Reveal className="md:col-span-4" delay={0.1}>
              <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 h-full min-h-[280px] flex flex-col justify-between hover:border-border-strong transition-colors duration-500">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-fg-muted mb-6">
                    <IconShield size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-fg mb-2">Honest, adversarial feedback</h3>
                  <p className="text-sm text-fg-muted leading-relaxed max-w-md">
                    Our Red-Team agent is designed to poke holes in your pitch. It stress-tests your assumptions, challenges your claims, and finds the weak spots before a real investor does.
                  </p>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          HOW IT WORKS — Three-step with sticky feel
          ────────────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-4">Process</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-fg tracking-tight">
              Three steps. That&apos;s it.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/50 rounded-2xl overflow-hidden border border-border">
            {[
              {
                num: '01',
                title: 'Submit',
                desc: 'Fill a guided 5-step form — idea, team, traction, funding. Takes under 10 minutes.',
                icon: <IconRocket size={22} />,
              },
              {
                num: '02',
                title: 'Evaluate',
                desc: '8 AI agents analyze your pitch in parallel. You get a composite score with dimensional breakdowns.',
                icon: <IconBrain size={22} />,
              },
              {
                num: '03',
                title: 'Connect',
                desc: 'Verified investors discover your idea. Express interest. You approve access to your full evaluation.',
                icon: <IconHeartHandshake size={22} />,
              },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="bg-card p-10 sm:p-12 h-full group">
                  <span className="text-[11px] font-mono text-fg-faint tracking-widest block mb-8">{step.num}</span>
                  <div className="w-11 h-11 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-fg-muted mb-5 group-hover:text-fg transition-colors duration-500">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-fg mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          DUAL PATH
          ────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-4">Built for both sides</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-fg tracking-tight leading-[1.1] max-w-2xl">
              Founders build.<br />Investors discover.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 h-full hover:border-border-strong transition-colors duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-fg-muted">
                    <IconRocket size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-fg">For Founders</h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    'Guided 5-step pitch submission flow',
                    'Scored by 8 specialized AI agents',
                    'Strengths, weaknesses, and competitive intel',
                    'Re-evaluate after pivots',
                    'Connect with interested investors',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-fg-muted">
                      <IconCheck size={15} className="text-fg-secondary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sign-up"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg mt-8 hover:text-fg-secondary transition-colors"
                >
                  Start building <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 h-full hover:border-border-strong transition-colors duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-fg-muted">
                    <IconEye size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-fg">For Investors</h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    'Curated feed of AI-evaluated startups',
                    'Filter by domain, score, and market',
                    'Express interest with personalized messages',
                    'Founder-approved access to full breakdowns',
                    'Pre-vetted deal flow, no noise',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-fg-muted">
                      <IconCheck size={15} className="text-fg-secondary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/for-investors"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg mt-8 hover:text-fg-secondary transition-colors"
                >
                  Learn more <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          PRICING
          ────────────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-20">
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-4">Pricing</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-fg tracking-tight mb-4">
              Start free. Scale when ready.
            </h2>
            <p className="text-fg-muted max-w-md mx-auto">No surprise fees. No credit card required.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Free */}
            <Reveal>
              <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col hover:border-border-strong transition-colors duration-500">
                <h3 className="text-base font-semibold text-fg mb-1">Free</h3>
                <p className="text-sm text-fg-faint mb-6">Test the waters.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-fg tracking-tight">₹0</span>
                  <span className="text-sm text-fg-faint">/mo</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['1 evaluation per month', 'Basic score breakdown', 'Email support'].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-fg-muted">
                      <IconCheck size={14} className="text-fg-secondary flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="w-full py-3 text-center text-sm font-medium rounded-xl bg-bg-elevated text-fg border border-border hover:bg-bg-sunken transition-colors block">
                  Start Free
                </Link>
              </div>
            </Reveal>

            {/* Pro */}
            <Reveal delay={0.08}>
              <div className="bg-fg text-bg rounded-2xl p-8 h-full flex flex-col relative border-2 border-fg shadow-2xl hover:shadow-xl transition-shadow duration-500">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-bg text-fg text-[10px] font-bold uppercase tracking-wider">
                  Popular
                </div>
                <h3 className="text-base font-semibold text-bg mb-1">Pro</h3>
                <p className="text-sm text-bg/50 mb-6">For serious founders.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-bg tracking-tight">₹2,499</span>
                  <span className="text-sm text-bg/40">/mo</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['Unlimited evaluations', 'Full 8-agent breakdown', 'Re-evaluation support', 'Competitor landscape', 'Financial projections', 'Priority support'].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-bg/70">
                      <IconCheck size={14} className="text-bg/50 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="w-full py-3 text-center text-sm font-medium rounded-xl bg-bg text-fg hover:opacity-90 transition-opacity block">
                  Upgrade to Pro
                </Link>
              </div>
            </Reveal>

            {/* Enterprise */}
            <Reveal delay={0.16}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col hover:border-border-strong transition-colors duration-500">
                <h3 className="text-base font-semibold text-fg mb-1">Enterprise</h3>
                <p className="text-sm text-fg-faint mb-6">For accelerators &amp; studios.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-fg tracking-tight">Custom</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['Everything in Pro', 'Bulk evaluations', 'Custom agents', 'API access', 'Dedicated manager', 'White-label'].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-fg-muted">
                      <IconCheck size={14} className="text-fg-secondary flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/about" className="w-full py-3 text-center text-sm font-medium rounded-xl bg-bg-elevated text-fg border border-border hover:bg-bg-sunken transition-colors block">
                  Contact Sales
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          FINAL CTA — Big, confident
          ────────────────────────────────────────────── */}
      <section className="py-40 relative">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-fg/[0.015] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-fg tracking-tight mb-6 leading-[1.1]">
              Your idea is worth<br />a real evaluation.
            </h2>
            <p className="text-fg-muted text-lg max-w-md mx-auto mb-12">
              Submit your pitch and let 8 AI agents do the work. It takes less than 10 minutes.
            </p>
            <Link
              href="/sign-up"
              className="group inline-flex items-center justify-center gap-2.5 px-10 py-4 text-sm font-semibold rounded-full bg-fg text-bg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Get Started
              <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

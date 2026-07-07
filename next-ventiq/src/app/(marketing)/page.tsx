'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScoreRing } from '@/components/score/ScoreRing';
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
} from '@tabler/icons-react';

// Sample data for the interactive demo
const SAMPLE_SCORES: Record<string, number> = {
 'Market': 82,
 'Team': 74,
 'Traction': 68,
 'Differentiation': 89,
 'Financials': 71,
 'Clarity': 91,
};

const AGENTS = [
 { name: 'Market Analyst', icon: <IconTarget size={24} />, desc: 'TAM/SAM/SOM, growth rate, competitive landscape' },
 { name: 'Team Evaluator', icon: <IconUsers size={24} />, desc: 'Founder-market fit, experience, complementary skills' },
 { name: 'Traction Auditor', icon: <IconTrendingUp size={24} />, desc: 'Revenue, users, growth metrics, partnerships' },
 { name: 'Financial Modeler', icon: <IconCurrencyDollar size={24} />, desc: 'Revenue model, burn rate, unit economics' },
 { name: 'Differentiation Analyst', icon: <IconBrain size={24} />, desc: 'Moats, IP, switching costs, network effects' },
 { name: 'Pitch Clarity Agent', icon: <IconMessageChatbot size={24} />, desc: 'Narrative structure, jargon, clarity of vision' },
 { name: 'Competitive Intel', icon: <IconChartRadar size={24} />, desc: 'Competitor mapping, positioning, key threats' },
 { name: 'Red-Team Critic', icon: <IconShield size={24} />, desc: 'Adversarial attack: pokes holes, stress-tests claims' },
];

const PRICING_TIERS = [
 {
 name: 'Free',
 price: '$0',
 period: '/mo',
 desc: 'Get started with basic AI evaluation.',
 features: ['1 evaluation per month', 'Basic score breakdown', 'Email support'],
 cta: 'Start Free',
 highlight: false,
 },
 {
 name: 'Pro',
 price: '$29',
 period: '/mo',
 desc: 'Unlimited evaluations with full agent analysis.',
 features: ['Unlimited evaluations', 'Full 8-agent breakdown', 'Re-evaluation support', 'Competitor landscape', 'Financial projections', 'Priority support'],
 cta: 'Upgrade to Pro',
 highlight: true,
 },
 {
 name: 'Enterprise',
 price: 'Custom',
 period: '',
 desc: 'For accelerators and venture studios.',
 features: ['Everything in Pro', 'Bulk evaluations', 'Custom agents', 'API access', 'Dedicated account manager', 'White-label options'],
 cta: 'Contact Sales',
 highlight: false,
 },
];

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 const ref = useRef(null);
 const isInView = useInView(ref, { once: true, margin: '-80px' });
 return (
 <motion.div
 ref={ref}
 initial={{ opacity: 0, y: 32 }}
 animate={isInView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className={className}
 >
 {children}
 </motion.div>
 );
}

export default function LandingPage() {
 return (
 <div className="relative overflow-hidden">
 {/* ── HERO ── */}
 <section className="relative min-h-[90vh] flex items-center">
 {/* Background */}
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 {/* Background effects moved to globals.css */}
 </div>

 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
 {/* Left: Copy */}
 <motion.div
 initial={{ opacity: 0, y: 24 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
 >
 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-elevated border border-border text-fg-secondary text-xs font-medium mb-6">
 <IconRocket size={14} />
 AI-Powered Pitch Evaluation
 </div>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-fg leading-[1.1] mb-6">
 Your Startup Pitch,{' '}
 <span className="bg-clip-text text-transparent bg-fg text-bg">
 Judged by AI
 </span>
 </h1>
 <p className="text-lg text-fg-muted leading-relaxed mb-8 max-w-lg">
 Submit your idea. Get scored by 8 specialized AI agents across market potential, team, traction, and more. Connect with verified investors.
 </p>
 <div className="flex flex-col sm:flex-row gap-3">
 <Link
 href="/sign-up"
 className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-fg text-bg hover:opacity-90 transition-opacity transition-colors"
 >
 Submit Your Pitch <IconArrowRight size={16} />
 </Link>
 <Link
 href="/for-investors"
 className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-bg-elevated text-fg border border-border hover:bg-bg-sunken transition-colors transition-colors"
 >
 I'm an Investor
 </Link>
 </div>
 </motion.div>

 {/* Right: Live score preview */}
 <motion.div
 initial={{ opacity: 0, y: 24, scale: 0.96 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
 className="hidden lg:block"
 >
 <div className="bg-card border border-border rounded-2xl p-8 backdrop-blur-sm shadow-2xl relative">
 <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-green-500 border-2 border-[#09090b] flex items-center justify-center">
 <IconCheck size={12} className="text-fg" />
 </div>
 <div className="flex items-center gap-6 mb-6">
 <ScoreRing score={79} size={100} strokeWidth={6} label="Overall" />
 <div>
 <p className="text-sm font-semibold text-fg">EcoTrack Analytics</p>
 <p className="text-xs text-fg-faint mt-0.5">Sustainability SaaS • Seed Stage</p>
 <div className="flex gap-2 mt-2">
 <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-700 dark:text-green-700 dark:text-green-400 border border-green-500/20">Strong Market</span>
 <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-elevated text-fg-secondary border border-border">Clear Vision</span>
 </div>
 </div>
 </div>
 {/* Score Bars */}
 <div className="space-y-3">
 {Object.entries(SAMPLE_SCORES).map(([label, score]) => {
 const barColor = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500';
 return (
 <div key={label}>
 <div className="flex items-center justify-between mb-1">
 <span className="text-xs text-fg-muted">{label}</span>
 <span className="text-xs font-mono text-fg-secondary">{score}</span>
 </div>
 <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden">
 <motion.div
 className={`h-full rounded-full ${barColor}`}
 initial={{ width: 0 }}
 animate={{ width: `${score}%` }}
 transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
 />
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </motion.div>
 </div>
 </div>
 </section>

 {/* ── HOW SCORING WORKS ── */}
 <section className="py-24 relative">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedSection className="text-center mb-16">
 <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-4">
 8 AI Agents. One Definitive Score.
 </h2>
 <p className="text-fg-muted max-w-2xl mx-auto">
 Each idea is analyzed in parallel by specialized AI agents, then aggregated into a rubric-based composite score.
 </p>
 </AnimatedSection>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {AGENTS.map((agent, i) => (
 <AnimatedSection key={agent.name}>
 <motion.div
  whileHover={{ y: -4, borderColor: 'var(--color-border-strong)' }}
  className="bg-card border border-border rounded-2xl p-5 h-full transition-colors"
 >
 <div className="w-10 h-10 rounded-xl bg-bg-elevated text-fg-secondary flex items-center justify-center mb-4">
 {agent.icon}
 </div>
 <h3 className="text-sm font-semibold text-fg mb-1.5">{agent.name}</h3>
 <p className="text-xs text-fg-faint leading-relaxed">{agent.desc}</p>
 </motion.div>
 </AnimatedSection>
 ))}
 </div>
 </div>
 </section>

 {/* ── DUAL PATH ── */}
 <section className="py-24 relative">
 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-border to-transparent pointer-events-none" />
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <AnimatedSection className="text-center mb-16">
 <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-4">Built for Both Sides</h2>
 <p className="text-fg-muted max-w-2xl mx-auto">
 Whether you're building the future or investing in it, Ventiq has you covered.
 </p>
 </AnimatedSection>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Founders */}
 <AnimatedSection>
 <div className="bg-card border border-border rounded-2xl p-8 h-full relative overflow-hidden group hover:border-border transition-colors">
 <div className="relative z-10">
 <div className="w-12 h-12 rounded-xl bg-bg-elevated text-fg-secondary flex items-center justify-center mb-5">
 <IconRocket size={24} />
 </div>
 <h3 className="text-xl font-bold text-fg mb-3">For Founders</h3>
 <ul className="space-y-3 mb-6">
 {[
 'Submit your pitch in a guided 5-step flow',
 'Get scored by 8 specialized AI agents',
 'See strengths, weaknesses, and competitive intel',
 'Re-evaluate after pivots or updates',
 'Connect with interested investors',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
 <IconCheck size={16} className="text-fg-secondary mt-0.5 flex-shrink-0" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 <Link
 href="/sign-up"
 className="inline-flex items-center gap-2 text-sm font-medium text-fg-secondary hover:text-fg-secondary transition-colors"
 >
 Start building <IconArrowRight size={14} />
 </Link>
 </div>
 </div>
 </AnimatedSection>

 {/* Investors */}
 <AnimatedSection>
 <div className="bg-card border border-border rounded-2xl p-8 h-full relative overflow-hidden group hover:border-border transition-colors">
 <div className="relative z-10">
 <div className="w-12 h-12 rounded-xl bg-bg-elevated text-fg-secondary flex items-center justify-center mb-5">
 <IconEye size={24} />
 </div>
 <h3 className="text-xl font-bold text-fg mb-3">For Investors</h3>
 <ul className="space-y-3 mb-6">
 {[
 'Browse a curated feed of AI-evaluated ideas',
 'Filter by domain, score, and market',
 'Express interest with a personalized message',
 'Get founder-approved access to full breakdowns',
 'Save time with pre-vetted deal flow',
 ].map((item) => (
 <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
 <IconCheck size={16} className="text-fg-secondary mt-0.5 flex-shrink-0" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 <Link
 href="/for-investors"
 className="inline-flex items-center gap-2 text-sm font-medium text-fg-secondary hover:text-fg-secondary transition-colors"
 >
 Learn more <IconArrowRight size={14} />
 </Link>
 </div>
 </div>
 </AnimatedSection>
 </div>
 </div>
 </section>

 {/* ── PROCESS ── */}
 <section className="py-24 relative">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <AnimatedSection className="text-center mb-16">
 <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-4">How It Works</h2>
 <p className="text-fg-muted max-w-2xl mx-auto">
 From submission to investor connection in three simple steps.
 </p>
 </AnimatedSection>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {[
 { step: '01', title: 'Submit Your Pitch', desc: 'Fill in a guided 5-step form covering your idea, team, traction, and funding needs.', icon: <IconRocket size={24} /> },
 { step: '02', title: 'AI Evaluation', desc: '8 specialized agents analyze your pitch in parallel and produce a rubric-based score.', icon: <IconBrain size={24} /> },
 { step: '03', title: 'Connect', desc: 'Verified investors browse scored ideas and express interest. Founders approve access.', icon: <IconHeartHandshake size={24} /> },
 ].map((item, i) => (
 <AnimatedSection key={item.step}>
 <div className="text-center">
 <div className="w-14 h-14 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center text-fg-secondary mx-auto mb-4">
 {item.icon}
 </div>
 <span className="text-xs font-mono text-fg-secondary /60 block mb-2">Step {item.step}</span>
 <h3 className="text-lg font-semibold text-fg mb-2">{item.title}</h3>
 <p className="text-sm text-fg-faint max-w-xs mx-auto leading-relaxed">{item.desc}</p>
 </div>
 </AnimatedSection>
 ))}
 </div>
 </div>
 </section>

 {/* ── PRICING TEASER ── */}
 <section className="py-24 relative">
 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-border to-transparent pointer-events-none" />
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <AnimatedSection className="text-center mb-16">
 <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-4">Simple, Transparent Pricing</h2>
 <p className="text-fg-muted max-w-2xl mx-auto">Start free. Upgrade when you're ready.</p>
 </AnimatedSection>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {PRICING_TIERS.map((tier) => (
 <AnimatedSection key={tier.name}>
 <div
 className={`rounded-2xl p-6 h-full flex flex-col ${
 tier.highlight
 ? 'bg-bg-elevated border-2 border-border relative'
 : 'bg-card border border-border'
 }`}
 >
 {tier.highlight && (
 <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-fg text-bg text-[10px] font-bold uppercase tracking-wider">
 Most Popular
 </div>
 )}
 <div className="mb-6">
 <h3 className="text-lg font-semibold text-fg mb-1">{tier.name}</h3>
 <p className="text-fg-faint text-sm mb-4">{tier.desc}</p>
 <div className="flex items-baseline gap-1">
 <span className="text-3xl font-bold text-fg">{tier.price}</span>
 <span className="text-fg-faint text-sm">{tier.period}</span>
 </div>
 </div>
 <ul className="space-y-2.5 mb-8 flex-1">
 {tier.features.map((f) => (
 <li key={f} className="flex items-center gap-2 text-sm text-fg-muted">
 <IconCheck size={14} className="text-fg-secondary flex-shrink-0" />
 {f}
 </li>
 ))}
 </ul>
 <Link
 href={tier.name === 'Enterprise' ? '/about' : '/sign-up'}
 className={`w-full py-2.5 text-center text-sm font-medium rounded-xl transition-colors block ${
 tier.highlight
 ? 'bg-fg text-bg hover:opacity-90 transition-opacity'
 : 'bg-bg-elevated text-fg border border-border hover:bg-bg-sunken transition-colors'
 }`}
 >
 {tier.cta}
 </Link>
 </div>
 </AnimatedSection>
 ))}
 </div>
 </div>
 </section>

 {/* ── CTA ── */}
 <section className="py-24 relative">
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <AnimatedSection>
 <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-4">
 Ready to get your idea scored?
 </h2>
 <p className="text-fg-muted max-w-lg mx-auto mb-8">
 Join hundreds of founders who've used AI to sharpen their pitch and attract the right investors.
 </p>
 <div className="flex flex-col sm:flex-row gap-3 justify-center">
 <Link
 href="/sign-up"
 className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-fg text-bg hover:opacity-90 transition-opacity transition-colors"
 >
 Get Started Free <IconArrowRight size={16} />
 </Link>
 <Link
 href="/how-it-works"
 className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-bg-elevated text-fg border border-border hover:bg-bg-sunken transition-colors transition-colors"
 >
 See How It Works
 </Link>
 </div>
 </AnimatedSection>
 </div>
 </section>
 </div>
 );
}

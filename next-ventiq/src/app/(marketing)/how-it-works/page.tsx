'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
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
 IconUpload,
 IconSparkles,
 IconHeartHandshake,
 IconCheck,
} from '@tabler/icons-react';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 const ref = useRef(null);
 const isInView = useInView(ref, { once: true, margin: '-60px' });
 return (
 <motion.div
 ref={ref}
 initial={{ opacity: 0, y: 24 }}
 animate={isInView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
 className={className}
 >
 {children}
 </motion.div>
 );
}

const STEPS = [
 {
 step: '01',
 title: 'Submit Your Pitch',
 desc: 'Fill out a guided 5-step form covering your idea details, team composition, traction metrics, and funding needs. The form adapts to your startup stage.',
 icon: <IconUpload size={28} />,
 color: 'gray',
 },
 {
 step: '02',
 title: 'AI Evaluation Pipeline',
 desc: '8 specialized AI agents analyze your pitch in parallel. Each agent focuses on a specific dimension — from market potential to red-team critique — producing a scored assessment.',
 icon: <IconSparkles size={28} />,
 color: 'blue',
 },
 {
 step: '03',
 title: 'Get Your Score',
 desc: 'Individual agent scores are aggregated into a composite score using a rubric-based weighting system. You receive a detailed breakdown with strengths, weaknesses, and actionable insights.',
 icon: <IconBrain size={28} />,
 color: 'green',
 },
 {
 step: '04',
 title: 'Connect with Investors',
 desc: 'Verified investors browse the Explore feed, filter by domain and score, and express interest. Founders approve access, unlocking the full breakdown for the investor.',
 icon: <IconHeartHandshake size={28} />,
 color: 'amber',
 },
];

const AGENTS = [
 { name: 'Market Analyst', icon: <IconTarget size={22} />, desc: 'Evaluates total addressable market (TAM), serviceable market, growth rate, timing, and competitive dynamics.', dimension: 'Market' },
 { name: 'Team Evaluator', icon: <IconUsers size={22} />, desc: 'Assesses founder-market fit, relevant experience, complementary skills, and execution capability.', dimension: 'Team' },
 { name: 'Traction Auditor', icon: <IconTrendingUp size={22} />, desc: 'Reviews revenue, user growth, partnerships, product-market fit signals, and milestone velocity.', dimension: 'Traction' },
 { name: 'Financial Modeler', icon: <IconCurrencyDollar size={22} />, desc: 'Analyzes revenue model viability, unit economics, burn rate, and fundraising ask relative to milestones.', dimension: 'Financials' },
 { name: 'Differentiation Analyst', icon: <IconBrain size={22} />, desc: 'Identifies competitive moats, intellectual property, switching costs, and network effects.', dimension: 'Differentiation' },
 { name: 'Pitch Clarity Agent', icon: <IconMessageChatbot size={22} />, desc: 'Evaluates narrative structure, vision clarity, jargon density, and overall persuasiveness.', dimension: 'Clarity' },
 { name: 'Competitive Intelligence', icon: <IconChartRadar size={22} />, desc: 'Maps the competitive landscape — identifies direct/indirect competitors, positioning gaps, and threats.', dimension: 'Competition' },
 { name: 'Red-Team Critic', icon: <IconShield size={22} />, desc: 'Plays devil\'s advocate — stress-tests claims, identifies assumptions, and surfaces potential failure modes.', dimension: 'Risk' },
];

export default function HowItWorksPage() {
 return (
 <div className="relative overflow-hidden">
 {/* Hero */}
 <section className="py-20 sm:py-28 relative">
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 </div>
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
 <h1 className="text-4xl sm:text-5xl font-bold text-fg mb-5">
 How Ventiq Works
 </h1>
 <p className="text-lg text-fg-muted max-w-2xl mx-auto leading-relaxed">
 From submission to investor connection — here's the complete journey of your startup pitch through our AI evaluation pipeline.
 </p>
 </motion.div>
 </div>
 </section>

 {/* Process Steps */}
 <section className="pb-24">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="space-y-8">
 {STEPS.map((step, i) => (
 <AnimatedSection key={step.step}>
 <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
 step.color === 'gray' ? 'bg-bg-elevated text-fg-secondary ' :
 step.color === 'blue' ? 'bg-bg-elevated text-fg-secondary ' :
 step.color === 'green' ? 'bg-green-500/10 text-green-700 dark:text-green-700 dark:text-green-400' :
 'bg-amber-500/10 text-amber-600 dark:text-amber-600 dark:text-amber-400'
 }`}>
 {step.icon}
 </div>
 <div>
 <span className="text-xs font-mono text-fg-faint mb-1 block">Step {step.step}</span>
 <h3 className="text-xl font-semibold text-fg mb-2">{step.title}</h3>
 <p className="text-sm text-fg-muted leading-relaxed">{step.desc}</p>
 </div>
 </div>
 </AnimatedSection>
 ))}
 </div>
 </div>
 </section>

 {/* Agent Deep Dive */}
 <section className="py-24 relative">
 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-border to-transparent pointer-events-none" />
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <AnimatedSection className="text-center mb-14">
 <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-4">Meet the 8 AI Agents</h2>
 <p className="text-fg-muted max-w-2xl mx-auto">Each agent is a specialized evaluator trained to assess a specific dimension of your startup.</p>
 </AnimatedSection>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 {AGENTS.map((agent) => (
 <AnimatedSection key={agent.name}>
 <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-border transition-colors">
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-xl bg-bg-elevated text-fg-secondary flex items-center justify-center flex-shrink-0">
 {agent.icon}
 </div>
 <div>
 <div className="flex items-center gap-2 mb-1.5">
 <h3 className="text-sm font-semibold text-fg">{agent.name}</h3>
 <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-elevated text-fg-faint border border-border">{agent.dimension}</span>
 </div>
 <p className="text-xs text-fg-faint leading-relaxed">{agent.desc}</p>
 </div>
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
 <h2 className="text-3xl font-bold text-fg mb-4">Ready to submit your pitch?</h2>
 <p className="text-fg-muted mb-8">It takes less than 5 minutes. Get your AI score today.</p>
 <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-fg text-bg hover:opacity-90 transition-opacity transition-colors">
 Get Started Free <IconArrowRight size={16} />
 </Link>
 </AnimatedSection>
 </div>
 </section>
 </div>
 );
}

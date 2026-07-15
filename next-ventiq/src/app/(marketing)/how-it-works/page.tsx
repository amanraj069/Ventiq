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
} from '@tabler/icons-react';

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

const STEPS = [
  {
    num: '01',
    title: 'Submit Your Pitch',
    desc: 'Fill out a guided 5-step form covering your idea details, team composition, traction metrics, and funding needs. The form adapts to your startup stage — takes under 10 minutes.',
    icon: <IconUpload size={22} />,
  },
  {
    num: '02',
    title: 'AI Evaluation Pipeline',
    desc: '8 specialized AI agents analyze your pitch in parallel. Each agent focuses on a specific dimension — from market potential to adversarial red-team critique — producing a scored assessment.',
    icon: <IconSparkles size={22} />,
  },
  {
    num: '03',
    title: 'Get Your Score',
    desc: 'Individual agent scores are aggregated into a composite score using a rubric-based weighting system. You receive a detailed breakdown with strengths, weaknesses, and actionable insights.',
    icon: <IconBrain size={22} />,
  },
  {
    num: '04',
    title: 'Connect with Investors',
    desc: 'Verified investors browse the Explore feed, filter by domain and score, and express interest. Founders approve access, unlocking the full breakdown for the investor.',
    icon: <IconHeartHandshake size={22} />,
  },
];

const AGENTS = [
  { name: 'Market Analyst', icon: <IconTarget size={20} />, desc: 'Evaluates total addressable market (TAM), serviceable market, growth rate, timing, and competitive dynamics.', tag: 'Market' },
  { name: 'Team Evaluator', icon: <IconUsers size={20} />, desc: 'Assesses founder-market fit, relevant experience, complementary skills, and execution capability.', tag: 'Team' },
  { name: 'Traction Auditor', icon: <IconTrendingUp size={20} />, desc: 'Reviews revenue, user growth, partnerships, product-market fit signals, and milestone velocity.', tag: 'Traction' },
  { name: 'Financial Modeler', icon: <IconCurrencyDollar size={20} />, desc: 'Analyzes revenue model viability, unit economics, burn rate, and fundraising ask relative to milestones.', tag: 'Financials' },
  { name: 'Differentiation Analyst', icon: <IconBrain size={20} />, desc: 'Identifies competitive moats, intellectual property, switching costs, and network effects.', tag: 'Moat' },
  { name: 'Pitch Clarity Agent', icon: <IconMessageChatbot size={20} />, desc: 'Evaluates narrative structure, vision clarity, jargon density, and overall persuasiveness.', tag: 'Clarity' },
  { name: 'Competitive Intel', icon: <IconChartRadar size={20} />, desc: 'Maps the competitive landscape — identifies direct/indirect competitors, positioning gaps, and threats.', tag: 'Intel' },
  { name: 'Red-Team Critic', icon: <IconShield size={20} />, desc: 'Plays devil\'s advocate — stress-tests claims, identifies assumptions, and surfaces potential failure modes.', tag: 'Risk' },
];

export default function HowItWorksPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="py-28 sm:py-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-6">How It Works</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-fg tracking-tight leading-[1.08] mb-6">
              From pitch to<br />investor connection.
            </h1>
            <p className="text-lg text-fg-muted max-w-xl mx-auto leading-relaxed">
              The complete journey of your startup pitch through our AI evaluation pipeline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 gap-px bg-border/50 rounded-2xl overflow-hidden border border-border">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.06}>
                <div className="bg-card p-8 sm:p-10 group">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-fg-muted flex-shrink-0 group-hover:text-fg transition-colors duration-500">
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-fg-faint tracking-widest block mb-2">Step {step.num}</span>
                      <h3 className="text-xl font-semibold text-fg mb-2 tracking-tight">{step.title}</h3>
                      <p className="text-sm text-fg-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Deep Dive */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="mb-16">
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-4">The Engine</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-fg tracking-tight leading-[1.1] max-w-2xl">
              Meet the 8 AI agents.
            </h2>
            <p className="text-fg-muted mt-4 max-w-lg">Each agent is a specialized evaluator trained to assess a specific dimension of your startup.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AGENTS.map((agent, i) => (
              <Reveal key={agent.name} delay={i * 0.04}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-border-strong transition-colors duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-fg-muted flex-shrink-0">
                      {agent.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-sm font-semibold text-fg">{agent.name}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-elevated text-fg-faint border border-border/50">{agent.tag}</span>
                      </div>
                      <p className="text-xs text-fg-faint leading-relaxed">{agent.desc}</p>
                    </div>
                  </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight mb-4">Ready to submit your pitch?</h2>
            <p className="text-fg-muted mb-10">It takes less than 10 minutes. Get your AI score today.</p>
            <Link href="/sign-up" className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full bg-fg text-bg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              Get Started Free <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

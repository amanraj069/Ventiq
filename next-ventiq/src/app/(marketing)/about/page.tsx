'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

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

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="py-28 sm:py-36">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-6">About</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-fg tracking-tight leading-[1.08] mb-8">
              About Ventiq.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="space-y-8 text-fg-muted leading-relaxed text-base">
              <p>
                Ventiq was born from a simple observation: <span className="text-fg font-medium">the early-stage fundraising process is broken</span>. Founders spend months crafting pitch decks, only to receive surface-level rejections. Investors drown in cold emails and unstructured pitches.
              </p>
              <p>
                We built Ventiq to bridge this gap with AI. Our multi-agent evaluation pipeline provides founders with <span className="text-fg font-medium">actionable, structured feedback</span> in minutes — the kind of analysis that typically requires weeks of advisory time.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-20">
              <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-4">Mission</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight mb-6">
                Democratize access to<br />high-quality evaluation.
              </h2>
              <p className="text-fg-muted leading-relaxed">
                Every founder, regardless of their network or background, deserves rigorous feedback on their idea. Every investor deserves a smarter way to discover promising ventures.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-20">
              <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-4">How we&apos;re different</p>
              <ul className="space-y-4 mt-6">
                {[
                  'Not a pitch deck builder — we evaluate ideas, not slides.',
                  '8 specialized AI agents provide depth no single model can match.',
                  'Rubric-based scoring ensures consistency and transparency.',
                  'Investor matching is approval-gated, protecting both sides.',
                  'Re-evaluation lets founders track improvement over time.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-fg-muted">
                    <span className="text-fg-secondary mt-0.5 flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-20">
              <p className="text-xs text-fg-faint uppercase tracking-[0.2em] mb-4">Technology</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight mb-6">
                The engine under the hood.
              </h2>
              <div className="space-y-6 text-fg-muted leading-relaxed">
                <p>
                  Ventiq is powered by a pipeline of 8 specialized AI agents running on state-of-the-art language models. Each agent evaluates a specific dimension of a startup — market, team, traction, financials, differentiation, clarity, competition, and risk — producing independent assessments that are aggregated into a composite score.
                </p>
                <p>
                  The system includes similarity detection via vector embeddings, version-tracked evaluations, and an approval-gated investor matching system.
                </p>
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.1}>
            <div className="mt-24 flex flex-col sm:flex-row gap-3">
              <Link href="/how-it-works" className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full bg-fg text-bg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                See How It Works <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link href="/sign-up" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-full text-fg border border-border hover:bg-card transition-colors duration-300">
                Get Started
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

import { Input, Textarea, Select } from '@/components/ui';
import { usePitchStore } from '@/stores/usePitchStore';
import { motion } from 'framer-motion';

const DOMAINS = [
  { label: 'SaaS', value: 'saas' },
  { label: 'Fintech', value: 'fintech' },
  { label: 'AI/ML', value: 'ai' },
  { label: 'Healthtech', value: 'healthtech' },
  { label: 'E-commerce', value: 'ecommerce' },
  { label: 'Edtech', value: 'edtech' },
  { label: 'Web3/Crypto', value: 'web3' },
  { label: 'Deeptech', value: 'deeptech' },
  { label: 'Other', value: 'other' },
];

export function Step1Idea() {
  const { ideaData, setIdeaData } = usePitchStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-fg">The Idea</h2>
        <p className="text-sm text-fg-muted">Let's start with the basics of what you're building.</p>
      </div>

      <div className="space-y-5">
        <Input
          label="Startup / Idea Name"
          required
          placeholder="e.g. Acme Corp"
          value={ideaData.title}
          onChange={(e) => setIdeaData({ title: e.target.value })}
        />

        <Input
          label="One-line Pitch"
          required
          placeholder="Describe what you do in one simple sentence."
          value={ideaData.oneLinePitch}
          onChange={(e) => setIdeaData({ oneLinePitch: e.target.value })}
        />

        <Textarea
          label="Full Description"
          required
          rows={4}
          placeholder="What problem are you solving and how does your solution work?"
          value={ideaData.description}
          onChange={(e) => setIdeaData({ description: e.target.value })}
        />

        <div className="grid sm:grid-cols-2 gap-5">
          <Select
            label="Domain / Sector"
            required
            options={DOMAINS}
            value={ideaData.domain}
            onChange={(e) => setIdeaData({ domain: e.target.value })}
          />

          <Input
            label="Target Country / Market"
            placeholder="e.g. USA, Global"
            value={ideaData.targetMarket}
            onChange={(e) => setIdeaData({ targetMarket: e.target.value })}
          />
        </div>

        <Textarea
          label="What's special? (Differentiation)"
          rows={3}
          placeholder="Why are you better than the alternatives?"
          value={ideaData.differentiation}
          onChange={(e) => setIdeaData({ differentiation: e.target.value })}
        />

        <Input
          label="Website URL (Optional)"
          type="text"
          placeholder="yoursite.com"
          value={ideaData.websiteUrl}
          onChange={(e) => setIdeaData({ websiteUrl: e.target.value })}
        />

        <Input
          label="Pitch Deck URL (Optional)"
          type="text"
          placeholder="docs.google.com/presentation/..."
          value={ideaData.deckUrl}
          onChange={(e) => setIdeaData({ deckUrl: e.target.value })}
        />
      </div>
    </motion.div>
  );
}

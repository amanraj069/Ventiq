import { Input, Textarea, Select } from '@/components/ui';
import { usePitchStore } from '@/stores/usePitchStore';
import { motion } from 'framer-motion';

const STAGE_OPTIONS = [
  { label: 'Select...', value: '' },
  { label: 'Not raising', value: 'Not raising' },
  { label: 'Pre-seed', value: 'Pre-seed' },
  { label: 'Seed', value: 'Seed' },
  { label: 'Series A', value: 'Series A' },
  { label: 'Series B+', value: 'Series B+' },
];

export function Step4Funding() {
  const { fundingData, setFundingData } = usePitchStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-fg">Funding Ask</h2>
        <p className="text-sm text-fg-muted">How much capital do you need?</p>
      </div>

      <div className="space-y-5">
        <Select
          label="Funding Stage"
          required
          options={STAGE_OPTIONS}
          value={fundingData.fundingStage}
          onChange={(e) => setFundingData({ fundingStage: e.target.value })}
        />

        {fundingData.fundingStage !== 'Not raising' && (
          <>
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <Input
                  label="Amount Seeking"
                  type="number"
                  placeholder="e.g. 500000"
                  value={fundingData.fundingAsk}
                  onChange={(e) => setFundingData({ fundingAsk: e.target.value === '' ? '' : parseInt(e.target.value) })}
                />
              </div>
              <Input
                label="Currency"
                placeholder="USD"
                value={fundingData.fundingAskCurrency}
                onChange={(e) => setFundingData({ fundingAskCurrency: e.target.value })}
              />
            </div>

            <Textarea
              label="Intended Use of Funds (Brief)"
              rows={3}
              placeholder="e.g. Hiring 2 engineers, expanding marketing spend..."
              value={fundingData.useOfFunds}
              onChange={(e) => setFundingData({ useOfFunds: e.target.value })}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}

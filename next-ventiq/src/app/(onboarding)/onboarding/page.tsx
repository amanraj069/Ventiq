'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Textarea, Select, Badge } from '@/components/ui';
import { apiFetch } from '@/lib/api';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<'role' | 'founder' | 'investor'>('role');
  const [role, setRole] = useState<'founder' | 'investor' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Founder Form State
  const [founderForm, setFounderForm] = useState({
    isTechnical: false,
    priorExperience: '',
    linkedinUrl: '',
  });

  // Investor Form State
  const [investorForm, setInvestorForm] = useState({
    investorType: 'angel',
    checkSizeMin: '',
    checkSizeMax: '',
    sectors: '',
    linkedinUrl: '',
    accreditationDeclared: false,
  });

  const handleSetRole = async (selectedRole: 'founder' | 'investor') => {
    try {
      setLoading(true);
      setError(null);
      await apiFetch('/api/users/role', {
        method: 'PATCH',
        body: JSON.stringify({ role: selectedRole }),
      });
      setRole(selectedRole);
      setStep(selectedRole);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFounderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await apiFetch('/api/users/founder-profile', {
        method: 'PATCH',
        body: JSON.stringify(founderForm),
      });
      // Force NextAuth session update by reloading or router refresh, 
      // then redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInvestorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const payload = {
        ...investorForm,
        checkSizeMin: investorForm.checkSizeMin ? parseInt(investorForm.checkSizeMin) : undefined,
        checkSizeMax: investorForm.checkSizeMax ? parseInt(investorForm.checkSizeMax) : undefined,
        sectors: investorForm.sectors.split(',').map(s => s.trim()).filter(Boolean),
      };
      
      await apiFetch('/api/users/investor-verification', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-bg-subtle">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-fg">Welcome to Ventiq</h1>
          <p className="text-fg-muted mt-2">Let's get your profile set up.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-danger-subtle text-danger rounded-[var(--radius-md)] text-sm font-medium">
            {error}
          </div>
        )}

        {step === 'role' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleSetRole('founder')}
              disabled={loading}
              className="flex flex-col items-center p-8 border border-border rounded-[var(--radius-lg)] bg-card hover:border-accent hover:shadow-sm transition-all duration-200 text-left active:scale-[0.98] disabled:opacity-50"
            >
              <div className="w-12 h-12 bg-accent-subtle text-accent rounded-full flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-fg">I am a Founder</h3>
              <p className="text-sm text-fg-muted text-center mt-2">
                I want to submit pitch decks and get AI evaluation.
              </p>
            </button>

            <button
              onClick={() => handleSetRole('investor')}
              disabled={loading}
              className="flex flex-col items-center p-8 border border-border rounded-[var(--radius-lg)] bg-card hover:border-success hover:shadow-sm transition-all duration-200 text-left active:scale-[0.98] disabled:opacity-50"
            >
              <div className="w-12 h-12 bg-success-subtle text-success rounded-full flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-fg">I am an Investor</h3>
              <p className="text-sm text-fg-muted text-center mt-2">
                I want to discover and evaluate startup pitches.
              </p>
            </button>
          </div>
        )}

        {step === 'founder' && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Founder Profile</h2>
            <form onSubmit={handleFounderSubmit} className="space-y-6">
              <Input
                label="LinkedIn URL"
                type="url"
                required
                placeholder="https://linkedin.com/in/..."
                value={founderForm.linkedinUrl}
                onChange={(e) => setFounderForm({ ...founderForm, linkedinUrl: e.target.value })}
              />
              
              <Textarea
                label="Prior Experience (Optional)"
                placeholder="Briefly describe your background..."
                value={founderForm.priorExperience}
                onChange={(e) => setFounderForm({ ...founderForm, priorExperience: e.target.value })}
                rows={3}
              />
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  checked={founderForm.isTechnical}
                  onChange={(e) => setFounderForm({ ...founderForm, isTechnical: e.target.checked })}
                />
                <span className="text-sm text-fg font-medium">I have a technical background</span>
              </label>

              <div className="pt-4 flex justify-end">
                <Button type="submit" isLoading={loading} className="w-full sm:w-auto">
                  Complete Setup
                </Button>
              </div>
            </form>
          </Card>
        )}

        {step === 'investor' && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Investor Verification</h2>
            <p className="text-sm text-fg-muted mb-6">
              To protect founders, we verify all investor profiles.
            </p>
            <form onSubmit={handleInvestorSubmit} className="space-y-6">
              <Select
                label="Investor Type"
                value={investorForm.investorType}
                onChange={(e) => setInvestorForm({ ...investorForm, investorType: e.target.value })}
                options={[
                  { label: 'Angel Investor', value: 'angel' },
                  { label: 'VC Fund', value: 'vc_fund' },
                  { label: 'Family Office', value: 'family_office' },
                  { label: 'Syndicate', value: 'syndicate' },
                ]}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Min Check Size ($)"
                  type="number"
                  placeholder="25000"
                  value={investorForm.checkSizeMin}
                  onChange={(e) => setInvestorForm({ ...investorForm, checkSizeMin: e.target.value })}
                />
                <Input
                  label="Max Check Size ($)"
                  type="number"
                  placeholder="1000000"
                  value={investorForm.checkSizeMax}
                  onChange={(e) => setInvestorForm({ ...investorForm, checkSizeMax: e.target.value })}
                />
              </div>

              <Input
                label="Preferred Sectors"
                placeholder="AI, SaaS, Fintech (comma separated)"
                value={investorForm.sectors}
                onChange={(e) => setInvestorForm({ ...investorForm, sectors: e.target.value })}
              />

              <Input
                label="LinkedIn URL"
                type="url"
                required
                placeholder="https://linkedin.com/in/..."
                value={investorForm.linkedinUrl}
                onChange={(e) => setInvestorForm({ ...investorForm, linkedinUrl: e.target.value })}
              />

              <label className="flex items-start gap-3 cursor-pointer bg-bg-sunken p-4 rounded-[var(--radius-md)] border border-border">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-0.5 rounded border-border text-accent focus:ring-accent"
                  checked={investorForm.accreditationDeclared}
                  onChange={(e) => setInvestorForm({ ...investorForm, accreditationDeclared: e.target.checked })}
                />
                <span className="text-sm text-fg leading-snug">
                  I declare that I am an accredited investor or represent an accredited institution. I understand that false declarations may result in a permanent ban.
                </span>
              </label>

              <div className="pt-4 flex justify-end">
                <Button type="submit" isLoading={loading} className="w-full sm:w-auto">
                  Submit Verification
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}

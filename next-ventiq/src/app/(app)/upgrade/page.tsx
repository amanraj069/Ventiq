'use client';

import { useState } from 'react';
import Script from 'next/script';
import { Card, Button } from '@/components/ui';
import { apiFetch } from '@/lib/api';
import { IconCheck, IconSparkles, IconX } from '@tabler/icons-react';
import toast from 'react-hot-toast';

const FEATURES = [
  { name: 'Unlimited evaluations', free: false, pro: true },
  { name: '1 evaluation per month', free: true, pro: false },
  { name: 'Basic score breakdown (6 agents)', free: true, pro: true },
  { name: 'Full 8-agent breakdown', free: false, pro: true },
  { name: 'Re-evaluation support', free: false, pro: true },
  { name: 'Competitor landscape analysis', free: false, pro: true },
  { name: 'Financial projection modeling', free: false, pro: true },
  { name: 'Red-team critique', free: false, pro: true },
  { name: 'Priority support', free: false, pro: true },
];

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      const res = await apiFetch<{ subscriptionId: string }>('/billing/subscription', { method: 'POST' });
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'dummy_key_id',
        subscription_id: res.subscriptionId,
        name: 'Ventiq',
        description: 'Ventiq Pro Plan',
        handler: function (response: any) {
          toast.success('Payment successful! Welcome to Pro.');
          window.location.href = '/settings/billing?success=true';
        },
        theme: {
          color: '#000000'
        }
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        toast.error(response.error.description || 'Payment failed');
      });
      rzp.open();
      
    } catch (err: any) {
      toast.error(err.message || 'Failed to initialize checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="max-w-5xl mx-auto space-y-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-fg">Upgrade to Ventiq Pro</h1>
        <p className="text-fg-faint mt-3 text-lg">
          Unlock the full power of our AI evaluation engine. Get unlimited pitches, deeper insights, and priority access.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Free Tier */}
        <Card className="p-8 border-border/50">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-fg">Free Plan</h2>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-fg">$0</span>
              <span className="text-fg-faint">/mo</span>
            </div>
          </div>
          <Button variant="secondary" className="w-full mb-8" disabled>
            Current Plan
          </Button>
          <ul className="space-y-4">
            {FEATURES.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                {feature.free ? (
                  <IconCheck size={18} className="text-fg-secondary" />
                ) : (
                  <IconX size={18} className="text-border" />
                )}
                <span className={feature.free ? 'text-fg-muted' : 'text-border'}>
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Pro Tier */}
        <Card className="p-8 border-fg relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-fg/5 rounded-bl-[100px] pointer-events-none" />
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-fg flex items-center gap-2">
              Pro Plan <IconSparkles size={18} className="text-fg-secondary" />
            </h2>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-fg">$29</span>
              <span className="text-fg-faint">/mo</span>
            </div>
          </div>
          <Button className="w-full mb-8" onClick={handleUpgrade} disabled={loading} loading={loading}>
            Upgrade Now
          </Button>
          <ul className="space-y-4">
            {FEATURES.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                {feature.pro ? (
                  <IconCheck size={18} className="text-fg" />
                ) : (
                  <IconX size={18} className="text-border" />
                )}
                <span className={feature.pro ? 'text-fg' : 'text-border font-medium'}>
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
    </>
  );
}

'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import { useSession } from 'next-auth/react';
import { apiFetch } from '@/lib/api';
import { IconCreditCard, IconSparkles, IconCheck } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function BillingSettingsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fallback to 'free' if tier is not properly populated yet
  const tier = (session?.user as any)?.tier || 'free';
  const isPro = tier === 'pro';

  const handleAction = async () => {
    try {
      setLoading(true);
      if (isPro) {
        // Cancel subscription
        if (confirm('Are you sure you want to cancel your Pro plan? You will lose access to premium features immediately.')) {
          await apiFetch('/billing/cancel', { method: 'POST' });
          toast.success('Subscription cancelled successfully');
          window.location.reload();
        }
      } else {
        // Go to Checkout / Upgrade
        router.push('/upgrade');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to manage billing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-semibold text-fg">Billing & Subscription</h1>
        <p className="text-fg-faint mt-1">Manage your plan and billing details.</p>
      </div>

      <Card className="p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-fg">Current Plan</h2>
              <Badge variant={isPro ? 'primary' : 'secondary'} className="uppercase tracking-wider text-[10px]">
                {tier}
              </Badge>
            </div>
            <p className="text-fg-faint mt-2 max-w-lg">
              {isPro
                ? 'You are on the Pro plan. You have access to unlimited evaluations and all advanced agents.'
                : 'You are on the Free plan. You are limited to 1 evaluation per month.'}
            </p>
          </div>
          <Button
            onClick={handleAction}
            disabled={loading}
            icon={isPro ? <IconCreditCard size={18} /> : <IconSparkles size={18} />}
          >
            {loading ? 'Processing...' : isPro ? 'Cancel Subscription' : 'Upgrade to Pro'}
          </Button>
        </div>

        {!isPro && (
          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold text-fg mb-4">Why upgrade?</h3>
            <ul className="space-y-3">
              {[
                'Unlimited idea evaluations (no monthly limits)',
                'Full 8-agent deep breakdown',
                'Competitor landscape analysis',
                'Financial projection modeling',
                'Priority support',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-fg-muted">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                    <IconCheck size={12} stroke={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}

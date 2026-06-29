'use client';

import { IconTrendingUp, IconCalendarTime, IconCash } from '@tabler/icons-react';

interface FinancialProjectionProps {
  financialProjection: {
    summary: string;
    yearOneRevenue: string;
    yearThreeRevenue: string;
    breakEvenMonths: number;
  };
}

export function FinancialProjection({ financialProjection }: FinancialProjectionProps) {
  const metrics = [
    {
      icon: <IconCash className="w-5 h-5" />,
      label: 'Year 1 Revenue',
      value: financialProjection.yearOneRevenue,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: <IconTrendingUp className="w-5 h-5" />,
      label: 'Year 3 Revenue',
      value: financialProjection.yearThreeRevenue,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: <IconCalendarTime className="w-5 h-5" />,
      label: 'Break Even',
      value: financialProjection.breakEvenMonths > 0
        ? `${financialProjection.breakEvenMonths} months`
        : 'N/A',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
        <span>💰</span> Financial Projection
      </h3>
      <p className="text-white/60 text-sm leading-relaxed mb-5">{financialProjection.summary}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className={`rounded-xl border ${metric.bgColor} p-4 text-center`}
          >
            <div className={`flex justify-center mb-2 ${metric.color}`}>
              {metric.icon}
            </div>
            <div className={`text-lg font-bold ${metric.color} mb-1`}>{metric.value}</div>
            <div className="text-[11px] text-white/40 uppercase tracking-wider font-medium">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      {/* Theme toggle in top-right */}
      <div className="fixed top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Logo / Title */}
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-fg">
          Ventiq
        </h1>
        <p className="text-fg-muted text-center max-w-md">
          AI-judged startup pitch evaluation &amp; investor matching platform.
        </p>
      </div>

      {/* Design system preview */}
      <div className="w-full max-w-2xl space-y-6">
        {/* Score Preview */}
        <div className="bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-fg">Design System Preview</h2>
            <span className="font-tabular text-2xl font-bold text-accent">
              87<span className="text-fg-faint text-base">/100</span>
            </span>
          </div>
          <p className="text-sm text-fg-muted mb-6">
            Verifying semantic CSS variables, Geist fonts, theme toggle, and base components.
          </p>

          {/* Color swatches */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent" />
              <span className="text-[10px] text-fg-faint">Accent</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-success" />
              <span className="text-[10px] text-fg-faint">Success</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-warning" />
              <span className="text-[10px] text-fg-faint">Warning</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-danger" />
              <span className="text-[10px] text-fg-faint">Danger</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-info" />
              <span className="text-[10px] text-fg-faint">Info</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center h-6 px-2 text-xs font-medium rounded-full bg-accent-subtle text-accent">
              Team Fit
            </span>
            <span className="inline-flex items-center h-6 px-2 text-xs font-medium rounded-full bg-success-subtle text-success">
              Traction
            </span>
            <span className="inline-flex items-center h-6 px-2 text-xs font-medium rounded-full bg-warning-subtle text-warning">
              Market
            </span>
            <span className="inline-flex items-center h-6 px-2 text-xs font-medium rounded-full bg-danger-subtle text-danger">
              Red-Team
            </span>
            <span className="inline-flex items-center h-6 px-2 text-xs font-medium rounded-full bg-info-subtle text-info">
              Clarity
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="h-10 px-4 text-sm font-medium rounded-[var(--radius-md)] bg-accent text-accent-foreground hover:bg-accent-hover transition-all duration-150 active:scale-[0.97] cursor-pointer">
              Submit Idea
            </button>
            <button className="h-10 px-4 text-sm font-medium rounded-[var(--radius-md)] bg-bg-elevated text-fg border border-border hover:bg-card-hover transition-all duration-150 active:scale-[0.97] cursor-pointer">
              Browse Ideas
            </button>
            <button className="h-10 px-4 text-sm font-medium rounded-[var(--radius-md)] bg-transparent text-fg-secondary hover:bg-bg-sunken transition-all duration-150 active:scale-[0.97] cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        {/* Typography preview */}
        <div className="bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm">
          <h3 className="text-base font-semibold text-fg mb-3">Typography</h3>
          <div className="space-y-2">
            <p className="text-fg">Primary text — using Geist Sans</p>
            <p className="text-fg-secondary">Secondary text — slightly muted</p>
            <p className="text-fg-muted">Muted text — for captions and hints</p>
            <p className="text-fg-faint">Faint text — for disabled or tertiary content</p>
            <p className="font-tabular text-fg">
              Tabular numbers: <span className="text-accent font-bold">1,234,567.89</span> — monospace for data
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-fg-faint mt-8">
        Phase 0 — Design System Foundation ✓
      </p>
    </main>
  );
}

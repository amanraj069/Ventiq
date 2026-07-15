import { Card } from '@/components/ui';
import { IconBell, IconInbox } from '@tabler/icons-react';

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Notifications</h1>
          <p className="text-fg-faint mt-1">Stay updated on your evaluations and investor interests.</p>
        </div>
        <IconBell className="text-fg-muted" size={24} />
      </div>

      <Card className="p-16 flex flex-col items-center justify-center text-center border-dashed border-border/50 bg-bg-elevated/50">
        <div className="w-16 h-16 rounded-full bg-border/20 flex items-center justify-center mb-4">
          <IconInbox size={32} className="text-fg-muted" />
        </div>
        <h2 className="text-lg font-medium text-fg">No notifications yet</h2>
        <p className="text-sm text-fg-muted max-w-sm mt-2">
          When you submit ideas or receive interest from investors, your updates will appear here.
        </p>
      </Card>
    </div>
  );
}

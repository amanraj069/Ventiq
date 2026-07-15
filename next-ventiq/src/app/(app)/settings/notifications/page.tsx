import { Card, Button } from '@/components/ui';

export default function NotificationSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-semibold text-fg">Notification Preferences</h1>
        <p className="text-fg-faint mt-1">Manage how and when Ventiq contacts you.</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-fg">Evaluation Updates</p>
              <p className="text-sm text-fg-muted">Get notified when an evaluation completes.</p>
            </div>
            {/* We can use a switch component here, using a checkbox for now */}
            <input type="checkbox" className="w-5 h-5 accent-fg" defaultChecked />
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-fg">Investor Interest</p>
              <p className="text-sm text-fg-muted">Get notified when an investor shows interest in your pitch.</p>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-fg" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-fg">Marketing Emails</p>
              <p className="text-sm text-fg-muted">Receive news, updates, and offers from Ventiq.</p>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-fg" />
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <Button>Save Preferences</Button>
        </div>
      </Card>
    </div>
  );
}

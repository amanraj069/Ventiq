import { Card, Input, Button } from '@/components/ui';

export default function ProfileSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-semibold text-fg">Profile Settings</h1>
        <p className="text-fg-faint mt-1">Manage your personal information.</p>
      </div>

      <Card className="p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email Address" type="email" placeholder="john@example.com" disabled />
        </div>
        
        <Input label="Bio" placeholder="Tell us about yourself..." />

        <div className="pt-4 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}

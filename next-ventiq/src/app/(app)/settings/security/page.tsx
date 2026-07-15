import { Card, Input, Button } from '@/components/ui';

export default function SecuritySettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-semibold text-fg">Security</h1>
        <p className="text-fg-faint mt-1">Manage your account security and authentication.</p>
      </div>

      <Card className="p-8 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-fg mb-4">Change Password</h2>
          <div className="space-y-4 max-w-md">
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Input label="Confirm New Password" type="password" />
          </div>
        </div>
        
        <div className="pt-4 flex justify-start">
          <Button>Update Password</Button>
        </div>
      </Card>
      
      <Card className="p-8 border-red-500/20">
        <h2 className="text-lg font-medium text-red-500 mb-2">Danger Zone</h2>
        <p className="text-sm text-fg-muted mb-4">Permanently delete your account and all associated data.</p>
        <Button variant="secondary" className="text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/20">
          Delete Account
        </Button>
      </Card>
    </div>
  );
}

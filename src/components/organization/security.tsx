import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Shield, Key, Lock } from 'lucide-react';

export function SecuritySettings() {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const { toast } = useToast();

  const handleMfaToggle = async (checked: boolean) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMfaEnabled(checked);
      toast({
        title: checked ? 'MFA Enabled' : 'MFA Disabled',
        description: checked 
          ? 'Multi-factor authentication has been enabled'
          : 'Multi-factor authentication has been disabled',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update MFA settings',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <CardTitle>Security Settings</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Multi-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch
            checked={mfaEnabled}
            onCheckedChange={handleMfaToggle}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <Label>API Keys</Label>
            </div>
            <Button variant="outline" size="sm">Manage Keys</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <Label>Session Management</Label>
            </div>
            <Button variant="outline" size="sm">View Sessions</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
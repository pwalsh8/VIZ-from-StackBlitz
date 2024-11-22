import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, User, File, Settings } from 'lucide-react';

interface AuditEntry {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  icon: keyof typeof icons;
}

const icons = {
  user: User,
  file: File,
  settings: Settings,
};

const mockAuditLog: AuditEntry[] = [
  {
    id: '1',
    action: 'User login',
    user: 'admin@viz.com',
    timestamp: '2023-11-15 10:30:00',
    icon: 'user',
  },
  {
    id: '2',
    action: 'File uploaded',
    user: 'admin@viz.com',
    timestamp: '2023-11-15 10:25:00',
    icon: 'file',
  },
  {
    id: '3',
    action: 'Settings updated',
    user: 'admin@viz.com',
    timestamp: '2023-11-15 10:20:00',
    icon: 'settings',
  },
];

export function AuditLog() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <CardTitle>Audit Log</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {mockAuditLog.map((entry) => {
              const Icon = icons[entry.icon];
              return (
                <div
                  key={entry.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border"
                >
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{entry.action}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{entry.user}</span>
                      <span className="mx-2">•</span>
                      <span>{entry.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
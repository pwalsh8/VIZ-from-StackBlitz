'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { vaults } from '@/lib/vaults';
import Link from 'next/link';
import * as Icons from 'lucide-react';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold">Welcome to Your Vaults</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Access your professional tools and custom solutions
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {vaults.map((vault) => {
            const Icon = Icons[vault.icon as keyof typeof Icons];
            return (
              <Link key={vault.id} href={`/vault/${vault.id}`}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{vault.name}</CardTitle>
                    </div>
                    <CardDescription>{vault.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-primary">{vault.tools.length} tools available</span>
                      <span className="text-primary">→</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
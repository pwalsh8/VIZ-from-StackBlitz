'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Vault } from '@/types/vault';
import * as Icons from 'lucide-react';
import Link from 'next/link';

interface VaultCardProps {
  vault: Vault;
}

export function VaultCard({ vault }: VaultCardProps) {
  const Icon = Icons[vault.icon as keyof typeof Icons];

  return (
    <Link href={`/vault/${vault.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl text-gray-900 dark:text-white">
              {vault.name}
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
            {vault.description}
          </CardDescription>
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
}
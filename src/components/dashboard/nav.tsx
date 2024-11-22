'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Vaults', href: '/vaults' },
  { name: 'Settings', href: '/settings' },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 flex items-center">
      <Link href="/dashboard" className="mr-8">
        <Logo className="h-8 w-auto" showText={true} />
      </Link>
      <nav className="flex items-center space-x-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
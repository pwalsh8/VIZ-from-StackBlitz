'use client';

import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-baseline">
        <span className="text-6xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-400 text-transparent bg-clip-text leading-none">v</span>
        <div className="relative">
          <span className="text-6xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-400 text-transparent bg-clip-text leading-none" style={{ fontFeatureSettings: '"liga" 0' }}>ı</span>
          <Eye className="absolute top-2 left-1/2 transform -translate-x-1/2 text-emerald-400 h-4 w-4" />
        </div>
        <span className="text-6xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-400 text-transparent bg-clip-text leading-none">z</span>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold tracking-tight">Platform</span>
          <span className="text-sm text-muted-foreground">CPA-Engineered Solutions</span>
        </div>
      )}
    </div>
  );
}
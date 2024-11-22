import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-baseline", className)}>
      <span className="text-6xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-400 text-transparent bg-clip-text">v</span>
      <div className="relative">
        <span className="text-6xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-400 text-transparent bg-clip-text" style={{ fontFeatureSettings: '"liga" 0' }}>ı</span>
        <Eye size={16} className="absolute top-1 left-1/2 transform -translate-x-1/2 text-emerald-400" />
      </div>
      <span className="text-6xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-400 text-transparent bg-clip-text">z</span>
    </div>
  );
}
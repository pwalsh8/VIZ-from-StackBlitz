import { Vault } from '@/types/vault';
import { VaultCard } from './vault-card';

interface VaultGridProps {
  vaults: Vault[];
}

export function VaultGrid({ vaults }: VaultGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
    </div>
  );
}
export type VaultType = 'tools' | 'custom';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'audit' | 'essentials';
  icon: string;
  permissions: {
    read: string[];
    write: string[];
    admin: string[];
  };
}

export interface Vault {
  id: VaultType;
  name: string;
  description: string;
  tools: Tool[];
  icon: string;
}
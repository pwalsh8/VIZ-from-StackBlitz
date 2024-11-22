import { Vault } from '@/types/vault';
import { FileText, Calculator, PieChart, Shield, Briefcase, Code } from 'lucide-react';

export const vaults: Vault[] = [
  {
    id: 'tools',
    name: 'Viz Tool Vault',
    description: 'Professional-grade audit and accounting tools',
    icon: Briefcase.name,
    tools: [
      {
        id: 'document-analyzer',
        name: 'Document Analyzer',
        description: 'Analyze financial documents with AI-powered insights',
        category: 'essentials',
        icon: FileText.name,
        permissions: {
          read: ['user'],
          write: ['user'],
          admin: ['admin'],
        }
      },
      {
        id: 'risk-calculator',
        name: 'Risk Calculator',
        description: 'Calculate and assess financial risks',
        category: 'audit',
        icon: Calculator.name,
        permissions: {
          read: ['user'],
          write: ['user'],
          admin: ['admin'],
        }
      },
      {
        id: 'audit-analytics',
        name: 'Audit Analytics',
        description: 'Advanced analytics for audit workflows',
        category: 'audit',
        icon: PieChart.name,
        permissions: {
          read: ['user'],
          write: ['auditor'],
          admin: ['admin'],
        }
      },
      {
        id: 'compliance-checker',
        name: 'Compliance Checker',
        description: 'Verify compliance with regulatory requirements',
        category: 'essentials',
        icon: Shield.name,
        permissions: {
          read: ['user'],
          write: ['compliance-officer'],
          admin: ['admin'],
        }
      }
    ]
  },
  {
    id: 'custom',
    name: 'Viz Custom Tool Vault',
    description: 'Custom tools and integrations for your specific needs',
    icon: Code.name,
    tools: []
  }
];
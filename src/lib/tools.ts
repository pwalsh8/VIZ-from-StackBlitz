import { Tool } from '@/types/tool';
import { FileText, Calculator, PieChart, Shield } from 'lucide-react';

export const tools: Tool[] = [
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
    },
    config: {
      asyncProcessing: true,
      fileTypes: ['.pdf', '.docx', '.xlsx'],
      maxFileSize: 10 * 1024 * 1024, // 10MB
    },
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
    },
    config: {
      asyncProcessing: false,
      fileTypes: ['.xlsx'],
      maxFileSize: 5 * 1024 * 1024, // 5MB
    },
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
    },
    config: {
      asyncProcessing: true,
      fileTypes: ['.xlsx', '.csv'],
      maxFileSize: 20 * 1024 * 1024, // 20MB
    },
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
    },
    config: {
      asyncProcessing: true,
      fileTypes: ['.pdf', '.docx'],
      maxFileSize: 15 * 1024 * 1024, // 15MB
    },
  },
];
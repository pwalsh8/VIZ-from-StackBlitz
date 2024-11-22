export type ToolCategory = 'essentials' | 'audit' | 'custom';

export type ToolPermission = 'read' | 'write' | 'admin';

export interface ToolConfig {
  asyncProcessing: boolean;
  fileTypes: string[];
  maxFileSize: number;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  permissions: Record<ToolPermission, string[]>;
  config: ToolConfig;
}
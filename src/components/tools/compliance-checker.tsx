import { useState } from 'react';
import { Tool } from '@/types/tool';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import { useToast } from '@/components/ui/use-toast';
import { Shield, AlertCircle, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ComplianceResult {
  category: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

interface ComplianceCheckerProps {
  tool: Tool;
}

export function ComplianceChecker({ tool }: ComplianceCheckerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<ComplianceResult[]>([]);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      setResults([]);

      if (!tool.config.fileTypes.some(type => 
        file.name.toLowerCase().endsWith(type))) {
        throw new Error('Invalid file type');
      }

      if (file.size > tool.config.maxFileSize) {
        throw new Error('File size exceeds limit');
      }

      // Simulated compliance check results
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResults: ComplianceResult[] = [
        {
          category: 'Data Privacy',
          status: 'pass',
          message: 'All personal data is properly encrypted',
        },
        {
          category: 'Access Control',
          status: 'warning',
          message: 'Some access permissions need review',
        },
        {
          category: 'Audit Trail',
          status: 'pass',
          message: 'Complete audit trail available',
        },
        {
          category: 'Data Retention',
          status: 'fail',
          message: 'Retention policy not properly implemented',
        },
      ];

      setResults(mockResults);
      
      toast({
        title: 'Compliance Check Complete',
        description: 'Document has been analyzed for compliance',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to check compliance',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusIcon = (status: ComplianceResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: ComplianceResult['status']) => {
    switch (status) {
      case 'pass':
        return <Badge className="bg-green-500">Pass</Badge>;
      case 'fail':
        return <Badge className="bg-red-500">Fail</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Warning</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Compliance Document Check</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <FileUpload
            accept={tool.config.fileTypes.join(',')}
            maxSize={tool.config.maxFileSize}
            onUpload={handleFileUpload}
            disabled={isProcessing}
          />
        </CardContent>
      </Card>

      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p>Checking compliance...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Compliance Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg border"
                >
                  {getStatusIcon(result.status)}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{result.category}</p>
                      {getStatusBadge(result.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
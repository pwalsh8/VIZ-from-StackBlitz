import { useState } from 'react';
import { Tool } from '@/types/tool';
import { FileUpload } from '@/components/ui/file-upload';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, FileText } from 'lucide-react';

interface DocumentAnalyzerProps {
  tool: Tool;
}

export function DocumentAnalyzer({ tool }: DocumentAnalyzerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      setResults(null);

      // Validate file type
      if (!tool.config.fileTypes.some(type => 
        file.name.toLowerCase().endsWith(type))) {
        throw new Error('Invalid file type');
      }

      // Validate file size
      if (file.size > tool.config.maxFileSize) {
        throw new Error('File size exceeds limit');
      }

      // TODO: Implement actual file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResults('Document analysis complete. Results will be displayed here.');
      
      toast({
        title: 'Success',
        description: 'Document analyzed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to analyze document',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
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
              <p>Processing document...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-2">
              <FileText className="h-4 w-4 mt-1" />
              <div>
                <h3 className="font-semibold">Analysis Results</h3>
                <p className="text-sm text-muted-foreground">{results}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
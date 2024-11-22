import { useState } from 'react';
import { Tool } from '@/types/tool';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUpload } from '@/components/ui/file-upload';
import { useToast } from '@/components/ui/use-toast';
import { PieChart, BarChart, LineChart, Loader2 } from 'lucide-react';

interface AuditAnalyticsProps {
  tool: Tool;
}

export function AuditAnalytics({ tool }: AuditAnalyticsProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      setIsProcessing(true);

      if (!tool.config.fileTypes.some(type => 
        file.name.toLowerCase().endsWith(type))) {
        throw new Error('Invalid file type');
      }

      if (file.size > tool.config.maxFileSize) {
        throw new Error('File size exceeds limit');
      }

      // Simulated processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Success',
        description: 'Data analyzed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to analyze data',
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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-4 w-4" />
                  <span>Risk Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Upload data to view analysis</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="h-4 w-4" />
                  <span>Transaction Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Upload data to view analysis</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="h-4 w-4" />
                  <span>Time Series Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Upload data to view analysis</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Upload data to view trends</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Upload data to view anomalies</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p>Processing data...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
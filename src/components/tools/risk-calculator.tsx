import { useState } from 'react';
import { Tool } from '@/types/tool';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Calculator, AlertTriangle } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const riskFormSchema = z.object({
  assetValue: z.string().transform((val) => parseFloat(val)),
  probabilityOfLoss: z.string().transform((val) => parseFloat(val)),
  impactSeverity: z.string().transform((val) => parseFloat(val)),
  timeHorizon: z.string().transform((val) => parseFloat(val)),
});

type RiskFormData = z.infer<typeof riskFormSchema>;

interface RiskCalculatorProps {
  tool: Tool;
}

export function RiskCalculator({ tool }: RiskCalculatorProps) {
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<RiskFormData>({
    resolver: zodResolver(riskFormSchema),
  });

  const calculateRiskScore = (data: RiskFormData) => {
    const { assetValue, probabilityOfLoss, impactSeverity, timeHorizon } = data;
    
    // Basic risk calculation formula
    // Risk Score = (Asset Value × Probability of Loss × Impact Severity) / Time Horizon
    const score = (assetValue * (probabilityOfLoss / 100) * (impactSeverity / 10)) / timeHorizon;
    
    return Math.round(score * 100) / 100;
  };

  const getRiskLevel = (score: number) => {
    if (score >= 1000) return { level: 'Critical', color: 'text-red-500' };
    if (score >= 500) return { level: 'High', color: 'text-orange-500' };
    if (score >= 100) return { level: 'Medium', color: 'text-yellow-500' };
    return { level: 'Low', color: 'text-green-500' };
  };

  const onSubmit = (data: RiskFormData) => {
    try {
      const score = calculateRiskScore(data);
      setRiskScore(score);
      
      const { level } = getRiskLevel(score);
      toast({
        title: 'Risk Analysis Complete',
        description: `Risk level: ${level}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to calculate risk score',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Risk Assessment Calculator</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="assetValue">Asset Value ($)</Label>
                <Input
                  id="assetValue"
                  type="number"
                  placeholder="100000"
                  {...register('assetValue')}
                />
                {errors.assetValue && (
                  <p className="text-sm text-red-500">Invalid asset value</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="probabilityOfLoss">Probability of Loss (%)</Label>
                <Input
                  id="probabilityOfLoss"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="25"
                  {...register('probabilityOfLoss')}
                />
                {errors.probabilityOfLoss && (
                  <p className="text-sm text-red-500">Invalid probability</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="impactSeverity">Impact Severity (1-10)</Label>
                <Input
                  id="impactSeverity"
                  type="number"
                  min="1"
                  max="10"
                  placeholder="5"
                  {...register('impactSeverity')}
                />
                {errors.impactSeverity && (
                  <p className="text-sm text-red-500">Invalid severity</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeHorizon">Time Horizon (years)</Label>
                <Input
                  id="timeHorizon"
                  type="number"
                  min="0.1"
                  placeholder="1"
                  {...register('timeHorizon')}
                />
                {errors.timeHorizon && (
                  <p className="text-sm text-red-500">Invalid time horizon</p>
                )}
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Calculate Risk Score
            </Button>
          </form>
        </CardContent>
      </Card>

      {riskScore !== null && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 mt-1" />
              <div>
                <h3 className="font-semibold">Risk Analysis Results</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">
                    Risk Score: <span className="font-medium">{riskScore}</span>
                  </p>
                  <p className="text-sm">
                    Risk Level:{' '}
                    <span className={`font-medium ${getRiskLevel(riskScore).color}`}>
                      {getRiskLevel(riskScore).level}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
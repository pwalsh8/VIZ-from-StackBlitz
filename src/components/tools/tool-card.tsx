import { Tool } from '@/types/tool';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import * as Icons from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = Icons[tool.icon as keyof typeof Icons];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
          <CardTitle>{tool.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{tool.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{tool.category}</Badge>
          {tool.config.asyncProcessing && (
            <Badge variant="outline">Async Processing</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/tools/${tool.id}`}>Launch Tool</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
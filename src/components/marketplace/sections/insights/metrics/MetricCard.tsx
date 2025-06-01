import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  chart: React.ReactNode;
}

export function MetricCard({ title, value, change, chart }: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">{title}</div>
            <div className="text-2xl font-semibold">{value}</div>
          </div>
          <Badge 
            variant="secondary" 
            className={change > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}
          >
            {change > 0 ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            {Math.abs(change)}%
          </Badge>
        </div>

        <div className="h-[120px]">
          {chart}
        </div>
      </div>
    </Card>
  );
}

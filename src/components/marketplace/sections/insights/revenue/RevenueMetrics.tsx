import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface RevenueMetricsProps {
  metrics: Array<{
    label: string;
    value: string;
    trend: "up" | "down";
  }>;
}

export function RevenueMetrics({ metrics }: RevenueMetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="space-y-2">
          <div className="text-sm text-muted-foreground">
            {metric.label}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold">
              {metric.value}
            </div>
            <Badge 
              variant="secondary" 
              className={metric.trend === "up" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}
            >
              {metric.trend === "up" ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

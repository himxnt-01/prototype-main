import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MapRegionProps {
  name: string;
  data?: {
    revenue: number;
    deals: number;
    growth: number;
  };
  maxRevenue: number;
  className?: string;
}

export function MapRegion({ name, data, maxRevenue, className }: MapRegionProps) {
  if (!data) return null;

  const intensity = data.revenue / maxRevenue;
  const bgOpacity = 0.2 + (intensity * 0.8); // Scale from 20% to 100%

  return (
    <div 
      className={cn(
        "relative rounded-lg border border-border/50 p-3",
        "hover:bg-card transition-colors cursor-pointer group",
        className
      )}
      style={{ backgroundColor: `hsla(var(--primary) / ${bgOpacity})` }}
    >
      <div className="space-y-1">
        <div className="text-xs font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">
          {data.deals} deals
        </div>
      </div>

      <Badge 
        variant="secondary" 
        className={cn(
          "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-background/80 backdrop-blur-sm"
        )}
      >
        ${data.revenue.toLocaleString()}
      </Badge>
    </div>
  );
}

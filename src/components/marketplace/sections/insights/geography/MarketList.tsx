import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight } from "lucide-react";

interface MarketListProps {
  markets: Array<{
    region: string;
    revenue: number;
    deals: number;
    growth: number;
  }>;
}

export function MarketList({ markets }: MarketListProps) {
  const maxRevenue = Math.max(...markets.map(m => m.revenue));

  return (
    <div className="space-y-4">
      {markets.map((market) => (
        <div key={market.region} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{market.region}</span>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {market.growth}%
              </Badge>
            </div>
            <div className="text-sm font-medium">
              ${market.revenue.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Progress 
              value={(market.revenue / maxRevenue) * 100} 
              className="h-2"
            />
            <div className="text-sm text-muted-foreground min-w-[80px] text-right">
              {market.deals} deals
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

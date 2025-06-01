import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe2 } from "lucide-react";
import { GeographicMap } from "./GeographicMap";
import { MarketList } from "./MarketList";
import { UsageTypes } from "./UsageTypes";

export function GeographicInsights() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Geographic Performance</h3>
            <p className="text-sm text-muted-foreground">
              Top performing regions and markets
            </p>
          </div>
          <Globe2 className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="h-[300px]">
              <GeographicMap data={TOP_MARKETS} />
            </div>
            <MarketList markets={TOP_MARKETS} />
          </div>

          <UsageTypes data={USAGE_TYPES} />
        </div>
      </div>
    </Card>
  );
}

export const TOP_MARKETS = [
  {
    region: "North America",
    revenue: 12500,
    deals: 45,
    growth: 24
  },
  {
    region: "Europe",
    revenue: 8200,
    deals: 32,
    growth: 18
  },
  {
    region: "Asia Pacific",
    revenue: 5800,
    deals: 28,
    growth: 15
  },
  {
    region: "Latin America",
    revenue: 3200,
    deals: 15,
    growth: 12
  }
];

export const USAGE_TYPES = [
  {
    type: "Advertising",
    count: 156,
    avgValue: 2500,
    growth: 24
  },
  {
    type: "Film & TV",
    count: 98,
    avgValue: 4200,
    growth: 18
  },
  {
    type: "Gaming",
    count: 87,
    avgValue: 1800,
    growth: 15
  },
  {
    type: "Social Media",
    count: 76,
    avgValue: 950,
    growth: 12
  }
];

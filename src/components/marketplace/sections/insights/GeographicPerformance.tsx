import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function GeographicPerformance() {
  return (
    <Card className="p-6 col-span-2">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Geographic Performance</h3>
            <p className="text-sm text-muted-foreground">Top performing regions and markets</p>
          </div>
          <Globe2 className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Top Markets</h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TOP_MARKETS}
                    dataKey="revenue"
                    nameKey="region"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {TOP_MARKETS.map((entry, index) => (
                      <Cell key={entry.region} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {TOP_MARKETS.map((market, index) => (
                <div key={market.region} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{market.region}</span>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10">
                    {market.revenue}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Usage Types</h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={USAGE_TYPES}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {USAGE_TYPES.map((entry, index) => (
                      <Cell key={entry.type} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {USAGE_TYPES.map((usage, index) => (
                <div key={usage.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{usage.type}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${usage.avgValue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(217, 91%, 60%)', // blue-500
  'hsl(292, 84%, 61%)', // purple-500
  'hsl(334, 85%, 51%)', // pink-500
];

const TOP_MARKETS = [
  {
    region: "North America",
    revenue: 12500,
    deals: 45
  },
  {
    region: "Europe",
    revenue: 8200,
    deals: 32
  },
  {
    region: "Asia Pacific",
    revenue: 5800,
    deals: 28
  },
  {
    region: "Latin America",
    revenue: 3200,
    deals: 15
  }
];

const USAGE_TYPES = [
  {
    type: "Advertising",
    count: 156,
    avgValue: "2,500"
  },
  {
    type: "Film & TV",
    count: 98,
    avgValue: "4,200"
  },
  {
    type: "Gaming",
    count: 87,
    avgValue: "1,800"
  },
  {
    type: "Social Media",
    count: 76,
    avgValue: "950"
  }
];

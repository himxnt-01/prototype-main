```tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function PerformanceMetrics() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
          <div className="space-y-6">
            {METRICS.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <Badge 
                      variant="secondary" 
                      className={metric.change > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}
                    >
                      {metric.change > 0 ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(metric.change)}%
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{metric.value}</span>
                </div>

                <div className="h-[100px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metric.data}>
                      <defs>
                        <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill={`url(#gradient-${metric.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

const METRICS = [
  {
    id: 'views',
    label: "Listing Views",
    value: "12.5K",
    change: 24,
    data: [
      { name: 'Jan', value: 8000 },
      { name: 'Feb', value: 9500 },
      { name: 'Mar', value: 11000 },
      { name: 'Apr', value: 10500 },
      { name: 'May', value: 12500 },
    ]
  },
  {
    id: 'conversion',
    label: "Conversion Rate",
    value: "3.2%",
    change: 12,
    data: [
      { name: 'Jan', value: 2.1 },
      { name: 'Feb', value: 2.5 },
      { name: 'Mar', value: 2.8 },
      { name: 'Apr', value: 3.0 },
      { name: 'May', value: 3.2 },
    ]
  }
];
```
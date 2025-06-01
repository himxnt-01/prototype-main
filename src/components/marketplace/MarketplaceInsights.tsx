import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, Clock, Target } from "lucide-react";

export function MarketplaceInsights() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Marketplace Insights</h2>
        <Button variant="ghost" size="sm">View Report</Button>
      </div>

      <div className="space-y-6">
        {INSIGHTS.map((insight) => (
          <div key={insight.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {insight.icon}
                </div>
                <div className="font-medium">{insight.title}</div>
              </div>
              <Badge variant="secondary" className="bg-primary/10">
                {insight.change}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

const INSIGHTS = [
  {
    id: 1,
    title: "Trending Genres",
    description: "Electronic and Ambient music seeing increased demand in advertising",
    change: "+24%",
    icon: <TrendingUp className="h-4 w-4" />
  },
  {
    id: 2,
    title: "Response Time",
    description: "Your average response time to licensing requests has improved",
    change: "-15%",
    icon: <Clock className="h-4 w-4" />
  },
  {
    id: 3,
    title: "Target Markets",
    description: "Your catalog is performing well in European markets",
    change: "+18%",
    icon: <Target className="h-4 w-4" />
  }
];
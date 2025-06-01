import { Card } from "@/components/ui/card";
import { RevenueChart } from "./RevenueChart";
import { RevenueMetrics } from "./RevenueMetrics";

export function RevenueAnalytics() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Revenue Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Revenue trends and projections
          </p>
        </div>

        <div className="h-[300px]">
          <RevenueChart data={REVENUE_DATA} />
        </div>

        <RevenueMetrics metrics={REVENUE_METRICS} />
      </div>
    </Card>
  );
}

const REVENUE_DATA = [
  { month: 'Jan', actual: 18000, projected: 17000 },
  { month: 'Feb', actual: 19500, projected: 18500 },
  { month: 'Mar', actual: 21000, projected: 20000 },
  { month: 'Apr', actual: 22500, projected: 21500 },
  { month: 'May', actual: 24500, projected: 23000 },
  { month: 'Jun', projected: 24500 },
  { month: 'Jul', projected: 26000 },
];

const REVENUE_METRICS = [
  { label: "Monthly Growth", value: "+24%", trend: "up" },
  { label: "Avg. Deal Size", value: "$2,500", trend: "up" },
  { label: "Projected Q3", value: "$78,000", trend: "up" },
  { label: "YoY Growth", value: "+156%", trend: "up" },
];

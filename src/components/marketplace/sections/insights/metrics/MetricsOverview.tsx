import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { MetricChart } from "./MetricChart";

export function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {METRICS.map((metric) => (
        <MetricCard
          key={metric.id}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          data={metric.data}
          chart={<MetricChart data={metric.data} id={metric.id} />}
        />
      ))}
    </div>
  );
}

const METRICS = [
  {
    id: 'revenue',
    title: "Monthly Revenue",
    value: "$24,500",
    change: 24,
    data: [
      { name: 'Jan', value: 18000 },
      { name: 'Feb', value: 19500 },
      { name: 'Mar', value: 21000 },
      { name: 'Apr', value: 22500 },
      { name: 'May', value: 24500 },
    ]
  },
  {
    id: 'deals',
    title: "Completed Deals",
    value: "156",
    change: 12,
    data: [
      { name: 'Jan', value: 120 },
      { name: 'Feb', value: 135 },
      { name: 'Mar', value: 142 },
      { name: 'Apr', value: 148 },
      { name: 'May', value: 156 },
    ]
  }
];

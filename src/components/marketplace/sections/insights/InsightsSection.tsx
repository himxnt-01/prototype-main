import { ScrollArea } from "@/components/ui/scroll-area";
import { MetricsOverview } from "./metrics/MetricsOverview";
import { GenreAnalytics } from "./genres/GenreAnalytics";
import { GeographicInsights } from "./geography/GeographicInsights";
import { RevenueAnalytics } from "./revenue/RevenueAnalytics";

export function InsightsSection() {
  return (
    <ScrollArea className="h-[calc(100vh-16rem)]">
      <div className="space-y-8 p-1">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Marketplace Insights</h2>
          <p className="text-sm text-muted-foreground">
            Track performance and discover opportunities
          </p>
        </div>

        <MetricsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GenreAnalytics />
          <RevenueAnalytics />
        </div>

        <GeographicInsights />
      </div>
    </ScrollArea>
  );
}

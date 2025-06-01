import { MarketplaceStats } from "../../stats/MarketplaceStats";
import { LicensingOpportunities } from "../../licensing/LicensingOpportunities";
import { MarketplaceInsights } from "../../insights/MarketplaceInsights";

export function OverviewSection() {
  return (
    <div className="space-y-6">
      <MarketplaceStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LicensingOpportunities />
        <MarketplaceInsights />
      </div>
    </div>
  );
}

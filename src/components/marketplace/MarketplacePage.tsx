import { useState } from "react";
import { MarketplaceHeader } from "./MarketplaceHeader";
import { MarketplaceTabs } from "./navigation/MarketplaceTabs";
import { OverviewSection } from "./sections/overview/OverviewSection";
import { ListingsSection } from "./sections/listings/ListingsSection";
import { LicensingSection } from "./sections/licensing/LicensingSection";
import { InsightsSection } from "./sections/insights/InsightsSection";

export function MarketplacePage() {
  const [currentTab, setCurrentTab] = useState("overview");

  const renderContent = () => {
    switch (currentTab) {
      case "overview":
        return <OverviewSection />;
      case "listings":
        return <ListingsSection />;
      case "licensing":
        return <LicensingSection />;
      case "insights":
        return <InsightsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <MarketplaceHeader />
      <div className="border-b">
        <MarketplaceTabs currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

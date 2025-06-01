import { useState } from "react";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceTabs } from "@/components/marketplace/navigation/MarketplaceTabs";
import { OverviewSection } from "@/components/marketplace/sections/overview/OverviewSection";
import { ListingsSection } from "@/components/marketplace/sections/listings/ListingsSection";
import { LicensingSection } from "@/components/marketplace/sections/licensing/LicensingSection";
import { InsightsSection } from "@/components/marketplace/sections/insights/InsightsSection";

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
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-6 overflow-auto">
      <MarketplaceHeader />
      <MarketplaceTabs currentTab={currentTab} onTabChange={setCurrentTab} />
      <div className="flex-1 min-h-0">
        {renderContent()}
      </div>
    </div>
  );
}

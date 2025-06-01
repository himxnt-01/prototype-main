import { TabList, TabTrigger } from "@/components/ui/custom-tabs";
import { LayoutDashboard, ListMusic, FileCheck, BarChart2 } from "lucide-react";

interface MarketplaceTabsProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "listings", label: "Listings", icon: ListMusic },
  { id: "licensing", label: "Licensing", icon: FileCheck },
  { id: "insights", label: "Insights", icon: BarChart2 }
] as const;

export function MarketplaceTabs({ currentTab, onTabChange }: MarketplaceTabsProps) {
  return (
    <TabList className="w-full px-0">
      {TABS.map(({ id, label, icon: Icon }) => (
        <TabTrigger
          key={id}
          id={id}
          isActive={currentTab === id}
          onClick={() => onTabChange(id)}
          label={
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {label}
            </div>
          }
        />
      ))}
    </TabList>
  );
}
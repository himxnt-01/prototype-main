import { useState } from "react";
import { TabList, TabTrigger, TabContent } from "@/components/ui/custom-tabs";
import { SyncRequestsSection } from "./SyncRequestsSection";
import { InstantLicensingSection } from "./InstantLicensingSection";

export function LicensingSection() {
  const [currentTab, setCurrentTab] = useState("sync");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Licensing</h2>
        <p className="text-sm text-muted-foreground">
          Manage sync requests and instant licensing opportunities
        </p>
      </div>

      <TabList>
        <TabTrigger
          id="sync"
          label="Sync Requests"
          isActive={currentTab === "sync"}
          onClick={() => setCurrentTab("sync")}
        />
        <TabTrigger
          id="instant"
          label="Instant Licensing"
          isActive={currentTab === "instant"}
          onClick={() => setCurrentTab("instant")}
        />
      </TabList>

      <TabContent id="sync" currentTab={currentTab}>
        <SyncRequestsSection />
      </TabContent>

      <TabContent id="instant" currentTab={currentTab}>
        <InstantLicensingSection />
      </TabContent>
    </div>
  );
}

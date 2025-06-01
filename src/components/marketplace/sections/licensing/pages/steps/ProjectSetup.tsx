import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { TabList, TabTrigger, TabContent } from "@/components/ui/custom-tabs";
import { SyncRequest } from "../../types";
import { ProjectData } from "./project/types";
import { ProjectBasics } from "./project/ProjectBasics";
import { ProjectTeam } from "./project/ProjectTeam";
import { ProjectDeliverables } from "./project/ProjectDeliverables";
import { cn } from "@/lib/utils";

interface ProjectSetupProps {
  request: SyncRequest;
  data: ProjectData;
  onChange: (data: ProjectData) => void;
  onBack: () => void;
  onNext: () => void;
}

const SETUP_TABS = [
  { id: "basics", label: "Project Basics" },
  { id: "team", label: "Team" },
  { id: "deliverables", label: "Deliverables" }
] as const;

type SetupTab = typeof SETUP_TABS[number]["id"];

export function ProjectSetup({ 
  request, 
  data, 
  onChange,
  onBack,
  onNext 
}: ProjectSetupProps) {
  const [currentTab, setCurrentTab] = useState<SetupTab>("basics");

  return (
    <div className="flex flex-col h-full">
      <TabList>
        {SETUP_TABS.map(tab => (
          <TabTrigger
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={currentTab === tab.id}
            onClick={() => setCurrentTab(tab.id)}
          />
        ))}
      </TabList>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <TabContent id="basics" currentTab={currentTab}>
            <ProjectBasics data={data} onChange={onChange} />
          </TabContent>

          <TabContent id="team" currentTab={currentTab}>
            <ProjectTeam data={data} onChange={onChange} />
          </TabContent>

          <TabContent id="deliverables" currentTab={currentTab}>
            <ProjectDeliverables data={data} onChange={onChange} />
          </TabContent>
        </div>
      </ScrollArea>

      <div className="flex justify-end gap-2 p-4 border-t">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          className={cn(
            "bg-blue-600 hover:bg-blue-700",
            "text-white",
            "border-blue-700/50",
            "shadow-lg shadow-blue-900/20",
            "transition-all duration-300",
            "hover:shadow-xl hover:shadow-blue-900/30",
            "active:shadow-md"
          )}
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
}

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTracksStore } from "@/lib/tracks";
import { TabList, TabTrigger, TabContent } from "@/components/ui/custom-tabs";
import { useState } from "react";
import { MetadataTab } from "./tabs/MetadataTab";
import { RightsTab } from "./tabs/RightsTab";
import { LyricsTab } from "./tabs/LyricsTab";
import { TagsTab } from "./tabs/TagsTab";
import { StatusTab } from "./tabs/StatusTab";

export function TrackDetails() {
  const { tracks, selectedTrackId, closeDetails } = useTracksStore();
  const [currentTab, setCurrentTab] = useState("metadata");
  
  const track = tracks.find(t => t.id === selectedTrackId);
  if (!track) return null;

  const tabs = [
    { id: "metadata", label: "Metadata" },
    { id: "rights", label: "Rights" },
    { id: "lyrics", label: "Lyrics" },
    { id: "tags", label: "Tags" },
    { id: "status", label: "Status" }
  ];

  return (
    <div className="h-full flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <img 
            src={`https://picsum.photos/seed/${track.id}/48/48`}
            alt={track.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <h2 className="font-semibold">{track.title}</h2>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={closeDetails}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <TabList>
        {tabs.map(tab => (
          <TabTrigger
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={currentTab === tab.id}
            onClick={() => setCurrentTab(tab.id)}
          />
        ))}
      </TabList>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <TabContent id="metadata" currentTab={currentTab}>
            <MetadataTab track={track} />
          </TabContent>

          <TabContent id="rights" currentTab={currentTab}>
            <RightsTab track={track} />
          </TabContent>

          <TabContent id="lyrics" currentTab={currentTab}>
            <LyricsTab track={track} />
          </TabContent>

          <TabContent id="tags" currentTab={currentTab}>
            <TagsTab track={track} />
          </TabContent>

          <TabContent id="status" currentTab={currentTab}>
            <StatusTab track={track} />
          </TabContent>
        </ScrollArea>
      </div>
    </div>
  );
}
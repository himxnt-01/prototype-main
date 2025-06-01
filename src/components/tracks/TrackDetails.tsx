import { useTracksStore } from "@/lib/tracks";
import { useTrackDetailsStore } from "@/lib/trackDetails";
import { getTrackViews } from "@/config/trackViews";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { TabList, TabTrigger, TabContent } from "@/components/ui/custom-tabs";

export function TrackDetails() {
  const { tracks, selectedTrackId, closeDetails } = useTracksStore();
  const { currentView, setCurrentView } = useTrackDetailsStore();
  
  const track = tracks.find(t => t.id === selectedTrackId);
  const parentTrack = track?.parentTrackId 
    ? tracks.find(t => t.id === track.parentTrackId)
    : undefined;

  if (!track) return null;

  const views = getTrackViews(track, parentTrack?.title);

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
        {views.map(view => (
          <TabTrigger
            key={view.id}
            id={view.id}
            label={view.label}
            isActive={currentView === view.id}
            onClick={() => setCurrentView(view.id)}
          />
        ))}
      </TabList>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-4">
          {views.map(view => (
            <TabContent
              key={view.id}
              id={view.id}
              currentTab={currentView}
            >
              {view.component}
            </TabContent>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
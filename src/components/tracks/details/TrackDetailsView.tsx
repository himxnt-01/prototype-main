import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTracksStore } from "@/lib/tracks";
import { useTrackDetailsStore } from "@/lib/trackDetails";
import { getTrackViews } from "@/config/trackViews";

export function TrackDetailsView() {
  const { tracks, selectedTrackId, closeDetails } = useTracksStore();
  const { currentView, setCurrentView } = useTrackDetailsStore();
  
  const track = tracks.find(t => t.id === selectedTrackId);
  const parentTrack = track?.parentTrackId 
    ? tracks.find(t => t.id === track.parentTrackId)
    : undefined;

  if (!track) return null;

  const views = getTrackViews(track, parentTrack?.title);
  const currentComponent = views.find(view => view.id === currentView)?.component;

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

      <div className="flex items-center gap-1 px-4 border-b">
        {views.map(view => (
          <Button
            key={view.id}
            variant="ghost"
            size="sm"
            className={cn(
              "relative h-11 rounded-none",
              currentView === view.id && [
                "bg-background",
                "after:absolute after:bottom-0 after:left-0 after:right-0",
                "after:h-0.5 after:bg-primary after:rounded-full"
              ]
            )}
            onClick={() => setCurrentView(view.id)}
          >
            {view.label}
          </Button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-4">
          {currentComponent}
        </ScrollArea>
      </div>
    </div>
  );
}
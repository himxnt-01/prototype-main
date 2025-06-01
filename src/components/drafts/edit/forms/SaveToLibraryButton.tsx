import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Music } from "lucide-react";
import { Draft } from "@/types/draft";
import { useTracksStore } from "@/lib/tracks";
import { cn } from "@/lib/utils";

interface SaveToLibraryButtonProps {
  draft: Draft;
  className?: string;
}

export function SaveToLibraryButton({ draft, className }: SaveToLibraryButtonProps) {
  const { toast } = useToast();
  const { setTracks } = useTracksStore();

  const isReadyToPublish = 
    draft.metadata?.title &&
    draft.metadata?.artist &&
    draft.metadata?.genre &&
    draft.rights?.writers?.length > 0;

  const handleSaveToLibrary = () => {
    // Convert draft to track
    const track = {
      id: Date.now(),
      title: draft.metadata.title || "",
      artist: draft.metadata.artist || "",
      genre: draft.metadata.genre || "",
      key: draft.metadata.key || "",
      bpm: draft.metadata.bpm || 0,
      duration: draft.metadata.duration || "0:00",
      metadata: draft.metadata,
      tags: draft.tags || [],
      writers: draft.rights.writers.map(w => w.name),
      lyrics: draft.lyrics?.content || "",
      mixes: [],
      status: {
        phase: "published",
        clearance: draft.status.clearance,
        monetization: draft.status.monetization,
        public: draft.status.public,
        flags: draft.status.flags
      }
    };

    // Add to tracks store
    setTracks(tracks => [...tracks, track]);

    toast({
      title: "Draft Published",
      description: "Your draft has been successfully published to your library.",
    });
  };

  return (
    <Button
      variant="default"
      onClick={handleSaveToLibrary}
      disabled={!isReadyToPublish}
      className={cn(
        "bg-green-600 hover:bg-green-700 text-white",
        "transition-all duration-300",
        className
      )}
    >
      <Music className="h-4 w-4 mr-2" />
      Save to Library
      {!isReadyToPublish && (
        <span className="ml-2 text-xs opacity-70">
          (Complete required fields)
        </span>
      )}
    </Button>
  );
}

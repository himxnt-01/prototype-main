import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { useTracksStore } from "@/lib/tracks";
import { usePlaylistsStore } from "@/lib/playlists";
import { Track } from "@/types/track";
import { TrackSearchResult } from "./TrackSearchResult";

interface AddTracksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playlistId: number;
  existingTrackIds: Set<number>;
}

export function AddTracksDialog({ 
  open, 
  onOpenChange, 
  playlistId,
  existingTrackIds 
}: AddTracksDialogProps) {
  const [query, setQuery] = useState("");
  const { tracks } = useTracksStore();
  const { addTrackToPlaylist } = usePlaylistsStore();

  // Filter out tracks that are already in the playlist
  const availableTracks = tracks.filter(track => !existingTrackIds.has(track.id));

  // Filter tracks based on search query
  const filteredTracks = availableTracks.filter(track => 
    track.title.toLowerCase().includes(query.toLowerCase()) ||
    track.artist.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddTrack = (track: Track) => {
    addTrackToPlaylist(playlistId, track);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Tracks</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tracks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <ScrollArea className="h-[400px] -mx-6">
          <div className="px-6 space-y-2">
            {filteredTracks.map((track) => (
              <TrackSearchResult
                key={track.id}
                track={track}
                onAdd={() => handleAddTrack(track)}
              />
            ))}

            {filteredTracks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No tracks found matching "{query}"
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
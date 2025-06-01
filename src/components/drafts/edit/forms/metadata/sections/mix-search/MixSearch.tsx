import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { useState } from "react";
import { useTracksStore } from "@/lib/tracks";
import { TrackMixList } from "./TrackMixList";
import { Mix } from "@/types/mix";

interface MixSearchProps {
  onSelect: (mix: Mix) => void;
}

export function MixSearch({ onSelect }: MixSearchProps) {
  const [query, setQuery] = useState("");
  const { tracks } = useTracksStore();

  // Filter tracks that have mixes
  const tracksWithMixes = tracks.filter(track => track.mixes?.length);
  
  // Filter based on search
  const filteredTracks = tracksWithMixes.filter(track => 
    track.title.toLowerCase().includes(query.toLowerCase()) ||
    track.artist.toLowerCase().includes(query.toLowerCase()) ||
    track.mixes?.some(mix => 
      mix.title.toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tracks with mixes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <ScrollArea className="h-[400px] -mx-6">
        <div className="px-6">
          <TrackMixList 
            tracks={filteredTracks}
            onSelect={onSelect}
            searchQuery={query}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

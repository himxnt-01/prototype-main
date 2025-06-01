import { Track } from "@/types/track";
import { Mix } from "@/types/mix";
import { TrackMixGroup } from "./TrackMixGroup";

interface TrackMixListProps {
  tracks: Track[];
  onSelect: (mix: Mix) => void;
  searchQuery: string;
}

export function TrackMixList({ tracks, onSelect, searchQuery }: TrackMixListProps) {
  if (tracks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {searchQuery 
          ? `No mixes found matching "${searchQuery}"`
          : "No mixes available"
        }
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tracks.map((track) => (
        <TrackMixGroup
          key={track.id}
          track={track}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

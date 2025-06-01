import { Track } from "@/types/track";
import { Mix } from "@/types/mix";
import { TrackMixCard } from "../TrackMixCard";

interface TrackMixGroupProps {
  track: Track;
  onSelect: (mix: Mix) => void;
}

export function TrackMixGroup({ track, onSelect }: TrackMixGroupProps) {
  if (!track.mixes?.length) return null;

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-muted-foreground">
        {track.title} by {track.artist}
      </div>
      <div className="space-y-2">
        {track.mixes.map((mix) => (
          <TrackMixCard
            key={mix.id}
            mix={mix}
            onSelect={() => {
              onSelect({
                ...mix,
                id: Date.now(), // Generate new ID for the copy
                version: "1.0" // Reset version for new context
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

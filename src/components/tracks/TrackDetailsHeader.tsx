import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { useTracksStore } from "@/lib/tracks";
import { Track } from "@/types/track";

interface TrackDetailsHeaderProps {
  track: Track;
}

export function TrackDetailsHeader({ track }: TrackDetailsHeaderProps) {
  const closeDetails = useTracksStore((state) => state.closeDetails);

  return (
    <div className="border-b border-border">
      <div className="p-4 flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar className="h-24 w-24 rounded-md">
            <img 
              src={`https://picsum.photos/seed/${track.id}/96/96`} 
              alt={track.title}
              className="object-cover"
            />
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">{track.title}</h2>
            <p className="text-lg text-muted-foreground">{track.artist}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="secondary" className="bg-pink-600/10 text-pink-600">
                {track.genre}
              </Badge>
              <div className="flex items-center gap-2">
                <span>{track.key}</span>
                <span>•</span>
                <span>{track.bpm} BPM</span>
                <span>•</span>
                <span>{track.duration}</span>
              </div>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={closeDetails}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
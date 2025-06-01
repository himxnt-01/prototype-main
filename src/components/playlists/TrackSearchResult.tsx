import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Track } from "@/types/track";
import { Plus } from "lucide-react";

interface TrackSearchResultProps {
  track: Track;
  onAdd: () => void;
}

export function TrackSearchResult({ track, onAdd }: TrackSearchResultProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card-gradient hover:bg-card transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="rounded-md w-10 h-10">
          <img 
            src={`https://picsum.photos/seed/${track.id}/40/40`} 
            alt={track.title}
            className="object-cover"
          />
        </Avatar>
        <div>
          <div className="font-medium">{track.title}</div>
          <div className="text-sm text-muted-foreground">{track.artist}</div>
        </div>
        <Badge 
          variant="secondary" 
          className="bg-pink-600/10 text-pink-600 hover:bg-pink-600/20"
        >
          {track.genre}
        </Badge>
      </div>
      <Button variant="ghost" size="icon" onClick={onAdd}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
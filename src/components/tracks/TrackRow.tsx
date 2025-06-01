import { Track } from "@/types/track";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrackActions } from "./TrackActions";
import { useTracksStore } from "@/lib/tracks";
import { usePlayerStore } from "@/lib/player";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/components/ui/avatar";

interface TrackRowProps {
  track: Track;
  index: number;
}

export function TrackRow({ track, index }: TrackRowProps) {
  const { 
    selectTrack, 
    selectedTrackId,
    isSelectionMode,
    selectedTrackIds,
    toggleTrackSelection
  } = useTracksStore();
  
  const { playTrack, currentTrack, isPlaying, pauseTrack, resumeTrack } = usePlayerStore();
  
  const isSelected = selectedTrackId === track.id;
  const isChecked = selectedTrackIds.has(track.id);
  const isCurrentTrack = currentTrack?.id === track.id;

  const handleClick = () => {
    if (isSelectionMode) {
      toggleTrackSelection(track.id);
    } else {
      selectTrack(track.id);
    }
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentTrack) {
      isPlaying ? pauseTrack() : resumeTrack();
    } else {
      playTrack(track);
    }
  };

  return (
    <TableRow 
      className={cn(
        "group cursor-pointer transition-all duration-300",
        "hover:bg-card-gradient",
        (isSelected || isChecked) && [
          "bg-card-gradient relative z-10",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
        ]
      )}
      onClick={handleClick}
    >
      <TableCell className="w-12 text-center relative">
        {isSelectionMode ? (
          <div className="flex items-center justify-center\" onClick={(e) => e.stopPropagation()}>
            <Checkbox 
              checked={isChecked}
              onCheckedChange={() => toggleTrackSelection(track.id)}
            />
          </div>
        ) : (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={handlePlay}
          >
            <span className={cn(
              "block group-hover:hidden",
              isCurrentTrack && "hidden"
            )}>
              {index + 1}
            </span>
            {isCurrentTrack && isPlaying ? (
              <Pause className="h-4 w-4 block text-primary animate-pulse" />
            ) : (
              <Play className={cn(
                "h-4 w-4",
                isCurrentTrack ? "block text-primary" : "hidden group-hover:block"
              )} />
            )}
          </div>
        )}
      </TableCell>
      <TableCell className="w-12 p-2">
        <Avatar className="rounded-md w-10 h-10">
          <img 
            src={`https://picsum.photos/seed/${track.id}/40/40`} 
            alt={track.title}
            className="object-cover"
          />
        </Avatar>
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{track.title}</div>
          <div className="text-sm text-muted-foreground">{track.artist}</div>
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant="secondary" 
          className="bg-pink-600/10 text-pink-600 hover:bg-pink-600/20"
        >
          {track.genre}
        </Badge>
      </TableCell>
      <TableCell>{track.key}</TableCell>
      <TableCell>{track.bpm}</TableCell>
      <TableCell>{track.duration}</TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <TrackActions track={track} />
      </TableCell>
    </TableRow>
  );
}
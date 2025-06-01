import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Track } from "@/types/track";
import { Play, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlaylistsStore } from "@/lib/playlists";
import { cn } from "@/lib/utils";

interface PlaylistTrackRowProps {
  track: Track;
  index: number;
  playlistId: number;
}

export function PlaylistTrackRow({ track, index, playlistId }: PlaylistTrackRowProps) {
  const { removeTrackFromPlaylist } = usePlaylistsStore();

  return (
    <TableRow className="group">
      <TableCell className="w-12 text-center relative">
        <span className="block group-hover:hidden">
          {index + 1}
        </span>
        <Play className="h-4 w-4 hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </TableCell>
      <TableCell>
        <Avatar className="rounded-md w-10 h-10">
          <img 
            src={`https://picsum.photos/seed/${track.id}/40/40`} 
            alt={track.title}
            className="object-cover"
          />
        </Avatar>
      </TableCell>
      <TableCell>
        <div className="font-medium">{track.title}</div>
      </TableCell>
      <TableCell>{track.artist}</TableCell>
      <TableCell>
        <Badge 
          variant="secondary" 
          className="bg-pink-600/10 text-pink-600 hover:bg-pink-600/20"
        >
          {track.genre}
        </Badge>
      </TableCell>
      <TableCell>{track.duration}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Track</DropdownMenuItem>
            <DropdownMenuItem onClick={() => removeTrackFromPlaylist(playlistId, track.id)}>
              Remove from Playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
import { Button } from "@/components/ui/button";
import { Playlist } from "@/lib/playlists";
import { Play, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlaylistsStore } from "@/lib/playlists";
import { cn } from "@/lib/utils";

interface PlaylistCardProps {
  playlist: Playlist;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { selectPlaylist } = usePlaylistsStore();

  return (
    <div 
      className={cn(
        "group relative aspect-square rounded-lg overflow-hidden cursor-pointer",
        "border border-border bg-card-gradient hover:bg-card transition-colors"
      )}
      onClick={() => selectPlaylist(playlist.id)}
    >
      <img 
        src={playlist.coverUrl} 
        alt={playlist.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      
      <div className="absolute inset-0 p-4 flex flex-col">
        <div className="flex-1" />
        
        <div className="relative">
          <h3 className="text-lg font-semibold truncate">{playlist.title}</h3>
          {playlist.description && (
            <p className="text-sm text-muted-foreground truncate">
              {playlist.description}
            </p>
          )}
        </div>
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Details</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button
        size="icon"
        className={cn(
          "absolute bottom-4 right-4",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-primary hover:bg-primary/90"
        )}
        onClick={(e) => {
          e.stopPropagation();
          // Play playlist
        }}
      >
        <Play className="h-4 w-4" />
      </Button>
    </div>
  );
}
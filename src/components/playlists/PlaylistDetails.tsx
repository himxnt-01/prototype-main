import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlaylistsStore } from "@/lib/playlists";
import { X, Play, Share2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlaylistTracks } from "./PlaylistTracks";

export function PlaylistDetails() {
  const { playlists, selectedPlaylistId, closeDetails } = usePlaylistsStore();
  const playlist = playlists.find(p => p.id === selectedPlaylistId);

  if (!playlist) return null;

  return (
    <div className="h-full flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img 
              src={playlist.coverUrl} 
              alt={playlist.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{playlist.title}</h2>
              {playlist.description && (
                <p className="text-sm text-muted-foreground">
                  {playlist.description}
                </p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={closeDetails}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Play All
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Details</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <PlaylistTracks playlist={playlist} />
        </div>
      </ScrollArea>
    </div>
  );
}
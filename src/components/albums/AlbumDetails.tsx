import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAlbumsStore } from "@/lib/albums";
import { X, Play, Share2, MoreHorizontal, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { AlbumTracks } from "./AlbumTracks";
import { AlbumVersions } from "./AlbumVersions";
import { calculateTotalDuration } from "@/lib/utils/duration";

export function AlbumDetails() {
  const { albums, selectedAlbumId, closeDetails } = useAlbumsStore();
  const album = albums.find(a => a.id === selectedAlbumId);

  if (!album) return null;

  const totalDuration = calculateTotalDuration(album.tracks);

  return (
    <div className="h-full flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img 
              src={album.coverUrl} 
              alt={album.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="bg-primary/20">
                  {album.type.toUpperCase()}
                </Badge>
                <Badge variant="secondary" className="bg-pink-600/20 text-pink-600">
                  {album.genre}
                </Badge>
              </div>
              <h2 className="text-xl font-semibold">{album.title}</h2>
              <div className="text-sm text-muted-foreground space-x-2">
                <span>{album.artist}</span>
                <span>•</span>
                <span>{format(new Date(album.releaseDate), "MMMM yyyy")}</span>
                <span>•</span>
                <span>{album.tracks.length} tracks</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {totalDuration}
                </span>
              </div>
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
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {album.description && (
            <p className="text-sm text-muted-foreground">
              {album.description}
            </p>
          )}

          <AlbumTracks album={album} />

          <AlbumVersions album={album} />

          {album.credits && (
            <div>
              <h3 className="text-sm font-medium mb-2">Credits</h3>
              <div className="space-y-2">
                {Object.entries(album.credits).map(([role, people]) => (
                  <div key={role} className="text-sm">
                    <span className="text-muted-foreground">{role}: </span>
                    {people.join(", ")}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
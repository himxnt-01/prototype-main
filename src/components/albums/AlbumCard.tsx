import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Album } from "@/lib/albums";
import { Play, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAlbumsStore } from "@/lib/albums";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const { selectAlbum } = useAlbumsStore();

  return (
    <div 
      className={cn(
        "group relative aspect-square rounded-lg overflow-hidden cursor-pointer",
        "border border-border bg-card-gradient hover:bg-card transition-colors"
      )}
      onClick={() => selectAlbum(album.id)}
    >
      <img 
        src={album.coverUrl} 
        alt={album.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      
      <div className="absolute inset-0 p-4 flex flex-col">
        <div className="flex-1" />
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/20">
              {album.type.toUpperCase()}
            </Badge>
            <Badge variant="secondary" className="bg-pink-600/20 text-pink-600">
              {album.genre}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold truncate">{album.title}</h3>
          <div className="text-sm text-muted-foreground space-y-0.5">
            <div className="truncate">{album.artist}</div>
            <div>{format(new Date(album.releaseDate), "MMMM yyyy")}</div>
          </div>
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
            <DropdownMenuItem>Download</DropdownMenuItem>
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
          // Play album
        }}
      >
        <Play className="h-4 w-4" />
      </Button>
    </div>
  );
}
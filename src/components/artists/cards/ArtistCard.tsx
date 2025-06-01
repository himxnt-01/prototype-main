import { Artist } from "@/lib/artists";
import { useArtistsStore } from "@/lib/artists";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Play, Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  const { selectArtist } = useArtistsStore();

  return (
    <div 
      className={cn(
        "group relative aspect-square rounded-lg overflow-hidden cursor-pointer",
        "border border-border bg-card-gradient hover:bg-card transition-all duration-300",
        "hover:shadow-xl hover:scale-[1.02]"
      )}
      onClick={() => selectArtist(artist.id)}
    >
      <img 
        src={artist.imageUrl} 
        alt={artist.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      <div className="absolute inset-0 p-4 flex flex-col">
        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-8 w-8 bg-black/50 hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation();
              // Play artist's top tracks
            }}
          >
            <Play className="h-4 w-4" />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-8 w-8 bg-black/50 hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation();
              // Share artist
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button 
                variant="secondary" 
                size="icon"
                className="h-8 w-8 bg-black/50 hover:bg-black/70"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Details</DropdownMenuItem>
              <DropdownMenuItem>View Analytics</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1" />
        
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold mb-1">{artist.name}</h3>
            <div className="flex flex-wrap gap-1">
              {artist.genres.map((genre) => (
                <Badge 
                  key={genre} 
                  variant="secondary"
                  className="bg-black/50 hover:bg-black/70 transition-colors"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground">
              {artist.monthlyListeners.toLocaleString()} monthly listeners
            </div>
            <div className="text-muted-foreground">
              {artist.stats.totalFollowers.toLocaleString()} followers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
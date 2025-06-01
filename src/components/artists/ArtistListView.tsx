import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Artist } from "@/lib/artists";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useArtistsStore } from "@/lib/artists";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ArtistListViewProps {
  artists: Artist[];
}

export function ArtistListView({ artists }: ArtistListViewProps) {
  const { selectArtist } = useArtistsStore();

  return (
    <div className="rounded-lg border bg-card-gradient h-full">
      <ScrollArea className="h-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Genres</TableHead>
              <TableHead className="hidden lg:table-cell">Monthly Listeners</TableHead>
              <TableHead className="hidden xl:table-cell">Total Plays</TableHead>
              <TableHead className="hidden lg:table-cell">Followers</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artists.map((artist) => (
              <TableRow 
                key={artist.id}
                className="group cursor-pointer"
                onClick={() => selectArtist(artist.id)}
              >
                <TableCell>
                  <img 
                    src={artist.imageUrl} 
                    alt={artist.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{artist.name}</div>
                    {artist.bio && (
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {artist.bio}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {artist.genres.map((genre) => (
                      <Badge 
                        key={genre} 
                        variant="secondary"
                        className="bg-primary/10"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {artist.monthlyListeners.toLocaleString()}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {artist.stats.totalPlays.toLocaleString()}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {artist.stats.totalFollowers.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
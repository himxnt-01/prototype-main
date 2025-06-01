import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { format } from "date-fns";

interface AlbumListViewProps {
  albums: Album[];
}

export function AlbumListView({ albums }: AlbumListViewProps) {
  const { selectAlbum } = useAlbumsStore();

  return (
    <div className="rounded-lg border bg-card-gradient">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead>Tracks</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.map((album) => (
            <TableRow 
              key={album.id}
              className="group cursor-pointer"
              onClick={() => selectAlbum(album.id)}
            >
              <TableCell>
                <img 
                  src={album.coverUrl} 
                  alt={album.title}
                  className="w-10 h-10 rounded-md object-cover"
                />
              </TableCell>
              <TableCell>
                <div className="font-medium">{album.title}</div>
                {album.description && (
                  <div className="text-sm text-muted-foreground truncate max-w-xs">
                    {album.description}
                  </div>
                )}
              </TableCell>
              <TableCell>{album.artist}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-primary/20">
                  {album.type.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-pink-600/20 text-pink-600">
                  {album.genre}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(album.releaseDate), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {album.tracks.length} tracks
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Play album
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
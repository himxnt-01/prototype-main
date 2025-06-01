import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { formatDistanceToNow } from "date-fns";

interface PlaylistListViewProps {
  playlists: Playlist[];
}

export function PlaylistListView({ playlists }: PlaylistListViewProps) {
  const { selectPlaylist } = usePlaylistsStore();

  return (
    <div className="rounded-lg border bg-card-gradient">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Tracks</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playlists.map((playlist) => (
            <TableRow 
              key={playlist.id}
              className="group cursor-pointer"
              onClick={() => selectPlaylist(playlist.id)}
            >
              <TableCell>
                <img 
                  src={playlist.coverUrl} 
                  alt={playlist.title}
                  className="w-10 h-10 rounded-md object-cover"
                />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{playlist.title}</div>
                  {playlist.description && (
                    <div className="text-sm text-muted-foreground">
                      {playlist.description}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{playlist.tracks.length} tracks</TableCell>
              <TableCell className="text-muted-foreground">
                {formatDistanceToNow(new Date(playlist.updatedAt), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {playlist.isPublic ? "Public" : "Private"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Play playlist
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
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
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
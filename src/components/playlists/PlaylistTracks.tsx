import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Playlist } from "@/lib/playlists";
import { PlaylistTrackRow } from "./PlaylistTrackRow";
import { AddTracksDialog } from "./AddTracksDialog";
import { useState } from "react";

interface PlaylistTracksProps {
  playlist: Playlist;
}

export function PlaylistTracks({ playlist }: PlaylistTracksProps) {
  const [isAddTracksOpen, setIsAddTracksOpen] = useState(false);

  if (playlist.tracks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          No tracks in this playlist yet.
        </p>
        <Button onClick={() => setIsAddTracksOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tracks
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {playlist.tracks.length} track{playlist.tracks.length !== 1 ? 's' : ''}
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsAddTracksOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tracks
        </Button>
      </div>

      <div className="rounded-lg border bg-card-gradient">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playlist.tracks.map((track, index) => (
              <PlaylistTrackRow
                key={track.id}
                track={track}
                index={index}
                playlistId={playlist.id}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <AddTracksDialog
        open={isAddTracksOpen}
        onOpenChange={setIsAddTracksOpen}
        playlistId={playlist.id}
        existingTrackIds={new Set(playlist.tracks.map(t => t.id))}
      />
    </div>
  );
}
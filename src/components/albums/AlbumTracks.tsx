import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Album } from "@/lib/albums";
import { AlbumTrackRow } from "./AlbumTrackRow";

interface AlbumTracksProps {
  album: Album;
}

export function AlbumTracks({ album }: AlbumTracksProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        {album.tracks.length} track{album.tracks.length !== 1 ? 's' : ''}
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
            {album.tracks.map((track, index) => (
              <AlbumTrackRow
                key={track.id}
                track={track}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTracksStore } from "@/lib/tracks";
import { TrackRow } from "./TrackRow";
import { TrackListHeader } from "./TrackListHeader";
import { cn } from "@/lib/utils";

export function TrackList() {
  const { tracks, isDetailsOpen } = useTracksStore();

  return (
    <div className={cn(
      "flex-1 min-w-0 transition-all duration-300",
      isDetailsOpen && "lg:max-w-[calc(100%-500px)]"
    )}>
      <TrackListHeader />
      <div className="rounded-lg border border-border bg-card-gradient shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Bpm</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tracks.map((track, index) => (
              <TrackRow 
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
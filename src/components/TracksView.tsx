import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TracksHeader } from "./tracks/TracksHeader";
import { TrackRow } from "./tracks/TrackRow";
import { TrackDetails } from "./tracks/TrackDetails";
import { useTracksStore } from "@/lib/tracks";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TracksView() {
  const { tracks, isDetailsOpen } = useTracksStore();

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-6">
      <div className={cn(
        "flex-1 min-w-0 transition-all duration-300",
        isDetailsOpen && "lg:max-w-[calc(100%-500px)]"
      )}>
        <TracksHeader />
        <ScrollArea className="h-[calc(100vh-12rem)]">
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
        </ScrollArea>
      </div>

      {isDetailsOpen && (
        <div className="hidden lg:block w-[500px] h-full">
          <div className="rounded-lg border border-border bg-card-gradient shadow-md h-full overflow-hidden">
            <TrackDetails />
          </div>
        </div>
      )}
    </div>
  );
}
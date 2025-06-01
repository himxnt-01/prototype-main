import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { InstantLicenseCard } from "./cards/InstantLicenseCard";
import { InstantLicenseDetails } from "./details/InstantLicenseDetails";
import { InstantLicenseFilters } from "./filters/InstantLicenseFilters";
import { InstantLicenseSortMenu } from "./filters/InstantLicenseSortMenu";
import { useTracksStore } from "@/lib/tracks";
import { cn } from "@/lib/utils";

export function InstantLicensingSection() {
  const { tracks } = useTracksStore();
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);

  // Filter tracks that have sync info and pricing
  const licensableTracks = tracks.filter(track => 
    track.syncInfo?.pricing && track.syncInfo.pricing.length > 0
  );

  return (
    <div className="h-[calc(100vh-20rem)] flex gap-6">
      <div className={cn(
        "flex-1 min-w-0 flex flex-col transition-all duration-300",
        selectedTrackId && "lg:max-w-[calc(100%-500px)]"
      )}>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <InstantLicenseSortMenu />
            <InstantLicenseFilters />
          </div>

          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search tracks..." className="pl-9" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-4">
            {licensableTracks.map((track) => (
              <InstantLicenseCard
                key={track.id}
                track={track}
                onSelect={() => setSelectedTrackId(track.id)}
              />
            ))}

            {licensableTracks.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No tracks available for instant licensing
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {selectedTrackId && (
        <div className="hidden lg:block w-[500px] h-full">
          <div className="rounded-lg border border-border bg-card-gradient shadow-md h-full overflow-hidden">
            <InstantLicenseDetails
              track={tracks.find(t => t.id === selectedTrackId)!}
              onClose={() => setSelectedTrackId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

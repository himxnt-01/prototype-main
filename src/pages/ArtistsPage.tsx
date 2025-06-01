import { ArtistsHeader } from "@/components/artists/ArtistsHeader";
import { ArtistsList } from "@/components/artists/ArtistsList";
import { ArtistDetails } from "@/components/artists/ArtistDetails";
import { useArtistsStore } from "@/lib/artists";
import { cn } from "@/lib/utils";

export function ArtistsPage() {
  const { isDetailsOpen } = useArtistsStore();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 min-h-0 flex gap-6">
        <div className={cn(
          "flex-1 min-w-0 flex flex-col transition-all duration-300",
          isDetailsOpen && "lg:max-w-[calc(100%-500px)]"
        )}>
          <ArtistsHeader />
          <div className="flex-1 min-h-0 overflow-auto">
            <ArtistsList />
          </div>
        </div>

        {isDetailsOpen && (
          <div className="hidden lg:block w-[500px] min-w-[500px]">
            <div className="h-full rounded-lg border border-border bg-card-gradient shadow-md overflow-hidden">
              <ArtistDetails />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
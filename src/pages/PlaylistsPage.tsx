import { PlaylistsHeader } from "@/components/playlists/PlaylistsHeader";
import { PlaylistsList } from "@/components/playlists/PlaylistsList";
import { PlaylistDetails } from "@/components/playlists/PlaylistDetails";
import { usePlaylistsStore } from "@/lib/playlists";
import { cn } from "@/lib/utils";

export function PlaylistsPage() {
  const { isDetailsOpen } = usePlaylistsStore();

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-6">
      <div className={cn(
        "flex-1 min-w-0 transition-all duration-300",
        isDetailsOpen && "lg:max-w-[calc(100%-500px)]"
      )}>
        <PlaylistsHeader />
        <PlaylistsList />
      </div>

      {isDetailsOpen && (
        <div className="hidden lg:block w-[500px] h-full">
          <div className="rounded-lg border border-border bg-card-gradient shadow-md h-full overflow-hidden">
            <PlaylistDetails />
          </div>
        </div>
      )}
    </div>
  );
}
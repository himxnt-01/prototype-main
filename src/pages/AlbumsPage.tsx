import { AlbumsHeader } from "@/components/albums/AlbumsHeader";
import { AlbumsList } from "@/components/albums/AlbumsList";
import { AlbumDetails } from "@/components/albums/AlbumDetails";
import { useAlbumsStore } from "@/lib/albums";
import { cn } from "@/lib/utils";

export function AlbumsPage() {
  const { isDetailsOpen } = useAlbumsStore();

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-6">
      <div className={cn(
        "flex-1 min-w-0 transition-all duration-300",
        isDetailsOpen && "lg:max-w-[calc(100%-500px)]"
      )}>
        <AlbumsHeader />
        <AlbumsList />
      </div>

      {isDetailsOpen && (
        <div className="hidden lg:block w-[500px] h-full">
          <div className="rounded-lg border border-border bg-card-gradient shadow-md h-full overflow-hidden">
            <AlbumDetails />
          </div>
        </div>
      )}
    </div>
  );
}
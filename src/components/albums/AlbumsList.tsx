import { useAlbumsStore } from "@/lib/albums";
import { AlbumCard } from "./AlbumCard";
import { AlbumListView } from "./AlbumListView";

export function AlbumsList() {
  const { albums, viewMode } = useAlbumsStore();

  if (viewMode === 'list') {
    return <AlbumListView albums={albums} />;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
import { useArtistsStore } from "@/lib/artists";
import { ArtistCard } from "./cards/ArtistCard";
import { ArtistListView } from "./ArtistListView";

export function ArtistsList() {
  const { artists, viewMode } = useArtistsStore();

  if (viewMode === 'list') {
    return <ArtistListView artists={artists} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
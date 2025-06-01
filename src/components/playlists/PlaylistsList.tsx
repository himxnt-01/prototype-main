import { usePlaylistsStore } from "@/lib/playlists";
import { PlaylistCard } from "./PlaylistCard";
import { PlaylistListView } from "./PlaylistListView";

export function PlaylistsList() {
  const { playlists, viewMode } = usePlaylistsStore();

  if (viewMode === 'list') {
    return <PlaylistListView playlists={playlists} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}
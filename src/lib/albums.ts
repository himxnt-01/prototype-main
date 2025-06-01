import { create } from 'zustand';
import { Track } from '@/types/track';
import { tracks as mockTracks } from '@/data/tracks';

export type ViewMode = 'grid' | 'list';

export interface Album {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  tracks: Track[];
  genre: string;
  description?: string;
  isPublic: boolean;
  type: 'album' | 'ep' | 'single';
  label?: string;
  credits?: Record<string, string[]>;
}

interface AlbumsState {
  albums: Album[];
  selectedAlbumId: number | null;
  isDetailsOpen: boolean;
  isSelectionMode: boolean;
  selectedAlbumIds: Set<number>;
  viewMode: ViewMode;
  setAlbums: (albums: Album[]) => void;
  selectAlbum: (id: number) => void;
  closeDetails: () => void;
  toggleSelectionMode: () => void;
  toggleAlbumSelection: (id: number) => void;
  selectAllAlbums: () => void;
  clearSelection: () => void;
  setViewMode: (mode: ViewMode) => void;
}

// Mock data
const MOCK_ALBUMS: Album[] = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Sarah Chen",
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&auto=format&fit=crop",
    releaseDate: "2024-01-15",
    tracks: [mockTracks[0], mockTracks[1]],
    genre: "Electronic",
    description: "A journey through late night soundscapes",
    isPublic: true,
    type: "album",
    label: "Neon Records",
    credits: {
      "Producer": ["Alex Rivera"],
      "Mixing": ["Mike Thompson"],
      "Mastering": ["Maria Wong"]
    }
  },
  {
    id: 2,
    title: "Urban Echoes",
    artist: "The Night Collective",
    coverUrl: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?w=400&h=400&auto=format&fit=crop",
    releaseDate: "2024-02-20",
    tracks: [mockTracks[2]],
    genre: "Alternative",
    description: "Sounds of the city at twilight",
    isPublic: true,
    type: "ep",
    label: "Echo Publishing"
  }
];

export const useAlbumsStore = create<AlbumsState>((set) => ({
  albums: MOCK_ALBUMS,
  selectedAlbumId: null,
  isDetailsOpen: false,
  isSelectionMode: false,
  selectedAlbumIds: new Set(),
  viewMode: 'grid',

  setAlbums: (albums) => set({ albums }),

  selectAlbum: (id) => set({ 
    selectedAlbumId: id, 
    isDetailsOpen: true 
  }),

  closeDetails: () => set({ 
    isDetailsOpen: false 
  }),

  toggleSelectionMode: () => set((state) => ({ 
    isSelectionMode: !state.isSelectionMode,
    selectedAlbumIds: new Set()
  })),

  toggleAlbumSelection: (id) => set((state) => {
    const newSelection = new Set(state.selectedAlbumIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    return { selectedAlbumIds: newSelection };
  }),

  selectAllAlbums: () => set((state) => ({
    selectedAlbumIds: new Set(state.albums.map(album => album.id))
  })),

  clearSelection: () => set({ selectedAlbumIds: new Set() }),

  setViewMode: (mode) => set({ viewMode: mode })
}));
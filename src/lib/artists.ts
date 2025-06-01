import { create } from 'zustand';
import { ARTISTS } from '@/data/artists';

export interface Artist {
  id: number;
  name: string;
  imageUrl: string;
  bio: string;
  genres: string[];
  monthlyListeners: number;
  stats: {
    totalPlays: number;
    totalFollowers: number;
    totalShares: number;
  };
  topCities: Array<{
    name: string;
    listeners: number;
  }>;
  socialLinks: {
    website?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    spotify?: string;
  };
}

interface ArtistsState {
  artists: Artist[];
  selectedArtistId: number | null;
  isDetailsOpen: boolean;
  isSelectionMode: boolean;
  selectedArtistIds: Set<number>;
  viewMode: 'grid' | 'list';
  setArtists: (artists: Artist[]) => void;
  selectArtist: (id: number) => void;
  closeDetails: () => void;
  toggleSelectionMode: () => void;
  toggleArtistSelection: (id: number) => void;
  selectAllArtists: () => void;
  clearSelection: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const useArtistsStore = create<ArtistsState>((set) => ({
  artists: ARTISTS,
  selectedArtistId: null,
  isDetailsOpen: false,
  isSelectionMode: false,
  selectedArtistIds: new Set(),
  viewMode: 'grid',

  setArtists: (artists) => set({ artists }),

  selectArtist: (id) => set({ 
    selectedArtistId: id, 
    isDetailsOpen: true 
  }),

  closeDetails: () => set({ isDetailsOpen: false }),

  toggleSelectionMode: () => set((state) => ({ 
    isSelectionMode: !state.isSelectionMode,
    selectedArtistIds: new Set()
  })),

  toggleArtistSelection: (id) => set((state) => {
    const newSelection = new Set(state.selectedArtistIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    return { selectedArtistIds: newSelection };
  }),

  selectAllArtists: () => set((state) => ({
    selectedArtistIds: new Set(state.artists.map(artist => artist.id))
  })),

  clearSelection: () => set({ selectedArtistIds: new Set() }),

  setViewMode: (mode) => set({ viewMode: mode })
}));

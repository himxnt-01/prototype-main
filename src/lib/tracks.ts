import { create } from 'zustand';
import { Track } from '@/types/track';
import { tracks as mockTracks } from '@/data/tracks';
import { randomSongs } from '@/data/randomSongs';

interface TracksState {
  tracks: Track[];
  selectedTrackId: number | null;
  isDetailsOpen: boolean;
  isSelectionMode: boolean;
  selectedTrackIds: Set<number>;
  setTracks: (tracks: Track[]) => void;
  selectTrack: (trackId: number) => void;
  closeDetails: () => void;
  toggleSelectionMode: () => void;
  toggleTrackSelection: (id: number) => void;
  selectAllTracks: () => void;
  clearSelection: () => void;
  isLoading: boolean;
  error: string | null;
}

// Combine original mock tracks with random songs
const allTracks = [...mockTracks, ...randomSongs];

export const useTracksStore = create<TracksState>((set) => ({
  tracks: allTracks,
  selectedTrackId: null,
  isDetailsOpen: false,
  isSelectionMode: false,
  selectedTrackIds: new Set(),
  setTracks: (tracks) => set({ tracks }),
  selectTrack: (trackId) => set({ selectedTrackId: trackId, isDetailsOpen: true }),
  closeDetails: () => set({ isDetailsOpen: false }),
  toggleSelectionMode: () => set((state) => ({ 
    isSelectionMode: !state.isSelectionMode,
    selectedTrackIds: new Set()
  })),
  toggleTrackSelection: (id) => set((state) => {
    const newSelection = new Set(state.selectedTrackIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    return { selectedTrackIds: newSelection };
  }),
  selectAllTracks: () => set((state) => ({
    selectedTrackIds: new Set(state.tracks.map(track => track.id))
  })),
  clearSelection: () => set({ selectedTrackIds: new Set() }),
  isLoading: false,
  error: null,
}));
import { create } from 'zustand';
import { Track } from '@/types/track';
import { supabase } from './supabase'; // Import supabase client

interface TracksState {
  tracks: Track[];
  selectedTrackId: string | null; // Changed to string for UUID
  isDetailsOpen: boolean;
  isSelectionMode: boolean;
  selectedTrackIds: Set<string>; // Changed to string for UUID
  fetchTracks: () => Promise<void>; // Add fetch function
  setTracks: (tracks: Track[]) => void;
  selectTrack: (trackId: string) => void; // Changed to string for UUID
  closeDetails: () => void;
  toggleSelectionMode: () => void;
  toggleTrackSelection: (id: string) => void; // Changed to string for UUID
  selectAllTracks: () => void;
  clearSelection: () => void;
  isLoading: boolean;
  error: string | null;
}

export const useTracksStore = create<TracksState>((set, get) => ({
  tracks: [], // Start with empty array
  selectedTrackId: null,
  isDetailsOpen: false,
  isSelectionMode: false,
  selectedTrackIds: new Set(),
  isLoading: true, // Set loading to true initially
  error: null,

  fetchTracks: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .eq('is_published', true); // Fetch only published tracks

      if (error) throw error;
      
      // Here, you might need to map the data if the table structure
      // doesn't perfectly match the Track type. For now, we assume it does.
      set({ tracks: data || [], isLoading: false });
    } catch (error: any) {
      console.error("Error fetching tracks:", error);
      set({ error: error.message, isLoading: false });
    }
  },

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
  selectAllTracks: () => set((state) => {
    // Ensure track.id is correctly accessed
    const allTrackIds = state.tracks.map(track => track.id);
    return { selectedTrackIds: new Set(allTrackIds) };
  }),
  clearSelection: () => set({ selectedTrackIds: new Set() }),
}));
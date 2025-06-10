// src/lib/drafts.ts (Your Zustand store definition for useDraftsStore)

import { create } from 'zustand';
import { Draft } from '@/types/draft';
import { supabase } from '@/lib/supabase';

interface DraftsState {
  drafts: Draft[];
  selectedDraftId: string | null;
  isDetailsOpen: boolean;
  isSelectionMode: boolean;
  selectedDraftIds: Set<string>;
  setDrafts: (drafts: Draft[]) => void;
  fetchDrafts: () => Promise<void>;
  subscribeToChanges: () => () => void;
  selectDraft: (id: string) => void;
  closeDetails: () => void;
  toggleSelectionMode: () => void;
  toggleDraftSelection: (id: string) => void;
  selectAllDrafts: () => void;
  clearSelection: () => void;
  updateDraft: (id: string, updatedDraft: Partial<Draft>) => void;
  isLoading: boolean;
  error: string | null;
}

export const useDraftsStore = create<DraftsState>((set, get) => ({
  drafts: [],
  selectedDraftId: null,
  isDetailsOpen: false,
  isSelectionMode: false,
  selectedDraftIds: new Set(),
  isLoading: true,
  error: null,
  setDrafts: (drafts) => set({ drafts }),
  
  fetchDrafts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      
      // Map Supabase data to Draft type
      const mappedDrafts: Draft[] = data.map((track: any) => ({
        ...track,
        // Add any necessary transformations here, e.g.:
        artist: track.artist_id || 'Unknown Artist',
        lastModified: track.updated_at || track.created_at,
        progress: 50, // Placeholder
      }));

      set({ drafts: mappedDrafts, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      console.error("Error fetching drafts:", error);
    }
  },

  subscribeToChanges: () => {
    const channel = supabase
      .channel('drafts-realtime-channel')
      .on<Draft>(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tracks' },
        (payload) => {
          console.log('Realtime change received:', payload);
          const currentDrafts = get().drafts;
          
          if (payload.eventType === 'INSERT') {
            const newDraft = payload.new as any;
            const mappedDraft: Draft = {
              ...newDraft,
              artist: newDraft.user_id || 'Unknown Artist',
              lastModified: newDraft.updated_at || newDraft.created_at,
              progress: 50,
            };
            set({ drafts: [mappedDraft, ...currentDrafts] });
          }

          if (payload.eventType === 'UPDATE') {
            const updatedDraft = payload.new as any;
            const mappedDraft: Draft = {
              ...updatedDraft,
              artist: updatedDraft.user_id || 'Unknown Artist',
              lastModified: updatedDraft.updated_at || updatedDraft.created_at,
              progress: 50,
            };
            set({
              drafts: currentDrafts.map((d) => (d.id === mappedDraft.id ? mappedDraft : d)),
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  selectDraft: (id) => set({ selectedDraftId: id, isDetailsOpen: true }),
  closeDetails: () => set({ isDetailsOpen: false }),
  toggleSelectionMode: () => set((state) => ({
    isSelectionMode: !state.isSelectionMode,
    selectedDraftIds: new Set()
  })),
  toggleDraftSelection: (id) => set((state) => {
    const newSelection = new Set(state.selectedDraftIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    return { selectedDraftIds: newSelection };
  }),
  selectAllDrafts: () => set((state) => ({
    selectedDraftIds: new Set(state.drafts.map(draft => draft.id))
  })),
  updateDraft: (id, updatedValues) => set((state) => ({
    drafts: state.drafts.map((draft) =>
      draft.id === id ? { ...draft, ...updatedValues } : draft
    )
  })),
  clearSelection: () => set({ selectedDraftIds: new Set() }),
}));
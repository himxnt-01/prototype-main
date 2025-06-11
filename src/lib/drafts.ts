// src/lib/drafts.ts

import { create } from 'zustand';
import { Draft } from '@/types/draft';
import { supabase } from '@/lib/supabase';
import { Track } from '@/types/track';

// Helper function from friend's version to convert a track to a draft
const trackToDraft = (track: any): Draft => {
  return {
    id: track.id,
    user_id: track.user_id,
    title: track.title || '',
    artist: track.artist || 'Unknown Artist',
    audio_url: track.audio_url,
    cover_art_url: track.cover_art_url,
    is_published: track.is_published || false,
    analysis_status: track.analysis_status || 'pending',
    error_message: track.error_message,
    created_at: track.created_at,
    updated_at: track.updated_at,
    lastModified: track.updated_at || track.created_at,
    progress: 50, // Placeholder, can be calculated
    metadata: {
      bpm: track.bpm,
      key: track.key,
      genre: Array.isArray(track.genre) ? track.genre : (track.genre ? [track.genre] : []),
      subgenre: track.subgenre,
      moods: track.moods || [],
      instruments: track.instruments || [],
      vocal_type: track.vocal_type,
      explicit_content: track.explicit_content,
      description: track.description,
      emotional_arc: track.emotional_arc,
      language: track.language,
      harmony: track.harmony,
      chord_progression: track.chord_progression,
      lyrical_theme: track.lyrical_theme,
      cultural_fusion: track.cultural_fusion,
      historical_period: track.historical_period,
    },
    rights: track.rights || { writers: [], publishers: [], masterOwners: [] },
    lyrics: track.lyrics,
    tags: track.tags || [],
    status: track.status || { phase: 'draft', clearance: false, monetization: false, public: false, flags: [] },
    mixes: track.mixes,
    licensing: track.licensing,
  };
};

interface DraftsState {
  drafts: Draft[];
  selectedDraftId: string | null;
  isDetailsOpen: boolean;
  isSelectionMode: boolean;
  selectedDraftIds: Set<string>;
  isLoading: boolean;
  error: string | null;
  
  fetchDrafts: () => Promise<void>;
  addDraft: (draft: Draft) => void;
  subscribeToChanges: () => () => void;
  selectDraft: (id: string) => void;
  closeDetails: () => void;
  toggleSelectionMode: () => void;
  toggleDraftSelection: (id: string) => void;
  selectAllDrafts: () => void;
  clearSelection: () => void;
  updateDraft: (id: string, updatedDraft: Partial<Draft>) => void;
  publishDraft: (id: string) => Promise<void>;
}

export const useDraftsStore = create<DraftsState>((set, get) => ({
  drafts: [],
  selectedDraftId: null,
  isDetailsOpen: false,
  isSelectionMode: false,
  selectedDraftIds: new Set(),
  isLoading: true,
  error: null,
  
  fetchDrafts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .eq('is_published', false) // Only fetch drafts
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const mappedDrafts: Draft[] = data.map(trackToDraft);
      set({ drafts: mappedDrafts, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addDraft: (draft: Draft) => {
    set(state => ({
      drafts: [draft, ...state.drafts],
    }));
  },

  subscribeToChanges: () => {
    const channel = supabase
      .channel('drafts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tracks' },
        (payload) => {
          console.log('Change received!', payload);
          // Re-fetch drafts to reflect changes
          get().fetchDrafts();
        }
      )
      .subscribe();

    // Return the unsubscribe function
    return () => {
      supabase.removeChannel(channel);
    };
  },

  selectDraft: (id: string) => {
    set({ selectedDraftId: id, isDetailsOpen: true });
  },

  closeDetails: () => {
    set({ isDetailsOpen: false, selectedDraftId: null });
  },

  toggleSelectionMode: () => {
    set((state) => ({
      isSelectionMode: !state.isSelectionMode,
      selectedDraftIds: new Set(), // Clear selection when toggling mode
    }));
  },

  toggleDraftSelection: (id: string) => {
    set((state) => {
      const newSelection = new Set(state.selectedDraftIds);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return { selectedDraftIds: newSelection };
    });
  },

  selectAllDrafts: () => {
    set((state) => {
      const allDraftIds = new Set(state.drafts.map(d => d.id));
      return { selectedDraftIds: allDraftIds };
    });
  },

  clearSelection: () => {
    set({ selectedDraftIds: new Set() });
  },

  updateDraft: (id: string, updatedDraft: Partial<Draft>) => {
    set((state) => ({
      drafts: state.drafts.map((draft) =>
        draft.id === id ? { ...draft, ...updatedDraft, lastModified: new Date().toISOString() } : draft
      ),
    }));
  },

  publishDraft: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('tracks')
        .update({ is_published: true, status: { phase: 'published', public: true } })
        .eq('id', id);

      if (error) throw error;
      
      // Remove from local state
      set(state => ({
        drafts: state.drafts.filter(d => d.id !== id),
        selectedDraftId: state.selectedDraftId === id ? null : state.selectedDraftId,
      }));

    } catch (error: any) {
      set({ error: error.message });
      console.error("Failed to publish draft:", error);
    }
  },
}));
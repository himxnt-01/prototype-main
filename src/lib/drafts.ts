// src/lib/drafts.ts

import { create } from 'zustand';
import { Draft } from '@/types/draft';
import { supabase } from '@/lib/supabase';
import { mapSupabaseTrackToDraft } from './upload/utils/track-mapper';

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
  updateDraft: (id: string, updates: Partial<Draft>) => Promise<void>;
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
      
      const mappedDrafts: Draft[] = data.map(mapSupabaseTrackToDraft);
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

  updateDraft: async (id: string, updates: Partial<Draft>) => {
    // 1. Optimistically update local state
    set(state => ({
      drafts: state.drafts.map(draft =>
        draft.id === id ? { ...draft, ...updates, lastModified: new Date().toISOString() } : draft
      ),
    }));

    // 2. Persist changes to Supabase, respecting the actual schema
    const { artist, metadata, ...payloadForSupabase } = updates;
    
    // The 'artist' name is a display property in the app, not a DB column.
    // The actual user/artist link is `user_id`, which shouldn't be updated here.
    // We can ignore the 'artist' field in the update payload.

    // If metadata is being updated, flatten its properties into the payload
    if (metadata) {
      for (const [key, value] of Object.entries(metadata)) {
        (payloadForSupabase as any)[key] = value;
      }
    }

    if (Object.keys(payloadForSupabase).length === 0) {
      return; // Nothing to update
    }

    payloadForSupabase.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('tracks')
      .update(payloadForSupabase)
      .eq('id', id);

    if (error) {
      console.error('Failed to update draft:', error);
      // Optional: revert local state change or show an error
    }
  },

  publishDraft: async (id: string) => {
    const draftToPublish = get().drafts.find(d => d.id === id);
    if (!draftToPublish) {
      const errorMsg = "Draft not found.";
      set({ error: errorMsg });
      console.error(errorMsg);
      return;
    }

    try {
      // Create a clean payload for Supabase, strictly adhering to the DB schema.
      const {
        // Exclude fields that are not in the 'tracks' table or are handled differently.
        artist,          // This is a UI-level field, not a DB column.
        progress,        // UI-only field.
        lastModified,    // UI-only field.
        metadata,        // The contents of metadata will be flattened.
        id,              // Should not be in the update payload itself.
        user_id,         // Should not be changed on update.
        created_at,      // Should not be changed on update.
        
        ...restOfDraft   // All other fields (like rights, tags, etc.) are included.
      } = draftToPublish;

      const trackData: { [key: string]: any; } = {
        ...restOfDraft,
        ...metadata, // Spread metadata fields into the top level.
        is_published: true,
        // The status object is now a column, so we ensure it's updated correctly.
        status: { ...draftToPublish.status, phase: 'published', public: true },
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('tracks')
        .update(trackData)
        .eq('id', draftToPublish.id)
        .select()
        .single();

      if (error) throw error;
      
      set(state => ({
        drafts: state.drafts.filter(d => d.id !== id),
        selectedDraftId: state.selectedDraftId === id ? null : state.selectedDraftId,
        isDetailsOpen: state.selectedDraftId === id ? false : state.isDetailsOpen,
      }));

    } catch (error: any) {
      set({ error: error.message });
      console.error("Failed to publish draft:", error);
    }
  },
}));
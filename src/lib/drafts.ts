// src/lib/drafts.ts (Your Zustand store definition for useDraftsStore)

import { create } from 'zustand';
import { Track } from '@/types/track';
import { Draft } from '@/types/draft';
import { supabase } from './supabase';

// Test data to verify UI rendering
const TEST_DRAFTS: Draft[] = [
  {
    id: '1',
    title: 'Test Track 1',
    artist: 'Test Artist',
    metadata: {
      title: 'Test Track 1',
      artist: 'Test Artist',
      genre: 'Test Genre',
      key: 'C'
    },
    rights: {
      writers: [],
      publishers: [],
      masterOwners: []
    },
    lyrics: undefined,
    tags: ['test', 'demo'],
    status: {
      phase: 'draft',
      clearance: false,
      monetization: false,
      public: false,
      flags: []
    },
    mixes: [],
    licensing: {
      tier: 'basic' as const,
      isExclusive: false,
      territories: [],
      usageTypes: [],
      restrictions: '',
      customPrice: null,
      requiresLicense: true
    },
    lastModified: new Date().toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Test Track 2',
    artist: 'Test Artist',
    metadata: {
      title: 'Test Track 2',
      artist: 'Test Artist',
      genre: 'Test Genre',
      key: 'Am'
    },
    rights: {
      writers: [],
      publishers: [],
      masterOwners: []
    },
    lyrics: undefined,
    tags: ['test', 'demo'],
    status: {
      phase: 'draft',
      clearance: false,
      monetization: false,
      public: false,
      flags: []
    },
    mixes: [],
    licensing: {
      tier: 'basic' as const,
      isExclusive: false,
      territories: [],
      usageTypes: [],
      restrictions: '',
      customPrice: null,
      requiresLicense: true
    },
    lastModified: new Date().toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Test Track 3',
    artist: 'Test Artist',
    metadata: {
      title: 'Test Track 3',
      artist: 'Test Artist',
      genre: 'Test Genre',
      key: 'G'
    },
    rights: {
      writers: [],
      publishers: [],
      masterOwners: []
    },
    lyrics: undefined,
    tags: ['test', 'demo'],
    status: {
      phase: 'draft',
      clearance: false,
      monetization: false,
      public: false,
      flags: []
    },
    mixes: [],
    licensing: {
      tier: 'basic' as const,
      isExclusive: false,
      territories: [],
      usageTypes: [],
      restrictions: '',
      customPrice: null,
      requiresLicense: true
    },
    lastModified: new Date().toISOString(),
    created_at: new Date().toISOString()
  }
];

interface DraftsState {
  drafts: Draft[];
  selectedDraftId: string | null;
  isDetailsOpen: boolean;
  isSelectionMode: boolean;
  selectedDraftIds: Set<string>;
  isLoading: boolean;
  error: string | null;
  fetchDrafts: () => Promise<void>;
  setDrafts: (drafts: Draft[]) => void;
  selectDraft: (id: string) => void;
  closeDetails: () => void;
  toggleSelectionMode: () => void;
  toggleDraftSelection: (id: string) => void;
  selectAllDrafts: () => void;
  clearSelection: () => void;
  updateDraft: (id: string, updatedDraft: Partial<Draft>) => Promise<void>;
}

// Helper function to convert Track to Draft
const trackToDraft = (track: any): Draft => {
  return {
    id: track.id,
    title: track.title || '',
    artist: track.artist || '',
    metadata: {
      title: track.title,
      artist: track.artist,
      genre: track.genre,
      bpm: track.bpm,
      key: track.key,
      duration: track.duration
    },
    rights: {
      writers: (track.rights?.writers || []).map((writer: any) => ({
        name: writer.name,
        role: writer.role,
        share: writer.share
      })),
      publishers: (track.rights?.publishers || []).map((publisher: any) => ({
        name: publisher.name,
        share: publisher.share
      })),
      masterOwners: (track.rights?.masterOwners || []).map((owner: any) => ({
        name: owner.name,
        share: owner.share
      }))
    },
    lyrics: track.lyrics ? {
      content: track.lyrics,
      language: track.metadata?.language || 'en',
      hasTranslations: false
    } : undefined,
    tags: track.tags || [],
    status: {
      phase: track.status?.phase || 'draft',
      clearance: false,
      monetization: track.status?.monetization || false,
      public: track.is_published || false,
      flags: []
    },
    mixes: track.mixes || [],
    licensing: {
      tier: 'basic' as const,
      isExclusive: false,
      territories: track.status?.clearance?.restrictedCountries || [],
      usageTypes: track.status?.clearance?.industries || [],
      restrictions: '',
      customPrice: track.status?.price || null,
      requiresLicense: true
    },
    lastModified: track.updated_at || track.created_at,
    created_at: track.created_at
  };
};

export const useDraftsStore = create<DraftsState>((set, get) => ({
  drafts: [],
  selectedDraftId: null,
  isDetailsOpen: false,
  isSelectionMode: false,
  selectedDraftIds: new Set(),
  isLoading: false,
  error: null,

  fetchDrafts: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use test data instead of database call
      set({ drafts: TEST_DRAFTS, isLoading: false });
      
      /* Commented out database calls for now
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error('No user logged in');
      }

      const { data: tracks, error } = await supabase
        .from('tracks')
        .select('id, title, user_id')
        .eq('user_id', session.session.user.id);

      if (error) throw error;

      const drafts = (tracks || []).map(track => ({...}));
      */
      
    } catch (error) {
      console.error('Error fetching drafts:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch drafts', 
        isLoading: false 
      });
    }
  },

  setDrafts: (drafts) => set({ drafts }),
  
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
  
  updateDraft: async (id, updatedDraft) => {
    // For now, just update the local state without database calls
    set((state) => ({
      drafts: state.drafts.map((draft) =>
        draft.id === id ? { ...draft, ...updatedDraft } : draft
      )
    }));

    /* Commented out database update for now
    try {
      set({ isLoading: true });
      const trackUpdate = {...};
      const { error } = await supabase.from('tracks').update(trackUpdate).eq('id', id);
      if (error) throw error;
      // Update local state...
    } catch (error) {...}
    */
  },

  clearSelection: () => set({ selectedDraftIds: new Set() })
}));
// src/lib/drafts.ts (Your Zustand store definition for useDraftsStore)

import { create } from 'zustand';
import { Track } from '@/types/track';
import { drafts as mockDrafts } from '@/data/drafts'; // Assuming this path is correct

interface DraftsState {
  drafts: Track[];
  selectedDraftId: string | null;
  isDetailsOpen: boolean;
  isSelectionMode: boolean;
  selectedDraftIds: Set<string>;
  setDrafts: (drafts: Track[]) => void;
  selectDraft: (id: string) => void;
  closeDetails: () => void;
  toggleSelectionMode: () => void;
  toggleDraftSelection: (id: string) => void;
  selectAllDrafts: () => void;
  clearSelection: () => void;
  updateDraft: (id: string, updatedDraft: Track) => void;
  isLoading: boolean;
  error: string | null;
}

export const useDraftsStore = create<DraftsState>((set) => ({
  drafts: mockDrafts as unknown as Track[], // <--- ADDED TYPE ASSERTION HERE
  selectedDraftId: null,
  isDetailsOpen: false,
  isSelectionMode: false,
  selectedDraftIds: new Set(),
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
  updateDraft: (id, updatedDraft) => set((state) => ({
    drafts: state.drafts.map((draft) =>
      draft.id === id ? { ...updatedDraft } : draft
    )
  })),
  clearSelection: () => set({ selectedDraftIds: new Set() }),
  isLoading: false,
  error: null,
}));
import { create } from 'zustand';

export interface SelectionState<T> {
  isSelectionMode: boolean;
  selectedIds: Set<number>;
  toggleSelectionMode: () => void;
  toggleSelection: (id: number) => void;
  selectAll: (ids: number[]) => void;
  clearSelection: () => void;
}

export const createSelectionStore = <T>() => 
  create<SelectionState<T>>((set) => ({
    isSelectionMode: false,
    selectedIds: new Set(),
    toggleSelectionMode: () => set((state) => ({ 
      isSelectionMode: !state.isSelectionMode,
      selectedIds: new Set()
    })),
    toggleSelection: (id) => set((state) => {
      const newSelection = new Set(state.selectedIds);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return { selectedIds: newSelection };
    }),
    selectAll: (ids) => set({ selectedIds: new Set(ids) }),
    clearSelection: () => set({ selectedIds: new Set() }),
  }));
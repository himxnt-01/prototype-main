import { create } from 'zustand';

interface DraftFormState {
  isReleased: "yes" | "no" | undefined;
  isScanning: boolean;
  hasLoadedRights: boolean;
  setIsReleased: (value: "yes" | "no" | undefined) => void;
  setIsScanning: (value: boolean) => void;
  setHasLoadedRights: (value: boolean) => void;
}

export const useDraftFormStore = create<DraftFormState>((set) => ({
  isReleased: undefined,
  isScanning: false,
  hasLoadedRights: false,
  setIsReleased: (value) => set({ isReleased: value }),
  setIsScanning: (value) => set({ isScanning: value }),
  setHasLoadedRights: (value) => set({ hasLoadedRights: value })
}));
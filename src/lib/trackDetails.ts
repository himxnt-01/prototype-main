import { create } from 'zustand';

interface TrackDetailsState {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const useTrackDetailsStore = create<TrackDetailsState>((set) => ({
  currentView: "metadata",
  setCurrentView: (view) => set({ currentView: view }),
}));
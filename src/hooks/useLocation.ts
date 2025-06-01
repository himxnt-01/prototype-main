// src/hooks/useLocation.ts
import { create } from 'zustand';

interface LocationState {
  currentPath: string;
  navigate: (path: string) => void;
}

export const useLocation = create<LocationState>((set) => {
  // 1. Initialize with the current browser path
  const initialPath = window.location.pathname;

  // 2. Function to update Zustand state and browser URL
  const navigateTo = (path: string) => {
    // Check if the path is already the current browser path to avoid unnecessary history entries
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path); // Updates the browser's URL
    }
    set({ currentPath: path }); // Updates Zustand state
  };

  // 3. Listen for browser history changes (e.g., back/forward buttons, direct URL entry)
  const handlePopState = () => {
    set({ currentPath: window.location.pathname });
  };

  // Add the event listener when the hook is created
  window.addEventListener('popstate', handlePopState);

  // Return the initial state and the navigate function
  return {
    currentPath: initialPath,
    navigate: navigateTo,
  };
});
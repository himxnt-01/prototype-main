import { create } from 'zustand';
import { Track } from '@/types/track';

interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  queue: Track[];
  history: Track[];
  position: number; // 0-100 percentage
  duration: number; // in seconds
  volume: number; // 0-1
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: 'off' | 'all' | 'one';
  isExpanded: boolean;
  isMinimized: boolean;
  
  // Actions
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setPosition: (position: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeatMode: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: number) => void;
  clearQueue: () => void;
  toggleExpanded: () => void;
  toggleMinimized: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  currentTrack: null,
  queue: [],
  history: [],
  position: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isShuffled: false,
  repeatMode: 'off',
  isExpanded: false,
  isMinimized: false,
  
  playTrack: (track) => {
    const { currentTrack, history } = get();
    
    // Add current track to history if it exists
    if (currentTrack) {
      set({ 
        history: [...history, currentTrack],
      });
    }
    
    set({ 
      currentTrack: track, 
      isPlaying: true, 
      position: 0,
      duration: calculateDuration(track.duration),
      isMinimized: false // Ensure player is visible when playing a new track
    });
  },
  
  pauseTrack: () => set({ isPlaying: false }),
  
  resumeTrack: () => set({ isPlaying: true }),
  
  nextTrack: () => {
    const { queue, currentTrack, history, repeatMode, isShuffled } = get();
    
    if (queue.length === 0) {
      if (repeatMode === 'all' && history.length > 0) {
        // If repeat all is on and we have history, play the first track from history
        const nextTrack = history[0];
        set({ 
          currentTrack: nextTrack, 
          history: history.slice(1),
          position: 0,
          duration: calculateDuration(nextTrack.duration)
        });
      } else if (repeatMode === 'one' && currentTrack) {
        // If repeat one is on, replay the current track
        set({ position: 0 });
      }
      return;
    }
    
    // Get next track from queue
    let nextIndex = 0;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * queue.length);
    }
    
    const nextTrack = queue[nextIndex];
    const newQueue = [...queue];
    newQueue.splice(nextIndex, 1);
    
    // Add current track to history if it exists
    if (currentTrack) {
      set({ 
        history: [...history, currentTrack],
      });
    }
    
    set({ 
      currentTrack: nextTrack, 
      queue: newQueue,
      position: 0,
      duration: calculateDuration(nextTrack.duration)
    });
  },
  
  previousTrack: () => {
    const { history, currentTrack, position } = get();
    
    // If current position is more than 3 seconds in, restart the current track
    if (position > 3) {
      set({ position: 0 });
      return;
    }
    
    if (history.length === 0) return;
    
    const previousTrack = history[history.length - 1];
    const newHistory = history.slice(0, -1);
    
    // Add current track to queue if it exists
    if (currentTrack) {
      set({ 
        queue: [currentTrack, ...get().queue],
      });
    }
    
    set({ 
      currentTrack: previousTrack, 
      history: newHistory,
      position: 0,
      duration: calculateDuration(previousTrack.duration)
    });
  },
  
  setPosition: (position) => set({ position }),
  
  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  
  toggleMute: () => {
    const { isMuted, volume } = get();
    if (isMuted) {
      set({ isMuted: false });
    } else {
      set({ isMuted: true });
    }
  },
  
  toggleShuffle: () => set({ isShuffled: !get().isShuffled }),
  
  toggleRepeatMode: () => {
    const { repeatMode } = get();
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    set({ repeatMode: modes[nextIndex] });
  },
  
  addToQueue: (track) => set({ queue: [...get().queue, track] }),
  
  removeFromQueue: (trackId) => set({ 
    queue: get().queue.filter(track => track.id !== trackId) 
  }),
  
  clearQueue: () => set({ queue: [] }),
  
  toggleExpanded: () => set({ 
    isExpanded: !get().isExpanded,
    isMinimized: false // Ensure player is not minimized when expanded
  }),
  
  toggleMinimized: () => set({ 
    isMinimized: !get().isMinimized,
    isExpanded: false // Ensure player is not expanded when minimized
  }),
}));

// Helper function to convert duration string (e.g. "3:45") to seconds
function calculateDuration(durationStr: string): number {
  const parts = durationStr.split(':');
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  }
  if (parts.length === 3) {
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    return hours * 3600 + minutes * 60 + seconds;
  }
  return 0;
}

// Helper function to format seconds to MM:SS
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) {
    return "0:00";
  }
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
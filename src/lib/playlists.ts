import { create } from 'zustand';
import { Track } from '@/types/track';
import { tracks as mockTracks } from '@/data/tracks';

export type ViewMode = 'grid' | 'list';

export interface Playlist {
  id: number;
  title: string;
  description?: string;
  coverUrl?: string;
  tracks: Track[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

interface PlaylistsState {
  playlists: Playlist[];
  selectedPlaylistId: number | null;
  isDetailsOpen: boolean;
  isSelectionMode: boolean;
  selectedPlaylistIds: Set<number>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  setPlaylists: (playlists: Playlist[]) => void;
  selectPlaylist: (id: number) => void;
  closeDetails: () => void;
  toggleSelectionMode: () => void;
  togglePlaylistSelection: (id: number) => void;
  selectAllPlaylists: () => void;
  clearSelection: () => void;
  createPlaylist: (data: Omit<Playlist, "id" | "createdAt" | "updatedAt">) => void;
  updatePlaylist: (id: number, data: Partial<Playlist>) => void;
  deletePlaylist: (id: number) => void;
  addTrackToPlaylist: (playlistId: number, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: number, trackId: number) => void;
  reorderTracks: (playlistId: number, startIndex: number, endIndex: number) => void;
}

// Mock data for initial state
const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 1,
    title: "Summer Vibes",
    description: "Perfect playlist for sunny days",
    coverUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=400&auto=format&fit=crop",
    tracks: [mockTracks[0], mockTracks[1]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublic: true
  },
  {
    id: 2,
    title: "Late Night Drive",
    description: "Chill beats for night drives",
    coverUrl: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=400&h=400&auto=format&fit=crop",
    tracks: [mockTracks[2]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublic: false
  }
];

export const usePlaylistsStore = create<PlaylistsState>((set, get) => ({
  playlists: MOCK_PLAYLISTS,
  selectedPlaylistId: null,
  isDetailsOpen: false,
  isSelectionMode: false,
  selectedPlaylistIds: new Set(),
  viewMode: 'grid',

  setViewMode: (mode) => set({ viewMode: mode }),

  setPlaylists: (playlists) => set({ playlists }),

  selectPlaylist: (id) => set({ 
    selectedPlaylistId: id, 
    isDetailsOpen: true 
  }),

  closeDetails: () => set({ 
    isDetailsOpen: false 
  }),

  toggleSelectionMode: () => set((state) => ({ 
    isSelectionMode: !state.isSelectionMode,
    selectedPlaylistIds: new Set()
  })),

  togglePlaylistSelection: (id) => set((state) => {
    const newSelection = new Set(state.selectedPlaylistIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    return { selectedPlaylistIds: newSelection };
  }),

  selectAllPlaylists: () => set((state) => ({
    selectedPlaylistIds: new Set(state.playlists.map(p => p.id))
  })),

  clearSelection: () => set({ selectedPlaylistIds: new Set() }),

  createPlaylist: (data) => set((state) => {
    const newPlaylist: Playlist = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return { playlists: [...state.playlists, newPlaylist] };
  }),

  updatePlaylist: (id, data) => set((state) => ({
    playlists: state.playlists.map(playlist =>
      playlist.id === id
        ? { 
            ...playlist, 
            ...data,
            updatedAt: new Date().toISOString()
          }
        : playlist
    )
  })),

  deletePlaylist: (id) => set((state) => ({
    playlists: state.playlists.filter(playlist => playlist.id !== id)
  })),

  addTrackToPlaylist: (playlistId, track) => set((state) => ({
    playlists: state.playlists.map(playlist =>
      playlist.id === playlistId
        ? {
            ...playlist,
            tracks: [...playlist.tracks, track],
            updatedAt: new Date().toISOString()
          }
        : playlist
    )
  })),

  removeTrackFromPlaylist: (playlistId, trackId) => set((state) => ({
    playlists: state.playlists.map(playlist =>
      playlist.id === playlistId
        ? {
            ...playlist,
            tracks: playlist.tracks.filter(track => track.id !== trackId),
            updatedAt: new Date().toISOString()
          }
        : playlist
    )
  })),

  reorderTracks: (playlistId, startIndex, endIndex) => set((state) => {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (!playlist) return state;

    const newTracks = [...playlist.tracks];
    const [removed] = newTracks.splice(startIndex, 1);
    newTracks.splice(endIndex, 0, removed);

    return {
      playlists: state.playlists.map(p =>
        p.id === playlistId
          ? { ...p, tracks: newTracks, updatedAt: new Date().toISOString() }
          : p
      )
    };
  })
}));
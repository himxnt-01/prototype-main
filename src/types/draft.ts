// src/types/draft.ts

// This is the single source of truth for a track object.
// It is based on the 'tracks' table in Supabase.

export interface Draft {
  id: string; // UUID from Supabase
  created_at: string;
  updated_at?: string;
  title: string;
  user_id: string; // UUID of the user
  audio_url: string;
  cover_art_url?: string;
  is_published: boolean;
  analysis_status?: 'pending' | 'processing' | 'complete' | 'error';
  error_message?: string;

  // Gemini Analysis Fields
  bpm?: number;
  key?: string;
  genre?: string[];
  subgenre?: string;
  moods?: string[];
  instruments?: string[];
  vocal_type?: 'male' | 'female' | 'instrumental';
  explicit_content?: boolean;
  description?: string;
  emotional_arc?: string;
  language?: string;
  harmony?: string;
  chord_progression?: string;
  lyrical_theme?: string;
  cultural_fusion?: string;
  historical_period?: string;

  // Legacy/UI fields (can be mapped or have defaults)
  artist?: string; // Can be derived from user profile
  progress: number; // Represents metadata completion, can be calculated
  lastModified: string; // Should be updated_at
}

export type Writer = {
  name: string;
  role: string;
  share: number;
  email?: string;
};
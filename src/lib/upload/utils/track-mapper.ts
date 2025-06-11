// src/lib/upload/utils/track-mapper.ts

import { Draft } from '@/types/draft';

/**
 * Maps a raw Supabase track object (from an insert operation) to the local 
 * application's `Draft` interface. This ensures that newly created drafts 
 * have a consistent shape with sensible defaults.
 *
 * @param supabaseTrackData The data object returned from a Supabase `tracks` table insert.
 * @returns A `Draft` object that conforms to the application's `Draft` interface.
 */
export const mapSupabaseTrackToDraft = (supabaseTrackData: any): Draft => {
  return {
    // Core Identifiers
    id: supabaseTrackData.id,
    user_id: supabaseTrackData.user_id,

    // Core Metadata & Audio
    title: supabaseTrackData.title || 'Untitled',
    artist: supabaseTrackData.artist, // This can be derived later from profile
    audio_url: supabaseTrackData.audio_url,
    cover_art_url: supabaseTrackData.cover_art_url,

    // Detailed Metadata (with defaults)
    metadata: {
      title: supabaseTrackData.title,
      artist: supabaseTrackData.artist,
      duration: supabaseTrackData.duration,
      bpm: supabaseTrackData.bpm,
      key: supabaseTrackData.key,
      genre: Array.isArray(supabaseTrackData.genre) ? supabaseTrackData.genre : (supabaseTrackData.genre ? [supabaseTrackData.genre] : []),
      subgenre: supabaseTrackData.subgenre,
      moods: supabaseTrackData.moods || [],
      instruments: supabaseTrackData.instruments || [],
      vocal_type: supabaseTrackData.vocal_type,
      explicit_content: supabaseTrackData.explicit_content,
      description: supabaseTrackData.description,
      emotional_arc: supabaseTrackData.emotional_arc,
      language: supabaseTrackData.language,
      harmony: supabaseTrackData.harmony,
      chord_progression: supabaseTrackData.chord_progression,
      lyrical_theme: supabaseTrackData.lyrical_theme,
      cultural_fusion: supabaseTrackData.cultural_fusion,
      historical_period: supabaseTrackData.historical_period,
    },

    // Rights Management (default structure)
    rights: supabaseTrackData.rights || {
      writers: [],
      publishers: [],
      masterOwners: [],
    },

    // Lyrics (default structure)
    lyrics: supabaseTrackData.lyrics || {
      content: '',
    },

    // Tags (default structure)
    tags: supabaseTrackData.tags || [],

    // Status & Publishing
    status: supabaseTrackData.status || {
      phase: 'draft',
      clearance: false,
      monetization: false,
      public: false,
      flags: [],
    },
    is_published: supabaseTrackData.is_published ?? false,
    analysis_status: supabaseTrackData.analysis_status || 'pending',
    error_message: supabaseTrackData.error_message,

    // Mixes & Licensing (default structure)
    mixes: supabaseTrackData.mixes || [],
    licensing: supabaseTrackData.licensing, // Can be undefined initially

    // Timestamps & UI State
    created_at: supabaseTrackData.created_at || new Date().toISOString(),
    updated_at: supabaseTrackData.updated_at,
    lastModified: supabaseTrackData.updated_at || supabaseTrackData.created_at || new Date().toISOString(),
    progress: 0, // Start progress at 0 for new drafts
  };
};
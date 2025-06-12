// src/lib/upload/utils/track-mapper.ts

import { Draft } from '@/types/draft';

/**
 * Maps a raw Supabase track object (from the database) to the local 
 * application's `Draft` interface. This function is now schema-aware.
 *
 * @param supabaseTrackData The data object from the Supabase `tracks` table.
 * @returns A `Draft` object that conforms to the application's `Draft` interface.
 */
export const mapSupabaseTrackToDraft = (supabaseTrackData: any): Draft => {
  // The 'artist' field in the UI/draft object is a string name, but the database
  // stores an 'artist_id'. This mapping function does not have enough context
  // to fetch the artist's name from the 'profiles' table.
  // For now, we will leave it undefined or use a placeholder. The UI components
  // will need to handle fetching the artist name based on `user_id`.
  // Note: The database has `artist_id`, which seems to be the `user_id`. We use `user_id`.
  
  const metadata = {
    title: supabaseTrackData.title,
    // artist: We need a separate mechanism to resolve user_id to an artist name
    duration: supabaseTrackData.duration,
    bpm: supabaseTrackData.bpm,
    key: supabaseTrackData.key,
    genre: supabaseTrackData.genre,
    subgenre: supabaseTrackData.subgenre,
    moods: supabaseTrackData.moods,
    instruments: supabaseTrackData.instruments,
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
    lyrics: supabaseTrackData.lyrics, // From the new top-level column
  };

  return {
    id: supabaseTrackData.id,
    user_id: supabaseTrackData.user_id || supabaseTrackData.artist_id, // Use user_id as the primary source
    
    title: supabaseTrackData.title || 'Untitled',
    artist: 'Unknown Artist', // Placeholder, needs proper fetching logic
    audio_url: supabaseTrackData.audio_url,
    cover_art_url: supabaseTrackData.cover_art_url,
    
    metadata: metadata,

    rights: supabaseTrackData.rights,
    lyrics: supabaseTrackData.lyrics || { content: '' },
    tags: supabaseTrackData.tags,

    status: supabaseTrackData.status || { phase: 'draft', clearance: false, monetization: false, public: false, flags: [] },
    is_published: supabaseTrackData.is_published ?? false,
    analysis_status: supabaseTrackData.analysis_status || 'pending',
    error_message: supabaseTrackData.error_message,

    mixes: supabaseTrackData.mixes,
    licensing: supabaseTrackData.licensing,

    created_at: supabaseTrackData.created_at || new Date().toISOString(),
    updated_at: supabaseTrackData.updated_at,
    lastModified: supabaseTrackData.updated_at || supabaseTrackData.created_at || new Date().toISOString(),
    progress: 0, 
  };
};
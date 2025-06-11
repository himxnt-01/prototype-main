// src/lib/upload/utils/track-mapper.ts

import { Track, TrackMetadata, SyncLicensingInfo } from '@/types/track';

/**
 * Maps raw Supabase track data to the local application's `Track` interface.
 * This function provides default/placeholder values for properties that are
 * required by the local `Track` interface but might not be immediately
 * available from the initial Supabase database insert.
 *
 * @param supabaseTrackData The data object returned from a successful Supabase `tracks` table insert.
 * @returns A `Track` object that conforms to the local application's `Track` interface.
 */
export const mapSupabaseTrackToLocalTrack = (supabaseTrackData: any): Track => {
  // Default values for TrackMetadata properties
  const defaultMetadata: TrackMetadata = {
    isrc: undefined,
    iswc: undefined,
    upc: undefined,
    releaseDate: new Date().toISOString().split('T')[0],
    publisher: "Unknown Publisher",
    copyright: `© ${new Date().getFullYear()} Unknown`,
    producer: "Unknown Producer",
    mixer: "Unknown Mixer",
    masteringEngineer: "Unknown Mastering Engineer",
    recordingLocation: "Unknown Location",
    recordingDate: new Date().toISOString().split('T')[0],
    language: "English",
    explicit: false,
    territories: ["Worldwide"],
    masterRightsOwner: "Unknown Owner",
  };

  // Default values for SyncLicensingInfo properties (if needed)
  const defaultSyncInfo: SyncLicensingInfo = {
    mood: [],
    instruments: [],
    tempo: "medium",
    energy: "medium",
    vocals: "none",
    explicit: false,
    genres: [],
    subgenres: [],
    similar: [],
    themes: [],
    clearance: {
      masterRights: "Unspecified",
      publishingRights: "Unspecified",
      territorialRestrictions: [],
      preClearedFor: [],
      restrictions: [],
    },
    pricing: [],
  };

  // Construct the status object, ensuring all required sub-properties are present
  const status = {
    phase: supabaseTrackData.status?.phase || "recording",
    clearance: supabaseTrackData.status?.clearance || { industries: [], restrictedCountries: [] },
    monetization: supabaseTrackData.status?.monetization ?? false,
    public: supabaseTrackData.status?.public ?? false,
    approvals: supabaseTrackData.status?.approvals || [],
    progress: supabaseTrackData.status?.progress || 0,
  };

  return {
    // Core Draft fields from Supabase
    id: supabaseTrackData.id,
    created_at: supabaseTrackData.created_at || new Date().toISOString(),
    updated_at: supabaseTrackData.updated_at,
    title: supabaseTrackData.title || "Untitled Track",
    user_id: supabaseTrackData.user_id,
    audio_url: supabaseTrackData.audio_url || "",
    is_published: supabaseTrackData.is_published ?? false,
    analysis_status: supabaseTrackData.analysis_status,
    error_message: supabaseTrackData.error_message,
    
    // Gemini Analysis Fields (with defaults)
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
    
    // Legacy/UI fields (mapped or with defaults)
    artist: supabaseTrackData.user_id || "Unknown Artist",
    lastModified: supabaseTrackData.updated_at || supabaseTrackData.created_at,

    duration: supabaseTrackData.duration || "0:00",
    metadata: {
      ...defaultMetadata,
      ...supabaseTrackData.metadata,
    },
    tags: supabaseTrackData.tags || [],
    writers: supabaseTrackData.writers || [],
    lyrics: supabaseTrackData.lyrics || "",

    mixes: supabaseTrackData.mixes,
    parentTrackId: supabaseTrackData.parentTrackId,
    syncInfo: supabaseTrackData.syncInfo || defaultSyncInfo,
    status: status,
    rights: supabaseTrackData.rights || { writers: [], publishers: [], masterOwners: [] },
  };
};
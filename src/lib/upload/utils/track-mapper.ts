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
    phase: "recording" as const,
    clearance: { industries: [] as string[], restrictedCountries: [] as string[] },
    monetization: false,
    public: false,
    approvals: [],
    progress: 0,
  };

  // Map the database fields to the Track interface
  return {
    id: supabaseTrackData.id,
    title: supabaseTrackData.title || "Untitled Track",
    artist: supabaseTrackData.artist_id || "Unknown Artist",
    audio_url: supabaseTrackData.audio_url || "",
    is_published: supabaseTrackData.is_published ?? false,
    created_at: supabaseTrackData.created_at || new Date().toISOString(),
    genre: Array.isArray(supabaseTrackData.genre) && supabaseTrackData.genre.length > 0 
      ? supabaseTrackData.genre[0] 
      : "Uncategorized",
    key: supabaseTrackData.key || "C Major",
    bpm: supabaseTrackData.bpm || 0,
    duration: supabaseTrackData.duration?.toString() || "0:00",
    metadata: defaultMetadata,
    tags: [],
    writers: [],
    lyrics: "",
    mixes: [],
    syncInfo: defaultSyncInfo,
    status: status,
    rights: { writers: [], publishers: [], masterOwners: [] },
  };
};
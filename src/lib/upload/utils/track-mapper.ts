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
    id: supabaseTrackData.id, // Supabase ID is a string (UUID)
    title: supabaseTrackData.title || "Untitled Track",
    artist: supabaseTrackData.artist_id || "Unknown Artist",
    audio_url: supabaseTrackData.audio_url || "",
    is_published: supabaseTrackData.is_published ?? false,
    created_at: supabaseTrackData.created_at || new Date().toISOString(),

    genre: supabaseTrackData.genre || "Uncategorized",
    key: supabaseTrackData.key || "C Major",
    bpm: supabaseTrackData.bpm || 0,
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
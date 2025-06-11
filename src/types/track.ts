// src/types/track.ts (UPDATED - Please make ALL these changes in your file)
// src/types/track.ts

export interface ClientSideDummyDraft {
  id: number; // For Date.now() based ID
  title: string;
  artist: string;
  status: {
    phase: "recording";
    clearance: string; // "pending_submission"
    monetization: boolean;
    public: boolean;
    flags: {
      needsMetadata: boolean;
    };
  };
  metadata: {
    genre: string;
    bpm: number;
    key: string;
    duration: string;
    language: string;
    explicit: boolean;
  };
  rights: {
    writers: Array<{ name: string; role: string; share: number; }>; // Ensure proper typing if not any
    publishers: Array<{ name: string; share: number; territories?: string[]; }>;
    masterOwners: Array<{ name: string; share: number; territories?: string[]; }>;
  };
  progress: number;
  lastModified: string;
  uploadDate: string;
}

// ... existing interfaces like Track, TrackMetadata, SyncLicensingInfo below ...
import { Mix } from "./mix";

export interface Track {
  // Core Draft fields from Supabase
  id: string; // Changed from number for UUID
  created_at: string;
  updated_at?: string; // Optional field
  title: string;
  user_id: string;
  audio_url: string;
  is_published: boolean;
  analysis_status?: 'pending' | 'completed' | 'failed';
  error_message?: string;
  
  // Gemini Analysis Fields
  bpm?: number;
  key?: string;
  genre?: string;
  subgenre?: string;
  moods?: string[];
  instruments?: string[];
  vocal_type?: 'male' | 'female' | 'duet' | 'instrumental';
  explicit_content?: boolean;
  description?: string;
  emotional_arc?: any; // Define more strictly if possible
  language?: string;
  harmony?: any;
  chord_progression?: string;
  lyrical_theme?: string;
  cultural_fusion?: string;
  historical_period?: string;
  
  // Legacy/UI fields (mapped or with defaults)
  artist: string; // Mapped from user_id
  progress: number;
  lastModified: string; // Mapped from updated_at/created_at

  duration: string;
  metadata: TrackMetadata;
  tags: string[];
  writers: string[]; // Consider making this more structured, e.g., Writer[]
  lyrics: string;

  mixes?: Mix[];
  parentTrackId?: number;
  syncInfo?: SyncLicensingInfo;
  status?: {
    phase?:
      | "recording"
      | "post_production"
      | "quality_control"
      | "metadata_review"
      | "legal_review"
      | "distribution_ready"
      | "published";
    clearance?: {
      industries?: string[];
      restrictedCountries?: string[];
    };
    monetization?: boolean;
    public?: boolean;
    price?: number;
    approvals?: Array<{
      id: string;
      name: string;
      role: string;
      type: string;
      status: "approved" | "rejected" | "pending";
    }>;
    progress?: number;
  };
  rights?: {
    writers?: Array<{
      name: string;
      role: string;
      share: number;
    }>;
    publishers?: Array<{
      name: string;
      share: number;
      territories?: string[];
    }>;
    masterOwners?: Array<{
      name: string;
      share: number;
      territories?: string[];
    }>;
  };
}

export interface TrackMetadata {
  isrc?: string;
  iswc?: string;
  upc?: string;
  releaseDate?: string;
  publisher?: string;
  copyright?: string;
  producer?: string;
  mixer?: string;
  masteringEngineer?: string;
  recordingLocation?: string;
  recordingDate?: string;
  language?: string;
  explicit?: boolean;
  territories?: string[];
  masterRightsOwner?: string;
}

export interface SyncLicensingInfo {
  mood: string[];
  instruments: string[];
  tempo: string;
  energy: "low" | "medium" | "high";
  vocals: "none" | "male" | "female" | "both";
  explicit: boolean;
  genres: string[];
  subgenres: string[];
  similar: string[];
  themes: string[];
  clearance: {
    masterRights: string;
    publishingRights: string;
    territorialRestrictions: string[];
    preClearedFor: string[];
    restrictions: string[];
  };
  pricing: Array<{
    name: string;
    usage: string[];
    price: number;
    term: string;
    territories: string[];
    minimumGuarantee?: number;
    rushFee?: number;
    customizationFee?: number;
  }>;
}
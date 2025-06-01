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
  id: string;          // <--- CRITICAL: MUST be string for UUID
  title: string;
  artist: string;
  audio_url: string;   // <--- ADD THIS LINE
  is_published: boolean; // <--- ADD THIS LINE
  created_at: string;  // <--- ADD THIS LINE
  genre: string;
  key: string;
  bpm: number;
  duration: string;
  metadata: TrackMetadata;
  tags: string[];
  writers: string[];
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
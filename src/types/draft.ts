import { Mix } from "./mix";

export type LicenseTier = 'instant' | 'standard' | 'bespoke';

export interface Draft {
  // Core Identifiers
  id: string; // UUID from Supabase
  user_id: string; // UUID of the user who owns the draft
  
  // Core Metadata & Audio
  title: string;
  artist?: string; // Can be derived from user profile
  audio_url: string;
  cover_art_url?: string;
  
  // Detailed Metadata (combines both versions)
  metadata: {
    title?: string;
    artist?: string;
    duration?: string;
    // Gemini & your fields
    bpm?: number;
    key?: string;
    genre?: string[];
    subgenre?: string;
    moods?: string[];
    instruments?: string[];
    vocal_type?: 'male' | 'female' | 'instrumental' | 'duet' | 'spoken-word-sample';
    explicit_content?: boolean;
    description?: string;
    emotional_arc?: string;
    language?: string;
    harmony?: string;
    chord_progression?: string;
    lyrical_theme?: string;
    cultural_fusion?: string;
    historical_period?: string;
  };

  // Rights Management (from friend)
  rights?: {
    writers: Array<{ name: string; role?: string; share?: number; }>;
    publishers: Array<{ name: string; share?: number; }>;
    masterOwners: Array<{ name: string; share?: number; }>;
  };

  // Lyrics (from friend)
  lyrics?: {
    content: string;
    language?: string;
    hasTranslations?: boolean;
  };
  
  // Tags (from friend)
  tags?: string[];

  // Status & Publishing (combines both)
  status: {
    phase: 'draft' | 'review' | 'published';
    clearance: boolean;
    monetization: boolean;
    public: boolean;
    flags: string[];
  };
  is_published: boolean; // From your version, can be synced with status.public
  analysis_status?: 'pending' | 'processing' | 'complete' | 'error';
  error_message?: string;

  // Mixes & Licensing (from friend)
  mixes?: Mix[];
  licensing?: {
    tier: LicenseTier;
    isExclusive: boolean;
    territories: string[];
    usageTypes: string[];
    restrictions: string;
    customPrice: number | null;
    requiresLicense: boolean;
  };
  
  // Timestamps & UI State
  created_at: string;
  updated_at?: string;
  lastModified: string; // Should be updated_at from your version
  progress: number; // Represents metadata completion, from your version
}

export type Writer = {
  name: string;
  role: string;
  share: number;
  email?: string;
};
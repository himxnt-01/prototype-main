import { Mix } from "./mix";

export type LicenseTier = 'instant' | 'standard' | 'bespoke';

export interface Draft {
  id: string;
  title: string;
  artist: string;
  metadata: {
    title?: string;
    artist?: string;
    genre?: string;
    bpm?: number;
    key?: string;
    duration?: string;
  };
  rights?: {
    writers: Array<{
      name: string;
      role?: string;
      share?: number;
    }>;
    publishers: Array<{
      name: string;
      share?: number;
    }>;
    masterOwners: Array<{
      name: string;
      share?: number;
    }>;
  };
  lyrics?: {
    content: string;
    language?: string;
    hasTranslations?: boolean;
  };
  tags?: string[];
  status: {
    phase: 'draft' | 'review' | 'published';
    clearance: boolean;
    monetization: boolean;
    public: boolean;
    flags: string[];
  };
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
  lastModified: string;
  created_at?: string;
}

export type Writer = {
  name: string;
  role: string;
  share: number;
  email?: string;
};
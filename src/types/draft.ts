export interface Draft {
  id: number;
  title: string;
  artist: string;
  status: {
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
    flags?: {
      needsMetadata?: boolean;
      needsLyrics?: boolean;
      needsArtwork?: boolean;
      needsLegalReview?: boolean;
      hasConflicts?: boolean;
      isHighPriority?: boolean;
    };
  };
  metadata: {
    isrc?: string;
    iswc?: string;
    genre?: string;
    bpm?: number;
    key?: string;
    duration?: string;
    language?: string;
    explicit?: boolean;
    publisher?: string;
    masterRightsOwner?: string;
    territories?: string[];
    restrictions?: string[];
  };
  rights: {
    writers: Array<{
      name: string;
      role: string;
      share: number;
    }>;
    publishers: Array<{
      name: string;
      share: number;
      territories?: string[];
    }>;
    masterOwners: Array<{
      name: string;
      share: number;
      territories?: string[];
    }>;
  };
  lyrics?: {
    content: string;
    language: string;
    explicit: boolean;
  };
  progress: number;
  lastModified: string;
  uploadDate: string;
  dueDate?: string;
  tags?: string[];
  verifiedTags?: string[];
  mixes?: Array<{
    id: number;
    title: string;
    type: string;
    duration: string;
    metadata: {
      mixer: string;
      date: string;
      notes?: string;
    };
  }>;
}

export type Writer = {
  name: string;
  role: string;
  share: number;
  email?: string;
};
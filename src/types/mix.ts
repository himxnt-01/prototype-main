export interface Mix {
  id: number;
  title: string;
  type: MixType;
  duration: string;
  metadata: MixMetadata;
  stems?: StemInfo[];
  technicalNotes?: string;
  approvalStatus: "pending" | "approved" | "rejected";
  version: string;
}

export type MixType = 
  | "radio_edit"
  | "extended"
  | "instrumental"
  | "acapella"
  | "remix"
  | "acoustic"
  | "live"
  | "clean"
  | "tv_edit"
  | "film_score"
  | "trailer";

interface MixMetadata {
  mixer: string;
  date: string;
  notes?: string;
  isrc?: string;
  bpm?: number;
  key?: string;
  duration: string;
  mixingEngineer?: string;
  studio?: string;
  equipment?: string[];
}

interface StemInfo {
  name: string;
  type: "vocals" | "drums" | "bass" | "guitars" | "synths" | "effects" | "other";
  format: string;
  duration: string;
  notes?: string;
}
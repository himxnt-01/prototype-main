export interface SyncRequest {
  id: number;
  title: string;
  client: Client;
  type: string;
  status: string;
  urgent: boolean;
  budget: Budget;
  brief: Brief;
  usage: Usage;
  deadline: Deadline;
  requirements: Requirements;
}

export interface Client {
  name: string;
  company: string;
  avatar: string;
  verified: boolean;
}

export interface Budget {
  amount: number;
  type: string;
  currency: string;
  negotiable: boolean;
  episodes?: number;
  includes_stems?: boolean;
  usage_includes?: string[];
}

export interface Brief {
  description: string;
  mood: string[];
  style: string[];
  reference_tracks?: string[];
  similar_projects?: string[];
  target_audience?: string;
}

export interface Usage {
  primary: string;
  secondary: string[];
  territory: string;
  duration: string;
  exclusivity: string;
}

export interface Deadline {
  submission: string;
  usage_start: string;
  fast_tracked: boolean;
}

export interface Requirements {
  stems: boolean;
  formats: string[];
  delivery: string;
  custom_edits?: boolean;
  loop_points?: boolean;
  variations?: string[];
}
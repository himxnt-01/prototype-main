export interface ProjectData {
  title: string;
  description: string;
  dueDate: string;
  team: TeamMember[];
  deliverables: Deliverable[];
  milestones: Milestone[];
  syncDetails: SyncDetails;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface Deliverable {
  id: number;
  type: string;
  dueDate: string;
  description?: string;
}

export interface Milestone {
  id: number;
  title: string;
  dueDate: string;
  description?: string;
}

export interface SyncDetails {
  genre: string;
  mood: string[];
  tempo: string;
  key: string;
  duration: string;
  stems: boolean;
  customEdits: boolean;
  loopPoints: boolean;
}

export type ProjectRole = 
  | "Project Manager"
  | "Music Producer"
  | "Composer"
  | "Sound Designer"
  | "Mix Engineer"
  | "Mastering Engineer"
  | "Music Supervisor"
  | "Legal/Licensing"
  | "Client";
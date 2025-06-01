import { create } from 'zustand';
import { Track } from '@/types/track';

export type ProjectStatus = 'active' | 'completed' | 'archived';
export type ProjectType = 'album' | 'ep' | 'single' | 'sync' | 'collaboration';

export interface Project {
  id: number;
  title: string;
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  dueDate?: string;
  progress: number;
  collaborators: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
  }>;
  tracks: Track[];
  tasks: Array<{
    id: number;
    title: string;
    completed: boolean;
    assignee?: number;
    dueDate?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsState {
  projects: Project[];
  selectedProjectId: number | null;
  isDetailsOpen: boolean;
  isSelectionMode: boolean;
  selectedProjectIds: Set<number>;
  setProjects: (projects: Project[]) => void;
  selectProject: (id: number) => void;
  closeDetails: () => void;
  toggleSelectionMode: () => void;
  toggleProjectSelection: (id: number) => void;
  selectAllProjects: () => void;
  clearSelection: () => void;
  createProject: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  updateProject: (id: number, data: Partial<Project>) => void;
  deleteProject: (id: number) => void;
}

// Mock data
const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Summer Album 2024",
    description: "Collaborative album project with various artists",
    type: "album",
    status: "active",
    dueDate: "2024-06-01",
    progress: 45,
    collaborators: [
      {
        id: 1,
        name: "Sarah Chen",
        email: "sarah@example.com",
        role: "Producer",
        avatarUrl: "https://ui-avatars.com/api/?name=Sarah+Chen"
      },
      {
        id: 2,
        name: "Mike Thompson",
        email: "mike@example.com",
        role: "Engineer",
        avatarUrl: "https://ui-avatars.com/api/?name=Mike+Thompson"
      }
    ],
    tracks: [],
    tasks: [
      {
        id: 1,
        title: "Complete vocal recordings",
        completed: false,
        assignee: 1,
        dueDate: "2024-04-15"
      },
      {
        id: 2,
        title: "Mix first three tracks",
        completed: true,
        assignee: 2,
        dueDate: "2024-04-01"
      }
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z"
  },
  {
    id: 2,
    title: "TV Commercial Sync",
    description: "Music for upcoming TV commercial campaign",
    type: "sync",
    status: "active",
    dueDate: "2024-04-30",
    progress: 75,
    collaborators: [
      {
        id: 3,
        name: "Lisa Davis",
        email: "lisa@example.com",
        role: "Music Supervisor",
        avatarUrl: "https://ui-avatars.com/api/?name=Lisa+Davis"
      }
    ],
    tracks: [],
    tasks: [
      {
        id: 3,
        title: "Create 30-second edit",
        completed: true,
        assignee: 3,
        dueDate: "2024-04-10"
      }
    ],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-03-10T00:00:00Z"
  }
];

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: MOCK_PROJECTS,
  selectedProjectId: null,
  isDetailsOpen: false,
  isSelectionMode: false,
  selectedProjectIds: new Set(),

  setProjects: (projects) => set({ projects }),

  selectProject: (id) => set({ 
    selectedProjectId: id, 
    isDetailsOpen: true 
  }),

  closeDetails: () => set({ isDetailsOpen: false }),

  toggleSelectionMode: () => set((state) => ({ 
    isSelectionMode: !state.isSelectionMode,
    selectedProjectIds: new Set()
  })),

  toggleProjectSelection: (id) => set((state) => {
    const newSelection = new Set(state.selectedProjectIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    return { selectedProjectIds: newSelection };
  }),

  selectAllProjects: () => set((state) => ({
    selectedProjectIds: new Set(state.projects.map(p => p.id))
  })),

  clearSelection: () => set({ selectedProjectIds: new Set() }),

  createProject: (data) => set((state) => {
    const newProject = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return { projects: [...state.projects, newProject] };
  }),

  updateProject: (id, data) => set((state) => ({
    projects: state.projects.map(project =>
      project.id === id
        ? { 
            ...project, 
            ...data,
            updatedAt: new Date().toISOString()
          }
        : project
    )
  })),

  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter(project => project.id !== id)
  }))
}));
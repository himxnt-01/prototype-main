import { create } from 'zustand';
import { Track } from '@/types/track';
import { Playlist } from '@/lib/playlists';
import { Album } from '@/lib/albums';

export type MessageType = 'sync_request' | 'file_share' | 'message' | 'contact_request';

export interface Contact {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  company?: string;
  isVerified?: boolean;
}

export interface Message {
  id: number;
  type: MessageType;
  sender: Contact;
  recipients: Contact[];
  subject: string;
  content: string;
  attachments?: Array<{
    id: number;
    type: 'track' | 'playlist' | 'album' | 'document';
    name: string;
    data: Track | Playlist | Album | { url: string; type: string };
  }>;
  createdAt: string;
  readAt?: string;
  isStarred?: boolean;
  isArchived?: boolean;
  syncRequest?: {
    mediaType: string;
    deadline?: string;
    budget?: string;
    requirements?: string;
    status: 'pending' | 'accepted' | 'rejected' | 'completed';
  };
}

interface InboxState {
  messages: Message[];
  contacts: Contact[];
  selectedMessageId: number | null;
  isDetailsOpen: boolean;
  filters: {
    type?: MessageType;
    read?: boolean;
    starred?: boolean;
    archived?: boolean;
  };
  search: string;
  setMessages: (messages: Message[]) => void;
  setContacts: (contacts: Contact[]) => void;
  selectMessage: (id: number) => void;
  closeDetails: () => void;
  markAsRead: (id: number) => void;
  toggleStarred: (id: number) => void;
  toggleArchived: (id: number) => void;
  setFilters: (filters: InboxState['filters']) => void;
  setSearch: (query: string) => void;
  sendMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
  addContact: (contact: Omit<Contact, 'id'>) => void;
}

// Mock data
const MOCK_CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Music Producer",
    company: "Neon Records",
    isVerified: true
  },
  {
    id: 2,
    name: "Mike Thompson",
    email: "mike@example.com",
    role: "Sync Manager",
    company: "Film Studios Inc.",
    isVerified: true
  }
];

const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    type: 'sync_request',
    sender: MOCK_CONTACTS[1],
    recipients: [MOCK_CONTACTS[0]],
    subject: "Music License Request for Upcoming Film",
    content: "Hi, we're interested in licensing your track 'Midnight Rain' for our upcoming film...",
    createdAt: new Date().toISOString(),
    syncRequest: {
      mediaType: "Feature Film",
      deadline: "2024-06-01",
      budget: "$5000",
      requirements: "Need full rights for worldwide distribution",
      status: "pending"
    }
  },
  {
    id: 2,
    type: 'file_share',
    sender: MOCK_CONTACTS[0],
    recipients: [MOCK_CONTACTS[1]],
    subject: "New Track Demo",
    content: "Here's the latest version of the track we discussed...",
    attachments: [
      {
        id: 1,
        type: 'track',
        name: 'demo_v2.wav',
        data: {
          id: 1,
          title: "Demo Track",
          artist: "Sarah Chen",
          genre: "Electronic",
          key: "Am",
          bpm: 128,
          duration: "3:45"
        }
      }
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    readAt: new Date().toISOString()
  }
];

export const useInboxStore = create<InboxState>((set, get) => ({
  messages: MOCK_MESSAGES,
  contacts: MOCK_CONTACTS,
  selectedMessageId: null,
  isDetailsOpen: false,
  filters: {},
  search: "",

  setMessages: (messages) => set({ messages }),
  setContacts: (contacts) => set({ contacts }),

  selectMessage: (id) => set({ 
    selectedMessageId: id, 
    isDetailsOpen: true 
  }),

  closeDetails: () => set({ isDetailsOpen: false }),

  markAsRead: (id) => set((state) => ({
    messages: state.messages.map(msg =>
      msg.id === id
        ? { ...msg, readAt: new Date().toISOString() }
        : msg
    )
  })),

  toggleStarred: (id) => set((state) => ({
    messages: state.messages.map(msg =>
      msg.id === id
        ? { ...msg, isStarred: !msg.isStarred }
        : msg
    )
  })),

  toggleArchived: (id) => set((state) => ({
    messages: state.messages.map(msg =>
      msg.id === id
        ? { ...msg, isArchived: !msg.isArchived }
        : msg
    )
  })),

  setFilters: (filters) => set({ filters }),

  setSearch: (search) => set({ search }),

  sendMessage: (message) => set((state) => ({
    messages: [
      {
        ...message,
        id: Date.now(),
        createdAt: new Date().toISOString()
      },
      ...state.messages
    ]
  })),

  addContact: (contact) => set((state) => ({
    contacts: [
      {
        ...contact,
        id: Date.now()
      },
      ...state.contacts
    ]
  }))
}));

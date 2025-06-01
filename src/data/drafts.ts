import { Draft } from "@/types/draft";

export const drafts: Draft[] = [
  {
    id: 1,
    title: "Midnight Rain",
    artist: "Sarah Chen",
    status: {
      phase: "post_production",
      clearance: "pending_submission",
      monetization: false,
      public: false,
      flags: {
        needsMetadata: true,
        isHighPriority: true
      }
    },
    metadata: {
      genre: "Electronic",
      bpm: 128,
      key: "Am",
      duration: "4:15",
      language: "English",
      explicit: false,
      publisher: "Indie Publishing Co.",
      masterRightsOwner: "Sarah Chen Music",
      territories: ["Worldwide"]
    },
    rights: {
      writers: [
        { name: "Sarah Chen", role: "Composer/Lyricist", share: 100 }
      ],
      publishers: [
        { name: "Indie Publishing Co.", share: 100 }
      ],
      masterOwners: [
        { name: "Sarah Chen Music", share: 100 }
      ]
    },
    progress: 75,
    lastModified: "2024-03-12T15:30:00Z",
    uploadDate: "2024-03-10T09:00:00Z",
    dueDate: "2024-03-20T00:00:00Z"
  },
  {
    id: 2,
    title: "Urban Echoes",
    artist: "The Night Collective",
    status: {
      phase: "legal_review",
      clearance: "under_review",
      monetization: true,
      public: false,
      flags: {
        needsLegalReview: true,
        hasConflicts: true
      }
    },
    metadata: {
      isrc: "USRC72400123",
      genre: "Alternative",
      bpm: 95,
      key: "Em",
      duration: "5:30",
      language: "English",
      explicit: false,
      publisher: "Echo Publishing",
      masterRightsOwner: "Night Collective LLC",
      territories: ["North America", "Europe"]
    },
    rights: {
      writers: [
        { name: "John Night", role: "Composer", share: 50 },
        { name: "Maria Echo", role: "Lyricist", share: 50 }
      ],
      publishers: [
        { name: "Echo Publishing", share: 100 }
      ],
      masterOwners: [
        { name: "Night Collective LLC", share: 100 }
      ]
    },
    progress: 90,
    lastModified: "2024-03-11T18:45:00Z",
    uploadDate: "2024-03-05T14:20:00Z",
    dueDate: "2024-03-18T00:00:00Z"
  },
  {
    id: 3,
    title: "Desert Wind",
    artist: "Maya Sands",
    status: {
      phase: "recording",
      clearance: "not_started",
      monetization: false,
      public: false,
      flags: {
        isHighPriority: true
      }
    },
    metadata: {
      genre: "World",
      bpm: 85,
      key: "Dm",
      duration: "6:00",
      language: "Arabic",
      explicit: false,
      publisher: "World Beats Publishing",
      masterRightsOwner: "Maya Sands Music",
      territories: ["Worldwide"]
    },
    rights: {
      writers: [
        { name: "Maya Sands", role: "Composer/Lyricist", share: 100 }
      ],
      publishers: [
        { name: "World Beats Publishing", share: 100 }
      ],
      masterOwners: [
        { name: "Maya Sands Music", share: 100 }
      ]
    },
    progress: 30,
    lastModified: "2024-03-15T10:15:00Z",
    uploadDate: "2024-03-15T09:00:00Z",
    dueDate: "2024-04-01T00:00:00Z"
  }
];
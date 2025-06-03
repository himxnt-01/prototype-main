import { Draft } from "@/types/draft";

export const drafts: Draft[] = [
  {
    id: "1",
    title: "Summer Breeze",
    artist: "John Smith",
    metadata: {
      title: "Summer Breeze",
      artist: "John Smith",
      genre: "Pop",
      bpm: 120,
      key: "Am",
      duration: "3:45"
    },
    rights: {
      writers: [
        { name: "John Smith", role: "Composer", share: 60 },
        { name: "Jane Doe", role: "Lyricist", share: 40 }
      ],
      publishers: [
        { name: "Music Publishing Co", share: 100 }
      ],
      masterOwners: [
        { name: "Record Label Inc", share: 100 }
      ]
    },
    lyrics: {
      content: "Verse 1...",
      language: "English",
      hasTranslations: false
    },
    tags: ["summer", "pop", "upbeat"],
    status: {
      phase: "draft",
      clearance: true,
      monetization: true,
      public: false,
      flags: []
    },
    licensing: {
      tier: "premium",
      isExclusive: false,
      territories: ["Worldwide"],
      usageTypes: ["Commercial", "Streaming", "Social Media"],
      restrictions: "No adult content",
      customPrice: null,
      requiresLicense: true
    },
    lastModified: new Date().toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Midnight Jazz",
    artist: "Sarah Williams",
    metadata: {
      title: "Midnight Jazz",
      artist: "Sarah Williams",
      genre: "Jazz",
      bpm: 90,
      key: "Dm",
      duration: "4:30"
    },
    rights: {
      writers: [
        { name: "Sarah Williams", role: "Composer", share: 100 }
      ],
      publishers: [],
      masterOwners: [
        { name: "Independent", share: 100 }
      ]
    },
    lyrics: {
      content: "",
      language: "English",
      hasTranslations: false
    },
    tags: ["jazz", "instrumental", "night"],
    status: {
      phase: "draft",
      clearance: false,
      monetization: true,
      public: false,
      flags: ["needs_metadata"]
    },
    licensing: {
      tier: "basic",
      isExclusive: false,
      territories: ["Worldwide"],
      usageTypes: ["Streaming"],
      restrictions: "",
      customPrice: null,
      requiresLicense: true
    },
    lastModified: new Date().toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Electric Dreams",
    artist: "The Synthwave Collective",
    metadata: {
      title: "Electric Dreams",
      artist: "The Synthwave Collective",
      genre: "Electronic",
      bpm: 128,
      key: "F#m",
      duration: "5:15"
    },
    rights: {
      writers: [
        { name: "Alex Chen", role: "Producer", share: 50 },
        { name: "Mike Johnson", role: "Composer", share: 50 }
      ],
      publishers: [
        { name: "Electronic Music Publishing", share: 100 }
      ],
      masterOwners: [
        { name: "Synth Records", share: 100 }
      ]
    },
    lyrics: {
      content: "Verse 1...",
      language: "English",
      hasTranslations: false
    },
    tags: ["electronic", "synthwave", "retro"],
    status: {
      phase: "review",
      clearance: true,
      monetization: true,
      public: false,
      flags: []
    },
    licensing: {
      tier: "exclusive",
      isExclusive: true,
      territories: ["Worldwide"],
      usageTypes: ["Commercial", "Broadcast", "Film/TV", "Games"],
      restrictions: "Exclusive worldwide rights",
      customPrice: null,
      requiresLicense: true
    },
    lastModified: new Date().toISOString(),
    created_at: new Date().toISOString()
  }
];
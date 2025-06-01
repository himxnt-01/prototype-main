import { SyncRequest } from "../types";

export const REQUESTS: SyncRequest[] = [
  {
    id: 1,
    title: "Sports Documentary Series Music",
    client: {
      name: "Sarah Johnson",
      company: "Peak Productions",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson",
      verified: true
    },
    type: "Documentary",
    status: "Pending",
    urgent: true,
    budget: {
      amount: 15000,
      type: "per_episode",
      currency: "USD",
      negotiable: true,
      episodes: 6,
      includes_stems: true,
      usage_includes: ["Broadcast", "Streaming", "Social Media"]
    },
    brief: {
      description: "Looking for high-energy, inspirational tracks for a sports documentary series following Olympic athletes. Music should enhance emotional moments and training sequences.",
      mood: ["Inspirational", "Energetic", "Emotional", "Triumphant"],
      style: ["Orchestral", "Electronic", "Hybrid"],
      reference_tracks: ["Chariots of Fire", "Time by Hans Zimmer"],
      target_audience: "Sports Enthusiasts, 18-45"
    },
    usage: {
      primary: "Television Broadcast",
      secondary: ["Streaming", "Promotional", "Social Media"],
      territory: "Worldwide",
      duration: "2 Years",
      exclusivity: "Non-Exclusive"
    },
    deadline: {
      submission: "2024-04-15",
      usage_start: "2024-06-01",
      fast_tracked: true
    },
    requirements: {
      stems: true,
      formats: ["WAV", "MP3"],
      delivery: "Digital Download",
      custom_edits: true,
      variations: ["60s", "30s", "15s"]
    }
  },
  {
    id: 2,
    title: "Mobile Game Soundtrack",
    client: {
      name: "Mike Chen",
      company: "Pixel Games Studio",
      avatar: "https://ui-avatars.com/api/?name=Mike+Chen",
      verified: true
    },
    type: "Gaming",
    status: "Pending",
    urgent: false,
    budget: {
      amount: 8000,
      type: "flat_fee",
      currency: "USD",
      negotiable: true,
      includes_stems: true,
      usage_includes: ["In-Game", "Marketing"]
    },
    brief: {
      description: "Seeking a catchy, upbeat soundtrack for a casual mobile puzzle game. Music should be loop-friendly and not too intrusive.",
      mood: ["Playful", "Light", "Upbeat"],
      style: ["Electronic", "Pop", "Chiptune"],
      reference_tracks: ["Candy Crush Soundtrack", "Monument Valley OST"],
      target_audience: "Casual Gamers, All Ages"
    },
    usage: {
      primary: "Mobile Game",
      secondary: ["Marketing", "Trailers"],
      territory: "Worldwide",
      duration: "Perpetual",
      exclusivity: "Exclusive"
    },
    deadline: {
      submission: "2024-05-01",
      usage_start: "2024-07-01",
      fast_tracked: false
    },
    requirements: {
      stems: true,
      formats: ["WAV", "OGG"],
      delivery: "FTP",
      loop_points: true,
      variations: ["Full", "Loop"]
    }
  },
  {
    id: 3,
    title: "Luxury Car Commercial",
    client: {
      name: "Emma Thompson",
      company: "Creative Edge Agency",
      avatar: "https://ui-avatars.com/api/?name=Emma+Thompson",
      verified: true
    },
    type: "Advertising",
    status: "Pending",
    urgent: true,
    budget: {
      amount: 25000,
      type: "flat_fee",
      currency: "USD",
      negotiable: false,
      includes_stems: true,
      usage_includes: ["TV", "Web", "Cinema"]
    },
    brief: {
      description: "Need a sophisticated, modern track for a luxury electric vehicle launch. Should convey innovation, luxury, and environmental consciousness.",
      mood: ["Sophisticated", "Modern", "Innovative"],
      style: ["Electronic", "Ambient", "Minimalist"],
      reference_tracks: ["Previous campaign example provided"],
      target_audience: "Affluent Professionals, 35-60"
    },
    usage: {
      primary: "Television Commercial",
      secondary: ["Web", "Cinema", "Events"],
      territory: "Worldwide",
      duration: "1 Year",
      exclusivity: "Exclusive"
    },
    deadline: {
      submission: "2024-04-10",
      usage_start: "2024-05-01",
      fast_tracked: true
    },
    requirements: {
      stems: true,
      formats: ["WAV", "MP3"],
      delivery: "Digital Download",
      custom_edits: true,
      variations: ["60s", "30s", "15s", "6s"]
    }
  }
];
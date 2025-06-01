export interface Listing {
  id: number;
  title: string;
  artist: string;
  genre: string;
  price: number;
  coverUrl: string;
  description?: string;
  status?: 'active' | 'pending' | 'archived';
  metadata?: {
    duration?: string;
    bpm?: number;
    key?: string;
    isrc?: string;
    releaseDate?: string;
  };
  usageRights?: {
    territory: string;
    duration: string;
    formats: string[];
    restrictions: string[];
  };
}

export const LISTINGS: Listing[] = [
  {
    id: 1,
    title: "Summer Breeze",
    artist: "Sarah Chen",
    genre: "Electronic",
    price: 1500,
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    description: "Upbeat electronic track perfect for summer campaigns and lifestyle content.",
    status: 'active',
    metadata: {
      duration: "3:45",
      bpm: 128,
      key: "Am",
      isrc: "USRC17607839",
      releaseDate: "2024-03-15"
    },
    usageRights: {
      territory: "Worldwide",
      duration: "1 year",
      formats: ["Commercial", "Web", "Social Media"],
      restrictions: ["Political campaigns", "Adult content"]
    }
  },
  {
    id: 2,
    title: "Urban Echoes",
    artist: "The Night Collective",
    genre: "Alternative",
    price: 2000,
    coverUrl: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?w=400&h=400&fit=crop",
    description: "Atmospheric alternative track with cinematic elements.",
    status: 'active',
    metadata: {
      duration: "4:15",
      bpm: 95,
      key: "Em",
      isrc: "USRC17607840",
      releaseDate: "2024-02-20"
    },
    usageRights: {
      territory: "Worldwide",
      duration: "Perpetual",
      formats: ["Film", "TV", "Web"],
      restrictions: ["Political campaigns"]
    }
  },
  {
    id: 3,
    title: "Midnight Drive",
    artist: "Luna Ray",
    genre: "Synthwave",
    price: 1800,
    coverUrl: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=400&fit=crop",
    description: "Retro-inspired synthwave track with modern production.",
    status: 'active',
    metadata: {
      duration: "5:00",
      bpm: 110,
      key: "Cm",
      isrc: "USRC17607841",
      releaseDate: "2024-01-15"
    },
    usageRights: {
      territory: "Worldwide",
      duration: "2 years",
      formats: ["Gaming", "Web", "Advertising"],
      restrictions: ["Adult content"]
    }
  }
];

import { Track } from "@/types/track";

export const tracks: Track[] = [
  {
    id: 1,
    title: "In the Mist",
    artist: "Allen Core",
    genre: "Rock",
    key: "Cm",
    bpm: 120,
    duration: "3:15",
    metadata: {
      isrc: "USRC17607839",
      upc: "1234567890123",
      releaseDate: "2024-03-15",
      publisher: "Core Records",
      copyright: "© 2024 Core Records",
      producer: "Sarah Johnson",
      mixer: "Mike Thompson",
      masteringEngineer: "David Wilson",
      recordingLocation: "Sunset Studios, LA",
      recordingDate: "2023-12-10",
      language: "English",
      explicit: false,
      territories: ["Worldwide"]
    },
    tags: ["energetic", "guitar-driven", "atmospheric"],
    writers: ["Allen Core", "James Smith", "Lisa Davis"],
    lyrics: `Verse 1:
Walking through the shadows
In the morning light
Searching for a way back home
Through the endless night

Chorus:
In the mist, we're lost again
Finding paths unknown
In the mist, we'll make our way
Till we find our way back home`,
    syncInfo: {
      mood: ["atmospheric", "melancholic", "hopeful"],
      instruments: ["electric guitar", "drums", "bass", "synthesizer"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["Rock", "Alternative Rock"],
      subgenres: ["Indie Rock", "Atmospheric Rock"],
      similar: ["Coldplay", "Snow Patrol", "Keane"],
      themes: ["journey", "hope", "searching", "redemption"],
      clearance: {
        masterRights: "Core Records",
        publishingRights: "Core Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Trailers", "TV", "Web", "Film"],
        restrictions: ["Political campaigns", "Adult content"]
      },
      pricing: [
        {
          name: "Web Standard",
          usage: ["Web Video", "Social Media"],
          price: 500,
          term: "1 year",
          territories: ["Worldwide"]
        },
        {
          name: "Broadcast Standard",
          usage: ["TV Show", "Film"],
          price: 2500,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    },
    mixes: [
      {
        id: 101,
        title: "In the Mist (Radio Edit)",
        type: "radio_edit",
        duration: "3:00",
        metadata: {
          mixer: "Mike Thompson",
          date: "2024-01-15",
          isrc: "USRC17607840",
          notes: "Shortened intro, tightened arrangement"
        }
      },
      {
        id: 102,
        title: "In the Mist (Instrumental)",
        type: "instrumental",
        duration: "3:15",
        metadata: {
          mixer: "Mike Thompson",
          date: "2024-01-15",
          isrc: "USRC17607841",
          notes: "Full instrumental version"
        }
      }
    ],
    status: {
      phase: "published",
      clearance: {
        industries: ["movies", "tv", "commercials"],
        restrictedCountries: []
      },
      monetization: true,
      public: true,
      price: 5000,
      progress: 100,
      approvals: [
        { id: "1", name: "Allen Core", role: "Artist", type: "Writer", status: "approved" },
        { id: "2", name: "Core Records", role: "Publisher", type: "Publisher", status: "approved" }
      ]
    },
    rights: {
      writers: [
        { name: "Allen Core", role: "Composer/Lyricist", share: 60 },
        { name: "James Smith", role: "Composer", share: 20 },
        { name: "Lisa Davis", role: "Lyricist", share: 20 }
      ],
      publishers: [
        { name: "Core Publishing", share: 100, territories: ["Worldwide"] }
      ],
      masterOwners: [
        { name: "Core Records", share: 100, territories: ["Worldwide"] }
      ]
    }
  },
  {
    id: 2,
    title: "Electric Dreams",
    artist: "Sarah Chen",
    genre: "Electronic",
    key: "Am",
    bpm: 128,
    duration: "4:30",
    metadata: {
      isrc: "USRC17607842",
      upc: "1234567890124",
      releaseDate: "2024-02-20",
      publisher: "Neon Records",
      copyright: "© 2024 Neon Records",
      producer: "Sarah Chen",
      mixer: "Alex Rivera",
      masteringEngineer: "Maria Wong",
      recordingLocation: "Neon Studios, NYC",
      recordingDate: "2023-11-15",
      language: "English",
      explicit: false,
      territories: ["Worldwide"]
    },
    tags: ["electronic", "dreamy", "upbeat"],
    writers: ["Sarah Chen", "Alex Rivera"],
    lyrics: `Lost in electric dreams
Digital streams
Finding love in binary
In this virtual reality

Neon lights guide our way
Through the night into day
Pixels dance across the sky
As we learn to fly`,
    syncInfo: {
      mood: ["dreamy", "upbeat", "futuristic"],
      instruments: ["synthesizer", "drum machine", "vocoder"],
      tempo: "upbeat",
      energy: "high",
      vocals: "female",
      explicit: false,
      genres: ["Electronic", "Pop"],
      subgenres: ["Synthpop", "Future Pop"],
      similar: ["Grimes", "Chvrches", "The Midnight"],
      themes: ["future", "technology", "love", "dreams"],
      clearance: {
        masterRights: "Neon Records",
        publishingRights: "Neon Publishing",
        territorialRestrictions: [],
        preClearedFor: ["All Media"],
        restrictions: ["Political campaigns"]
      },
      pricing: [
        {
          name: "Digital Media",
          usage: ["Web", "Apps", "Games"],
          price: 800,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    },
    mixes: [
      {
        id: 201,
        title: "Electric Dreams (Extended Club Mix)",
        type: "extended",
        duration: "6:45",
        metadata: {
          mixer: "DJ Pulse",
          date: "2024-02-25",
          isrc: "USRC17607843",
          notes: "Extended dance floor version with new breaks"
        }
      },
      {
        id: 202,
        title: "Electric Dreams (Acapella)",
        type: "acapella",
        duration: "4:00",
        metadata: {
          mixer: "Alex Rivera",
          date: "2024-02-22",
          isrc: "USRC17607844",
          notes: "Vocals only with some spatial effects"
        }
      },
      {
        id: 203,
        title: "Electric Dreams (Synthwave Remix)",
        type: "remix",
        duration: "5:15",
        metadata: {
          mixer: "RetroWave",
          date: "2024-03-01",
          isrc: "USRC17607845",
          notes: "80s inspired synthwave remix"
        }
      }
    ],
    status: {
      phase: "published",
      clearance: {
        industries: ["all"],
        restrictedCountries: []
      },
      monetization: true,
      public: true,
      price: 8000,
      progress: 100,
      approvals: [
        { id: "1", name: "Sarah Chen", role: "Artist", type: "Writer", status: "approved" },
        { id: "2", name: "Neon Records", role: "Publisher", type: "Publisher", status: "approved" }
      ]
    },
    rights: {
      writers: [
        { name: "Sarah Chen", role: "Composer/Lyricist", share: 70 },
        { name: "Alex Rivera", role: "Producer", share: 30 }
      ],
      publishers: [
        { name: "Neon Publishing", share: 100, territories: ["Worldwide"] }
      ],
      masterOwners: [
        { name: "Neon Records", share: 100, territories: ["Worldwide"] }
      ]
    }
  },
  {
    id: 3,
    title: "Ocean Waves",
    artist: "Crystal Waters",
    genre: "Ambient",
    key: "Dm",
    bpm: 85,
    duration: "5:30",
    metadata: {
      isrc: "USRC17607846",
      upc: "1234567890125",
      releaseDate: "2024-01-10",
      publisher: "Ocean Sounds",
      copyright: "© 2024 Ocean Sounds",
      producer: "Crystal Waters",
      mixer: "James River",
      masteringEngineer: "Thomas Lake",
      recordingLocation: "Coastal Studios, CA",
      recordingDate: "2023-10-05",
      language: "English",
      explicit: false,
      territories: ["Worldwide"]
    },
    tags: ["ambient", "relaxing", "nature"],
    writers: ["Crystal Waters", "James River"],
    lyrics: `Waves crash upon the shore
Time stands still forevermore
In the rhythm of the sea
Find the peace inside of me

Ocean waves, carry me away
To a place where I can stay
Drifting on the endless blue
Finding myself anew`,
    syncInfo: {
      mood: ["relaxing", "peaceful", "contemplative"],
      instruments: ["synthesizer", "piano", "field recordings"],
      tempo: "slow",
      energy: "low",
      vocals: "female",
      explicit: false,
      genres: ["Ambient", "New Age"],
      subgenres: ["Nature Sounds", "Meditation Music"],
      similar: ["Brian Eno", "Enya", "Boards of Canada"],
      themes: ["nature", "peace", "introspection", "healing"],
      clearance: {
        masterRights: "Ocean Sounds",
        publishingRights: "Ocean Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Meditation Apps", "Wellness", "Documentary"],
        restrictions: ["Commercial Advertising"]
      },
      pricing: [
        {
          name: "Wellness Standard",
          usage: ["Meditation Apps", "Wellness Videos"],
          price: 600,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    },
    mixes: [
      {
        id: 301,
        title: "Ocean Waves (Extended Meditation Mix)",
        type: "extended",
        duration: "15:00",
        metadata: {
          mixer: "James River",
          date: "2024-01-20",
          isrc: "USRC17607847",
          notes: "Extended version for meditation and relaxation"
        }
      },
      {
        id: 302,
        title: "Ocean Waves (Nature Sounds Mix)",
        type: "remix",
        duration: "10:00",
        metadata: {
          mixer: "Thomas Lake",
          date: "2024-01-25",
          isrc: "USRC17607848",
          notes: "Version with enhanced nature sounds and minimal music"
        }
      }
    ],
    status: {
      phase: "published",
      clearance: {
        industries: ["tv"],
        restrictedCountries: ["China", "Russia"]
      },
      monetization: true,
      public: true,
      price: 6000,
      progress: 100,
      approvals: [
        { id: "1", name: "Crystal Waters", role: "Artist", type: "Writer", status: "approved" },
        { id: "2", name: "Ocean Sounds", role: "Publisher", type: "Publisher", status: "approved" }
      ]
    },
    rights: {
      writers: [
        { name: "Crystal Waters", role: "Composer/Lyricist", share: 80 },
        { name: "James River", role: "Producer", share: 20 }
      ],
      publishers: [
        { name: "Ocean Publishing", share: 100, territories: ["Worldwide"] }
      ],
      masterOwners: [
        { name: "Ocean Sounds", share: 100, territories: ["Worldwide"] }
      ]
    }
  },
  {
    id: 4,
    title: "Urban Symphony",
    artist: "Metro Collective",
    genre: "Hip Hop",
    key: "Gm",
    bpm: 95,
    duration: "3:45",
    metadata: {
      isrc: "USRC17607849",
      upc: "1234567890126",
      releaseDate: "2024-03-05",
      publisher: "Urban Beats",
      copyright: "© 2024 Urban Beats",
      producer: "DJ Metro",
      mixer: "Sound Master",
      masteringEngineer: "Beat Perfecter",
      recordingLocation: "Downtown Studios, NY",
      recordingDate: "2023-12-20",
      language: "English",
      explicit: true,
      territories: ["Worldwide"]
    },
    tags: ["hip hop", "urban", "rhythmic"],
    writers: ["Metro Collective", "DJ Metro", "MC Voice"],
    lyrics: `City streets alive with sound
Beats and rhymes all around
Urban life, day and night
Hustle hard, reach new heights

[Chorus]
Urban symphony, rhythm of the streets
Concrete jungle where dreams and reality meet
Urban symphony, listen to the beat
This is our story, no room for defeat`,
    syncInfo: {
      mood: ["energetic", "urban", "gritty"],
      instruments: ["drums", "bass", "samples", "turntables"],
      tempo: "moderate",
      energy: "high",
      vocals: "male",
      explicit: true,
      genres: ["Hip Hop", "Urban"],
      subgenres: ["East Coast", "Boom Bap"],
      similar: ["J. Cole", "Kendrick Lamar", "Joey Bada$$"],
      themes: ["city life", "struggle", "ambition", "culture"],
      clearance: {
        masterRights: "Urban Beats",
        publishingRights: "Urban Publishing",
        territorialRestrictions: [],
        preClearedFor: ["TV", "Film", "Web"],
        restrictions: ["Political campaigns", "Religious content"]
      },
      pricing: [
        {
          name: "Urban Media",
          usage: ["TV", "Film", "Web"],
          price: 1200,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    },
    mixes: [
      {
        id: 401,
        title: "Urban Symphony (Clean Edit)",
        type: "clean",
        duration: "3:45",
        metadata: {
          mixer: "Sound Master",
          date: "2024-03-10",
          isrc: "USRC17607850",
          notes: "Clean version with explicit content removed"
        }
      },
      {
        id: 402,
        title: "Urban Symphony (Instrumental)",
        type: "instrumental",
        duration: "3:45",
        metadata: {
          mixer: "Sound Master",
          date: "2024-03-10",
          isrc: "USRC17607851",
          notes: "Instrumental version"
        }
      }
    ],
    status: {
      phase: "distribution_ready",
      clearance: {
        industries: ["tv", "movies"],
        restrictedCountries: []
      },
      monetization: true,
      public: false,
      price: 12000,
      progress: 90,
      approvals: [
        { id: "1", name: "Metro Collective", role: "Artist", type: "Writer", status: "approved" },
        { id: "2", name: "Urban Beats", role: "Publisher", type: "Publisher", status: "pending" }
      ]
    },
    rights: {
      writers: [
        { name: "Metro Collective", role: "Composer", share: 50 },
        { name: "DJ Metro", role: "Producer", share: 30 },
        { name: "MC Voice", role: "Lyricist", share: 20 }
      ],
      publishers: [
        { name: "Urban Publishing", share: 100, territories: ["Worldwide"] }
      ],
      masterOwners: [
        { name: "Urban Beats", share: 100, territories: ["Worldwide"] }
      ]
    }
  },
  {
    id: 5,
    title: "Starlight Journey",
    artist: "Cosmic Dreamers",
    genre: "Ambient",
    key: "F#m",
    bpm: 70,
    duration: "6:15",
    metadata: {
      isrc: "USRC17607852",
      upc: "1234567890127",
      releaseDate: "2024-02-15",
      publisher: "Stellar Sounds",
      copyright: "© 2024 Stellar Sounds",
      producer: "Star Maker",
      mixer: "Galaxy Mix",
      masteringEngineer: "Cosmic Engineer",
      recordingLocation: "Nebula Studios, CO",
      recordingDate: "2023-11-10",
      language: "English",
      explicit: false,
      territories: ["Worldwide"]
    },
    tags: ["ambient", "space", "ethereal", "cinematic"],
    writers: ["Cosmic Dreamers", "Star Maker"],
    lyrics: `Drifting through the cosmos
Stars illuminate our path
Journeying through galaxies
Beyond the known and back

Starlight guides us onward
Through the void of space and time
Celestial bodies dancing
In a cosmic paradigm`,
    syncInfo: {
      mood: ["ethereal", "dreamy", "expansive"],
      instruments: ["synthesizer", "piano", "ambient textures", "pads"],
      tempo: "slow",
      energy: "low",
      vocals: "female",
      explicit: false,
      genres: ["Ambient", "Space Music"],
      subgenres: ["Cinematic Ambient", "Cosmic"],
      similar: ["Brian Eno", "Stars of the Lid", "Hammock"],
      themes: ["space", "journey", "exploration", "transcendence"],
      clearance: {
        masterRights: "Stellar Sounds",
        publishingRights: "Stellar Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "Documentary", "Space Programs"],
        restrictions: ["Commercial Advertising"]
      },
      pricing: [
        {
          name: "Cinematic License",
          usage: ["Film", "Documentary"],
          price: 1500,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    },
    mixes: [
      {
        id: 501,
        title: "Starlight Journey (Film Score Edit)",
        type: "film_score",
        duration: "4:30",
        metadata: {
          mixer: "Galaxy Mix",
          date: "2024-02-20",
          isrc: "USRC17607853",
          notes: "Edited version optimized for film scoring"
        }
      },
      {
        id: 502,
        title: "Starlight Journey (Extended Space Voyage)",
        type: "extended",
        duration: "12:00",
        metadata: {
          mixer: "Galaxy Mix",
          date: "2024-02-25",
          isrc: "USRC17607854",
          notes: "Extended version for meditation and deep listening"
        }
      }
    ],
    status: {
      phase: "quality_control",
      clearance: {
        industries: ["movies", "commercials"],
        restrictedCountries: ["North Korea"]
      },
      monetization: false,
      public: false,
      price: 15000,
      progress: 75,
      approvals: [
        { id: "1", name: "Cosmic Dreamers", role: "Artist", type: "Writer", status: "approved" },
        { id: "2", name: "Stellar Sounds", role: "Publisher", type: "Publisher", status: "pending" }
      ]
    },
    rights: {
      writers: [
        { name: "Cosmic Dreamers", role: "Composer/Lyricist", share: 70 },
        { name: "Star Maker", role: "Producer", share: 30 }
      ],
      publishers: [
        { name: "Stellar Publishing", share: 100, territories: ["Worldwide"] }
      ],
      masterOwners: [
        { name: "Stellar Sounds", share: 100, territories: ["Worldwide"] }
      ]
    }
  }
];
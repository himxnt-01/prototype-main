import { Track } from "@/types/track";

// Extended collection of tracks for the discover page
export const discoverTracks: Track[] = [
  {
    id: 101,
    title: "Midnight Echoes",
    artist: "Luna Ray",
    genre: "Electronic",
    key: "Am",
    bpm: 128,
    duration: "3:45",
    metadata: {
      isrc: "USRC17607839",
      language: "English",
      explicit: false
    },
    tags: ["atmospheric", "electronic", "night", "dreamy"],
    writers: ["Luna Ray", "Alex Morgan"],
    lyrics: "City lights reflecting in your eyes\nDigital dreams in neon skies\nWalking through the rain at midnight\nEverything feels so alive",
    syncInfo: {
      mood: ["atmospheric", "dreamy", "futuristic"],
      instruments: ["synthesizer", "drum machine", "vocoder"],
      tempo: "moderate",
      energy: "medium",
      vocals: "female",
      explicit: false,
      genres: ["Electronic", "Synthwave"],
      subgenres: ["Chillwave", "Synthpop"],
      similar: ["Grimes", "Purity Ring", "Chvrches"],
      themes: ["night", "city", "technology", "dreams"],
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
          price: 8000,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 102,
    title: "Ocean Breeze",
    artist: "Coastal Sounds",
    genre: "Ambient",
    key: "C Major",
    bpm: 75,
    duration: "5:20",
    metadata: {
      isrc: "USRC17607840",
      language: "Instrumental",
      explicit: false
    },
    tags: ["relaxing", "nature", "peaceful", "meditation"],
    writers: ["Maria Waters", "James River"],
    lyrics: "",
    syncInfo: {
      mood: ["peaceful", "relaxing", "contemplative"],
      instruments: ["piano", "strings", "nature sounds"],
      tempo: "slow",
      energy: "low",
      vocals: "none",
      explicit: false,
      genres: ["Ambient", "New Age"],
      subgenres: ["Nature Sounds", "Meditation Music"],
      similar: ["Brian Eno", "Enya", "Boards of Canada"],
      themes: ["nature", "ocean", "relaxation", "healing"],
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
          price: 6000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 103,
    title: "Urban Rhythm",
    artist: "Metro Beats",
    genre: "Hip Hop",
    key: "Gm",
    bpm: 95,
    duration: "3:30",
    metadata: {
      isrc: "USRC17607841",
      language: "English",
      explicit: true
    },
    tags: ["urban", "energetic", "rhythmic", "city"],
    writers: ["Marcus Johnson", "DJ Pulse"],
    lyrics: "City streets alive with sound\nBeats and rhymes all around\nUrban life, day and night\nHustle hard, reach new heights",
    syncInfo: {
      mood: ["energetic", "urban", "confident"],
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
          price: 12000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 104,
    title: "Mountain Sunrise",
    artist: "Nature's Symphony",
    genre: "Classical",
    key: "D Major",
    bpm: 85,
    duration: "4:45",
    metadata: {
      isrc: "USRC17607842",
      language: "Instrumental",
      explicit: false
    },
    tags: ["orchestral", "majestic", "nature", "uplifting"],
    writers: ["Elizabeth Chen", "Robert Mountain"],
    lyrics: "",
    syncInfo: {
      mood: ["majestic", "uplifting", "inspirational"],
      instruments: ["orchestra", "strings", "piano", "woodwinds"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Orchestral"],
      subgenres: ["Contemporary Classical", "Cinematic"],
      similar: ["Hans Zimmer", "Thomas Newman", "Max Richter"],
      themes: ["nature", "mountains", "dawn", "journey"],
      clearance: {
        masterRights: "Nature Sounds Inc",
        publishingRights: "Mountain Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Documentary", "Film", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Premium License",
          usage: ["Film", "TV", "Advertising"],
          price: 25000,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 105,
    title: "Desert Wind",
    artist: "Nomad Collective",
    genre: "World",
    key: "Em",
    bpm: 90,
    duration: "6:15",
    metadata: {
      isrc: "USRC17607843",
      language: "Arabic",
      explicit: false
    },
    tags: ["world", "ethnic", "desert", "spiritual"],
    writers: ["Amir Hassan", "Sofia Dunes"],
    lyrics: "Across the sands of time we roam\nUnder stars that guide us home\nAncient spirits in the wind\nTell the tales of where we've been",
    syncInfo: {
      mood: ["mystical", "spiritual", "exotic"],
      instruments: ["oud", "percussion", "flute", "strings"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["World", "Ethnic"],
      subgenres: ["Middle Eastern", "Desert Music"],
      similar: ["Dead Can Dance", "Niyaz", "Azam Ali"],
      themes: ["desert", "journey", "spirituality", "culture"],
      clearance: {
        masterRights: "Global Sounds",
        publishingRights: "Desert Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Documentary", "Film", "Cultural Programs"],
        restrictions: ["Commercial Advertising"]
      },
      pricing: [
        {
          name: "Cultural License",
          usage: ["Documentary", "Cultural Programs"],
          price: 18000,
          term: "5 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 106,
    title: "Electric Dreams",
    artist: "Neon Pulse",
    genre: "Electronic",
    key: "F#m",
    bpm: 130,
    duration: "4:10",
    metadata: {
      isrc: "USRC17607844",
      language: "English",
      explicit: false
    },
    tags: ["electronic", "upbeat", "futuristic", "dance"],
    writers: ["Alex Neon", "Samantha Pulse"],
    lyrics: "Electric dreams in digital streams\nVirtual reality beyond what it seems\nNeon lights guide our way\nInto the future, a brand new day",
    syncInfo: {
      mood: ["energetic", "futuristic", "optimistic"],
      instruments: ["synthesizer", "drum machine", "digital effects"],
      tempo: "fast",
      energy: "high",
      vocals: "female",
      explicit: false,
      genres: ["Electronic", "Dance"],
      subgenres: ["Electropop", "Future Bass"],
      similar: ["Porter Robinson", "Madeon", "Flume"],
      themes: ["future", "technology", "dreams", "digital world"],
      clearance: {
        masterRights: "Future Sounds",
        publishingRights: "Electric Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Games", "Technology Ads", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Tech License",
          usage: ["Games", "Apps", "Technology"],
          price: 15000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 107,
    title: "Rainy Day Jazz",
    artist: "Blue Note Quartet",
    genre: "Jazz",
    key: "Bb Major",
    bpm: 95,
    duration: "7:30",
    metadata: {
      isrc: "USRC17607845",
      language: "Instrumental",
      explicit: false
    },
    tags: ["jazz", "relaxing", "rainy", "smooth"],
    writers: ["Miles Thompson", "Ella Rivers"],
    lyrics: "",
    syncInfo: {
      mood: ["relaxed", "sophisticated", "melancholic"],
      instruments: ["piano", "saxophone", "double bass", "drums"],
      tempo: "moderate",
      energy: "low",
      vocals: "none",
      explicit: false,
      genres: ["Jazz", "Smooth Jazz"],
      subgenres: ["Cool Jazz", "Modal Jazz"],
      similar: ["Miles Davis", "John Coltrane", "Bill Evans"],
      themes: ["rain", "city", "reflection", "sophistication"],
      clearance: {
        masterRights: "Blue Note Records",
        publishingRights: "Jazz Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Luxury Brands"],
        restrictions: []
      },
      pricing: [
        {
          name: "Premium Jazz",
          usage: ["Film", "TV", "Luxury"],
          price: 22000,
          term: "3 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 108,
    title: "Country Roads",
    artist: "Southern Comfort",
    genre: "Country",
    key: "G Major",
    bpm: 100,
    duration: "3:55",
    metadata: {
      isrc: "USRC17607846",
      language: "English",
      explicit: false
    },
    tags: ["country", "folk", "americana", "road trip"],
    writers: ["John Southern", "Mary Comfort"],
    lyrics: "Down the winding country roads\nWhere the tall grass gently blows\nHeading back to where I'm from\nThe place I'll always call my home",
    syncInfo: {
      mood: ["nostalgic", "warm", "heartfelt"],
      instruments: ["acoustic guitar", "banjo", "fiddle", "harmonica"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["Country", "Americana"],
      subgenres: ["Folk Country", "Contemporary Country"],
      similar: ["Chris Stapleton", "Zac Brown Band", "Kacey Musgraves"],
      themes: ["home", "journey", "rural life", "nostalgia"],
      clearance: {
        masterRights: "Southern Records",
        publishingRights: "Country Publishing",
        territorialRestrictions: [],
        preClearedFor: ["TV", "Film", "Advertising"],
        restrictions: ["Political campaigns"]
      },
      pricing: [
        {
          name: "Americana License",
          usage: ["TV", "Film", "Commercials"],
          price: 16000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 109,
    title: "Rock Revolution",
    artist: "The Amplifiers",
    genre: "Rock",
    key: "E Major",
    bpm: 140,
    duration: "4:20",
    metadata: {
      isrc: "USRC17607847",
      language: "English",
      explicit: false
    },
    tags: ["rock", "energetic", "anthem", "powerful"],
    writers: ["Jack Amplifier", "Rose Guitar"],
    lyrics: "Stand up and raise your voice\nMake some noise, it's your choice\nThis is our revolution\nRock and roll solution",
    syncInfo: {
      mood: ["energetic", "rebellious", "powerful"],
      instruments: ["electric guitar", "drums", "bass", "vocals"],
      tempo: "fast",
      energy: "high",
      vocals: "male",
      explicit: false,
      genres: ["Rock", "Alternative Rock"],
      subgenres: ["Hard Rock", "Stadium Rock"],
      similar: ["Foo Fighters", "Kings of Leon", "The Killers"],
      themes: ["rebellion", "freedom", "power", "change"],
      clearance: {
        masterRights: "Rock Records",
        publishingRights: "Revolution Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Sports", "Action Films", "Trailers"],
        restrictions: ["Political campaigns"]
      },
      pricing: [
        {
          name: "Action License",
          usage: ["Sports", "Action Films", "Trailers"],
          price: 20000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 110,
    title: "Soul Reflection",
    artist: "Harmony Jones",
    genre: "R&B",
    key: "Dm",
    bpm: 85,
    duration: "4:50",
    metadata: {
      isrc: "USRC17607848",
      language: "English",
      explicit: false
    },
    tags: ["soul", "r&b", "emotional", "reflective"],
    writers: ["Harmony Jones", "Marcus Soul"],
    lyrics: "Looking in the mirror of my soul\nSeeking truth that makes me whole\nThrough the pain and through the joy\nFinding strength I can employ",
    syncInfo: {
      mood: ["emotional", "reflective", "soulful"],
      instruments: ["piano", "drums", "bass", "horns"],
      tempo: "moderate",
      energy: "medium",
      vocals: "female",
      explicit: false,
      genres: ["R&B", "Soul"],
      subgenres: ["Neo-Soul", "Contemporary R&B"],
      similar: ["Alicia Keys", "John Legend", "H.E.R."],
      themes: ["self-reflection", "growth", "emotion", "strength"],
      clearance: {
        masterRights: "Soul Records",
        publishingRights: "Harmony Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Emotional Content",
          usage: ["Drama", "Film", "TV"],
          price: 18000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 111,
    title: "Digital Horizon",
    artist: "Cyber Collective",
    genre: "Electronic",
    key: "Bm",
    bpm: 125,
    duration: "5:15",
    metadata: {
      isrc: "USRC17607849",
      language: "English",
      explicit: false
    },
    tags: ["electronic", "futuristic", "technological", "digital"],
    writers: ["Alex Digital", "Sarah Cyber"],
    lyrics: "Beyond the digital horizon\nWhere data flows like rivers\nBinary code and quantum dreams\nA new world to deliver",
    syncInfo: {
      mood: ["futuristic", "technological", "innovative"],
      instruments: ["synthesizer", "digital effects", "electronic drums"],
      tempo: "fast",
      energy: "high",
      vocals: "vocoder",
      explicit: false,
      genres: ["Electronic", "Techno"],
      subgenres: ["Tech House", "Future Techno"],
      similar: ["Daft Punk", "Justice", "Gesaffelstein"],
      themes: ["technology", "future", "digital world", "innovation"],
      clearance: {
        masterRights: "Digital Records",
        publishingRights: "Cyber Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Technology", "Science Fiction", "Gaming"],
        restrictions: []
      },
      pricing: [
        {
          name: "Tech License",
          usage: ["Technology", "Gaming", "Sci-Fi"],
          price: 17000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 112,
    title: "Acoustic Memories",
    artist: "Willow & Oak",
    genre: "Folk",
    key: "C Major",
    bpm: 75,
    duration: "3:40",
    metadata: {
      isrc: "USRC17607850",
      language: "English",
      explicit: false
    },
    tags: ["folk", "acoustic", "nostalgic", "warm"],
    writers: ["Emma Willow", "James Oak"],
    lyrics: "Memories like leaves in fall\nGently floating, one and all\nMoments captured in our minds\nLeaving footprints through time",
    syncInfo: {
      mood: ["nostalgic", "warm", "intimate"],
      instruments: ["acoustic guitar", "mandolin", "upright bass", "harmonica"],
      tempo: "slow",
      energy: "low",
      vocals: "male/female",
      explicit: false,
      genres: ["Folk", "Acoustic"],
      subgenres: ["Indie Folk", "Americana"],
      similar: ["The Lumineers", "Mumford & Sons", "First Aid Kit"],
      themes: ["memories", "nature", "relationships", "time"],
      clearance: {
        masterRights: "Acoustic Records",
        publishingRights: "Folk Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Documentaries", "Indie Films", "Commercials"],
        restrictions: []
      },
      pricing: [
        {
          name: "Indie License",
          usage: ["Indie Films", "Documentaries"],
          price: 12000,
          term: "3 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 113,
    title: "Neon City Nights",
    artist: "Retrowave",
    genre: "Electronic",
    key: "F#m",
    bpm: 110,
    duration: "4:30",
    metadata: {
      isrc: "USRC17607851",
      language: "English",
      explicit: false
    },
    tags: ["synthwave", "retro", "80s", "night"],
    writers: ["Victor Neon", "Synthia Wave"],
    lyrics: "Neon lights across the sky\nCruising through the night so high\nDigital dreams in analog schemes\nRetro future paradise gleams",
    syncInfo: {
      mood: ["nostalgic", "energetic", "night"],
      instruments: ["synthesizer", "drum machine", "electric bass"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["Electronic", "Synthwave"],
      subgenres: ["Retrowave", "Outrun"],
      similar: ["The Midnight", "FM-84", "Timecop1983"],
      themes: ["night", "city", "retro", "technology"],
      clearance: {
        masterRights: "Retrowave Records",
        publishingRights: "Neon Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Games", "Film", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Retro License",
          usage: ["Games", "Film", "Advertising"],
          price: 14000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 114,
    title: "Epic Journey",
    artist: "Orchestral Adventures",
    genre: "Classical",
    key: "D Minor",
    bpm: 95,
    duration: "6:20",
    metadata: {
      isrc: "USRC17607852",
      language: "Instrumental",
      explicit: false
    },
    tags: ["orchestral", "epic", "cinematic", "adventure"],
    writers: ["Maestro Williams", "Symphony Smith"],
    lyrics: "",
    syncInfo: {
      mood: ["epic", "adventurous", "dramatic"],
      instruments: ["full orchestra", "choir", "percussion", "brass"],
      tempo: "moderate",
      energy: "high",
      vocals: "choir",
      explicit: false,
      genres: ["Classical", "Cinematic"],
      subgenres: ["Film Score", "Epic Orchestral"],
      similar: ["Hans Zimmer", "John Williams", "Two Steps From Hell"],
      themes: ["adventure", "journey", "heroism", "discovery"],
      clearance: {
        masterRights: "Symphony Records",
        publishingRights: "Epic Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "Trailers", "Games"],
        restrictions: []
      },
      pricing: [
        {
          name: "Cinematic License",
          usage: ["Film", "Trailers", "Games"],
          price: 30000,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 115,
    title: "Tropical Paradise",
    artist: "Island Vibes",
    genre: "Pop",
    key: "A Major",
    bpm: 105,
    duration: "3:25",
    metadata: {
      isrc: "USRC17607853",
      language: "English",
      explicit: false
    },
    tags: ["tropical", "summer", "upbeat", "vacation"],
    writers: ["Sandy Beach", "Palm Tree"],
    lyrics: "White sand beaches and crystal blue seas\nSwaying palm trees in the tropical breeze\nParadise found, worries lost\nSummer vibes at any cost",
    syncInfo: {
      mood: ["happy", "upbeat", "carefree"],
      instruments: ["acoustic guitar", "tropical percussion", "ukulele", "steel drums"],
      tempo: "moderate",
      energy: "high",
      vocals: "male",
      explicit: false,
      genres: ["Pop", "Tropical"],
      subgenres: ["Tropical House", "Summer Pop"],
      similar: ["Kygo", "Calvin Harris", "Jack Johnson"],
      themes: ["summer", "beach", "vacation", "relaxation"],
      clearance: {
        masterRights: "Island Records",
        publishingRights: "Tropical Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Travel", "Resorts", "Summer Campaigns"],
        restrictions: []
      },
      pricing: [
        {
          name: "Summer License",
          usage: ["Travel", "Resorts", "Advertising"],
          price: 18000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 116,
    title: "Cosmic Voyage",
    artist: "Stellar Project",
    genre: "Ambient",
    key: "C Minor",
    bpm: 70,
    duration: "7:15",
    metadata: {
      isrc: "USRC17607854",
      language: "Instrumental",
      explicit: false
    },
    tags: ["space", "ambient", "cosmic", "ethereal"],
    writers: ["Nova Star", "Galactic Sound"],
    lyrics: "",
    syncInfo: {
      mood: ["ethereal", "mysterious", "vast"],
      instruments: ["synthesizer", "ambient pads", "processed sounds"],
      tempo: "slow",
      energy: "low",
      vocals: "none",
      explicit: false,
      genres: ["Ambient", "Space Music"],
      subgenres: ["Dark Ambient", "Cosmic"],
      similar: ["Brian Eno", "Stars of the Lid", "Carbon Based Lifeforms"],
      themes: ["space", "cosmos", "exploration", "infinity"],
      clearance: {
        masterRights: "Cosmic Records",
        publishingRights: "Stellar Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Science", "Space Programs", "Documentaries"],
        restrictions: []
      },
      pricing: [
        {
          name: "Space License",
          usage: ["Science", "Documentaries", "Educational"],
          price: 15000,
          term: "5 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  // Adding 35 more tracks as requested
  {
    id: 117,
    title: "Summer Breeze",
    artist: "The Luminaires",
    genre: "Indie Pop",
    key: "G Major",
    bpm: 125,
    duration: "3:28",
    metadata: {
      isrc: "USRC17607855",
      language: "English",
      explicit: false
    },
    tags: ["upbeat", "summer", "catchy", "indie"],
    writers: ["Emma Bright", "Thomas Light"],
    lyrics: "Summer breeze, feeling fine\nSunshine warming, hearts align\nDays are long, nights are sweet\nRhythm flows with summer heat",
    syncInfo: {
      mood: ["happy", "upbeat", "carefree"],
      instruments: ["acoustic guitar", "drums", "synth", "female vocals"],
      tempo: "upbeat",
      energy: "high",
      vocals: "female",
      explicit: false,
      genres: ["Indie Pop", "Pop"],
      subgenres: ["Summer Pop", "Indie Folk"],
      similar: ["Feist", "Ingrid Michaelson", "Sara Bareilles"],
      themes: ["summer", "happiness", "youth", "freedom"],
      clearance: {
        masterRights: "Indie Records",
        publishingRights: "Luminous Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Commercials", "Web", "TV"],
        restrictions: ["Political campaigns"]
      },
      pricing: [
        {
          name: "Commercial License",
          usage: ["Commercials", "Web", "TV"],
          price: 12000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 118,
    title: "Coastal Drive",
    artist: "Beach Day Surfers",
    genre: "Indie Pop",
    key: "C Major",
    bpm: 130,
    duration: "3:15",
    metadata: {
      isrc: "USRC17607856",
      language: "English",
      explicit: false
    },
    tags: ["coastal", "driving", "upbeat", "summer"],
    writers: ["Cody Wave", "Mia Sunshine"],
    lyrics: "Driving down the coastal road\nSalt air blowing, taking it slow\nOcean views for miles and miles\nThis moment worth all the trials",
    syncInfo: {
      mood: ["carefree", "joyful", "nostalgic"],
      instruments: ["electric guitar", "drums", "bass", "synth"],
      tempo: "upbeat",
      energy: "high",
      vocals: "male",
      explicit: false,
      genres: ["Indie Pop", "Surf Rock"],
      subgenres: ["Beach Pop", "Summer Indie"],
      similar: ["Vampire Weekend", "Best Coast", "Real Estate"],
      themes: ["beach", "driving", "summer", "freedom"],
      clearance: {
        masterRights: "Coastal Records",
        publishingRights: "Wave Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Travel", "Commercials", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Travel License",
          usage: ["Travel", "Commercials", "Web"],
          price: 14000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 119,
    title: "Neon Nights",
    artist: "Synthwave Collective",
    genre: "Electronic",
    key: "Fm",
    bpm: 115,
    duration: "4:22",
    metadata: {
      isrc: "USRC17607857",
      language: "English",
      explicit: false
    },
    tags: ["retro", "synthwave", "night", "electronic"],
    writers: ["Retro Wave", "Neon Lights"],
    lyrics: "Neon lights illuminate the night\nCruising through the city feeling right\nDigital dreams in analog form\nSynthwave beats to weather any storm",
    syncInfo: {
      mood: ["nostalgic", "cool", "night"],
      instruments: ["synthesizer", "drum machine", "bass synth"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["Electronic", "Synthwave"],
      subgenres: ["Retrowave", "Outrun"],
      similar: ["Kavinsky", "Com Truise", "Mitch Murder"],
      themes: ["night", "city", "retro", "technology"],
      clearance: {
        masterRights: "Synth Records",
        publishingRights: "Neon Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "Games", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Retro License",
          usage: ["Film", "Games", "Advertising"],
          price: 16000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 120,
    title: "Midnight Drive",
    artist: "Night Cruisers",
    genre: "Synthwave",
    key: "Cm",
    bpm: 110,
    duration: "5:05",
    metadata: {
      isrc: "USRC17607858",
      language: "English",
      explicit: false
    },
    tags: ["night", "driving", "retro", "electronic"],
    writers: ["Michael Knight", "Sarah Drive"],
    lyrics: "Midnight drive through empty streets\nCity lights and engine beats\nDestination: anywhere\nFreedom found in night air",
    syncInfo: {
      mood: ["atmospheric", "cool", "mysterious"],
      instruments: ["synthesizer", "electric guitar", "drum machine"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["Synthwave", "Electronic"],
      subgenres: ["Darkwave", "Outrun"],
      similar: ["Perturbator", "Carpenter Brut", "Miami Nights 1984"],
      themes: ["night", "driving", "city", "freedom"],
      clearance: {
        masterRights: "Night Records",
        publishingRights: "Cruise Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "Games", "TV"],
        restrictions: []
      },
      pricing: [
        {
          name: "Night Scene License",
          usage: ["Film", "Games", "TV"],
          price: 15000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 121,
    title: "Urban Jungle",
    artist: "City Beats",
    genre: "Hip Hop",
    key: "Dm",
    bpm: 90,
    duration: "3:45",
    metadata: {
      isrc: "USRC17607859",
      language: "English",
      explicit: true
    },
    tags: ["urban", "gritty", "city", "rhythmic"],
    writers: ["Marcus Street", "DJ Urban"],
    lyrics: "Concrete jungle where dreams are made\nCity lights never seem to fade\nHustle hard through the urban maze\nSurviving through the darkest days",
    syncInfo: {
      mood: ["gritty", "determined", "urban"],
      instruments: ["drums", "bass", "samples", "scratching"],
      tempo: "moderate",
      energy: "high",
      vocals: "male",
      explicit: true,
      genres: ["Hip Hop", "Urban"],
      subgenres: ["East Coast", "Underground"],
      similar: ["Nas", "Jay-Z", "Wu-Tang Clan"],
      themes: ["city life", "struggle", "perseverance", "urban culture"],
      clearance: {
        masterRights: "Street Records",
        publishingRights: "Urban Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Games"],
        restrictions: ["Political campaigns", "Children's content"]
      },
      pricing: [
        {
          name: "Urban Media License",
          usage: ["Film", "TV", "Games"],
          price: 18000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 122,
    title: "Ethereal Dreams",
    artist: "Ambient Collective",
    genre: "Ambient",
    key: "A Minor",
    bpm: 65,
    duration: "6:40",
    metadata: {
      isrc: "USRC17607860",
      language: "Instrumental",
      explicit: false
    },
    tags: ["ambient", "ethereal", "dreamy", "peaceful"],
    writers: ["Serene Mind", "Tranquil Soul"],
    lyrics: "",
    syncInfo: {
      mood: ["peaceful", "ethereal", "dreamy"],
      instruments: ["synthesizer", "piano", "processed sounds", "pads"],
      tempo: "slow",
      energy: "low",
      vocals: "none",
      explicit: false,
      genres: ["Ambient", "Electronic"],
      subgenres: ["Atmospheric", "Drone"],
      similar: ["Brian Eno", "Aphex Twin (ambient works)", "Stars of the Lid"],
      themes: ["dreams", "space", "meditation", "transcendence"],
      clearance: {
        masterRights: "Ambient Records",
        publishingRights: "Ethereal Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Meditation", "Film", "Art Installations"],
        restrictions: []
      },
      pricing: [
        {
          name: "Ambient License",
          usage: ["Meditation", "Film", "Art"],
          price: 10000,
          term: "3 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 123,
    title: "Mountain Echo",
    artist: "Alpine Sounds",
    genre: "Folk",
    key: "G Major",
    bpm: 80,
    duration: "4:15",
    metadata: {
      isrc: "USRC17607861",
      language: "English",
      explicit: false
    },
    tags: ["folk", "mountain", "acoustic", "nature"],
    writers: ["Robert Peak", "Anna Valley"],
    lyrics: "Mountain echo calls my name\nWilderness I can't tame\nPine trees reaching for the sky\nEagle soaring way up high",
    syncInfo: {
      mood: ["peaceful", "rustic", "natural"],
      instruments: ["acoustic guitar", "mandolin", "fiddle", "harmonica"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["Folk", "Americana"],
      subgenres: ["Mountain Folk", "Acoustic"],
      similar: ["Fleet Foxes", "Bon Iver", "Iron & Wine"],
      themes: ["nature", "mountains", "freedom", "solitude"],
      clearance: {
        masterRights: "Mountain Records",
        publishingRights: "Alpine Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Documentary", "Travel", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Nature License",
          usage: ["Documentary", "Travel", "Advertising"],
          price: 14000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 124,
    title: "Jazz Club",
    artist: "Midnight Quartet",
    genre: "Jazz",
    key: "Eb Major",
    bpm: 90,
    duration: "5:30",
    metadata: {
      isrc: "USRC17607862",
      language: "Instrumental",
      explicit: false
    },
    tags: ["jazz", "smoky", "nightclub", "sophisticated"],
    writers: ["Charlie Blue", "Ella Night"],
    lyrics: "",
    syncInfo: {
      mood: ["sophisticated", "intimate", "nocturnal"],
      instruments: ["piano", "double bass", "drums", "saxophone"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Jazz", "Lounge"],
      subgenres: ["Cool Jazz", "Bebop"],
      similar: ["Miles Davis", "Thelonious Monk", "John Coltrane"],
      themes: ["nightlife", "sophistication", "urban", "romance"],
      clearance: {
        masterRights: "Blue Note Records",
        publishingRights: "Jazz Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Luxury Brands"],
        restrictions: []
      },
      pricing: [
        {
          name: "Sophisticated License",
          usage: ["Film", "TV", "Luxury"],
          price: 20000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 125,
    title: "Digital Revolution",
    artist: "Tech Pioneers",
    genre: "Electronic",
    key: "A Minor",
    bpm: 128,
    duration: "4:45",
    metadata: {
      isrc: "USRC17607863",
      language: "English",
      explicit: false
    },
    tags: ["technology", "futuristic", "digital", "innovative"],
    writers: ["Binary Code", "Digital Native"],
    lyrics: "Digital revolution changing our world\nTechnology advancing, future unfurled\nConnected minds across the globe\nInnovation is our new mode",
    syncInfo: {
      mood: ["futuristic", "innovative", "dynamic"],
      instruments: ["synthesizer", "digital drums", "processed vocals", "glitch effects"],
      tempo: "fast",
      energy: "high",
      vocals: "vocoder",
      explicit: false,
      genres: ["Electronic", "Techno"],
      subgenres: ["Glitch", "IDM"],
      similar: ["Aphex Twin", "Autechre", "Squarepusher"],
      themes: ["technology", "future", "innovation", "digital world"],
      clearance: {
        masterRights: "Tech Records",
        publishingRights: "Digital Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Technology", "Science", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Tech Innovation License",
          usage: ["Technology", "Science", "Advertising"],
          price: 22000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 126,
    title: "Cinematic Horizon",
    artist: "Film Score Ensemble",
    genre: "Cinematic",
    key: "D Minor",
    bpm: 90,
    duration: "5:15",
    metadata: {
      isrc: "USRC17607864",
      language: "Instrumental",
      explicit: false
    },
    tags: ["cinematic", "orchestral", "epic", "emotional"],
    writers: ["Hans Composer", "John Score"],
    lyrics: "",
    syncInfo: {
      mood: ["epic", "emotional", "dramatic"],
      instruments: ["orchestra", "piano", "percussion", "brass"],
      tempo: "moderate",
      energy: "high",
      vocals: "choir",
      explicit: false,
      genres: ["Cinematic", "Orchestral"],
      subgenres: ["Film Score", "Trailer Music"],
      similar: ["Hans Zimmer", "Thomas Newman", "James Horner"],
      themes: ["journey", "triumph", "emotion", "adventure"],
      clearance: {
        masterRights: "Cinematic Records",
        publishingRights: "Score Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "Trailers", "TV"],
        restrictions: []
      },
      pricing: [
        {
          name: "Cinematic License",
          usage: ["Film", "Trailers", "TV"],
          price: 28000,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 127,
    title: "Corporate Innovation",
    artist: "Business Beats",
    genre: "Corporate",
    key: "C Major",
    bpm: 110,
    duration: "2:45",
    metadata: {
      isrc: "USRC17607865",
      language: "Instrumental",
      explicit: false
    },
    tags: ["corporate", "professional", "modern", "clean"],
    writers: ["Professional Sound", "Corporate Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["professional", "optimistic", "clean"],
      instruments: ["piano", "strings", "light percussion", "synth"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Corporate", "Ambient"],
      subgenres: ["Business", "Presentation"],
      similar: ["Corporate Audio", "Business Soundtracks"],
      themes: ["business", "innovation", "success", "growth"],
      clearance: {
        masterRights: "Business Records",
        publishingRights: "Corporate Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Corporate", "Advertising", "Presentations"],
        restrictions: []
      },
      pricing: [
        {
          name: "Corporate License",
          usage: ["Corporate", "Advertising", "Presentations"],
          price: 8000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 128,
    title: "Emotional Journey",
    artist: "Heart Strings",
    genre: "Cinematic",
    key: "G Minor",
    bpm: 75,
    duration: "4:30",
    metadata: {
      isrc: "USRC17607866",
      language: "Instrumental",
      explicit: false
    },
    tags: ["emotional", "cinematic", "strings", "journey"],
    writers: ["Emotional Composer", "String Arranger"],
    lyrics: "",
    syncInfo: {
      mood: ["emotional", "touching", "heartfelt"],
      instruments: ["strings", "piano", "soft percussion", "cello"],
      tempo: "slow",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Cinematic", "Classical"],
      subgenres: ["Emotional", "Dramatic"],
      similar: ["Thomas Newman", "Max Richter", "Olafur Arnalds"],
      themes: ["journey", "emotion", "transformation", "life"],
      clearance: {
        masterRights: "Emotional Records",
        publishingRights: "Heart Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Documentary"],
        restrictions: []
      },
      pricing: [
        {
          name: "Emotional License",
          usage: ["Film", "TV", "Documentary"],
          price: 18000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 129,
    title: "Upbeat Morning",
    artist: "Sunshine Band",
    genre: "Pop",
    key: "D Major",
    bpm: 120,
    duration: "3:10",
    metadata: {
      isrc: "USRC17607867",
      language: "English",
      explicit: false
    },
    tags: ["upbeat", "morning", "positive", "energetic"],
    writers: ["Happy Writer", "Morning Person"],
    lyrics: "Wake up to a brand new day\nLet the sunshine light your way\nPositive vibes, feeling great\nThis morning just can't wait",
    syncInfo: {
      mood: ["happy", "upbeat", "positive"],
      instruments: ["acoustic guitar", "piano", "drums", "claps"],
      tempo: "upbeat",
      energy: "high",
      vocals: "female",
      explicit: false,
      genres: ["Pop", "Folk Pop"],
      subgenres: ["Happy", "Morning"],
      similar: ["Jason Mraz", "Colbie Caillat", "Jack Johnson"],
      themes: ["morning", "happiness", "positivity", "new beginnings"],
      clearance: {
        masterRights: "Sunshine Records",
        publishingRights: "Morning Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Commercials", "TV", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Upbeat License",
          usage: ["Commercials", "TV", "Web"],
          price: 15000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 130,
    title: "Tech Startup",
    artist: "Innovation Sounds",
    genre: "Electronic",
    key: "B Major",
    bpm: 115,
    duration: "2:30",
    metadata: {
      isrc: "USRC17607868",
      language: "Instrumental",
      explicit: false
    },
    tags: ["technology", "startup", "innovative", "modern"],
    writers: ["Tech Composer", "Startup Sound"],
    lyrics: "",
    syncInfo: {
      mood: ["innovative", "modern", "optimistic"],
      instruments: ["synthesizer", "digital percussion", "electric piano"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Electronic", "Corporate"],
      subgenres: ["Tech", "Startup"],
      similar: ["Corporate Audio", "Tech Soundtracks"],
      themes: ["technology", "innovation", "startup", "future"],
      clearance: {
        masterRights: "Innovation Records",
        publishingRights: "Tech Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Technology", "Startup", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Tech Startup License",
          usage: ["Technology", "Startup", "Advertising"],
          price: 10000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 131,
    title: "Epic Trailer",
    artist: "Cinematic Impact",
    genre: "Cinematic",
    key: "C Minor",
    bpm: 100,
    duration: "2:15",
    metadata: {
      isrc: "USRC17607869",
      language: "Instrumental",
      explicit: false
    },
    tags: ["epic", "trailer", "cinematic", "powerful"],
    writers: ["Trailer Composer", "Epic Sound"],
    lyrics: "",
    syncInfo: {
      mood: ["epic", "powerful", "intense"],
      instruments: ["orchestra", "percussion", "brass", "choir"],
      tempo: "moderate",
      energy: "high",
      vocals: "choir",
      explicit: false,
      genres: ["Cinematic", "Trailer"],
      subgenres: ["Epic", "Action"],
      similar: ["Two Steps From Hell", "Audiomachine", "Really Slow Motion"],
      themes: ["epic", "battle", "triumph", "drama"],
      clearance: {
        masterRights: "Trailer Records",
        publishingRights: "Impact Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Trailers", "Film", "Games"],
        restrictions: []
      },
      pricing: [
        {
          name: "Trailer License",
          usage: ["Trailers", "Film", "Games"],
          price: 25000,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 132,
    title: "Romantic Evening",
    artist: "Love Notes",
    genre: "Jazz",
    key: "F Major",
    bpm: 85,
    duration: "4:20",
    metadata: {
      isrc: "USRC17607870",
      language: "English",
      explicit: false
    },
    tags: ["romantic", "evening", "jazz", "smooth"],
    writers: ["Romantic Writer", "Love Composer"],
    lyrics: "Candlelight and soft music play\nRomantic evening at the end of day\nHolding hands across the table\nThis moment feels like a fable",
    syncInfo: {
      mood: ["romantic", "intimate", "warm"],
      instruments: ["piano", "double bass", "soft drums", "saxophone"],
      tempo: "slow",
      energy: "low",
      vocals: "female",
      explicit: false,
      genres: ["Jazz", "Lounge"],
      subgenres: ["Romantic", "Smooth Jazz"],
      similar: ["Diana Krall", "Norah Jones", "Michael Bublé"],
      themes: ["romance", "evening", "love", "intimacy"],
      clearance: {
        masterRights: "Love Records",
        publishingRights: "Romantic Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Romantic License",
          usage: ["Film", "TV", "Advertising"],
          price: 16000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 133,
    title: "Workout Energy",
    artist: "Fitness Beats",
    genre: "Electronic",
    key: "A Minor",
    bpm: 140,
    duration: "3:30",
    metadata: {
      isrc: "USRC17607871",
      language: "English",
      explicit: false
    },
    tags: ["workout", "energetic", "fitness", "motivational"],
    writers: ["Fitness Composer", "Energy Writer"],
    lyrics: "Push it to the limit, feel the burn\nOne more rep, that's what you earn\nStronger, faster, better than before\nKeep on going, give a little more",
    syncInfo: {
      mood: ["energetic", "motivational", "powerful"],
      instruments: ["electronic drums", "synthesizer", "bass", "electric guitar"],
      tempo: "fast",
      energy: "high",
      vocals: "male",
      explicit: false,
      genres: ["Electronic", "Dance"],
      subgenres: ["Workout", "Fitness"],
      similar: ["Calvin Harris", "David Guetta", "Tiësto"],
      themes: ["fitness", "motivation", "energy", "strength"],
      clearance: {
        masterRights: "Fitness Records",
        publishingRights: "Energy Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Fitness", "Advertising", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Fitness License",
          usage: ["Fitness", "Advertising", "Web"],
          price: 12000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 134,
    title: "Meditation Flow",
    artist: "Zen Masters",
    genre: "Ambient",
    key: "G Major",
    bpm: 60,
    duration: "8:15",
    metadata: {
      isrc: "USRC17607872",
      language: "Instrumental",
      explicit: false
    },
    tags: ["meditation", "peaceful", "zen", "relaxing"],
    writers: ["Zen Composer", "Meditation Master"],
    lyrics: "",
    syncInfo: {
      mood: ["peaceful", "serene", "meditative"],
      instruments: ["singing bowls", "flute", "soft synth pads", "nature sounds"],
      tempo: "very slow",
      energy: "very low",
      vocals: "none",
      explicit: false,
      genres: ["Ambient", "New Age"],
      subgenres: ["Meditation", "Zen"],
      similar: ["Deuter", "Liquid Mind", "Steven Halpern"],
      themes: ["meditation", "peace", "mindfulness", "healing"],
      clearance: {
        masterRights: "Zen Records",
        publishingRights: "Meditation Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Meditation Apps", "Wellness", "Spa"],
        restrictions: []
      },
      pricing: [
        {
          name: "Wellness License",
          usage: ["Meditation Apps", "Wellness", "Spa"],
          price: 9000,
          term: "3 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 135,
    title: "Epic Battle",
    artist: "Warrior Sounds",
    genre: "Cinematic",
    key: "E Minor",
    bpm: 110,
    duration: "3:45",
    metadata: {
      isrc: "USRC17607873",
      language: "Instrumental",
      explicit: false
    },
    tags: ["epic", "battle", "powerful", "cinematic"],
    writers: ["Battle Composer", "Epic Warrior"],
    lyrics: "",
    syncInfo: {
      mood: ["epic", "intense", "powerful"],
      instruments: ["orchestra", "percussion", "choir", "brass"],
      tempo: "moderate",
      energy: "very high",
      vocals: "choir",
      explicit: false,
      genres: ["Cinematic", "Orchestral"],
      subgenres: ["Battle", "Action"],
      similar: ["Two Steps From Hell", "Audiomachine", "Immediate Music"],
      themes: ["battle", "conflict", "victory", "heroism"],
      clearance: {
        masterRights: "Epic Records",
        publishingRights: "Battle Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Trailers", "Games", "Film"],
        restrictions: []
      },
      pricing: [
        {
          name: "Epic License",
          usage: ["Trailers", "Games", "Film"],
          price: 30000,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 136,
    title: "Tropical House",
    artist: "Beach Producers",
    genre: "Electronic",
    key: "D Major",
    bpm: 105,
    duration: "3:20",
    metadata: {
      isrc: "USRC17607874",
      language: "English",
      explicit: false
    },
    tags: ["tropical", "house", "summer", "relaxing"],
    writers: ["Tropical Producer", "House Writer"],
    lyrics: "Tropical vibes and summer nights\nPalm trees swaying, feeling right\nOcean breeze and sandy shores\nThis paradise is all yours",
    syncInfo: {
      mood: ["relaxed", "upbeat", "summery"],
      instruments: ["tropical percussion", "synth", "steel drums", "marimba"],
      tempo: "moderate",
      energy: "medium",
      vocals: "female",
      explicit: false,
      genres: ["Electronic", "House"],
      subgenres: ["Tropical House", "Chill House"],
      similar: ["Kygo", "Thomas Jack", "Sam Feldt"],
      themes: ["summer", "beach", "relaxation", "paradise"],
      clearance: {
        masterRights: "Tropical Records",
        publishingRights: "Beach Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Travel", "Advertising", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Tropical License",
          usage: ["Travel", "Advertising", "Web"],
          price: 14000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 137,
    title: "Inspirational Journey",
    artist: "Motivational Sounds",
    genre: "Cinematic",
    key: "A Major",
    bpm: 95,
    duration: "4:10",
    metadata: {
      isrc: "USRC17607875",
      language: "Instrumental",
      explicit: false
    },
    tags: ["inspirational", "journey", "uplifting", "motivational"],
    writers: ["Inspiration Composer", "Journey Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["inspirational", "uplifting", "emotional"],
      instruments: ["piano", "strings", "light percussion", "guitar"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Cinematic", "Inspirational"],
      subgenres: ["Motivational", "Uplifting"],
      similar: ["Thomas Newman", "Hans Zimmer", "James Horner"],
      themes: ["journey", "inspiration", "achievement", "overcoming"],
      clearance: {
        masterRights: "Inspirational Records",
        publishingRights: "Journey Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Documentary", "Advertising", "Corporate"],
        restrictions: []
      },
      pricing: [
        {
          name: "Inspirational License",
          usage: ["Documentary", "Advertising", "Corporate"],
          price: 16000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 138,
    title: "Cyberpunk City",
    artist: "Digital Dystopia",
    genre: "Electronic",
    key: "F Minor",
    bpm: 125,
    duration: "4:50",
    metadata: {
      isrc: "USRC17607876",
      language: "English",
      explicit: false
    },
    tags: ["cyberpunk", "futuristic", "dystopian", "electronic"],
    writers: ["Cyber Composer", "Punk Programmer"],
    lyrics: "Neon city, digital rain\nCybernetic life, virtual pain\nHacking through the mainframe mind\nLeaving the old world behind",
    syncInfo: {
      mood: ["dark", "futuristic", "edgy"],
      instruments: ["synthesizer", "glitch effects", "electronic drums", "distorted bass"],
      tempo: "fast",
      energy: "high",
      vocals: "vocoder",
      explicit: false,
      genres: ["Electronic", "Industrial"],
      subgenres: ["Cyberpunk", "Darksynth"],
      similar: ["Perturbator", "Carpenter Brut", "HEALTH"],
      themes: ["cyberpunk", "future", "technology", "dystopia"],
      clearance: {
        masterRights: "Cyber Records",
        publishingRights: "Dystopia Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Games", "Film", "Trailers"],
        restrictions: []
      },
      pricing: [
        {
          name: "Cyberpunk License",
          usage: ["Games", "Film", "Trailers"],
          price: 18000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 139,
    title: "Corporate Success",
    artist: "Business Audio",
    genre: "Corporate",
    key: "D Major",
    bpm: 100,
    duration: "2:30",
    metadata: {
      isrc: "USRC17607877",
      language: "Instrumental",
      explicit: false
    },
    tags: ["corporate", "business", "professional", "success"],
    writers: ["Corporate Composer", "Business Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["professional", "optimistic", "clean"],
      instruments: ["piano", "strings", "light percussion", "synth"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Corporate", "Ambient"],
      subgenres: ["Business", "Professional"],
      similar: ["Corporate Audio", "Business Soundtracks"],
      themes: ["success", "business", "growth", "achievement"],
      clearance: {
        masterRights: "Business Records",
        publishingRights: "Corporate Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Corporate", "Advertising", "Presentations"],
        restrictions: []
      },
      pricing: [
        {
          name: "Corporate License",
          usage: ["Corporate", "Advertising", "Presentations"],
          price: 8000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 140,
    title: "Adventure Awaits",
    artist: "Explorer Sounds",
    genre: "Cinematic",
    key: "C Major",
    bpm: 110,
    duration: "3:50",
    metadata: {
      isrc: "USRC17607878",
      language: "Instrumental",
      explicit: false
    },
    tags: ["adventure", "exploration", "uplifting", "journey"],
    writers: ["Adventure Composer", "Explorer Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["adventurous", "uplifting", "exciting"],
      instruments: ["orchestra", "percussion", "brass", "strings"],
      tempo: "moderate",
      energy: "high",
      vocals: "none",
      explicit: false,
      genres: ["Cinematic", "Orchestral"],
      subgenres: ["Adventure", "Exploration"],
      similar: ["John Williams", "Hans Zimmer", "Alan Silvestri"],
      themes: ["adventure", "exploration", "discovery", "journey"],
      clearance: {
        masterRights: "Explorer Records",
        publishingRights: "Adventure Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "Documentary", "Travel"],
        restrictions: []
      },
      pricing: [
        {
          name: "Adventure License",
          usage: ["Film", "Documentary", "Travel"],
          price: 20000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 141,
    title: "Retro Funk",
    artist: "Groove Masters",
    genre: "Funk",
    key: "E Minor",
    bpm: 115,
    duration: "3:45",
    metadata: {
      isrc: "USRC17607879",
      language: "English",
      explicit: false
    },
    tags: ["funk", "retro", "groovy", "disco"],
    writers: ["Funk Master", "Groove Writer"],
    lyrics: "Get down with the funky sound\nGroove is taking me around\nBass line pumping, rhythm tight\nFunk is gonna be alright",
    syncInfo: {
      mood: ["groovy", "fun", "energetic"],
      instruments: ["bass guitar", "funk guitar", "drums", "brass section"],
      tempo: "moderate",
      energy: "high",
      vocals: "male",
      explicit: false,
      genres: ["Funk", "Disco"],
      subgenres: ["Retro Funk", "Disco Funk"],
      similar: ["Earth, Wind & Fire", "Kool & The Gang", "James Brown"],
      themes: ["fun", "dance", "retro", "party"],
      clearance: {
        masterRights: "Groove Records",
        publishingRights: "Funk Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Funk License",
          usage: ["Film", "TV", "Advertising"],
          price: 15000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 142,
    title: "Peaceful Meditation",
    artist: "Zen Garden",
    genre: "Ambient",
    key: "C Major",
    bpm: 60,
    duration: "10:00",
    metadata: {
      isrc: "USRC17607880",
      language: "Instrumental",
      explicit: false
    },
    tags: ["meditation", "peaceful", "zen", "relaxing"],
    writers: ["Zen Master", "Meditation Guru"],
    lyrics: "",
    syncInfo: {
      mood: ["peaceful", "serene", "meditative"],
      instruments: ["singing bowls", "nature sounds", "soft synth", "flute"],
      tempo: "very slow",
      energy: "very low",
      vocals: "none",
      explicit: false,
      genres: ["Ambient", "New Age"],
      subgenres: ["Meditation", "Zen"],
      similar: ["Deuter", "Liquid Mind", "Steven Halpern"],
      themes: ["meditation", "peace", "mindfulness", "healing"],
      clearance: {
        masterRights: "Zen Records",
        publishingRights: "Meditation Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Meditation Apps", "Wellness", "Spa"],
        restrictions: []
      },
      pricing: [
        {
          name: "Meditation License",
          usage: ["Meditation Apps", "Wellness", "Spa"],
          price: 10000,
          term: "3 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 143,
    title: "Urban Nights",
    artist: "City Lights Collective",
    genre: "R&B",
    key: "Bb Minor",
    bpm: 90,
    duration: "4:15",
    metadata: {
      isrc: "USRC17607881",
      language: "English",
      explicit: false
    },
    tags: ["urban", "night", "smooth", "city"],
    writers: ["Urban Writer", "Night Composer"],
    lyrics: "City lights illuminate the night\nUrban rhythm feeling just right\nStreet corner jazz and neon signs\nThis city vibe is so divine",
    syncInfo: {
      mood: ["smooth", "nocturnal", "urban"],
      instruments: ["electric piano", "drums", "bass", "saxophone"],
      tempo: "moderate",
      energy: "medium",
      vocals: "female",
      explicit: false,
      genres: ["R&B", "Soul"],
      subgenres: ["Urban", "Neo-Soul"],
      similar: ["Alicia Keys", "H.E.R.", "Daniel Caesar"],
      themes: ["city", "night", "urban life", "romance"],
      clearance: {
        masterRights: "Urban Records",
        publishingRights: "City Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Urban License",
          usage: ["Film", "TV", "Advertising"],
          price: 16000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 144,
    title: "Indie Folk Morning",
    artist: "Acoustic Sunrise",
    genre: "Folk",
    key: "G Major",
    bpm: 85,
    duration: "3:40",
    metadata: {
      isrc: "USRC17607882",
      language: "English",
      explicit: false
    },
    tags: ["indie", "folk", "morning", "acoustic"],
    writers: ["Folk Writer", "Acoustic Composer"],
    lyrics: "Morning light through the window pane\nCoffee steam rises again\nAcoustic guitar gently plays\nPerfect start to perfect days",
    syncInfo: {
      mood: ["peaceful", "warm", "intimate"],
      instruments: ["acoustic guitar", "piano", "light percussion", "cello"],
      tempo: "moderate",
      energy: "low",
      vocals: "male/female",
      explicit: false,
      genres: ["Folk", "Indie"],
      subgenres: ["Indie Folk", "Acoustic"],
      similar: ["Bon Iver", "Fleet Foxes", "Iron & Wine"],
      themes: ["morning", "peace", "simplicity", "nature"],
      clearance: {
        masterRights: "Indie Records",
        publishingRights: "Folk Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Indie License",
          usage: ["Film", "TV", "Advertising"],
          price: 14000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 145,
    title: "Epic Trailer Impact",
    artist: "Trailer Masters",
    genre: "Cinematic",
    key: "D Minor",
    bpm: 100,
    duration: "2:00",
    metadata: {
      isrc: "USRC17607883",
      language: "Instrumental",
      explicit: false
    },
    tags: ["epic", "trailer", "impact", "powerful"],
    writers: ["Trailer Master", "Impact Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["epic", "powerful", "intense"],
      instruments: ["orchestra", "percussion", "brass", "choir"],
      tempo: "moderate",
      energy: "very high",
      vocals: "choir",
      explicit: false,
      genres: ["Cinematic", "Trailer"],
      subgenres: ["Epic", "Impact"],
      similar: ["Two Steps From Hell", "Audiomachine", "Immediate Music"],
      themes: ["epic", "impact", "power", "drama"],
      clearance: {
        masterRights: "Trailer Records",
        publishingRights: "Impact Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Trailers", "Film", "Games"],
        restrictions: []
      },
      pricing: [
        {
          name: "Trailer License",
          usage: ["Trailers", "Film", "Games"],
          price: 25000,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 146,
    title: "Uplifting Corporate",
    artist: "Business Inspiration",
    genre: "Corporate",
    key: "A Major",
    bpm: 105,
    duration: "2:45",
    metadata: {
      isrc: "USRC17607884",
      language: "Instrumental",
      explicit: false
    },
    tags: ["corporate", "uplifting", "business", "motivational"],
    writers: ["Corporate Writer", "Business Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["uplifting", "professional", "optimistic"],
      instruments: ["piano", "strings", "light percussion", "synth"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Corporate", "Inspirational"],
      subgenres: ["Business", "Motivational"],
      similar: ["Corporate Audio", "Business Soundtracks"],
      themes: ["success", "motivation", "achievement", "business"],
      clearance: {
        masterRights: "Business Records",
        publishingRights: "Corporate Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Corporate", "Advertising", "Presentations"],
        restrictions: []
      },
      pricing: [
        {
          name: "Corporate License",
          usage: ["Corporate", "Advertising", "Presentations"],
          price: 9000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 147,
    title: "Dramatic Tension",
    artist: "Suspense Ensemble",
    genre: "Cinematic",
    key: "F Minor",
    bpm: 80,
    duration: "3:30",
    metadata: {
      isrc: "USRC17607885",
      language: "Instrumental",
      explicit: false
    },
    tags: ["dramatic", "tension", "suspense", "cinematic"],
    writers: ["Tension Composer", "Suspense Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["tense", "dramatic", "suspenseful"],
      instruments: ["strings", "percussion", "piano", "synth"],
      tempo: "slow",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Cinematic", "Dramatic"],
      subgenres: ["Suspense", "Tension"],
      similar: ["Hans Zimmer", "Harry Gregson-Williams", "James Newton Howard"],
      themes: ["tension", "drama", "suspense", "mystery"],
      clearance: {
        masterRights: "Dramatic Records",
        publishingRights: "Tension Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Trailers"],
        restrictions: []
      },
      pricing: [
        {
          name: "Dramatic License",
          usage: ["Film", "TV", "Trailers"],
          price: 18000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 148,
    title: "Happy Kids",
    artist: "Children's Music Box",
    genre: "Children's",
    key: "C Major",
    bpm: 120,
    duration: "2:30",
    metadata: {
      isrc: "USRC17607886",
      language: "English",
      explicit: false
    },
    tags: ["children", "happy", "playful", "fun"],
    writers: ["Kids Composer", "Happy Writer"],
    lyrics: "Happy kids playing all day long\nSinging, dancing to this song\nLaughter fills the summer air\nJoy and fun everywhere",
    syncInfo: {
      mood: ["happy", "playful", "innocent"],
      instruments: ["glockenspiel", "acoustic guitar", "light percussion", "piano"],
      tempo: "upbeat",
      energy: "high",
      vocals: "children",
      explicit: false,
      genres: ["Children's", "Pop"],
      subgenres: ["Kids", "Educational"],
      similar: ["Children's Music", "Educational Songs"],
      themes: ["childhood", "play", "happiness", "learning"],
      clearance: {
        masterRights: "Children's Records",
        publishingRights: "Kids Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Children's Content", "Educational", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Children's License",
          usage: ["Children's Content", "Educational", "Advertising"],
          price: 10000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 149,
    title: "Travel Vlog",
    artist: "Adventure Sounds",
    genre: "Pop",
    key: "G Major",
    bpm: 110,
    duration: "3:15",
    metadata: {
      isrc: "USRC17607887",
      language: "English",
      explicit: false
    },
    tags: ["travel", "adventure", "upbeat", "vlog"],
    writers: ["Travel Writer", "Vlog Composer"],
    lyrics: "Packing bags and hitting the road\nNew adventures to be told\nCapturing moments, making memories\nTravel vlogs for all to see",
    syncInfo: {
      mood: ["upbeat", "adventurous", "positive"],
      instruments: ["acoustic guitar", "ukulele", "light percussion", "whistling"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["Pop", "Folk Pop"],
      subgenres: ["Travel", "Vlog"],
      similar: ["Vance Joy", "American Authors", "Of Monsters and Men"],
      themes: ["travel", "adventure", "exploration", "freedom"],
      clearance: {
        masterRights: "Travel Records",
        publishingRights: "Adventure Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Travel", "Vlogs", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Travel License",
          usage: ["Travel", "Vlogs", "Web"],
          price: 8000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 150,
    title: "Fashion Show",
    artist: "Runway Beats",
    genre: "Electronic",
    key: "D Minor",
    bpm: 120,
    duration: "3:30",
    metadata: {
      isrc: "USRC17607888",
      language: "Instrumental",
      explicit: false
    },
    tags: ["fashion", "runway", "stylish", "modern"],
    writers: ["Fashion Composer", "Runway Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["stylish", "sophisticated", "modern"],
      instruments: ["electronic beats", "synth", "bass", "processed sounds"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Electronic", "House"],
      subgenres: ["Fashion", "Runway"],
      similar: ["Moderat", "Bonobo", "Apparat"],
      themes: ["fashion", "style", "elegance", "modernity"],
      clearance: {
        masterRights: "Fashion Records",
        publishingRights: "Runway Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Fashion", "Advertising", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Fashion License",
          usage: ["Fashion", "Advertising", "Web"],
          price: 15000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 151,
    title: "Emotional Piano",
    artist: "Solo Keys",
    genre: "Classical",
    key: "A Minor",
    bpm: 70,
    duration: "4:30",
    metadata: {
      isrc: "USRC17607889",
      language: "Instrumental",
      explicit: false
    },
    tags: ["emotional", "piano", "solo", "intimate"],
    writers: ["Piano Composer", "Emotional Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["emotional", "intimate", "reflective"],
      instruments: ["solo piano"],
      tempo: "slow",
      energy: "low",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Contemporary"],
      subgenres: ["Solo Piano", "Emotional"],
      similar: ["Ludovico Einaudi", "Nils Frahm", "Olafur Arnalds"],
      themes: ["emotion", "reflection", "intimacy", "solitude"],
      clearance: {
        masterRights: "Piano Records",
        publishingRights: "Keys Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Emotional License",
          usage: ["Film", "TV", "Advertising"],
          price: 12000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 152,
    title: "Upbeat Commercial",
    artist: "Ad Sounds",
    genre: "Pop",
    key: "C Major",
    bpm: 125,
    duration: "2:00",
    metadata: {
      isrc: "USRC17607890",
      language: "English",
      explicit: false
    },
    tags: ["commercial", "upbeat", "advertising", "positive"],
    writers: ["Commercial Writer", "Ad Composer"],
    lyrics: "Bright new day, feeling great\nThis product is simply first-rate\nMake your choice, don't hesitate\nSatisfaction guaranteed, don't wait",
    syncInfo: {
      mood: ["upbeat", "positive", "energetic"],
      instruments: ["acoustic guitar", "claps", "drums", "whistling"],
      tempo: "upbeat",
      energy: "high",
      vocals: "male/female",
      explicit: false,
      genres: ["Pop", "Commercial"],
      subgenres: ["Advertising", "Jingle"],
      similar: ["Commercial Music", "Advertising Soundtracks"],
      themes: ["positivity", "happiness", "success", "lifestyle"],
      clearance: {
        masterRights: "Ad Records",
        publishingRights: "Commercial Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Commercials", "Advertising", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Commercial License",
          usage: ["Commercials", "Advertising", "Web"],
          price: 20000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 153,
    title: "Vlog Background",
    artist: "Content Creators",
    genre: "Pop",
    key: "F Major",
    bpm: 105,
    duration: "2:45",
    metadata: {
      isrc: "USRC17607891",
      language: "Instrumental",
      explicit: false
    },
    tags: ["vlog", "background", "upbeat", "youtube"],
    writers: ["Vlog Writer", "Content Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["upbeat", "positive", "light"],
      instruments: ["acoustic guitar", "ukulele", "light percussion", "piano"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Pop", "Folk Pop"],
      subgenres: ["Vlog", "YouTube"],
      similar: ["Vlog Music", "YouTube Soundtracks"],
      themes: ["content creation", "positivity", "lifestyle", "social media"],
      clearance: {
        masterRights: "Content Records",
        publishingRights: "Vlog Publishing",
        territorialRestrictions: [],
        preClearedFor: ["YouTube", "Social Media", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Content License",
          usage: ["YouTube", "Social Media", "Web"],
          price: 5000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 154,
    title: "Dramatic Strings",
    artist: "Emotion Ensemble",
    genre: "Classical",
    key: "G Minor",
    bpm: 80,
    duration: "4:00",
    metadata: {
      isrc: "USRC17607892",
      language: "Instrumental",
      explicit: false
    },
    tags: ["dramatic", "strings", "emotional", "orchestral"],
    writers: ["String Composer", "Dramatic Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["dramatic", "emotional", "intense"],
      instruments: ["string orchestra", "cello", "violin", "viola"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Orchestral"],
      subgenres: ["Dramatic", "String Ensemble"],
      similar: ["Samuel Barber", "Max Richter", "Arvo Pärt"],
      themes: ["drama", "emotion", "tension", "beauty"],
      clearance: {
        masterRights: "String Records",
        publishingRights: "Dramatic Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Dramatic License",
          usage: ["Film", "TV", "Advertising"],
          price: 18000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 155,
    title: "Upbeat Pop",
    artist: "Happy Tunes",
    genre: "Pop",
    key: "D Major",
    bpm: 128,
    duration: "3:15",
    metadata: {
      isrc: "USRC17607893",
      language: "English",
      explicit: false
    },
    tags: ["pop", "upbeat", "happy", "energetic"],
    writers: ["Pop Writer", "Happy Composer"],
    lyrics: "Feeling good, feeling right\nEverything is shining bright\nPositive vibes all around\nHappiness in every sound",
    syncInfo: {
      mood: ["happy", "upbeat", "energetic"],
      instruments: ["synth", "drums", "electric guitar", "bass"],
      tempo: "fast",
      energy: "high",
      vocals: "female",
      explicit: false,
      genres: ["Pop", "Dance Pop"],
      subgenres: ["Upbeat", "Happy"],
      similar: ["Katy Perry", "Taylor Swift", "Meghan Trainor"],
      themes: ["happiness", "positivity", "energy", "fun"],
      clearance: {
        masterRights: "Happy Records",
        publishingRights: "Pop Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Commercials", "TV", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Pop License",
          usage: ["Commercials", "TV", "Web"],
          price: 18000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 156,
    title: "Sad Piano",
    artist: "Melancholy Keys",
    genre: "Classical",
    key: "C Minor",
    bpm: 65,
    duration: "4:15",
    metadata: {
      isrc: "USRC17607894",
      language: "Instrumental",
      explicit: false
    },
    tags: ["sad", "piano", "emotional", "melancholy"],
    writers: ["Sad Composer", "Melancholy Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["sad", "melancholic", "emotional"],
      instruments: ["solo piano"],
      tempo: "slow",
      energy: "low",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Contemporary"],
      subgenres: ["Solo Piano", "Sad"],
      similar: ["Ludovico Einaudi", "Yiruma", "Philip Glass"],
      themes: ["sadness", "loss", "reflection", "melancholy"],
      clearance: {
        masterRights: "Melancholy Records",
        publishingRights: "Sad Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Emotional License",
          usage: ["Film", "TV", "Advertising"],
          price: 12000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 157,
    title: "Motivational Speech",
    artist: "Inspiration Speakers",
    genre: "Cinematic",
    key: "E Major",
    bpm: 90,
    duration: "3:30",
    metadata: {
      isrc: "USRC17607895",
      language: "English",
      explicit: false
    },
    tags: ["motivational", "speech", "inspirational", "uplifting"],
    writers: ["Motivational Writer", "Speech Composer"],
    lyrics: "Rise up and face your fears\nOvercome doubts and dry those tears\nYour potential has no bounds\nSuccess is where your effort compounds",
    syncInfo: {
      mood: ["motivational", "inspirational", "uplifting"],
      instruments: ["piano", "strings", "percussion", "synth"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["Cinematic", "Spoken Word"],
      subgenres: ["Motivational", "Speech"],
      similar: ["Motivational Speakers", "Inspirational Soundtracks"],
      themes: ["motivation", "success", "overcoming", "achievement"],
      clearance: {
        masterRights: "Inspiration Records",
        publishingRights: "Motivational Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Corporate", "Advertising", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Motivational License",
          usage: ["Corporate", "Advertising", "Web"],
          price: 10000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 158,
    title: "Relaxing Spa",
    artist: "Wellness Sounds",
    genre: "Ambient",
    key: "F Major",
    bpm: 60,
    duration: "5:30",
    metadata: {
      isrc: "USRC17607896",
      language: "Instrumental",
      explicit: false
    },
    tags: ["spa", "relaxing", "wellness", "peaceful"],
    writers: ["Spa Composer", "Relaxation Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["relaxing", "peaceful", "serene"],
      instruments: ["piano", "nature sounds", "soft synth", "chimes"],
      tempo: "very slow",
      energy: "very low",
      vocals: "none",
      explicit: false,
      genres: ["Ambient", "New Age"],
      subgenres: ["Spa", "Relaxation"],
      similar: ["Spa Music", "Relaxation Soundtracks"],
      themes: ["relaxation", "wellness", "peace", "tranquility"],
      clearance: {
        masterRights: "Wellness Records",
        publishingRights: "Spa Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Spa", "Wellness", "Meditation"],
        restrictions: []
      },
      pricing: [
        {
          name: "Wellness License",
          usage: ["Spa", "Wellness", "Meditation"],
          price: 8000,
          term: "3 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 159,
    title: "Upbeat Ukulele",
    artist: "Happy Strummers",
    genre: "Folk",
    key: "C Major",
    bpm: 115,
    duration: "2:45",
    metadata: {
      isrc: "USRC17607897",
      language: "English",
      explicit: false
    },
    tags: ["ukulele", "upbeat", "happy", "cheerful"],
    writers: ["Ukulele Writer", "Happy Composer"],
    lyrics: "Strumming ukulele, feeling fine\nSunshine and good times, so divine\nSimple melodies bring joy to all\nHappiness rises, worries fall",
    syncInfo: {
      mood: ["happy", "cheerful", "upbeat"],
      instruments: ["ukulele", "glockenspiel", "light percussion", "whistling"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["Folk", "Pop"],
      subgenres: ["Ukulele", "Happy"],
      similar: ["Jason Mraz", "Jack Johnson", "Vance Joy"],
      themes: ["happiness", "simplicity", "joy", "positivity"],
      clearance: {
        masterRights: "Happy Records",
        publishingRights: "Ukulele Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Commercials", "Web", "TV"],
        restrictions: []
      },
      pricing: [
        {
          name: "Happy License",
          usage: ["Commercials", "Web", "TV"],
          price: 10000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 160,
    title: "Dramatic Trailer",
    artist: "Cinematic Impact",
    genre: "Cinematic",
    key: "E Minor",
    bpm: 100,
    duration: "2:30",
    metadata: {
      isrc: "USRC17607898",
      language: "Instrumental",
      explicit: false
    },
    tags: ["dramatic", "trailer", "cinematic", "intense"],
    writers: ["Trailer Composer", "Dramatic Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["dramatic", "intense", "powerful"],
      instruments: ["orchestra", "percussion", "choir", "brass"],
      tempo: "moderate",
      energy: "high",
      vocals: "choir",
      explicit: false,
      genres: ["Cinematic", "Trailer"],
      subgenres: ["Dramatic", "Intense"],
      similar: ["Two Steps From Hell", "Audiomachine", "Really Slow Motion"],
      themes: ["drama", "intensity", "conflict", "power"],
      clearance: {
        masterRights: "Cinematic Records",
        publishingRights: "Trailer Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Trailers", "Film", "Games"],
        restrictions: []
      },
      pricing: [
        {
          name: "Trailer License",
          usage: ["Trailers", "Film", "Games"],
          price: 25000,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 161,
    title: "Inspirational Speech",
    artist: "Motivational Voices",
    genre: "Spoken Word",
    key: "C Major",
    bpm: 85,
    duration: "3:00",
    metadata: {
      isrc: "USRC17607899",
      language: "English",
      explicit: false
    },
    tags: ["inspirational", "speech", "motivational", "uplifting"],
    writers: ["Inspirational Speaker", "Motivational Writer"],
    lyrics: "Your potential is limitless, your future bright\nStand tall, be strong, continue to fight\nBelieve in yourself, in all that you do\nThe power of change lies within you",
    syncInfo: {
      mood: ["inspirational", "motivational", "uplifting"],
      instruments: ["piano", "strings", "soft percussion"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["Spoken Word", "Cinematic"],
      subgenres: ["Motivational", "Inspirational"],
      similar: ["Motivational Speakers", "Inspirational Soundtracks"],
      themes: ["inspiration", "motivation", "success", "achievement"],
      clearance: {
        masterRights: "Motivational Records",
        publishingRights: "Inspirational Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Corporate", "Advertising", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Inspirational License",
          usage: ["Corporate", "Advertising", "Web"],
          price: 12000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 162,
    title: "Ambient Drone",
    artist: "Atmospheric Sounds",
    genre: "Ambient",
    key: "D Minor",
    bpm: 60,
    duration: "7:00",
    metadata: {
      isrc: "USRC17607900",
      language: "Instrumental",
      explicit: false
    },
    tags: ["ambient", "drone", "atmospheric", "meditative"],
    writers: ["Ambient Composer", "Drone Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["atmospheric", "meditative", "spacious"],
      instruments: ["synthesizer", "processed sounds", "ambient textures"],
      tempo: "very slow",
      energy: "very low",
      vocals: "none",
      explicit: false,
      genres: ["Ambient", "Drone"],
      subgenres: ["Atmospheric", "Textural"],
      similar: ["Brian Eno", "Stars of the Lid", "Tim Hecker"],
      themes: ["space", "meditation", "atmosphere", "transcendence"],
      clearance: {
        masterRights: "Ambient Records",
        publishingRights: "Atmospheric Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "Art Installations", "Meditation"],
        restrictions: []
      },
      pricing: [
        {
          name: "Ambient License",
          usage: ["Film", "Art Installations", "Meditation"],
          price: 10000,
          term: "3 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 163,
    title: "Upbeat Indie Rock",
    artist: "Indie Rockers",
    genre: "Rock",
    key: "A Major",
    bpm: 130,
    duration: "3:20",
    metadata: {
      isrc: "USRC17607901",
      language: "English",
      explicit: false
    },
    tags: ["indie", "rock", "upbeat", "energetic"],
    writers: ["Indie Writer", "Rock Composer"],
    lyrics: "Indie rock anthem, guitars ablaze\nUpbeat rhythm for carefree days\nDriving forward, no looking back\nThis indie sound is on the right track",
    syncInfo: {
      mood: ["energetic", "upbeat", "youthful"],
      instruments: ["electric guitar", "drums", "bass", "synth"],
      tempo: "fast",
      energy: "high",
      vocals: "male",
      explicit: false,
      genres: ["Rock", "Indie Rock"],
      subgenres: ["Upbeat", "Alternative"],
      similar: ["Arctic Monkeys", "The Strokes", "Phoenix"],
      themes: ["youth", "energy", "freedom", "adventure"],
      clearance: {
        masterRights: "Indie Records",
        publishingRights: "Rock Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Indie Rock License",
          usage: ["Film", "TV", "Advertising"],
          price: 16000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 164,
    title: "Minimal Tech",
    artist: "Digital Minimalist",
    genre: "Electronic",
    key: "G Minor",
    bpm: 125,
    duration: "5:00",
    metadata: {
      isrc: "USRC17607902",
      language: "Instrumental",
      explicit: false
    },
    tags: ["minimal", "tech", "electronic", "modern"],
    writers: ["Minimal Composer", "Tech Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["minimal", "modern", "sophisticated"],
      instruments: ["synthesizer", "electronic drums", "processed sounds"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Electronic", "Techno"],
      subgenres: ["Minimal", "Tech"],
      similar: ["Richie Hawtin", "Stephan Bodzin", "Boris Brejcha"],
      themes: ["technology", "minimalism", "modernity", "urban"],
      clearance: {
        masterRights: "Minimal Records",
        publishingRights: "Tech Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Fashion", "Technology", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Minimal Tech License",
          usage: ["Fashion", "Technology", "Advertising"],
          price: 14000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 165,
    title: "Emotional Strings",
    artist: "String Ensemble",
    genre: "Classical",
    key: "D Minor",
    bpm: 75,
    duration: "4:45",
    metadata: {
      isrc: "USRC17607903",
      language: "Instrumental",
      explicit: false
    },
    tags: ["emotional", "strings", "orchestral", "dramatic"],
    writers: ["String Composer", "Emotional Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["emotional", "dramatic", "touching"],
      instruments: ["string orchestra", "cello", "violin", "viola"],
      tempo: "slow",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Orchestral"],
      subgenres: ["String Ensemble", "Emotional"],
      similar: ["Samuel Barber", "Max Richter", "Arvo Pärt"],
      themes: ["emotion", "drama", "beauty", "reflection"],
      clearance: {
        masterRights: "String Records",
        publishingRights: "Emotional Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Emotional License",
          usage: ["Film", "TV", "Advertising"],
          price: 20000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 166,
    title: "Upbeat Folk",
    artist: "Folk Collective",
    genre: "Folk",
    key: "G Major",
    bpm: 120,
    duration: "3:10",
    metadata: {
      isrc: "USRC17607904",
      language: "English",
      explicit: false
    },
    tags: ["folk", "upbeat", "acoustic", "cheerful"],
    writers: ["Folk Writer", "Acoustic Composer"],
    lyrics: "Stomping feet and clapping hands\nFolk music from distant lands\nUpbeat rhythm, joyful sound\nHappiness in every round",
    syncInfo: {
      mood: ["cheerful", "upbeat", "rustic"],
      instruments: ["acoustic guitar", "banjo", "mandolin", "accordion"],
      tempo: "upbeat",
      energy: "high",
      vocals: "male/female",
      explicit: false,
      genres: ["Folk", "Acoustic"],
      subgenres: ["Upbeat Folk", "Folk Pop"],
      similar: ["Mumford & Sons", "The Lumineers", "Of Monsters and Men"],
      themes: ["joy", "community", "tradition", "celebration"],
      clearance: {
        masterRights: "Folk Records",
        publishingRights: "Acoustic Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Folk License",
          usage: ["Film", "TV", "Advertising"],
          price: 14000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 167,
    title: "Dramatic Orchestra",
    artist: "Symphony Dramatic",
    genre: "Classical",
    key: "Bb Minor",
    bpm: 85,
    duration: "5:00",
    metadata: {
      isrc: "USRC17607905",
      language: "Instrumental",
      explicit: false
    },
    tags: ["dramatic", "orchestral", "powerful", "emotional"],
    writers: ["Orchestra Composer", "Dramatic Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["dramatic", "powerful", "emotional"],
      instruments: ["full orchestra", "brass", "strings", "percussion"],
      tempo: "moderate",
      energy: "high",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Orchestral"],
      subgenres: ["Dramatic", "Symphonic"],
      similar: ["Hans Zimmer", "John Williams", "Howard Shore"],
      themes: ["drama", "power", "emotion", "conflict"],
      clearance: {
        masterRights: "Symphony Records",
        publishingRights: "Dramatic Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Trailers"],
        restrictions: []
      },
      pricing: [
        {
          name: "Orchestral License",
          usage: ["Film", "TV", "Trailers"],
          price: 25000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 168,
    title: "Uplifting Anthem",
    artist: "Inspiration Sounds",
    genre: "Pop",
    key: "D Major",
    bpm: 128,
    duration: "3:30",
    metadata: {
      isrc: "USRC17607906",
      language: "English",
      explicit: false
    },
    tags: ["uplifting", "anthem", "inspirational", "powerful"],
    writers: ["Anthem Writer", "Uplifting Composer"],
    lyrics: "Rise up, reach for the sky\nSpread your wings and learn to fly\nThis is your moment, your time to shine\nUplifting anthem, feeling so fine",
    syncInfo: {
      mood: ["uplifting", "inspirational", "powerful"],
      instruments: ["piano", "drums", "electric guitar", "synth"],
      tempo: "fast",
      energy: "high",
      vocals: "female",
      explicit: false,
      genres: ["Pop", "Anthem"],
      subgenres: ["Inspirational", "Uplifting"],
      similar: ["Rachel Platten", "Katy Perry", "Kelly Clarkson"],
      themes: ["inspiration", "achievement", "triumph", "empowerment"],
      clearance: {
        masterRights: "Anthem Records",
        publishingRights: "Uplifting Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Sports", "Advertising", "Film"],
        restrictions: []
      },
      pricing: [
        {
          name: "Anthem License",
          usage: ["Sports", "Advertising", "Film"],
          price: 20000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 169,
    title: "Corporate Technology",
    artist: "Tech Solutions",
    genre: "Corporate",
    key: "G Major",
    bpm: 110,
    duration: "2:30",
    metadata: {
      isrc: "USRC17607907",
      language: "Instrumental",
      explicit: false
    },
    tags: ["corporate", "technology", "professional", "modern"],
    writers: ["Corporate Writer", "Tech Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["professional", "innovative", "clean"],
      instruments: ["synth", "piano", "light percussion", "digital elements"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Corporate", "Technology"],
      subgenres: ["Tech", "Professional"],
      similar: ["Corporate Audio", "Technology Soundtracks"],
      themes: ["technology", "innovation", "business", "professionalism"],
      clearance: {
        masterRights: "Tech Records",
        publishingRights: "Corporate Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Technology", "Corporate", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Technology License",
          usage: ["Technology", "Corporate", "Advertising"],
          price: 12000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 170,
    title: "Cinematic Tension",
    artist: "Suspense Masters",
    genre: "Cinematic",
    key: "C Minor",
    bpm: 90,
    duration: "3:45",
    metadata: {
      isrc: "USRC17607908",
      language: "Instrumental",
      explicit: false
    },
    tags: ["cinematic", "tension", "suspense", "dramatic"],
    writers: ["Tension Writer", "Suspense Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["tense", "suspenseful", "dramatic"],
      instruments: ["strings", "percussion", "synth", "piano"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Cinematic", "Suspense"],
      subgenres: ["Tension", "Dramatic"],
      similar: ["Hans Zimmer", "Harry Gregson-Williams", "James Newton Howard"],
      themes: ["tension", "suspense", "drama", "conflict"],
      clearance: {
        masterRights: "Suspense Records",
        publishingRights: "Tension Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Trailers"],
        restrictions: []
      },
      pricing: [
        {
          name: "Tension License",
          usage: ["Film", "TV", "Trailers"],
          price: 18000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 171,
    title: "Relaxing Nature",
    artist: "Natural Sounds",
    genre: "Ambient",
    key: "E Major",
    bpm: 60,
    duration: "6:00",
    metadata: {
      isrc: "USRC17607909",
      language: "Instrumental",
      explicit: false
    },
    tags: ["nature", "relaxing", "peaceful", "ambient"],
    writers: ["Nature Composer", "Relaxation Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["peaceful", "relaxing", "natural"],
      instruments: ["nature sounds", "soft piano", "ambient synth"],
      tempo: "very slow",
      energy: "very low",
      vocals: "none",
      explicit: false,
      genres: ["Ambient", "Nature"],
      subgenres: ["Relaxation", "Natural"],
      similar: ["Nature Sounds", "Relaxation Music"],
      themes: ["nature", "relaxation", "peace", "environment"],
      clearance: {
        masterRights: "Nature Records",
        publishingRights: "Relaxation Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Wellness", "Documentary", "Meditation"],
        restrictions: []
      },
      pricing: [
        {
          name: "Nature License",
          usage: ["Wellness", "Documentary", "Meditation"],
          price: 9000,
          term: "3 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 172,
    title: "Energetic Rock",
    artist: "Rock Energy",
    genre: "Rock",
    key: "A Major",
    bpm: 135,
    duration: "3:30",
    metadata: {
      isrc: "USRC17607910",
      language: "English",
      explicit: false
    },
    tags: ["rock", "energetic", "powerful", "driving"],
    writers: ["Rock Writer", "Energy Composer"],
    lyrics: "Driving beat, guitar riff strong\nEnergetic rock all night long\nPower chords and drums that pound\nThis is our favorite sound",
    syncInfo: {
      mood: ["energetic", "powerful", "driving"],
      instruments: ["electric guitar", "drums", "bass", "vocals"],
      tempo: "fast",
      energy: "high",
      vocals: "male",
      explicit: false,
      genres: ["Rock", "Alternative Rock"],
      subgenres: ["Energetic", "Driving"],
      similar: ["Foo Fighters", "Green Day", "The Killers"],
      themes: ["energy", "power", "freedom", "rebellion"],
      clearance: {
        masterRights: "Rock Records",
        publishingRights: "Energy Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Sports", "Film", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Rock License",
          usage: ["Sports", "Film", "Advertising"],
          price: 18000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 173,
    title: "Happy Ukulele",
    artist: "Ukulele Joy",
    genre: "Folk",
    key: "C Major",
    bpm: 110,
    duration: "2:30",
    metadata: {
      isrc: "USRC17607911",
      language: "English",
      explicit: false
    },
    tags: ["ukulele", "happy", "cheerful", "upbeat"],
    writers: ["Ukulele Writer", "Happy Composer"],
    lyrics: "Ukulele strumming, feeling good\nHappy vibes, just as we should\nSimple chords bring so much joy\nPositive feelings we employ",
    syncInfo: {
      mood: ["happy", "cheerful", "light"],
      instruments: ["ukulele", "glockenspiel", "light percussion", "whistling"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male/female",
      explicit: false,
      genres: ["Folk", "Pop"],
      subgenres: ["Ukulele", "Happy"],
      similar: ["Jason Mraz", "Ingrid Michaelson", "Vance Joy"],
      themes: ["happiness", "joy", "simplicity", "positivity"],
      clearance: {
        masterRights: "Ukulele Records",
        publishingRights: "Happy Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Commercials", "Web", "TV"],
        restrictions: []
      },
      pricing: [
        {
          name: "Happy License",
          usage: ["Commercials", "Web", "TV"],
          price: 10000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 174,
    title: "Epic Orchestra",
    artist: "Symphonic Power",
    genre: "Classical",
    key: "Bb Minor",
    bpm: 95,
    duration: "4:30",
    metadata: {
      isrc: "USRC17607912",
      language: "Instrumental",
      explicit: false
    },
    tags: ["epic", "orchestral", "powerful", "cinematic"],
    writers: ["Epic Composer", "Orchestral Writer"],
    lyrics: "",
    syncInfo: {
      mood: ["epic", "powerful", "majestic"],
      instruments: ["full orchestra", "choir", "percussion", "brass"],
      tempo: "moderate",
      energy: "very high",
      vocals: "choir",
      explicit: false,
      genres: ["Classical", "Cinematic"],
      subgenres: ["Epic", "Orchestral"],
      similar: ["Hans Zimmer", "Two Steps From Hell", "Thomas Bergersen"],
      themes: ["epic", "power", "triumph", "battle"],
      clearance: {
        masterRights: "Epic Records",
        publishingRights: "Orchestral Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "Trailers", "Games"],
        restrictions: []
      },
      pricing: [
        {
          name: "Epic License",
          usage: ["Film", "Trailers", "Games"],
          price: 30000,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 175,
    title: "Gentle Acoustic",
    artist: "Acoustic Whispers",
    genre: "Folk",
    key: "D Major",
    bpm: 80,
    duration: "3:45",
    metadata: {
      isrc: "USRC17607913",
      language: "English",
      explicit: false
    },
    tags: ["acoustic", "gentle", "intimate", "warm"],
    writers: ["Acoustic Writer", "Gentle Composer"],
    lyrics: "Gentle strumming, soft and sweet\nAcoustic whispers, so complete\nIntimate moments, quiet space\nWarm emotions we embrace",
    syncInfo: {
      mood: ["gentle", "intimate", "warm"],
      instruments: ["acoustic guitar", "piano", "soft percussion", "cello"],
      tempo: "slow",
      energy: "low",
      vocals: "female",
      explicit: false,
      genres: ["Folk", "Acoustic"],
      subgenres: ["Gentle", "Intimate"],
      similar: ["Norah Jones", "Iron & Wine", "José González"],
      themes: ["intimacy", "warmth", "gentleness", "reflection"],
      clearance: {
        masterRights: "Acoustic Records",
        publishingRights: "Gentle Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Acoustic License",
          usage: ["Film", "TV", "Advertising"],
          price: 12000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 176,
    title: "Inspiring Piano",
    artist: "Piano Inspiration",
    genre: "Classical",
    key: "F Major",
    bpm: 85,
    duration: "4:00",
    metadata: {
      isrc: "USRC17607914",
      language: "Instrumental",
      explicit: false
    },
    tags: ["inspiring", "piano", "uplifting", "emotional"],
    writers: ["Piano Writer", "Inspiring Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["inspiring", "uplifting", "emotional"],
      instruments: ["solo piano", "light strings"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Contemporary"],
      subgenres: ["Solo Piano", "Inspirational"],
      similar: ["Ludovico Einaudi", "Yiruma", "Michael Nyman"],
      themes: ["inspiration", "emotion", "journey", "hope"],
      clearance: {
        masterRights: "Piano Records",
        publishingRights: "Inspiration Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Inspirational License",
          usage: ["Film", "TV", "Advertising"],
          price: 15000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 177,
    title: "Upbeat Corporate",
    artist: "Business Positivity",
    genre: "Corporate",
    key: "C Major",
    bpm: 115,
    duration: "2:30",
    metadata: {
      isrc: "USRC17607915",
      language: "Instrumental",
      explicit: false
    },
    tags: ["corporate", "upbeat", "positive", "professional"],
    writers: ["Corporate Writer", "Positive Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["upbeat", "positive", "professional"],
      instruments: ["piano", "strings", "light percussion", "synth"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Corporate", "Pop"],
      subgenres: ["Upbeat", "Professional"],
      similar: ["Corporate Audio", "Business Soundtracks"],
      themes: ["business", "positivity", "success", "professionalism"],
      clearance: {
        masterRights: "Business Records",
        publishingRights: "Corporate Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Corporate", "Advertising", "Presentations"],
        restrictions: []
      },
      pricing: [
        {
          name: "Corporate License",
          usage: ["Corporate", "Advertising", "Presentations"],
          price: 10000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 178,
    title: "Emotional Cinematic",
    artist: "Cinema Emotions",
    genre: "Cinematic",
    key: "G Minor",
    bpm: 80,
    duration: "4:15",
    metadata: {
      isrc: "USRC17607916",
      language: "Instrumental",
      explicit: false
    },
    tags: ["emotional", "cinematic", "dramatic", "orchestral"],
    writers: ["Cinematic Writer", "Emotional Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["emotional", "dramatic", "touching"],
      instruments: ["orchestra", "piano", "strings", "soft percussion"],
      tempo: "slow",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Cinematic", "Orchestral"],
      subgenres: ["Emotional", "Dramatic"],
      similar: ["Thomas Newman", "James Horner", "John Williams"],
      themes: ["emotion", "drama", "journey", "transformation"],
      clearance: {
        masterRights: "Cinematic Records",
        publishingRights: "Emotional Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Emotional License",
          usage: ["Film", "TV", "Advertising"],
          price: 20000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 179,
    title: "Upbeat Pop Rock",
    artist: "Positive Energy",
    genre: "Rock",
    key: "E Major",
    bpm: 130,
    duration: "3:15",
    metadata: {
      isrc: "USRC17607917",
      language: "English",
      explicit: false
    },
    tags: ["upbeat", "pop rock", "energetic", "positive"],
    writers: ["Pop Writer", "Rock Composer"],
    lyrics: "Upbeat rhythm, feeling alive\nPositive energy helps us thrive\nPop rock anthem, guitars and drums\nGood vibrations for everyone",
    syncInfo: {
      mood: ["upbeat", "energetic", "positive"],
      instruments: ["electric guitar", "drums", "bass", "synth"],
      tempo: "fast",
      energy: "high",
      vocals: "male",
      explicit: false,
      genres: ["Rock", "Pop Rock"],
      subgenres: ["Upbeat", "Energetic"],
      similar: ["Maroon 5", "OneRepublic", "Imagine Dragons"],
      themes: ["positivity", "energy", "happiness", "motivation"],
      clearance: {
        masterRights: "Pop Rock Records",
        publishingRights: "Positive Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Pop Rock License",
          usage: ["Film", "TV", "Advertising"],
          price: 18000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 180,
    title: "Dramatic Piano",
    artist: "Piano Drama",
    genre: "Classical",
    key: "Bb Minor",
    bpm: 70,
    duration: "4:30",
    metadata: {
      isrc: "USRC17607918",
      language: "Instrumental",
      explicit: false
    },
    tags: ["dramatic", "piano", "emotional", "intense"],
    writers: ["Dramatic Writer", "Piano Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["dramatic", "emotional", "intense"],
      instruments: ["solo piano"],
      tempo: "slow",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Contemporary"],
      subgenres: ["Solo Piano", "Dramatic"],
      similar: ["Ludovico Einaudi", "Michael Nyman", "Philip Glass"],
      themes: ["drama", "emotion", "intensity", "reflection"],
      clearance: {
        masterRights: "Piano Records",
        publishingRights: "Dramatic Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Dramatic License",
          usage: ["Film", "TV", "Advertising"],
          price: 15000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 181,
    title: "Upbeat Indie Folk",
    artist: "Folk Happiness",
    genre: "Folk",
    key: "D Major",
    bpm: 125,
    duration: "3:20",
    metadata: {
      isrc: "USRC17607919",
      language: "English",
      explicit: false
    },
    tags: ["indie folk", "upbeat", "happy", "acoustic"],
    writers: ["Indie Writer", "Folk Composer"],
    lyrics: "Indie folk with upbeat sound\nHappy vibes all around\nAcoustic guitars and stomping feet\nThis folk rhythm can't be beat",
    syncInfo: {
      mood: ["happy", "upbeat", "cheerful"],
      instruments: ["acoustic guitar", "banjo", "mandolin", "stomps and claps"],
      tempo: "upbeat",
      energy: "high",
      vocals: "male/female",
      explicit: false,
      genres: ["Folk", "Indie Folk"],
      subgenres: ["Upbeat", "Happy"],
      similar: ["The Lumineers", "Mumford & Sons", "Edward Sharpe & The Magnetic Zeros"],
      themes: ["happiness", "community", "joy", "celebration"],
      clearance: {
        masterRights: "Indie Folk Records",
        publishingRights: "Happy Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Indie Folk License",
          usage: ["Film", "TV", "Advertising"],
          price: 15000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 182,
    title: "Inspirational Orchestra",
    artist: "Orchestral Inspiration",
    genre: "Classical",
    key: "C Major",
    bpm: 90,
    duration: "4:00",
    metadata: {
      isrc: "USRC17607920",
      language: "Instrumental",
      explicit: false
    },
    tags: ["inspirational", "orchestral", "uplifting", "emotional"],
    writers: ["Inspirational Writer", "Orchestra Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["inspirational", "uplifting", "emotional"],
      instruments: ["orchestra", "piano", "strings", "brass"],
      tempo: "moderate",
      energy: "high",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Cinematic"],
      subgenres: ["Inspirational", "Uplifting"],
      similar: ["Hans Zimmer", "John Williams", "James Horner"],
      themes: ["inspiration", "achievement", "journey", "triumph"],
      clearance: {
        masterRights: "Orchestral Records",
        publishingRights: "Inspiration Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "Documentary", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Inspirational License",
          usage: ["Film", "Documentary", "Advertising"],
          price: 22000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 183,
    title: "Upbeat Ukulele",
    artist: "Ukulele Sunshine",
    genre: "Folk",
    key: "C Major",
    bpm: 115,
    duration: "2:45",
    metadata: {
      isrc: "USRC17607921",
      language: "English",
      explicit: false
    },
    tags: ["ukulele", "upbeat", "happy", "cheerful"],
    writers: ["Ukulele Writer", "Sunshine Composer"],
    lyrics: "Ukulele strumming, upbeat sound\nHappy feelings all around\nCheerful music, bright and clear\nBringing sunshine all year",
    syncInfo: {
      mood: ["happy", "cheerful", "upbeat"],
      instruments: ["ukulele", "glockenspiel", "light percussion", "whistling"],
      tempo: "moderate",
      energy: "medium",
      vocals: "male",
      explicit: false,
      genres: ["Folk", "Pop"],
      subgenres: ["Ukulele", "Happy"],
      similar: ["Jason Mraz", "Jack Johnson", "Vance Joy"],
      themes: ["happiness", "sunshine", "positivity", "joy"],
      clearance: {
        masterRights: "Ukulele Records",
        publishingRights: "Sunshine Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Commercials", "Web", "TV"],
        restrictions: []
      },
      pricing: [
        {
          name: "Ukulele License",
          usage: ["Commercials", "Web", "TV"],
          price: 10000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 184,
    title: "Ambient Chill",
    artist: "Chill Atmosphere",
    genre: "Ambient",
    key: "E Minor",
    bpm: 70,
    duration: "5:30",
    metadata: {
      isrc: "USRC17607922",
      language: "Instrumental",
      explicit: false
    },
    tags: ["ambient", "chill", "relaxing", "atmospheric"],
    writers: ["Ambient Writer", "Chill Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["relaxing", "chilled", "atmospheric"],
      instruments: ["synth pads", "piano", "processed sounds", "soft beats"],
      tempo: "slow",
      energy: "low",
      vocals: "none",
      explicit: false,
      genres: ["Ambient", "Electronic"],
      subgenres: ["Chill", "Atmospheric"],
      similar: ["Brian Eno", "Tycho", "Boards of Canada"],
      themes: ["relaxation", "atmosphere", "space", "tranquility"],
      clearance: {
        masterRights: "Ambient Records",
        publishingRights: "Chill Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Wellness"],
        restrictions: []
      },
      pricing: [
        {
          name: "Ambient License",
          usage: ["Film", "TV", "Wellness"],
          price: 12000,
          term: "3 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 185,
    title: "Epic Trailer",
    artist: "Trailer Impact",
    genre: "Cinematic",
    key: "D Minor",
    bpm: 100,
    duration: "2:30",
    metadata: {
      isrc: "USRC17607923",
      language: "Instrumental",
      explicit: false
    },
    tags: ["epic", "trailer", "powerful", "cinematic"],
    writers: ["Trailer Writer", "Epic Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["epic", "powerful", "intense"],
      instruments: ["orchestra", "percussion", "choir", "brass"],
      tempo: "moderate",
      energy: "very high",
      vocals: "choir",
      explicit: false,
      genres: ["Cinematic", "Trailer"],
      subgenres: ["Epic", "Powerful"],
      similar: ["Two Steps From Hell", "Audiomachine", "Really Slow Motion"],
      themes: ["epic", "power", "intensity", "drama"],
      clearance: {
        masterRights: "Trailer Records",
        publishingRights: "Epic Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Trailers", "Film", "Games"],
        restrictions: []
      },
      pricing: [
        {
          name: "Trailer License",
          usage: ["Trailers", "Film", "Games"],
          price: 25000,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 186,
    title: "Romantic Jazz",
    artist: "Jazz Romance",
    genre: "Jazz",
    key: "F Major",
    bpm: 85,
    duration: "4:30",
    metadata: {
      isrc: "USRC17607924",
      language: "English",
      explicit: false
    },
    tags: ["jazz", "romantic", "smooth", "sophisticated"],
    writers: ["Jazz Writer", "Romantic Composer"],
    lyrics: "Romantic jazz on a moonlit night\nSoft melodies feeling just right\nSophisticated sounds in the air\nThis perfect moment we share",
    syncInfo: {
      mood: ["romantic", "smooth", "sophisticated"],
      instruments: ["piano", "double bass", "drums", "saxophone"],
      tempo: "moderate",
      energy: "low",
      vocals: "female",
      explicit: false,
      genres: ["Jazz", "Smooth Jazz"],
      subgenres: ["Romantic", "Sophisticated"],
      similar: ["Diana Krall", "Norah Jones", "Michael Bublé"],
      themes: ["romance", "sophistication", "evening", "intimacy"],
      clearance: {
        masterRights: "Jazz Records",
        publishingRights: "Romantic Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Jazz License",
          usage: ["Film", "TV", "Advertising"],
          price: 16000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 187,
    title: "Upbeat Pop",
    artist: "Pop Positivity",
    genre: "Pop",
    key: "G Major",
    bpm: 128,
    duration: "3:15",
    metadata: {
      isrc: "USRC17607925",
      language: "English",
      explicit: false
    },
    tags: ["pop", "upbeat", "positive", "energetic"],
    writers: ["Pop Writer", "Positive Composer"],
    lyrics: "Upbeat pop with a catchy hook\nPositive vibes wherever you look\nEnergetic rhythm, feel the beat\nThis happy song is hard to beat",
    syncInfo: {
      mood: ["upbeat", "positive", "energetic"],
      instruments: ["synth", "drums", "electric guitar", "bass"],
      tempo: "fast",
      energy: "high",
      vocals: "female",
      explicit: false,
      genres: ["Pop", "Dance Pop"],
      subgenres: ["Upbeat", "Positive"],
      similar: ["Katy Perry", "Taylor Swift", "Meghan Trainor"],
      themes: ["positivity", "energy", "happiness", "fun"],
      clearance: {
        masterRights: "Pop Records",
        publishingRights: "Positive Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Commercials", "TV", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Pop License",
          usage: ["Commercials", "TV", "Web"],
          price: 18000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 188,
    title: "Dramatic Tension",
    artist: "Tension Masters",
    genre: "Cinematic",
    key: "E Minor",
    bpm: 85,
    duration: "3:45",
    metadata: {
      isrc: "USRC17607926",
      language: "Instrumental",
      explicit: false
    },
    tags: ["dramatic", "tension", "suspense", "cinematic"],
    writers: ["Dramatic Writer", "Tension Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["tense", "dramatic", "suspenseful"],
      instruments: ["strings", "percussion", "piano", "synth"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Cinematic", "Dramatic"],
      subgenres: ["Tension", "Suspense"],
      similar: ["Hans Zimmer", "Harry Gregson-Williams", "James Newton Howard"],
      themes: ["tension", "drama", "suspense", "conflict"],
      clearance: {
        masterRights: "Dramatic Records",
        publishingRights: "Tension Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Trailers"],
        restrictions: []
      },
      pricing: [
        {
          name: "Dramatic License",
          usage: ["Film", "TV", "Trailers"],
          price: 18000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 189,
    title: "Inspirational Piano",
    artist: "Piano Inspiration",
    genre: "Classical",
    key: "D Major",
    bpm: 85,
    duration: "4:00",
    metadata: {
      isrc: "USRC17607927",
      language: "Instrumental",
      explicit: false
    },
    tags: ["inspirational", "piano", "uplifting", "emotional"],
    writers: ["Inspirational Writer", "Piano Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["inspirational", "uplifting", "emotional"],
      instruments: ["solo piano", "light strings"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Contemporary"],
      subgenres: ["Solo Piano", "Inspirational"],
      similar: ["Ludovico Einaudi", "Yiruma", "Michael Nyman"],
      themes: ["inspiration", "emotion", "journey", "hope"],
      clearance: {
        masterRights: "Piano Records",
        publishingRights: "Inspiration Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Inspirational License",
          usage: ["Film", "TV", "Advertising"],
          price: 15000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 190,
    title: "Upbeat Folk",
    artist: "Folk Happiness",
    genre: "Folk",
    key: "G Major",
    bpm: 120,
    duration: "3:10",
    metadata: {
      isrc: "USRC17607928",
      language: "English",
      explicit: false
    },
    tags: ["folk", "upbeat", "happy", "acoustic"],
    writers: ["Folk Writer", "Happy Composer"],
    lyrics: "Upbeat folk with a happy sound\nAcoustic guitars and joy abound\nStomping feet and clapping hands\nThis folk music from distant lands",
    syncInfo: {
      mood: ["happy", "upbeat", "cheerful"],
      instruments: ["acoustic guitar", "banjo", "mandolin", "stomps and claps"],
      tempo: "upbeat",
      energy: "high",
      vocals: "male/female",
      explicit: false,
      genres: ["Folk", "Acoustic"],
      subgenres: ["Upbeat", "Happy"],
      similar: ["The Lumineers", "Mumford & Sons", "Of Monsters and Men"],
      themes: ["happiness", "community", "joy", "celebration"],
      clearance: {
        masterRights: "Folk Records",
        publishingRights: "Happy Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Folk License",
          usage: ["Film", "TV", "Advertising"],
          price: 14000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 191,
    title: "Emotional Strings",
    artist: "String Emotions",
    genre: "Classical",
    key: "A Minor",
    bpm: 75,
    duration: "4:45",
    metadata: {
      isrc: "USRC17607929",
      language: "Instrumental",
      explicit: false
    },
    tags: ["emotional", "strings", "orchestral", "touching"],
    writers: ["Emotional Writer", "String Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["emotional", "touching", "dramatic"],
      instruments: ["string orchestra", "cello", "violin", "viola"],
      tempo: "slow",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Orchestral"],
      subgenres: ["String Ensemble", "Emotional"],
      similar: ["Samuel Barber", "Max Richter", "Arvo Pärt"],
      themes: ["emotion", "drama", "beauty", "reflection"],
      clearance: {
        masterRights: "String Records",
        publishingRights: "Emotional Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Emotional License",
          usage: ["Film", "TV", "Advertising"],
          price: 20000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 192,
    title: "Upbeat Corporate",
    artist: "Corporate Positivity",
    genre: "Corporate",
    key: "D Major",
    bpm: 115,
    duration: "2:30",
    metadata: {
      isrc: "USRC17607930",
      language: "Instrumental",
      explicit: false
    },
    tags: ["corporate", "upbeat", "positive", "professional"],
    writers: ["Corporate Writer", "Positive Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["upbeat", "positive", "professional"],
      instruments: ["piano", "strings", "light percussion", "synth"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Corporate", "Pop"],
      subgenres: ["Upbeat", "Professional"],
      similar: ["Corporate Audio", "Business Soundtracks"],
      themes: ["business", "positivity", "success", "professionalism"],
      clearance: {
        masterRights: "Corporate Records",
        publishingRights: "Positive Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Corporate", "Advertising", "Presentations"],
        restrictions: []
      },
      pricing: [
        {
          name: "Corporate License",
          usage: ["Corporate", "Advertising", "Presentations"],
          price: 10000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 193,
    title: "Cinematic Drama",
    artist: "Dramatic Cinema",
    genre: "Cinematic",
    key: "C Minor",
    bpm: 90,
    duration: "4:15",
    metadata: {
      isrc: "USRC17607931",
      language: "Instrumental",
      explicit: false
    },
    tags: ["cinematic", "dramatic", "emotional", "orchestral"],
    writers: ["Cinematic Writer", "Dramatic Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["dramatic", "emotional", "intense"],
      instruments: ["orchestra", "piano", "strings", "percussion"],
      tempo: "moderate",
      energy: "high",
      vocals: "none",
      explicit: false,
      genres: ["Cinematic", "Orchestral"],
      subgenres: ["Dramatic", "Emotional"],
      similar: ["Hans Zimmer", "James Horner", "Thomas Newman"],
      themes: ["drama", "emotion", "conflict", "resolution"],
      clearance: {
        masterRights: "Cinematic Records",
        publishingRights: "Dramatic Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Trailers"],
        restrictions: []
      },
      pricing: [
        {
          name: "Cinematic License",
          usage: ["Film", "TV", "Trailers"],
          price: 22000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 194,
    title: "Upbeat Indie Pop",
    artist: "Indie Happiness",
    genre: "Indie Pop",
    key: "C Major",
    bpm: 125,
    duration: "3:20",
    metadata: {
      isrc: "USRC17607932",
      language: "English",
      explicit: false
    },
    tags: ["indie pop", "upbeat", "happy", "energetic"],
    writers: ["Indie Writer", "Pop Composer"],
    lyrics: "Upbeat indie pop, feeling fine\nHappy vibes all the time\nEnergetic sound, catchy beat\nThis indie pop is hard to beat",
    syncInfo: {
      mood: ["happy", "upbeat", "energetic"],
      instruments: ["synth", "drums", "electric guitar", "bass"],
      tempo: "fast",
      energy: "high",
      vocals: "female",
      explicit: false,
      genres: ["Indie Pop", "Pop"],
      subgenres: ["Upbeat", "Happy"],
      similar: ["Passion Pit", "CHVRCHES", "Phoenix"],
      themes: ["happiness", "energy", "youth", "fun"],
      clearance: {
        masterRights: "Indie Records",
        publishingRights: "Pop Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Indie Pop License",
          usage: ["Film", "TV", "Advertising"],
          price: 16000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 195,
    title: "Ambient Relaxation",
    artist: "Relaxation Sounds",
    genre: "Ambient",
    key: "G Major",
    bpm: 60,
    duration: "6:00",
    metadata: {
      isrc: "USRC17607933",
      language: "Instrumental",
      explicit: false
    },
    tags: ["ambient", "relaxation", "peaceful", "calming"],
    writers: ["Ambient Writer", "Relaxation Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["relaxing", "peaceful", "calming"],
      instruments: ["synth pads", "piano", "nature sounds", "soft textures"],
      tempo: "very slow",
      energy: "very low",
      vocals: "none",
      explicit: false,
      genres: ["Ambient", "New Age"],
      subgenres: ["Relaxation", "Peaceful"],
      similar: ["Brian Eno", "Liquid Mind", "Steven Halpern"],
      themes: ["relaxation", "peace", "calm", "tranquility"],
      clearance: {
        masterRights: "Ambient Records",
        publishingRights: "Relaxation Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Wellness", "Meditation", "Spa"],
        restrictions: []
      },
      pricing: [
        {
          name: "Relaxation License",
          usage: ["Wellness", "Meditation", "Spa"],
          price: 10000,
          term: "3 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 196,
    title: "Epic Battle",
    artist: "Battle Orchestra",
    genre: "Cinematic",
    key: "D Minor",
    bpm: 110,
    duration: "3:45",
    metadata: {
      isrc: "USRC17607934",
      language: "Instrumental",
      explicit: false
    },
    tags: ["epic", "battle", "orchestral", "powerful"],
    writers: ["Epic Writer", "Battle Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["epic", "powerful", "intense"],
      instruments: ["orchestra", "percussion", "choir", "brass"],
      tempo: "moderate",
      energy: "very high",
      vocals: "choir",
      explicit: false,
      genres: ["Cinematic", "Orchestral"],
      subgenres: ["Epic", "Battle"],
      similar: ["Two Steps From Hell", "Audiomachine", "Thomas Bergersen"],
      themes: ["battle", "conflict", "power", "triumph"],
      clearance: {
        masterRights: "Epic Records",
        publishingRights: "Battle Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "Trailers", "Games"],
        restrictions: []
      },
      pricing: [
        {
          name: "Epic License",
          usage: ["Film", "Trailers", "Games"],
          price: 28000,
          term: "Perpetual",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 197,
    title: "Gentle Piano",
    artist: "Piano Gentleness",
    genre: "Classical",
    key: "E Major",
    bpm: 70,
    duration: "4:15",
    metadata: {
      isrc: "USRC17607935",
      language: "Instrumental",
      explicit: false
    },
    tags: ["gentle", "piano", "peaceful", "intimate"],
    writers: ["Gentle Writer", "Piano Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["gentle", "peaceful", "intimate"],
      instruments: ["solo piano"],
      tempo: "slow",
      energy: "low",
      vocals: "none",
      explicit: false,
      genres: ["Classical", "Contemporary"],
      subgenres: ["Solo Piano", "Gentle"],
      similar: ["Ludovico Einaudi", "Yiruma", "Nils Frahm"],
      themes: ["gentleness", "peace", "intimacy", "reflection"],
      clearance: {
        masterRights: "Piano Records",
        publishingRights: "Gentle Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Advertising"],
        restrictions: []
      },
      pricing: [
        {
          name: "Gentle License",
          usage: ["Film", "TV", "Advertising"],
          price: 12000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 198,
    title: "Upbeat Commercial",
    artist: "Commercial Positivity",
    genre: "Pop",
    key: "D Major",
    bpm: 125,
    duration: "2:00",
    metadata: {
      isrc: "USRC17607936",
      language: "English",
      explicit: false
    },
    tags: ["commercial", "upbeat", "positive", "energetic"],
    writers: ["Commercial Writer", "Positive Composer"],
    lyrics: "Upbeat commercial, feeling good\nPositive message understood\nEnergetic rhythm, catchy hook\nThis product deserves a second look",
    syncInfo: {
      mood: ["upbeat", "positive", "energetic"],
      instruments: ["synth", "drums", "electric guitar", "claps"],
      tempo: "fast",
      energy: "high",
      vocals: "male/female",
      explicit: false,
      genres: ["Pop", "Commercial"],
      subgenres: ["Upbeat", "Advertising"],
      similar: ["Commercial Music", "Advertising Soundtracks"],
      themes: ["positivity", "energy", "happiness", "success"],
      clearance: {
        masterRights: "Commercial Records",
        publishingRights: "Positive Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Commercials", "Advertising", "Web"],
        restrictions: []
      },
      pricing: [
        {
          name: "Commercial License",
          usage: ["Commercials", "Advertising", "Web"],
          price: 20000,
          term: "1 year",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 199,
    title: "Dramatic Tension",
    artist: "Tension Masters",
    genre: "Cinematic",
    key: "F Minor",
    bpm: 85,
    duration: "3:30",
    metadata: {
      isrc: "USRC17607937",
      language: "Instrumental",
      explicit: false
    },
    tags: ["dramatic", "tension", "suspense", "cinematic"],
    writers: ["Dramatic Writer", "Tension Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["tense", "dramatic", "suspenseful"],
      instruments: ["strings", "percussion", "piano", "synth"],
      tempo: "moderate",
      energy: "medium",
      vocals: "none",
      explicit: false,
      genres: ["Cinematic", "Dramatic"],
      subgenres: ["Tension", "Suspense"],
      similar: ["Hans Zimmer", "Harry Gregson-Williams", "James Newton Howard"],
      themes: ["tension", "drama", "suspense", "conflict"],
      clearance: {
        masterRights: "Dramatic Records",
        publishingRights: "Tension Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Film", "TV", "Trailers"],
        restrictions: []
      },
      pricing: [
        {
          name: "Dramatic License",
          usage: ["Film", "TV", "Trailers"],
          price: 18000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 200,
    title: "Inspirational Anthem",
    artist: "Anthem Inspiration",
    genre: "Pop",
    key: "G Major",
    bpm: 128,
    duration: "3:30",
    metadata: {
      isrc: "USRC17607938",
      language: "English",
      explicit: false
    },
    tags: ["inspirational", "anthem", "uplifting", "powerful"],
    writers: ["Inspirational Writer", "Anthem Composer"],
    lyrics: "Rise up and reach for the stars\nYou've come so far, you'll go far\nThis inspirational anthem leads the way\nToward a brighter, better day",
    syncInfo: {
      mood: ["inspirational", "uplifting", "powerful"],
      instruments: ["piano", "drums", "electric guitar", "synth"],
      tempo: "fast",
      energy: "high",
      vocals: "female",
      explicit: false,
      genres: ["Pop", "Anthem"],
      subgenres: ["Inspirational", "Uplifting"],
      similar: ["Rachel Platten", "Katy Perry", "Kelly Clarkson"],
      themes: ["inspiration", "achievement", "triumph", "empowerment"],
      clearance: {
        masterRights: "Anthem Records",
        publishingRights: "Inspirational Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Sports", "Advertising", "Film"],
        restrictions: []
      },
      pricing: [
        {
          name: "Anthem License",
          usage: ["Sports", "Advertising", "Film"],
          price: 20000,
          term: "2 years",
          territories: ["Worldwide"]
        }
      ]
    }
  },
  {
    id: 201,
    title: "Peaceful Meditation",
    artist: "Meditation Masters",
    genre: "Ambient",
    key: "C Major",
    bpm: 60,
    duration: "8:00",
    metadata: {
      isrc: "USRC17607939",
      language: "Instrumental",
      explicit: false
    },
    tags: ["meditation", "peaceful", "relaxing", "zen"],
    writers: ["Meditation Writer", "Peaceful Composer"],
    lyrics: "",
    syncInfo: {
      mood: ["peaceful", "meditative", "serene"],
      instruments: ["singing bowls", "soft synth", "nature sounds", "flute"],
      tempo: "very slow",
      energy: "very low",
      vocals: "none",
      explicit: false,
      genres: ["Ambient", "New Age"],
      subgenres: ["Meditation", "Peaceful"],
      similar: ["Deuter", "Liquid Mind", "Steven Halpern"],
      themes: ["meditation", "peace", "mindfulness", "tranquility"],
      clearance: {
        masterRights: "Meditation Records",
        publishingRights: "Peaceful Publishing",
        territorialRestrictions: [],
        preClearedFor: ["Meditation Apps", "Wellness", "Spa"],
        restrictions: []
      },
      pricing: [
        {
          name: "Meditation License",
          usage: ["Meditation Apps", "Wellness", "Spa"],
          price: 10000,
          term: "3 years",
          territories: ["Worldwide"]
        }
      ]
    }
  }
];
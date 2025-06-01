import { Track } from "@/types/track";

// Generate random song data
const generateRandomSongs = (count: number): Track[] => {
  const songs: Track[] = [];
  
  const songTitles = [
    "Midnight Echoes", "Electric Dreams", "Neon Sunset", "Ocean Waves", 
    "Urban Symphony", "Desert Wind", "Crystal Rain", "Digital Pulse", 
    "Starlight Journey", "Cosmic Dance", "Velvet Moon", "Sapphire Sky",
    "Amber Horizon", "Emerald Forest", "Ruby Twilight", "Diamond Dawn",
    "Crimson Tide", "Azure Breeze", "Golden Hour", "Silver Lining",
    "Violet Mist", "Indigo Night", "Turquoise Sea", "Obsidian Shadow",
    "Jade Mountain", "Coral Reef", "Ivory Tower", "Onyx Dream",
    "Pearl River", "Cobalt Sky", "Platinum Stars", "Bronze Sunset",
    "Copper Dawn", "Steel City", "Iron Heart", "Mercury Rising",
    "Titanium Soul", "Chrome Horizon", "Neon Lights", "Laser Beam"
  ];
  
  const artists = [
    "Luna Ray", "The Neon Collective", "Sarah Chen", "Midnight Pulse",
    "Urban Echo", "Crystal Waters", "Digital Dreams", "Stellar Beat",
    "Nova Project", "Echo Valley", "Velvet Voice", "Sapphire Sound",
    "Amber Waves", "Emerald Isle", "Ruby Red", "Diamond Dust",
    "Crimson Sky", "Azure Blue", "Golden Touch", "Silver Sound",
    "Violet Hour", "Indigo Child", "Turquoise Tides", "Obsidian Night",
    "Jade Empire", "Coral Crush", "Ivory Keys", "Onyx Heart",
    "Pearl Jam", "Cobalt Dreams", "Platinum Records", "Bronze Age"
  ];
  
  const genres = [
    "Electronic", "Pop", "Rock", "Hip Hop", "R&B", "Jazz", "Classical", "Folk",
    "Country", "Blues", "Metal", "Reggae", "World", "Ambient", "Synthwave",
    "Lo-fi", "House", "Techno", "Drum & Bass", "Dubstep", "Trap", "Soul", "Funk"
  ];
  
  const keys = [
    "C", "G", "D", "A", "E", "B", "F#", "C#", "F", "Bb", "Eb", "Ab", "Db", "Gb",
    "Am", "Em", "Bm", "F#m", "C#m", "G#m", "Dm", "Gm", "Cm", "Fm", "Bbm", "Ebm"
  ];
  
  const moods = [
    "uplifting", "melancholic", "energetic", "calm", "aggressive", "romantic", 
    "mysterious", "epic", "playful", "dark", "dreamy", "nostalgic", "hopeful",
    "tense", "relaxed", "ethereal", "haunting", "triumphant", "whimsical", "intense"
  ];
  
  const instruments = [
    "piano", "guitar", "drums", "bass", "strings", "synthesizer", "vocals",
    "saxophone", "trumpet", "violin", "cello", "flute", "harp", "percussion",
    "organ", "electric guitar", "acoustic guitar", "synth bass", "pad", "brass"
  ];
  
  const themes = [
    "love", "loss", "journey", "growth", "conflict", "celebration", "nature",
    "technology", "space", "ocean", "city", "dreams", "memory", "time", "identity",
    "freedom", "struggle", "hope", "darkness", "light", "rebirth", "transformation"
  ];
  
  for (let i = 0; i < count; i++) {
    const id = 1000 + i;
    const titleIndex = Math.floor(Math.random() * songTitles.length);
    const artistIndex = Math.floor(Math.random() * artists.length);
    const genreIndex = Math.floor(Math.random() * genres.length);
    const keyIndex = Math.floor(Math.random() * keys.length);
    const bpm = Math.floor(Math.random() * 80) + 70; // 70-150 BPM
    
    // Generate random duration between 2:30 and 4:30
    const minutes = Math.floor(Math.random() * 2) + 2;
    const seconds = Math.floor(Math.random() * 60);
    const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Generate random tags
    const tags: string[] = [];
    const tagCount = Math.floor(Math.random() * 5) + 3; // 3-7 tags
    
    // Add genre as a tag
    tags.push(genres[genreIndex].toLowerCase());
    
    // Add random mood
    const moodIndex = Math.floor(Math.random() * moods.length);
    tags.push(moods[moodIndex]);
    
    // Add random instrument
    const instrumentIndex = Math.floor(Math.random() * instruments.length);
    tags.push(instruments[instrumentIndex]);
    
    // Add random theme
    const themeIndex = Math.floor(Math.random() * themes.length);
    tags.push(themes[themeIndex]);
    
    // Add more random tags if needed
    while (tags.length < tagCount) {
      const randomTagType = Math.floor(Math.random() * 3);
      let newTag;
      
      if (randomTagType === 0) {
        newTag = moods[Math.floor(Math.random() * moods.length)];
      } else if (randomTagType === 1) {
        newTag = instruments[Math.floor(Math.random() * instruments.length)];
      } else {
        newTag = themes[Math.floor(Math.random() * themes.length)];
      }
      
      if (!tags.includes(newTag)) {
        tags.push(newTag);
      }
    }
    
    // Generate random writers (1-3)
    const writerCount = Math.floor(Math.random() * 3) + 1;
    const writers: string[] = [];
    
    // Always add the artist as a writer
    writers.push(artists[artistIndex]);
    
    // Add more random writers if needed
    while (writers.length < writerCount) {
      const randomWriter = artists[Math.floor(Math.random() * artists.length)];
      if (!writers.includes(randomWriter)) {
        writers.push(randomWriter);
      }
    }
    
    // Generate random lyrics (placeholder)
    const lyrics = `Verse 1:
This is a placeholder for the lyrics of ${songTitles[titleIndex]}
By ${artists[artistIndex]}
A song about ${themes[themeIndex]}
With a ${moods[moodIndex]} mood

Chorus:
This is the chorus
Of this amazing song
With a catchy melody
That you can sing along`;
    
    // Generate random sync info
    const syncMoods = [moods[moodIndex]];
    const randomMoodCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < randomMoodCount; j++) {
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      if (!syncMoods.includes(randomMood)) {
        syncMoods.push(randomMood);
      }
    }
    
    const syncInstruments = [instruments[instrumentIndex]];
    const randomInstrumentCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < randomInstrumentCount; j++) {
      const randomInstrument = instruments[Math.floor(Math.random() * instruments.length)];
      if (!syncInstruments.includes(randomInstrument)) {
        syncInstruments.push(randomInstrument);
      }
    }
    
    // Generate random price between $2,000 and $20,000
    const basePrice = 2000 + Math.floor(Math.random() * 18000);
    const price = Math.round(basePrice / 1000) * 1000; // Round to nearest thousand
    
    const song: Track = {
      id,
      title: songTitles[titleIndex],
      artist: artists[artistIndex],
      genre: genres[genreIndex],
      key: keys[keyIndex],
      bpm,
      duration,
      metadata: {
        isrc: `USRC${id}`,
        upc: `${id}12345678901`,
        releaseDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        publisher: "Zen Music Publishing",
        copyright: `© 2024 ${artists[artistIndex]}`,
        producer: artists[Math.floor(Math.random() * artists.length)],
        mixer: artists[Math.floor(Math.random() * artists.length)],
        masteringEngineer: "Mastering Pro",
        recordingLocation: "Zen Studios",
        recordingDate: "2023-12-15",
        language: "English",
        explicit: Math.random() > 0.8, // 20% chance of being explicit
        territories: ["Worldwide"]
      },
      tags,
      writers,
      lyrics,
      syncInfo: {
        mood: syncMoods,
        instruments: syncInstruments,
        tempo: bpm < 90 ? "slow" : bpm < 120 ? "medium" : "fast",
        energy: bpm < 90 ? "low" : bpm < 120 ? "medium" : "high",
        vocals: Math.random() > 0.3 ? "male" : "female",
        explicit: Math.random() > 0.8,
        genres: [genres[genreIndex]],
        subgenres: [genres[Math.floor(Math.random() * genres.length)]],
        similar: [
          artists[Math.floor(Math.random() * artists.length)],
          artists[Math.floor(Math.random() * artists.length)]
        ],
        themes: [themes[themeIndex]],
        clearance: {
          masterRights: "Zen Records",
          publishingRights: "Zen Publishing",
          territorialRestrictions: [],
          preClearedFor: ["Web", "Social Media", "Film", "TV"],
          restrictions: ["Political campaigns", "Adult content"]
        },
        pricing: [
          {
            name: "Standard License",
            usage: ["Web", "Social Media"],
            price,
            term: "1 year",
            territories: ["Worldwide"]
          },
          {
            name: "Premium License",
            usage: ["Film", "TV", "Advertising"],
            price: price * 2,
            term: "Perpetual",
            territories: ["Worldwide"]
          }
        ]
      },
      status: {
        phase: "published",
        clearance: {
          industries: ["movies", "tv", "commercials"],
          restrictedCountries: []
        },
        monetization: true,
        public: true,
        price,
        progress: 100,
        approvals: [
          { id: "1", name: artists[artistIndex], role: "Artist", type: "Writer", status: "approved" },
          { id: "2", name: "Zen Records", role: "Publisher", type: "Publisher", status: "approved" }
        ]
      },
      rights: {
        writers: [
          { name: artists[artistIndex], role: "Composer/Lyricist", share: 100 }
        ],
        publishers: [
          { name: "Zen Publishing", share: 100, territories: ["Worldwide"] }
        ],
        masterOwners: [
          { name: "Zen Records", share: 100, territories: ["Worldwide"] }
        ]
      }
    };
    
    songs.push(song);
  }
  
  return songs;
};

export const randomSongs = generateRandomSongs(30);
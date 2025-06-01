import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  Search, 
  Play, 
  ShoppingCart, 
  Send, 
  Loader2, 
  Bot, 
  User,
  Sparkles,
  X,
  Music2,
  Timer,
  KeyRound,
  Disc3,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { discoverTracks } from "@/data/discoverTracks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface SearchResult {
  id: number;
  title: string;
  artist: string;
  genre?: string;
  bpm?: number;
  key?: string;
  price?: number;
}

// Define filter options
const INSTRUMENTS = [
  "Piano", "Guitar", "Drums", "Strings", "Bass", "Synthesizer", 
  "Vocals", "Saxophone", "Trumpet", "Violin", "Cello", "Flute", 
  "Harp", "Percussion", "Organ", "Electric Guitar"
];

const BPM_RANGES = [
  "60-80 (Slow)", "80-100 (Moderate)", "100-120 (Medium)", 
  "120-140 (Upbeat)", "140-160 (Fast)", "160+ (Very Fast)"
];

const KEYS = [
  "C Major", "G Major", "D Major", "A Major", "E Major", "B Major",
  "F Major", "Bb Major", "Eb Major", "Ab Major", "Db Major", "Gb Major",
  "A Minor", "E Minor", "B Minor", "F# Minor", "C# Minor", "G# Minor",
  "D Minor", "G Minor", "C Minor", "F Minor", "Bb Minor", "Eb Minor"
];

const GENRES = [
  "Pop", "Rock", "Electronic", "Hip Hop", "R&B", "Jazz", "Classical", 
  "Folk", "Country", "Blues", "Metal", "Reggae", "World", "Ambient", 
  "Indie", "Soul", "Funk", "Disco", "Techno", "House"
];

export function SearchCatalogPage({ onAddToCart }: { onAddToCart: (id: number) => void }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm your AI music search assistant specializing in sync licensing. How can I help you find the perfect music for your project today? You can describe the mood, style, genre, or specific use case you have in mind."
    }
  ]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeFilters, setActiveFilters] = useState<{
    instruments: string[];
    bpmRange: string[];
    keys: string[];
    genres: string[];
  }>({
    instruments: [],
    bpmRange: [],
    keys: [],
    genres: []
  });

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = async () => {
    if (!query.trim() || isSearching) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query
    };
    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    setIsSearching(true);
    
    try {
      // Attempt to fetch from n8n webhook with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch('https://all-encore.app.n8n.cloud/webhook-test/receive-user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: userMessage.content,
          filters: activeFilters
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setSearchResults(data);
        
        // Create assistant response with actual data
        const assistantResponse = generateAssistantResponse(data);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: assistantResponse
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error("Search error:", error);
      
      // Always generate 5 random results regardless of the query
      const randomResults = generateRandomResults();
      setSearchResults(randomResults);
      
      // Create assistant response with random data
      const assistantResponse = generateAssistantResponse(randomResults);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantResponse
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsSearching(false);
    }
  };

  const generateAssistantResponse = (results: SearchResult[]): string => {
    // Always generate a response as if we found 5 tracks
    return `Here are 5 tracks that might be a great fit for your request:

${results.slice(0, 5).map((track, index) => `
${index + 1}. **Track Title:** ${track.title}
   **Artist Name:** ${track.artist}
   **Genre:** ${track.genre || "N/A"}
   **BPM:** ${track.bpm || "N/A"}
   **Key:** ${track.key || "N/A"}
   **Brief Description:** ${generateTrackDescription(track)}
   **Cover Art:** ![${track.title}](https://picsum.photos/seed/${track.id}/200/200)
`).join('\n')}

Would you like me to refine these results further or suggest tracks with different characteristics?`;
  };

  const generateTrackDescription = (track: SearchResult): string => {
    const descriptions = [
      `Perfect match with its ${track.genre?.toLowerCase() || ""} vibe and engaging rhythm`,
      `Catchy and energetic, ideal for creating an engaging atmosphere`,
      `Unique blend of style and mood that suits your requirements`,
      `Compelling composition with professional production quality`,
      `Distinctive sound that would add depth to your project`,
      `Emotional journey that resonates with the audience`,
      `Versatile track that works well across different media`,
      `Modern production with timeless appeal`,
      `Authentic sound with commercial potential`,
      `Cinematic quality that enhances visual storytelling`
    ];
    
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  // Generate 5 random results regardless of query
  const generateRandomResults = (): SearchResult[] => {
    // Set static prices between 2k and 200k
    const tracksWithPrices = discoverTracks.map(track => {
      // Generate a deterministic but varied price based on track id
      const basePrice = 2000 + (track.id * 1337) % 198000;
      // Round to nearest thousand
      const roundedPrice = Math.round(basePrice / 1000) * 1000;
      return {
        ...track,
        price: roundedPrice
      };
    });
    
    // Shuffle the tracks array
    const shuffled = [...tracksWithPrices].sort(() => 0.5 - Math.random());
    
    // Take the first 5 tracks
    return shuffled.slice(0, 5).map(track => ({
      id: track.id,
      title: track.title,
      artist: track.artist,
      genre: track.genre,
      bpm: track.bpm,
      key: track.key,
      price: track.price
    }));
  };

  const generateMockResults = (query: string): SearchResult[] => {
    const lowercaseQuery = query.toLowerCase();
    
    // Set static prices between 2k and 200k
    const tracksWithPrices = discoverTracks.map(track => {
      // Generate a deterministic but varied price based on track id
      const basePrice = 2000 + (track.id * 1337) % 198000;
      // Round to nearest thousand
      const roundedPrice = Math.round(basePrice / 1000) * 1000;
      return {
        ...track,
        price: roundedPrice
      };
    });
    
    // Apply filters
    let filteredTracks = tracksWithPrices;
    
    // Filter by instruments (simulated)
    if (activeFilters.instruments.length > 0) {
      filteredTracks = filteredTracks.filter(track => 
        activeFilters.instruments.some(instrument => 
          track.syncInfo.instruments.some(i => 
            i.toLowerCase().includes(instrument.toLowerCase())
          )
        )
      );
    }
    
    // Filter by BPM range (simulated)
    if (activeFilters.bpmRange.length > 0) {
      filteredTracks = filteredTracks.filter(track => {
        return activeFilters.bpmRange.some(range => {
          if (range.includes("60-80")) return track.bpm >= 60 && track.bpm <= 80;
          if (range.includes("80-100")) return track.bpm >= 80 && track.bpm <= 100;
          if (range.includes("100-120")) return track.bpm >= 100 && track.bpm <= 120;
          if (range.includes("120-140")) return track.bpm >= 120 && track.bpm <= 140;
          if (range.includes("140-160")) return track.bpm >= 140 && track.bpm <= 160;
          if (range.includes("160+")) return track.bpm >= 160;
          return true;
        });
      });
    }
    
    // Filter by key (simulated)
    if (activeFilters.keys.length > 0) {
      filteredTracks = filteredTracks.filter(track => 
        activeFilters.keys.some(key => 
          track.key.toLowerCase() === key.toLowerCase()
        )
      );
    }
    
    // Filter by genre (simulated)
    if (activeFilters.genres.length > 0) {
      filteredTracks = filteredTracks.filter(track => 
        activeFilters.genres.some(genre => 
          track.genre.toLowerCase() === genre.toLowerCase()
        )
      );
    }
    
    // Instead of filtering by query, just return 5 random tracks
    return filteredTracks
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map(track => ({
        id: track.id,
        title: track.title,
        artist: track.artist,
        genre: track.genre,
        bpm: track.bpm,
        key: track.key,
        price: track.price
      }));
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi there! I'm your AI music search assistant specializing in sync licensing. How can I help you find the perfect music for your project today? You can describe the mood, style, genre, or specific use case you have in mind."
      }
    ]);
    setSearchResults([]);
    setActiveFilters({
      instruments: [],
      bpmRange: [],
      keys: [],
      genres: []
    });
  };

  const toggleFilter = (category: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => {
      const current = [...prev[category]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        // Add filter
        return {
          ...prev,
          [category]: [...current, value]
        };
      } else {
        // Remove filter
        current.splice(index, 1);
        return {
          ...prev,
          [category]: current
        };
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">AI Music Search</h1>
        <Button variant="outline" size="sm" onClick={clearChat}>
          <X className="h-4 w-4 mr-2" />
          Clear Chat
        </Button>
      </div>
      
      {/* Filter buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="text-sm text-muted-foreground">Filter by:</div>
        
        {/* Instruments filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "gap-1",
                activeFilters.instruments.length > 0 && "bg-primary/10 text-primary border-primary/50"
              )}
            >
              <Music2 className="h-4 w-4 mr-1" />
              Instruments
              {activeFilters.instruments.length > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-1 bg-primary/20 text-primary"
                >
                  {activeFilters.instruments.length}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <ScrollArea className="h-64">
              <div className="p-2 grid grid-cols-1 gap-1">
                {INSTRUMENTS.map(instrument => (
                  <Button
                    key={instrument}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "justify-start font-normal",
                      activeFilters.instruments.includes(instrument) && "bg-primary/10 text-primary"
                    )}
                    onClick={() => toggleFilter('instruments', instrument)}
                  >
                    <div className="flex items-center">
                      {activeFilters.instruments.includes(instrument) ? (
                        <div className="h-3 w-3 rounded-full bg-primary mr-2" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border border-muted-foreground mr-2" />
                      )}
                      {instrument}
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
        
        {/* BPM filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "gap-1",
                activeFilters.bpmRange.length > 0 && "bg-primary/10 text-primary border-primary/50"
              )}
            >
              <Timer className="h-4 w-4 mr-1" />
              BPM
              {activeFilters.bpmRange.length > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-1 bg-primary/20 text-primary"
                >
                  {activeFilters.bpmRange.length}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0" align="start">
            <div className="p-2 grid grid-cols-1 gap-1">
              {BPM_RANGES.map(range => (
                <Button
                  key={range}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "justify-start font-normal",
                    activeFilters.bpmRange.includes(range) && "bg-primary/10 text-primary"
                  )}
                  onClick={() => toggleFilter('bpmRange', range)}
                >
                  <div className="flex items-center">
                    {activeFilters.bpmRange.includes(range) ? (
                      <div className="h-3 w-3 rounded-full bg-primary mr-2" />
                    ) : (
                      <div className="h-3 w-3 rounded-full border border-muted-foreground mr-2" />
                    )}
                    {range}
                  </div>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Key filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "gap-1",
                activeFilters.keys.length > 0 && "bg-primary/10 text-primary border-primary/50"
              )}
            >
              <KeyRound className="h-4 w-4 mr-1" />
              Key
              {activeFilters.keys.length > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-1 bg-primary/20 text-primary"
                >
                  {activeFilters.keys.length}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0" align="start">
            <ScrollArea className="h-64">
              <div className="p-2 grid grid-cols-1 gap-1">
                {KEYS.map(key => (
                  <Button
                    key={key}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "justify-start font-normal",
                      activeFilters.keys.includes(key) && "bg-primary/10 text-primary"
                    )}
                    onClick={() => toggleFilter('keys', key)}
                  >
                    <div className="flex items-center">
                      {activeFilters.keys.includes(key) ? (
                        <div className="h-3 w-3 rounded-full bg-primary mr-2" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border border-muted-foreground mr-2" />
                      )}
                      {key}
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
        
        {/* Genre filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "gap-1",
                activeFilters.genres.length > 0 && "bg-primary/10 text-primary border-primary/50"
              )}
            >
              <Disc3 className="h-4 w-4 mr-1" />
              Genre
              {activeFilters.genres.length > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-1 bg-primary/20 text-primary"
                >
                  {activeFilters.genres.length}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0" align="start">
            <ScrollArea className="h-64">
              <div className="p-2 grid grid-cols-1 gap-1">
                {GENRES.map(genre => (
                  <Button
                    key={genre}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "justify-start font-normal",
                      activeFilters.genres.includes(genre) && "bg-primary/10 text-primary"
                    )}
                    onClick={() => toggleFilter('genres', genre)}
                  >
                    <div className="flex items-center">
                      {activeFilters.genres.includes(genre) ? (
                        <div className="h-3 w-3 rounded-full bg-primary mr-2" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border border-muted-foreground mr-2" />
                      )}
                      {genre}
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
        
        {/* Active filters summary */}
        {(activeFilters.instruments.length > 0 || 
          activeFilters.bpmRange.length > 0 || 
          activeFilters.keys.length > 0 || 
          activeFilters.genres.length > 0) && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground"
            onClick={() => setActiveFilters({
              instruments: [],
              bpmRange: [],
              keys: [],
              genres: []
            })}
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat interface */}
        <div className="lg:col-span-2 flex flex-col h-[calc(100vh-12rem)]">
          <div className="flex-1 rounded-t-lg border border-border bg-card-gradient overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="p-3 border-b flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-medium">Music Search Assistant</span>
              </div>
              
              <div className="flex-1 overflow-auto p-4">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={cn(
                        "flex items-start gap-3",
                        message.role === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8 mt-1">
                          <div className="bg-primary/10 h-full w-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        </Avatar>
                      )}
                      
                      <div 
                        className={cn(
                          "rounded-lg p-3 max-w-[80%]",
                          message.role === 'user' 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        )}
                      >
                        <div className="whitespace-pre-wrap prose prose-invert prose-sm max-w-none">
                          {message.content}
                        </div>
                      </div>
                      
                      {message.role === 'user' && (
                        <Avatar className="h-8 w-8 mt-1">
                          <div className="bg-primary/10 h-full w-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isSearching && (
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 mt-1">
                        <div className="bg-primary/10 h-full w-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      </Avatar>
                      <div className="rounded-lg p-3 bg-muted">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Searching for music...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    placeholder="Ask me to find music for your project..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isSearching) {
                        handleSearch();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSearch} 
                    disabled={isSearching || !query.trim()}
                  >
                    {isSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Try: "upbeat pop songs for a commercial" or "ambient tracks with piano"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results panel */}
        <div className="rounded-lg border bg-card-gradient overflow-hidden">
          <div className="p-3 border-b">
            <h3 className="font-medium">Search Results</h3>
          </div>
          
          <div className="p-4">
            {searchResults.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No results yet</h3>
                <p>Search for music to see results here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <div 
                    key={result.id}
                    className="p-4 rounded-lg border bg-card hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-16 w-16 rounded-md overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/${result.id}/200/200`}
                          alt={result.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{result.title}</div>
                        <div className="text-sm text-muted-foreground">{result.artist}</div>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {result.genre && (
                            <Badge variant="secondary" className="bg-pink-600/10 text-pink-600">
                              {result.genre}
                            </Badge>
                          )}
                          {result.bpm && (
                            <Badge variant="secondary">
                              {result.bpm} BPM
                            </Badge>
                          )}
                          {result.key && (
                            <Badge variant="secondary">
                              {result.key}
                            </Badge>
                          )}
                          {result.price && (
                            <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                              ${result.price.toLocaleString()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" className="w-full">
                        <Play className="h-3 w-3 mr-2" />
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => onAddToCart(result.id)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
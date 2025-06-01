import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/hooks/useLocation";
import { Zap, Search, Loader2, Music, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface SongResult {
  title: string;
  artist: string;
  genre?: string;
  bpm?: number;
  key?: string;
}

export function LandingPage() {
  const { navigate } = useLocation();
  const [hoveredSide, setHoveredSide] = useState<'rights' | 'licensors' | null>(null);
  const [logoError, setLogoError] = useState(false);
  
  // Chatbot state
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SongResult[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([]);
  const [error, setError] = useState<string | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setError(null);
    
    // Add user message to chat
    setChatMessages(prev => [...prev, { type: 'user', content: query }]);
    
    try {
      // Replace this URL with your actual n8n webhook URL
      const response = await fetch('https://your-n8n-webhook-url.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add bot response to chat
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        content: `Here are some songs that match your search for "${query}":` 
      }]);
      
      // Set search results
      setSearchResults(data);
    } catch (err) {
      console.error('Error searching songs:', err);
      setError('Sorry, there was an error processing your request. Please try again.');
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, there was an error processing your request. Please try again.' 
      }]);
    } finally {
      setIsSearching(false);
      setQuery("");
    }
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  // Mock search results for demonstration
  const mockSearch = () => {
    setIsSearching(true);
    setError(null);
    
    // Add user message to chat
    setChatMessages(prev => [...prev, { type: 'user', content: query }]);
    
    // Simulate API delay
    setTimeout(() => {
      // Add bot response to chat
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        content: `Here are some songs that match your search for "${query}":` 
      }]);
      
      // Mock results based on query
      const mockResults: SongResult[] = [
        { title: "Summer Vibes", artist: "Sarah Chen", genre: "Pop", bpm: 120, key: "C Major" },
        { title: "Electric Dreams", artist: "Neon Pulse", genre: "Electronic", bpm: 128, key: "F#m" },
        { title: "Urban Echoes", artist: "The Night Collective", genre: "Alternative", bpm: 95, key: "Em" },
        { title: "Ocean Waves", artist: "Crystal Waters", genre: "Ambient", bpm: 85, key: "Dm" },
        { title: "Midnight Drive", artist: "Luna Ray", genre: "Synthwave", bpm: 110, key: "Cm" },
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
      setQuery("");
    }, 1500);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Background with blurred logo */}
      {!logoError && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img 
            src="/zen-logo.png" 
            alt="Zen Logo Background" 
            className="w-[80%] max-w-4xl"
            onError={() => setLogoError(true)}
          />
        </div>
      )}
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Zap className="h-8 w-8 sm:h-12 sm:w-12 text-primary mr-3 sm:mr-4" />
            {!logoError && (
              <img 
                src="/zen-logo.png" 
                alt="Zen Logo" 
                className="h-10 sm:h-16"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4 tracking-tight">
            Zen Sync Platform
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground">
            Redefining Sync Forever
          </p>
        </div>

        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 sm:gap-8 px-4">
          <div 
            className={cn(
              "relative rounded-2xl border border-border p-6 transition-all duration-300",
              "bg-gradient-to-b from-card/80 to-card/40",
              "hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20",
              "w-full md:w-1/2 max-h-[400px] overflow-auto",
              hoveredSide === 'rights' ? "scale-[1.02]" : hoveredSide === 'licensors' ? "scale-[0.98] opacity-90" : ""
            )}
            onMouseEnter={() => setHoveredSide('rights')}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">For Rights Holders</h2>
            <p className="text-muted-foreground mb-4 sm:mb-6">
              Manage your catalog, upload tracks, and monetize your music through sync licensing opportunities.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Upload and manage your music catalog</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Receive sync licensing requests</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Track analytics and performance</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Manage rights and metadata</span>
              </li>
            </ul>
            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate("/tracks")}
            >
              Enter Catalog Management
            </Button>
          </div>

          <div 
            className={cn(
              "relative rounded-2xl border border-border p-6 transition-all duration-300",
              "bg-gradient-to-b from-card/80 to-card/40",
              "hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20",
              "w-full md:w-1/2 max-h-[400px] overflow-auto",
              hoveredSide === 'licensors' ? "scale-[1.02]" : hoveredSide === 'rights' ? "scale-[0.98] opacity-90" : ""
            )}
            onMouseEnter={() => setHoveredSide('licensors')}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">For Licensors</h2>
            <p className="text-muted-foreground mb-4 sm:mb-6">
              Discover and license music for your projects with our extensive catalog and instant licensing options.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Search for the perfect track</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Instant licensing with clear pricing</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Submit custom sync requests</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Download high-quality files</span>
              </li>
            </ul>
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => navigate("/discover")}
              >
                Discover Music
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={toggleChatbot}
              >
                <Search className="h-4 w-4 mr-2" />
                Search Our Catalog
              </Button>
            </div>

            {/* Chatbot Interface */}
            {showChatbot && (
              <div className="mt-4 border rounded-lg bg-card/50 overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-2">
                    <Music className="h-4 w-4 text-primary" />
                    <span className="font-medium">Song Search Assistant</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={toggleChatbot}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-3">
                  <ScrollArea className="h-[200px] mb-3">
                    <div className="space-y-3">
                      {chatMessages.length === 0 && (
                        <div className="text-center text-sm text-muted-foreground py-4">
                          Ask me to find songs for your project!
                        </div>
                      )}
                      
                      {chatMessages.map((message, index) => (
                        <div 
                          key={index} 
                          className={cn(
                            "p-2 rounded-lg max-w-[80%]",
                            message.type === 'user' 
                              ? "bg-primary/10 ml-auto" 
                              : "bg-muted mr-auto"
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      ))}
                      
                      {searchResults.length > 0 && (
                        <div className="space-y-2 mt-2">
                          {searchResults.map((song, index) => (
                            <div 
                              key={index}
                              className="p-2 rounded-lg bg-card border border-border"
                            >
                              <div className="font-medium">{song.title}</div>
                              <div className="text-sm text-muted-foreground">{song.artist}</div>
                              <div className="flex items-center gap-2 mt-1">
                                {song.genre && (
                                  <Badge variant="secondary" className="text-xs">
                                    {song.genre}
                                  </Badge>
                                )}
                                {song.bpm && (
                                  <Badge variant="secondary" className="text-xs">
                                    {song.bpm} BPM
                                  </Badge>
                                )}
                                {song.key && (
                                  <Badge variant="secondary" className="text-xs">
                                    {song.key}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {error && (
                        <div className="p-2 rounded-lg bg-destructive/10 text-destructive text-sm">
                          {error}
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., upbeat pop songs for a commercial"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isSearching) {
                          mockSearch();
                        }
                      }}
                    />
                    <Button 
                      onClick={mockSearch} 
                      disabled={isSearching || !query.trim()}
                    >
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="p-4 sm:p-6 text-center text-sm text-muted-foreground">
        © 2025 Zen Sync Platform. All rights reserved.
      </footer>
    </div>
  );
}
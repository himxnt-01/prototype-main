import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Filter, 
  ArrowDownUp, 
  Play, 
  Pause, 
  Heart, 
  ShoppingCart, 
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Flame,
  Music,
  Video,
  Gamepad,
  Plane,
  Briefcase,
  Film,
  Loader2,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { discoverTracks } from "@/data/discoverTracks";
import { DiscoverSidebar } from "@/components/discover/DiscoverSidebar";
import { StoresPage } from "./discover/StoresPage";
import { PurchasesPage } from "./discover/PurchasesPage";
import { InboxTeamPage } from "./discover/InboxTeamPage";
import { ProjectsPage } from "./discover/ProjectsPage";
import { GenresPage } from "./discover/GenresPage";
import { MoodsPage } from "./discover/MoodsPage";
import { CollectionsPage } from "./discover/CollectionsPage";
import { CheckoutPage } from "./discover/CheckoutPage";
import { SearchCatalogPage } from "./discover/SearchCatalogPage";
import { useLocation } from "@/hooks/useLocation";

export function DiscoverPage() {
  const { navigate } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("discover");
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);

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

  const togglePlayTrack = (id: number) => {
    if (playingTrackId === id) {
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(id);
    }
  };

  const toggleCart = (id: number) => {
    if (cartItems.includes(id)) {
      setCartItems(cartItems.filter(itemId => itemId !== id));
    } else {
      setCartItems([...cartItems, id]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter tracks based on search and selected tags
  const filteredTracks = tracksWithPrices.filter(track => {
    // Search filter
    const matchesSearch = 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Tag filter
    if (selectedTags.length > 0) {
      return selectedTags.every(tag => 
        track.tags.includes(tag.toLowerCase()) || 
        track.genre.toLowerCase() === tag.toLowerCase() ||
        track.syncInfo.mood.includes(tag.toLowerCase())
      );
    }
    
    return true;
  });

  // Define mood and context tags
  const moodTags = [
    "Uplifting", "Emotional", "Energetic", "Calm", "Dark", "Inspirational", 
    "Dreamy", "Intense", "Playful", "Romantic", "Mysterious", "Epic"
  ];
  
  const contextTags = [
    "Cinematic", "Corporate", "Documentary", "Travel", "Sports", "Technology", 
    "Fashion", "Nature", "Urban", "Retro", "Futuristic", "Minimal"
  ];

  // Define context-based track groupings with at least 10 tracks each
  const contextGroups = [
    { 
      id: "tiktok", 
      name: "For TikTok-style Ads", 
      icon: <Video className="h-4 w-4" />,
      tracks: tracksWithPrices.filter(t => 
        t.bpm > 100 && 
        ["energetic", "upbeat", "playful"].some(mood => 
          t.syncInfo.mood.includes(mood)
        )
      ).slice(0, 10)
    },
    { 
      id: "emotional", 
      name: "For Emotional Short Films", 
      icon: <Film className="h-4 w-4" />,
      tracks: tracksWithPrices.filter(t => 
        ["emotional", "melancholic", "dramatic"].some(mood => 
          t.syncInfo.mood.includes(mood)
        )
      ).slice(0, 10)
    },
    { 
      id: "corporate", 
      name: "For Corporate Videos", 
      icon: <Briefcase className="h-4 w-4" />,
      tracks: tracksWithPrices.filter(t => 
        ["corporate", "professional", "clean"].some(mood => 
          t.syncInfo.mood.includes(mood)
        ) || 
        t.genre === "Ambient"
      ).slice(0, 10)
    },
    { 
      id: "gaming", 
      name: "For Gaming Content", 
      icon: <Gamepad className="h-4 w-4" />,
      tracks: tracksWithPrices.filter(t => 
        t.bpm > 120 || 
        ["energetic", "epic", "intense"].some(mood => 
          t.syncInfo.mood.includes(mood)
        )
      ).slice(0, 10)
    },
    { 
      id: "travel", 
      name: "For Travel Vlogs", 
      icon: <Plane className="h-4 w-4" />,
      tracks: tracksWithPrices.filter(t => 
        ["uplifting", "inspirational", "peaceful"].some(mood => 
          t.syncInfo.mood.includes(mood)
        )
      ).slice(0, 10)
    }
  ];

  // Ensure each context group has at least 10 tracks
  contextGroups.forEach(group => {
    if (group.tracks.length < 10) {
      // Add more tracks to reach 10
      const additionalTracks = tracksWithPrices.filter(t => !group.tracks.includes(t)).slice(0, 10 - group.tracks.length);
      group.tracks = [...group.tracks, ...additionalTracks];
    }
  });

  // If checkout is active, show the checkout page
  if (isCheckout) {
    return <CheckoutPage cartItems={cartItems} />;
  }

  // Render different content based on current tab
  const renderContent = () => {
    switch (currentTab) {
      case "genres":
        return <GenresPage onAddToCart={toggleCart} cartItems={cartItems} onPlayTrack={togglePlayTrack} playingTrackId={playingTrackId} />;
      case "moods":
        return <MoodsPage onAddToCart={toggleCart} cartItems={cartItems} onPlayTrack={togglePlayTrack} playingTrackId={playingTrackId} />;
      case "collections":
        return <CollectionsPage />;
      case "stores":
        return <StoresPage onAddToCart={toggleCart} cartItems={cartItems} />;
      case "purchases":
        return <PurchasesPage />;
      case "inbox":
        return <InboxTeamPage />;
      case "projects":
        return <ProjectsPage onAddToCart={toggleCart} cartItems={cartItems} />;
      case "search":
        return <SearchCatalogPage onAddToCart={toggleCart} />;
      default:
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Discover Music</h1>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search tracks..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowDownUp className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            {/* AI Tag-Based Discovery Module */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">AI Tag Discovery</h2>
                </div>
                {selectedTags.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedTags([])}
                  >
                    Clear Tags
                  </Button>
                )}
              </div>

              <div className="mb-6 space-y-3 overflow-hidden">
                {/* First row of tags - moving right */}
                <div className="relative w-full overflow-hidden">
                  <div className="flex gap-2 animate-slide hover:pause whitespace-nowrap py-1">
                    {[...moodTags, ...moodTags].map((tag, i) => (
                      <Button
                        key={i}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "whitespace-nowrap",
                          selectedTags.includes(tag) && "bg-primary/20 text-primary hover:bg-primary/30"
                        )}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Second row of tags - moving left */}
                <div className="relative w-full overflow-hidden">
                  <div className="flex gap-2 animate-slide-reverse hover:pause whitespace-nowrap py-1">
                    {[...contextTags, ...contextTags].map((tag, i) => (
                      <Button
                        key={i}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "whitespace-nowrap",
                          selectedTags.includes(tag) && "bg-primary/20 text-primary hover:bg-primary/30"
                        )}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {selectedTags.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Results for: {selectedTags.join(", ")}</h3>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative w-full overflow-hidden">
                    <div className="flex carousel-track animate-slide hover:pause">
                      {filteredTracks.slice(0, Math.max(10, filteredTracks.length)).map((track) => (
                        <div key={track.id} className="carousel-track-item">
                          <TrackCard 
                            track={track}
                            isPlaying={playingTrackId === track.id}
                            isInCart={cartItems.includes(track.id)}
                            onPlay={() => togglePlayTrack(track.id)}
                            onAddToCart={() => toggleCart(track.id)}
                            selectedTags={selectedTags}
                          />
                        </div>
                      ))}
                      {/* Duplicate tracks to ensure continuous flow */}
                      {filteredTracks.slice(0, Math.max(10, filteredTracks.length)).map((track) => (
                        <div key={`dup-${track.id}`} className="carousel-track-item">
                          <TrackCard 
                            track={track}
                            isPlaying={playingTrackId === track.id}
                            isInCart={cartItems.includes(track.id)}
                            onPlay={() => togglePlayTrack(track.id)}
                            onAddToCart={() => toggleCart(track.id)}
                            selectedTags={selectedTags}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {!selectedTags.length && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {tracksWithPrices.slice(0, 12).map((track) => (
                    <TrackCard 
                      key={track.id}
                      track={track}
                      isPlaying={playingTrackId === track.id}
                      isInCart={cartItems.includes(track.id)}
                      onPlay={() => togglePlayTrack(track.id)}
                      onAddToCart={() => toggleCart(track.id)}
                      selectedTags={selectedTags}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Smart Feed */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-yellow-500" />
                <h2 className="text-xl font-semibold">Smart Feed</h2>
              </div>

              <div className="space-y-8">
                {/* Recommended for You */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Recommended for You</h3>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative w-full overflow-hidden">
                    <div className="flex carousel-track animate-slide hover:pause">
                      {tracksWithPrices.slice(0, 10).map((track) => (
                        <div key={track.id} className="carousel-track-item">
                          <TrackCard 
                            track={track}
                            isPlaying={playingTrackId === track.id}
                            isInCart={cartItems.includes(track.id)}
                            onPlay={() => togglePlayTrack(track.id)}
                            onAddToCart={() => toggleCart(track.id)}
                            selectedTags={selectedTags}
                          />
                        </div>
                      ))}
                      {/* Duplicate tracks to ensure continuous flow */}
                      {tracksWithPrices.slice(0, 10).map((track) => (
                        <div key={`dup-${track.id}`} className="carousel-track-item">
                          <TrackCard 
                            track={track}
                            isPlaying={playingTrackId === track.id}
                            isInCart={cartItems.includes(track.id)}
                            onPlay={() => togglePlayTrack(track.id)}
                            onAddToCart={() => toggleCart(track.id)}
                            selectedTags={selectedTags}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trending This Week */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">Trending This Week</h3>
                      <Badge variant="secondary" className="bg-red-500/10 text-red-500">
                        <Flame className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative w-full overflow-hidden">
                    <div className="flex carousel-track animate-slide-reverse hover:pause">
                      {tracksWithPrices.slice(6, 16).map((track) => (
                        <div key={track.id} className="carousel-track-item">
                          <TrackCard 
                            track={track}
                            isPlaying={playingTrackId === track.id}
                            isInCart={cartItems.includes(track.id)}
                            onPlay={() => togglePlayTrack(track.id)}
                            onAddToCart={() => toggleCart(track.id)}
                            selectedTags={selectedTags}
                          />
                        </div>
                      ))}
                      {/* Duplicate tracks to ensure continuous flow */}
                      {tracksWithPrices.slice(6, 16).map((track) => (
                        <div key={`dup-${track.id}`} className="carousel-track-item">
                          <TrackCard 
                            track={track}
                            isPlaying={playingTrackId === track.id}
                            isInCart={cartItems.includes(track.id)}
                            onPlay={() => togglePlayTrack(track.id)}
                            onAddToCart={() => toggleCart(track.id)}
                            selectedTags={selectedTags}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Music by Context */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Music className="h-5 w-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Music by Context</h2>
              </div>

              <div className="space-y-8">
                {contextGroups.map((group, index) => (
                  <div key={group.id}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{group.name}</h3>
                        {group.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="relative w-full overflow-hidden">
                      <div className={cn(
                        "flex carousel-track",
                        index % 2 === 0 ? "animate-slide" : "animate-slide-reverse",
                        "hover:pause"
                      )}>
                        {group.tracks.map((track) => (
                          <div key={track.id} className="carousel-track-item">
                            <TrackCard 
                              track={track}
                              isPlaying={playingTrackId === track.id}
                              isInCart={cartItems.includes(track.id)}
                              onPlay={() => togglePlayTrack(track.id)}
                              onAddToCart={() => toggleCart(track.id)}
                              selectedTags={selectedTags}
                            />
                          </div>
                        ))}
                        {/* Duplicate tracks to ensure continuous flow */}
                        {group.tracks.map((track) => (
                          <div key={`dup-${track.id}`} className="carousel-track-item">
                            <TrackCard 
                              track={track}
                              isPlaying={playingTrackId === track.id}
                              isInCart={cartItems.includes(track.id)}
                              onPlay={() => togglePlayTrack(track.id)}
                              onAddToCart={() => toggleCart(track.id)}
                              selectedTags={selectedTags}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">
      <DiscoverSidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      <main className="flex-1 overflow-auto">
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
          <div className="flex items-center justify-end h-16 px-8">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => cartItems.length > 0 && setIsCheckout(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}

interface TrackCardProps {
  track: typeof tracksWithPrices[0];
  isPlaying: boolean;
  isInCart: boolean;
  onPlay: () => void;
  onAddToCart: () => void;
  selectedTags: string[];
}

function TrackCard({ track, isPlaying, isInCart, onPlay, onAddToCart, selectedTags }: TrackCardProps) {
  // Determine which tags to highlight based on selected tags
  const highlightedTags = selectedTags.filter(tag => 
    track.tags.includes(tag.toLowerCase()) || 
    track.genre.toLowerCase() === tag.toLowerCase() ||
    track.syncInfo.mood.includes(tag.toLowerCase())
  );

  return (
    <div className={cn(
      "group relative aspect-square rounded-lg overflow-hidden h-full w-full",
      "border border-border bg-card-gradient hover:bg-card transition-colors"
    )}>
      <img 
        src={`https://picsum.photos/seed/${track.id}/400/400`} 
        alt={track.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      
      <div className="absolute inset-0 p-4 flex flex-col">
        <div className="flex-1" />
        
        <div className="space-y-1">
          <h3 className="text-lg font-semibold truncate">{track.title}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {track.artist}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className={cn(
              "bg-pink-600/10 text-pink-600",
              highlightedTags.includes(track.genre) && "bg-pink-600/30 text-pink-600"
            )}>
              {track.genre}
            </Badge>
            <Badge variant="secondary" className="bg-blue-600/10 text-blue-600">
              ${track.price.toLocaleString()}
            </Badge>
            {highlightedTags.length > 0 && highlightedTags.map(tag => (
              track.genre.toLowerCase() !== tag.toLowerCase() && (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-primary/20 text-primary"
                >
                  {tag}
                </Badge>
              )
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="secondary" 
          size="icon"
          className="h-8 w-8 bg-black/50 hover:bg-black/70"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          <ShoppingCart className={cn(
            "h-4 w-4",
            isInCart && "text-primary"
          )} />
        </Button>
      </div>

      <Button
        size="icon"
        className={cn(
          "absolute bottom-16 right-4",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-primary hover:bg-primary/90"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
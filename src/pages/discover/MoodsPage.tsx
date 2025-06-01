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
  ShoppingCart, 
  Heart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { discoverTracks } from "@/data/discoverTracks";

// Define mood data
const MOODS = [
  { id: "uplifting", name: "Uplifting", image: "https://picsum.photos/seed/uplifting/400/200" },
  { id: "emotional", name: "Emotional", image: "https://picsum.photos/seed/emotional/400/200" },
  { id: "energetic", name: "Energetic", image: "https://picsum.photos/seed/energetic/400/200" },
  { id: "calm", name: "Calm", image: "https://picsum.photos/seed/calm/400/200" },
  { id: "dark", name: "Dark", image: "https://picsum.photos/seed/dark/400/200" },
  { id: "inspirational", name: "Inspirational", image: "https://picsum.photos/seed/inspirational/400/200" },
  { id: "dreamy", name: "Dreamy", image: "https://picsum.photos/seed/dreamy/400/200" },
  { id: "intense", name: "Intense", image: "https://picsum.photos/seed/intense/400/200" },
  { id: "playful", name: "Playful", image: "https://picsum.photos/seed/playful/400/200" },
  { id: "romantic", name: "Romantic", image: "https://picsum.photos/seed/romantic/400/200" },
  { id: "mysterious", name: "Mysterious", image: "https://picsum.photos/seed/mysterious/400/200" },
  { id: "epic", name: "Epic", image: "https://picsum.photos/seed/epic/400/200" }
];

interface MoodsPageProps {
  onAddToCart: (trackId: number) => void;
  cartItems: number[];
  onPlayTrack: (id: number) => void;
  playingTrackId: number | null;
}

export function MoodsPage({ onAddToCart, cartItems, onPlayTrack, playingTrackId }: MoodsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

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

  // Filter moods based on search
  const filteredMoods = MOODS.filter(mood => 
    mood.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get tracks for selected mood
  const getMoodTracks = (moodName: string) => {
    return tracksWithPrices.filter(track => 
      track.syncInfo.mood.some(m => m.toLowerCase() === moodName.toLowerCase()) ||
      track.tags.includes(moodName.toLowerCase())
    );
  };

  // Ensure each mood has at least 10 tracks
  const getTracksForMood = (moodName: string) => {
    const moodTracks = getMoodTracks(moodName);
    if (moodTracks.length >= 10) return moodTracks;
    
    // Add more tracks to reach 10
    const additionalTracks = tracksWithPrices
      .filter(t => !moodTracks.includes(t))
      .slice(0, 10 - moodTracks.length);
    
    return [...moodTracks, ...additionalTracks];
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Browse by Mood</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search moods..." 
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

      {!selectedMood ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMoods.map((mood) => (
            <div 
              key={mood.id}
              className={cn(
                "aspect-video rounded-lg overflow-hidden relative",
                "border border-border bg-card-gradient hover:bg-card transition-colors",
                "cursor-pointer group"
              )}
              onClick={() => setSelectedMood(mood.name)}
            >
              <img 
                src={mood.image} 
                alt={mood.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-semibold">{mood.name}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedMood(null)}
            >
              Back to Moods
            </Button>
            <h2 className="text-xl font-semibold">{selectedMood} Music</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Top {selectedMood} Tracks</h3>
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
                {getTracksForMood(selectedMood).slice(0, 10).map((track) => (
                  <div key={track.id} className="carousel-track-item">
                    <TrackCard 
                      track={track}
                      isPlaying={playingTrackId === track.id}
                      isInCart={cartItems.includes(track.id)}
                      onPlay={() => onPlayTrack(track.id)}
                      onAddToCart={() => onAddToCart(track.id)}
                    />
                  </div>
                ))}
                {/* Duplicate tracks to ensure continuous flow */}
                {getTracksForMood(selectedMood).slice(0, 10).map((track) => (
                  <div key={`dup-${track.id}`} className="carousel-track-item">
                    <TrackCard 
                      track={track}
                      isPlaying={playingTrackId === track.id}
                      isInCart={cartItems.includes(track.id)}
                      onPlay={() => onPlayTrack(track.id)}
                      onAddToCart={() => onAddToCart(track.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-25rem)]">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">All {selectedMood} Tracks</h3>
              {getTracksForMood(selectedMood).map((track) => (
                <div 
                  key={track.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg",
                    "border border-border bg-card-gradient hover:bg-card transition-colors",
                    "group"
                  )}
                >
                  <div className="relative h-12 w-12 rounded-md overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${track.id}/48/48`} 
                      alt={track.title}
                      className="h-full w-full object-cover"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className={cn(
                        "absolute inset-0 h-full w-full",
                        "opacity-0 group-hover:opacity-100 transition-opacity",
                        "bg-black/50 hover:bg-black/70 rounded-none"
                      )}
                      onClick={() => onPlayTrack(track.id)}
                    >
                      {playingTrackId === track.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{track.title}</div>
                    <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-pink-600/10 text-pink-600">
                      {track.genre}
                    </Badge>
                    <div className="text-sm font-medium">
                      ${track.price.toLocaleString()}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onAddToCart(track.id)}
                    >
                      <ShoppingCart className={cn(
                        "h-4 w-4",
                        cartItems.includes(track.id) && "text-primary"
                      )} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
}

interface TrackCardProps {
  track: typeof tracksWithPrices[0];
  isPlaying: boolean;
  isInCart: boolean;
  onPlay: () => void;
  onAddToCart: () => void;
}

function TrackCard({ track, isPlaying, isInCart, onPlay, onAddToCart }: TrackCardProps) {
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
            <Badge variant="secondary" className="bg-pink-600/10 text-pink-600">
              {track.genre}
            </Badge>
            <Badge variant="secondary" className="bg-blue-600/10 text-blue-600">
              ${track.price.toLocaleString()}
            </Badge>
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
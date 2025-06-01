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
  Music,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { discoverTracks } from "@/data/discoverTracks";

// Define genre data
const GENRES = [
  { id: "electronic", name: "Electronic", image: "https://picsum.photos/seed/electronic/400/200" },
  { id: "rock", name: "Rock", image: "https://picsum.photos/seed/rock/400/200" },
  { id: "pop", name: "Pop", image: "https://picsum.photos/seed/pop/400/200" },
  { id: "hiphop", name: "Hip Hop", image: "https://picsum.photos/seed/hiphop/400/200" },
  { id: "rnb", name: "R&B", image: "https://picsum.photos/seed/rnb/400/200" },
  { id: "jazz", name: "Jazz", image: "https://picsum.photos/seed/jazz/400/200" },
  { id: "classical", name: "Classical", image: "https://picsum.photos/seed/classical/400/200" },
  { id: "ambient", name: "Ambient", image: "https://picsum.photos/seed/ambient/400/200" },
  { id: "world", name: "World", image: "https://picsum.photos/seed/world/400/200" },
  { id: "country", name: "Country", image: "https://picsum.photos/seed/country/400/200" },
  { id: "folk", name: "Folk", image: "https://picsum.photos/seed/folk/400/200" },
  { id: "blues", name: "Blues", image: "https://picsum.photos/seed/blues/400/200" }
];

interface GenresPageProps {
  onAddToCart: (trackId: number) => void;
  cartItems: number[];
  onPlayTrack: (id: number) => void;
  playingTrackId: number | null;
}

export function GenresPage({ onAddToCart, cartItems, onPlayTrack, playingTrackId }: GenresPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

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

  // Filter genres based on search
  const filteredGenres = GENRES.filter(genre => 
    genre.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get tracks for selected genre
  const getGenreTracks = (genreName: string) => {
    return tracksWithPrices.filter(track => 
      track.genre.toLowerCase() === genreName.toLowerCase() ||
      track.syncInfo.genres.some(g => g.toLowerCase() === genreName.toLowerCase()) ||
      track.syncInfo.subgenres.some(g => g.toLowerCase() === genreName.toLowerCase())
    );
  };

  // Ensure each genre has at least 10 tracks
  const getTracksForGenre = (genreName: string) => {
    const genreTracks = getGenreTracks(genreName);
    if (genreTracks.length >= 10) return genreTracks;
    
    // Add more tracks to reach 10
    const additionalTracks = tracksWithPrices
      .filter(t => !genreTracks.includes(t))
      .slice(0, 10 - genreTracks.length);
    
    return [...genreTracks, ...additionalTracks];
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Browse by Genre</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search genres..." 
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

      {!selectedGenre ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGenres.map((genre) => (
            <div 
              key={genre.id}
              className={cn(
                "aspect-video rounded-lg overflow-hidden relative",
                "border border-border bg-card-gradient hover:bg-card transition-colors",
                "cursor-pointer group"
              )}
              onClick={() => setSelectedGenre(genre.name)}
            >
              <img 
                src={genre.image} 
                alt={genre.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-semibold">{genre.name}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedGenre(null)}
            >
              Back to Genres
            </Button>
            <h2 className="text-xl font-semibold">{selectedGenre} Music</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Top {selectedGenre} Tracks</h3>
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
                {getTracksForGenre(selectedGenre).slice(0, 10).map((track) => (
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
                {getTracksForGenre(selectedGenre).slice(0, 10).map((track) => (
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
              <h3 className="text-lg font-medium mb-4">All {selectedGenre} Tracks</h3>
              {getTracksForGenre(selectedGenre).map((track) => (
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
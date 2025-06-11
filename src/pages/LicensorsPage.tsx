import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Music, 
  Filter, 
  ArrowDownUp, 
  Play, 
  Pause, 
  Heart, 
  ShoppingCart, 
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { tracks as mockTracks } from "@/data/tracks";
import { ArtistsPage } from "./ArtistsPage";
import { MarketplacePage } from "./MarketplacePage";
import { InboxPage } from "./InboxPage";
import { ProjectsPage } from "./ProjectsPage";

export function LicensorsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("discover");
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<number[]>([]);

  const filteredTracks = mockTracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const renderView = () => {
    switch (currentTab) {
      case "discover":
        return (
          <TabsContent value="discover" className="mt-0">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Featured Tracks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTracks.slice(0, 4).map((track) => (
                    <TrackCard 
                      key={track.id}
                      track={track}
                      isPlaying={playingTrackId === track.id}
                      isInCart={cartItems.includes(track.id)}
                      onPlay={() => togglePlayTrack(track.id)}
                      onAddToCart={() => toggleCart(track.id)}
                    />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">All Tracks</h2>
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-4">
                    {filteredTracks.map((track) => (
                      <TrackRow
                        key={track.id}
                        track={track}
                        isPlaying={playingTrackId === track.id}
                        isInCart={cartItems.includes(track.id)}
                        onPlay={() => togglePlayTrack(track.id)}
                        onAddToCart={() => toggleCart(track.id)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </section>
            </div>
          </TabsContent>
        );
      case "genres":
        return (
          <TabsContent value="genres">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {["Electronic", "Rock", "Pop", "Hip Hop", "R&B", "Jazz", "Classical", "Ambient"].map((genre) => (
                <GenreCard key={genre} genre={genre} />
              ))}
            </div>
          </TabsContent>
        );
      case "moods":
        return (
          <TabsContent value="moods">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {["Energetic", "Calm", "Happy", "Sad", "Inspirational", "Mysterious", "Epic", "Romantic"].map((mood) => (
                <MoodCard key={mood} mood={mood} />
              ))}
            </div>
          </TabsContent>
        );
      case "collections":
        return (
          <TabsContent value="collections">
            <div className="text-center py-12 text-muted-foreground">
              <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No Collections Yet</h3>
              <p>Sign in to create and save your music collections</p>
            </div>
          </TabsContent>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <img src="/zen-logo.png" alt="Zen Sync" className="h-8" />
              <span className="font-semibold text-lg">Zen Sync</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search for music..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
            <Button>Sign In</Button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 py-6">
          <Tabs defaultValue="discover" value={currentTab} onValueChange={setCurrentTab}>
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="discover">Discover</TabsTrigger>
                <TabsTrigger value="genres">Genres</TabsTrigger>
                <TabsTrigger value="moods">Moods</TabsTrigger>
                <TabsTrigger value="collections">Collections</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
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

            {renderView()}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

interface TrackCardProps {
  track: typeof mockTracks[0];
  isPlaying: boolean;
  isInCart: boolean;
  onPlay: () => void;
  onAddToCart: () => void;
}

function TrackCard({ track, isPlaying, isInCart, onPlay, onAddToCart }: TrackCardProps) {
  return (
    <div className={cn(
      "group relative aspect-square rounded-lg overflow-hidden",
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
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-pink-600/10 text-pink-600">
              {track.genre}
            </Badge>
            <Badge variant="secondary" className="bg-blue-600/10 text-blue-600">
              ${track.syncInfo?.pricing[0]?.price || 1500}
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

interface TrackRowProps {
  track: typeof mockTracks[0];
  isPlaying: boolean;
  isInCart: boolean;
  onPlay: () => void;
  onAddToCart: () => void;
}

function TrackRow({ track, isPlaying, isInCart, onPlay, onAddToCart }: TrackRowProps) {
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-lg",
      "border border-border bg-card-gradient hover:bg-card transition-colors",
      "group"
    )}>
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
          onClick={onPlay}
        >
          {isPlaying ? (
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
          ${track.syncInfo?.pricing[0]?.price || 1500}
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8"
          onClick={onAddToCart}
        >
          <ShoppingCart className={cn(
            "h-4 w-4",
            isInCart && "text-primary"
          )} />
        </Button>
      </div>
    </div>
  );
}

interface GenreCardProps {
  genre: string;
}

function GenreCard({ genre }: GenreCardProps) {
  return (
    <div className={cn(
      "aspect-video rounded-lg overflow-hidden relative",
      "border border-border bg-card-gradient hover:bg-card transition-colors",
      "cursor-pointer group"
    )}>
      <img 
        src={`https://picsum.photos/seed/${genre}/400/200`} 
        alt={genre}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-xl font-semibold">{genre}</h3>
      </div>
    </div>
  );
}

interface MoodCardProps {
  mood: string;
}

function MoodCard({ mood }: MoodCardProps) {
  return (
    <div className={cn(
      "aspect-video rounded-lg overflow-hidden relative",
      "border border-border bg-card-gradient hover:bg-card transition-colors",
      "cursor-pointer group"
    )}>
      <img 
        src={`https://picsum.photos/seed/${mood}/400/200`} 
        alt={mood}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-xl font-semibold">{mood}</h3>
      </div>
    </div>
  );
}
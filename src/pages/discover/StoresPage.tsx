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
  Building2, 
  Globe, 
  Music, 
  Users, 
  Award,
  FileUp,
  Upload,
  PenLine
} from "lucide-react";
import { cn } from "@/lib/utils";
import { discoverTracks } from "@/data/discoverTracks";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define store data
const STORES = [
  {
    id: 1,
    name: "Universal Music Publishing",
    logo: "https://picsum.photos/seed/universal/200/200",
    description: "One of the world's largest music publishing companies with a diverse catalog spanning all genres.",
    verified: true,
    established: 1955,
    headquarters: "Los Angeles, CA",
    genres: ["Pop", "Rock", "Hip Hop", "R&B", "Classical"],
    featuredArtists: ["Sarah Chen", "Metro Beats", "Luna Ray"],
    trackIds: [101, 103, 105, 107, 109, 111, 113, 115]
  },
  {
    id: 2,
    name: "Indie Collective",
    logo: "https://picsum.photos/seed/indie/200/200",
    description: "A collaborative of independent artists and composers creating cutting-edge music for all media.",
    verified: true,
    established: 2010,
    headquarters: "Brooklyn, NY",
    genres: ["Electronic", "Ambient", "Folk", "Jazz"],
    featuredArtists: ["Coastal Sounds", "Willow & Oak", "Neon Pulse"],
    trackIds: [102, 104, 106, 108, 110, 112, 114, 116]
  },
  {
    id: 3,
    name: "Cinematic Sound Library",
    logo: "https://picsum.photos/seed/cinematic/200/200",
    description: "Specializing in orchestral and cinematic music for film, television, and advertising.",
    verified: true,
    established: 2005,
    headquarters: "London, UK",
    genres: ["Classical", "Orchestral", "Cinematic", "Ambient"],
    featuredArtists: ["Orchestral Adventures", "Stellar Project", "Nature's Symphony"],
    trackIds: [104, 114, 116]
  },
  {
    id: 4,
    name: "Electronic Frontier",
    logo: "https://picsum.photos/seed/electronic/200/200",
    description: "Cutting-edge electronic music for the modern media landscape.",
    verified: true,
    established: 2015,
    headquarters: "Berlin, Germany",
    genres: ["Electronic", "Techno", "Synthwave", "Future Bass"],
    featuredArtists: ["Luna Ray", "Neon Pulse", "Retrowave", "Cyber Collective"],
    trackIds: [101, 106, 111, 113]
  }
];

interface StoresPageProps {
  onAddToCart: (trackId: number) => void;
  cartItems: number[];
}

export function StoresPage({ onAddToCart, cartItems }: StoresPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<typeof STORES[0] | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestFormData, setRequestFormData] = useState({
    projectTitle: "",
    description: "",
    genre: "",
    mood: "",
    duration: "",
    budget: "",
    deadline: "",
    referenceNotes: ""
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);

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

  // Filter stores based on search
  const filteredStores = STORES.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get tracks for selected store
  const getStoreTrackList = (store: typeof STORES[0]) => {
    return tracksWithPrices.filter(track => store.trackIds.includes(track.id));
  };

  // Filter tracks by genre if a genre filter is applied
  const getFilteredTracks = (tracks: typeof tracksWithPrices) => {
    if (!genreFilter) return tracks;
    return tracks.filter(track => track.genre === genreFilter);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAudioFiles([...audioFiles, ...newFiles]);
    }
  };

  const removeAudioFile = (index: number) => {
    setAudioFiles(audioFiles.filter((_, i) => i !== index));
  };

  const handleSubmitRequest = () => {
    // In a real app, this would submit the request to the backend
    console.log("Submitting request:", {
      ...requestFormData,
      videoFile,
      audioFiles
    });
    
    // Reset form and close dialog
    setRequestFormData({
      projectTitle: "",
      description: "",
      genre: "",
      mood: "",
      duration: "",
      budget: "",
      deadline: "",
      referenceNotes: ""
    });
    setVideoFile(null);
    setAudioFiles([]);
    setIsRequestDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {!selectedStore ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Music Stores</h1>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search stores..." 
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
              <Button onClick={() => setIsRequestDialogOpen(true)}>
                <PenLine className="h-4 w-4 mr-2" />
                Request Song
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map(store => (
              <div 
                key={store.id}
                className="rounded-lg border bg-card-gradient hover:bg-card transition-colors cursor-pointer"
                onClick={() => setSelectedStore(store)}
              >
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={store.logo} 
                    alt={store.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">{store.name}</h2>
                      {store.verified && (
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{store.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {store.genres.map(genre => (
                      <Badge key={genre} variant="secondary">{genre}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span>Est. {store.established}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <span>{store.headquarters}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedStore(null)}
            >
              Back to Stores
            </Button>
            <h1 className="text-2xl font-semibold">{selectedStore.name}</h1>
            {selectedStore.verified && (
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                Verified
              </Badge>
            )}
            <div className="flex-1"></div>
            <Button onClick={() => setIsRequestDialogOpen(true)}>
              <PenLine className="h-4 w-4 mr-2" />
              Request Song
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                <img 
                  src={selectedStore.logo} 
                  alt={selectedStore.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-3xl font-bold">{selectedStore.name}</h2>
                </div>
              </div>
              <p className="text-lg mb-4">{selectedStore.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card-gradient">
                  <Building2 className="h-6 w-6 mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Established</div>
                  <div className="font-medium">{selectedStore.established}</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card-gradient">
                  <Globe className="h-6 w-6 mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Headquarters</div>
                  <div className="font-medium">{selectedStore.headquarters}</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card-gradient">
                  <Music className="h-6 w-6 mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Genres</div>
                  <div className="font-medium">{selectedStore.genres.length}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-lg border bg-card-gradient p-4 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Featured Artists
                </h3>
                <div className="space-y-3">
                  {selectedStore.featuredArtists.map(artist => (
                    <div key={artist} className="flex items-center gap-3 p-2 rounded-md bg-background/50">
                      <img 
                        src={`https://picsum.photos/seed/${artist}/40/40`} 
                        alt={artist}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="font-medium">{artist}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Catalog</h2>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search tracks..." 
                    className="pl-9"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setGenreFilter(null)}
                >
                  All Genres
                </Button>
                {selectedStore.genres.map(genre => (
                  <Button 
                    key={genre}
                    variant={genreFilter === genre ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGenreFilter(genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-25rem)]">
              <div className="space-y-4">
                {getFilteredTracks(getStoreTrackList(selectedStore)).map((track) => (
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
                        onClick={() => togglePlayTrack(track.id)}
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
          </div>
        </>
      )}

      {/* Request Song Dialog */}
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Request Custom Song</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectTitle">Project Title</Label>
                <Input 
                  id="projectTitle" 
                  placeholder="e.g., Summer Campaign 2025"
                  value={requestFormData.projectTitle}
                  onChange={(e) => setRequestFormData({...requestFormData, projectTitle: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your project and what you're looking for"
                  className="h-24"
                  value={requestFormData.description}
                  onChange={(e) => setRequestFormData({...requestFormData, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select 
                    value={requestFormData.genre}
                    onValueChange={(value) => setRequestFormData({...requestFormData, genre: value})}
                  >
                    <SelectTrigger id="genre">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="hiphop">Hip Hop</SelectItem>
                      <SelectItem value="ambient">Ambient</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="folk">Folk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mood">Mood</Label>
                  <Select 
                    value={requestFormData.mood}
                    onValueChange={(value) => setRequestFormData({...requestFormData, mood: value})}
                  >
                    <SelectTrigger id="mood">
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uplifting">Uplifting</SelectItem>
                      <SelectItem value="emotional">Emotional</SelectItem>
                      <SelectItem value="energetic">Energetic</SelectItem>
                      <SelectItem value="calm">Calm</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="dreamy">Dreamy</SelectItem>
                      <SelectItem value="intense">Intense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select 
                    value={requestFormData.duration}
                    onValueChange={(value) => setRequestFormData({...requestFormData, duration: value})}
                  >
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-30">0-30 seconds</SelectItem>
                      <SelectItem value="30-60">30-60 seconds</SelectItem>
                      <SelectItem value="1-2">1-2 minutes</SelectItem>
                      <SelectItem value="2-3">2-3 minutes</SelectItem>
                      <SelectItem value="3-5">3-5 minutes</SelectItem>
                      <SelectItem value="5+">5+ minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Select 
                    value={requestFormData.budget}
                    onValueChange={(value) => setRequestFormData({...requestFormData, budget: value})}
                  >
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-20k">$10,000 - $20,000</SelectItem>
                      <SelectItem value="20k-50k">$20,000 - $50,000</SelectItem>
                      <SelectItem value="50k+">$50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input 
                  id="deadline" 
                  type="date"
                  value={requestFormData.deadline}
                  onChange={(e) => setRequestFormData({...requestFormData, deadline: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload Reference Video</Label>
                <div className={cn(
                  "border-2 border-dashed rounded-md p-6",
                  "flex flex-col items-center justify-center gap-2",
                  "transition-colors cursor-pointer",
                  "hover:border-primary/50 hover:bg-primary/5"
                )}>
                  <input 
                    type="file" 
                    id="videoUpload" 
                    className="hidden" 
                    accept="video/*"
                    onChange={handleVideoUpload}
                  />
                  <label htmlFor="videoUpload" className="cursor-pointer w-full h-full flex flex-col items-center">
                    <FileUp className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center mt-2">
                      <p className="font-medium">
                        {videoFile ? videoFile.name : "Drag and drop your video file"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {videoFile ? `${(videoFile.size / (1024 * 1024)).toFixed(2)} MB` : "or click to browse"}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Upload Reference Tracks</Label>
                <div className={cn(
                  "border-2 border-dashed rounded-md p-6",
                  "flex flex-col items-center justify-center gap-2",
                  "transition-colors cursor-pointer",
                  "hover:border-primary/50 hover:bg-primary/5"
                )}>
                  <input 
                    type="file" 
                    id="audioUpload" 
                    className="hidden" 
                    accept="audio/*"
                    multiple
                    onChange={handleAudioUpload}
                  />
                  <label htmlFor="audioUpload" className="cursor-pointer w-full h-full flex flex-col items-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center mt-2">
                      <p className="font-medium">
                        {audioFiles.length > 0 ? `${audioFiles.length} file(s) selected` : "Drag and drop audio files"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {audioFiles.length > 0 ? "Click to add more" : "or click to browse"}
                      </p>
                    </div>
                  </label>
                </div>
                
                {audioFiles.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {audioFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md bg-card">
                        <div className="text-sm truncate">{file.name}</div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => removeAudioFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="referenceNotes">Reference Notes</Label>
                <Textarea 
                  id="referenceNotes" 
                  placeholder="Any specific notes about the reference materials"
                  className="h-24"
                  value={requestFormData.referenceNotes}
                  onChange={(e) => setRequestFormData({...requestFormData, referenceNotes: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
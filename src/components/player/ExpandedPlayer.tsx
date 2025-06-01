import { useState, useEffect, useRef } from "react";
import { usePlayerStore, formatTime } from "@/lib/player";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Minimize2,
  Repeat,
  Repeat1,
  Shuffle,
  ListMusic,
  Heart,
  Share2,
  MoreHorizontal,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { QueuePanel } from "./QueuePanel";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { AudioWaveform } from "./AudioWaveform";
import { HolographicAlbumCover } from "./HolographicAlbumCover";
import { useTracksStore } from "@/lib/tracks";

export function ExpandedPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    position,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    setPosition,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeatMode,
    toggleExpanded,
    playTrack
  } = usePlayerStore();

  const { tracks } = useTracksStore();

  const [currentTime, setCurrentTime] = useState(0);
  const [showQueuePanel, setShowQueuePanel] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Update current time based on position
  useEffect(() => {
    if (duration) {
      setCurrentTime((position / 100) * duration);
    }
  }, [position, duration]);

  // Simulate progress - always start from 0:00 and progress through time
  useEffect(() => {
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    if (!isPlaying || !duration) return;
    
    // Reset position to 0 when starting playback
    if (position === 0 || position >= 100) {
      setPosition(0);
    }
    
    progressIntervalRef.current = setInterval(() => {
      setPosition((prev) => {
        const newPosition = prev + (100 / duration / 10);
        if (newPosition >= 100) {
          clearInterval(progressIntervalRef.current!);
          progressIntervalRef.current = null;
          nextTrack();
          return 0;
        }
        return newPosition;
      });
    }, 100);
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isPlaying, duration, nextTrack, setPosition]);

  // Reset progress when track changes
  useEffect(() => {
    setPosition(0);
  }, [currentTrack, setPosition]);

  // Skip to a random track in the catalog
  const skipToRandomTrack = () => {
    if (tracks.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * tracks.length);
    const randomTrack = tracks[randomIndex];
    playTrack(randomTrack);
  };

  // Skip to the next track in the catalog
  const skipToNextTrack = () => {
    if (!currentTrack || tracks.length === 0) {
      if (tracks.length > 0) {
        playTrack(tracks[0]);
      }
      return;
    }
    
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    if (currentIndex === -1 || currentIndex === tracks.length - 1) {
      // If current track not found or is the last one, play the first track
      playTrack(tracks[0]);
    } else {
      // Play the next track in the catalog
      playTrack(tracks[currentIndex + 1]);
    }
  };

  // Skip to the previous track in the catalog
  const skipToPreviousTrack = () => {
    if (!currentTrack || tracks.length === 0) {
      if (tracks.length > 0) {
        playTrack(tracks[tracks.length - 1]);
      }
      return;
    }
    
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    if (currentIndex === -1 || currentIndex === 0) {
      // If current track not found or is the first one, play the last track
      playTrack(tracks[tracks.length - 1]);
    } else {
      // Play the previous track in the catalog
      playTrack(tracks[currentIndex - 1]);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50",
      isDarkMode 
        ? "bg-background/95 backdrop-blur-md" 
        : "bg-white/95 backdrop-blur-md"
    )}>
      <div className="container mx-auto h-full flex flex-col p-6">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleExpanded}
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                isLiked && "text-red-500"
              )}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={cn(
                "h-5 w-5",
                isLiked && "fill-current"
              )} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                <DropdownMenuItem>View Artist</DropdownMenuItem>
                <DropdownMenuItem>View Album</DropdownMenuItem>
                <DropdownMenuItem>Download</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative mb-8">
            <HolographicAlbumCover 
              imageUrl={`https://picsum.photos/seed/${currentTrack.id}/400/400`}
              isPlaying={isPlaying}
              size="lg"
            />
          </div>
          
          <div className="w-full max-w-md text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">{currentTrack.title}</h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {currentTrack.genre}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">{currentTrack.artist}</p>
          </div>
          
          <div className="w-full max-w-md mb-8">
            <div className="mb-4">
              <AudioWaveform
                isPlaying={isPlaying}
                progress={position}
                onSeek={setPosition}
                className="h-16"
                trackId={currentTrack.id} // Pass trackId to regenerate waveform when track changes
              />
            </div>
            
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm">{formatTime(currentTime)}</span>
              <Slider
                value={[position]}
                max={100}
                step={0.1}
                onValueChange={(values) => setPosition(values[0])}
                className={cn(
                  "flex-1",
                  isDarkMode 
                    ? "bg-zinc-800" 
                    : "bg-zinc-200"
                )}
              />
              <span className="text-sm">{formatTime(duration)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={cn(
                    "h-10 w-10",
                    isShuffled && "text-primary"
                  )}
                  onClick={() => {
                    toggleShuffle();
                    if (!isShuffled) {
                      skipToRandomTrack();
                    }
                  }}
                >
                  <Shuffle className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-10 w-10"
                  onClick={isShuffled ? previousTrack : skipToPreviousTrack}
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button 
                  variant={isDarkMode ? "secondary" : "default"}
                  size="icon"
                  className={cn(
                    "h-14 w-14",
                    !isDarkMode && "bg-zinc-900 hover:bg-zinc-800"
                  )}
                  onClick={() => isPlaying ? pauseTrack() : resumeTrack()}
                >
                  {isPlaying ? (
                    <Pause className="h-7 w-7" />
                  ) : (
                    <Play className="h-7 w-7" />
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-10 w-10"
                  onClick={isShuffled ? nextTrack : skipToNextTrack}
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={cn(
                    "h-10 w-10",
                    repeatMode !== 'off' && "text-primary"
                  )}
                  onClick={toggleRepeatMode}
                >
                  {repeatMode === 'one' ? (
                    <Repeat1 className="h-5 w-5" />
                  ) : (
                    <Repeat className="h-5 w-5" />
                  )}
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={cn(
                    "h-10 w-10",
                    showQueuePanel && "text-primary"
                  )}
                  onClick={() => setShowQueuePanel(!showQueuePanel)}
                >
                  <ListMusic className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-10 w-10"
                    onClick={toggleMute}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                  <div className="w-24">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.01}
                      onValueChange={(values) => setVolume(values[0])}
                      className={cn(
                        isDarkMode 
                          ? "bg-zinc-800" 
                          : "bg-zinc-200"
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleExpanded}
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            Minimize Player
          </Button>
        </div>
      </div>
      
      {/* Queue Panel */}
      {showQueuePanel && (
        <div className={cn(
          "absolute right-6 bottom-24 w-80 rounded-lg shadow-xl",
          "border",
          isDarkMode 
            ? "bg-zinc-900/95 backdrop-blur-md border-zinc-800" 
            : "bg-white/95 backdrop-blur-md border-zinc-200"
        )}>
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-medium">Queue</h3>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-7 w-7"
              onClick={() => setShowQueuePanel(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <QueuePanel />
        </div>
      )}
    </div>
  );
}
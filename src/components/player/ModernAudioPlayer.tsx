import { useState, useEffect, useRef } from "react";
import { usePlayerStore, formatTime } from "@/lib/player";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Repeat1,
  Shuffle,
  ListMusic,
  Plus,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { AudioWaveform } from "./AudioWaveform";
import { HolographicAlbumCover } from "./HolographicAlbumCover";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QueuePanel } from "./QueuePanel";
import { useTracksStore } from "@/lib/tracks";

export function ModernAudioPlayer() {
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
    toggleMinimized,
    playTrack
  } = usePlayerStore();

  const { tracks } = useTracksStore();

  const [currentTime, setCurrentTime] = useState(0);
  const [showQueuePanel, setShowQueuePanel] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  // Handle volume slider timeout
  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, []);

  const handleVolumeIconClick = () => {
    if (showVolumeSlider) {
      toggleMute();
    } else {
      setShowVolumeSlider(true);
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
      volumeTimeoutRef.current = setTimeout(() => {
        setShowVolumeSlider(false);
      }, 3000);
    }
  };

  const handleVolumeSliderInteraction = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 3000);
  };

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
      "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
      "w-[calc(100%-2rem)] max-w-3xl rounded-full shadow-lg",
      "border",
      isDarkMode 
        ? "bg-zinc-900/95 backdrop-blur-md border-zinc-800" 
        : "bg-white/95 backdrop-blur-md border-zinc-200"
    )}>
      <div className="h-20 flex items-center px-4">
        {/* Track Info with Holographic Album Cover */}
        <div className="flex items-center gap-3 w-1/4 min-w-0">
          <div className="relative h-14 w-14 flex items-center justify-center">
            <HolographicAlbumCover 
              imageUrl={`https://picsum.photos/seed/${currentTrack.id}/80/80`}
              isPlaying={isPlaying}
              size="sm"
            />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm truncate">{currentTrack.title}</div>
            <div className="text-xs text-muted-foreground truncate">{currentTrack.artist}</div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 hidden sm:flex"
            onClick={() => setShowAddToPlaylist(!showAddToPlaylist)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Playback Controls */}
        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <div className="flex items-center gap-2 mb-1">
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                "h-8 w-8 hidden sm:flex",
                isShuffled && "text-primary"
              )}
              onClick={() => {
                toggleShuffle();
                if (!isShuffled) {
                  skipToRandomTrack();
                }
              }}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={isShuffled ? previousTrack : skipToPreviousTrack}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant={isDarkMode ? "secondary" : "default"}
              size="icon"
              className={cn(
                "h-10 w-10",
                !isDarkMode && "bg-zinc-900 hover:bg-zinc-800"
              )}
              onClick={() => isPlaying ? pauseTrack() : resumeTrack()}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={isShuffled ? nextTrack : skipToNextTrack}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                "h-8 w-8 hidden sm:flex",
                repeatMode !== 'off' && "text-primary"
              )}
              onClick={toggleRepeatMode}
            >
              {repeatMode === 'one' ? (
                <Repeat1 className="h-4 w-4" />
              ) : (
                <Repeat className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center gap-2 w-full">
            <div className="text-xs text-muted-foreground w-8 text-right">
              {formatTime(currentTime)}
            </div>
            <div className="flex-1 relative">
              <AudioWaveform 
                isPlaying={isPlaying}
                progress={position}
                onSeek={setPosition}
                className="h-6"
                barCount={30}
                trackId={currentTrack.id} // Pass trackId to regenerate waveform when track changes
              />
            </div>
            <div className="text-xs text-muted-foreground w-8">
              {formatTime(duration)}
            </div>
          </div>
        </div>
        
        {/* Additional Controls */}
        <div className="flex items-center justify-end gap-2 w-1/4">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={handleVolumeIconClick}
              onMouseEnter={() => setShowVolumeSlider(true)}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            
            {showVolumeSlider && (
              <div 
                className={cn(
                  "absolute bottom-full mb-2 left-1/2 -translate-x-1/2",
                  "p-3 rounded-lg shadow-lg w-8 h-32",
                  "flex flex-col items-center",
                  "border",
                  isDarkMode 
                    ? "bg-zinc-900 border-zinc-800" 
                    : "bg-white border-zinc-200"
                )}
                onMouseEnter={handleVolumeSliderInteraction}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  orientation="vertical"
                  onValueChange={(values) => {
                    setVolume(values[0]);
                    handleVolumeSliderInteraction();
                  }}
                  className="h-full"
                />
              </div>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            className={cn(
              "h-8 w-8",
              showQueuePanel && "text-primary"
            )}
            onClick={() => setShowQueuePanel(!showQueuePanel)}
          >
            <ListMusic className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={toggleMinimized}
            title="Hide Player"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Queue Panel */}
      {showQueuePanel && (
        <div className={cn(
          "absolute right-4 bottom-20 w-80 rounded-lg shadow-xl",
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
      
      {/* Add to Playlist Dropdown */}
      {showAddToPlaylist && (
        <DropdownMenu open={showAddToPlaylist} onOpenChange={setShowAddToPlaylist}>
          <DropdownMenuTrigger asChild>
            <div className="hidden">Trigger</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-56"
            style={{
              position: 'absolute',
              left: '80px',
              bottom: '60px'
            }}
          >
            <DropdownMenuItem>
              Add to Summer Vibes
            </DropdownMenuItem>
            <DropdownMenuItem>
              Add to Workout Mix
            </DropdownMenuItem>
            <DropdownMenuItem>
              Add to Chill Playlist
            </DropdownMenuItem>
            <DropdownMenuItem>
              Create New Playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
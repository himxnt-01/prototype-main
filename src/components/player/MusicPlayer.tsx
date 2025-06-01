import { useState, useRef, useEffect } from "react";
import { usePlayerStore, formatTime } from "@/lib/player";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Maximize2,
  Minimize2,
  GripVertical,
  Repeat,
  Repeat1,
  Shuffle,
  ListMusic,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { QueuePanel } from "./QueuePanel";

export function MusicPlayer() {
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
    toggleRepeatMode
  } = usePlayerStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [showQueuePanel, setShowQueuePanel] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragStartPlayerPos = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();

  // Update current time based on position
  useEffect(() => {
    if (duration) {
      setCurrentTime((position / 100) * duration);
    }
  }, [position, duration]);

  // Reset position when track changes
  useEffect(() => {
    setPlayerPosition({ x: 0, y: 0 });
  }, [currentTrack]);

  // Simulate progress
  useEffect(() => {
    if (!isPlaying || !duration) return;
    
    const interval = setInterval(() => {
      setPosition((prev) => {
        const newPosition = prev + (100 / duration / 10);
        if (newPosition >= 100) {
          clearInterval(interval);
          nextTrack();
          return 0;
        }
        return newPosition;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isPlaying, duration, nextTrack, setPosition]);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    dragStartPlayerPos.current = playerPosition;

    // Create a transparent drag image
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDrag = (e: React.DragEvent) => {
    if (!e.clientX || !e.clientY) return; // Ignore invalid drag events

    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;

    if (playerRef.current) {
      const playerRect = playerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate new position with boundaries
      let newX = dragStartPlayerPos.current.x + deltaX;
      let newY = dragStartPlayerPos.current.y + deltaY;

      // Constrain horizontal movement
      const maxX = (viewportWidth - playerRect.width) / 2;
      newX = Math.max(-maxX, Math.min(maxX, newX));

      // Constrain vertical movement
      const minY = -viewportHeight + playerRect.height + 32; // 32px margin from top
      const maxY = 0; // Original bottom position
      newY = Math.max(minY, Math.min(maxY, newY));

      setPlayerPosition({ x: newX, y: newY });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    setVolume(newVolume);
  };

  const handleSeek = (values: number[]) => {
    const newPosition = values[0];
    setPosition(newPosition);
  };

  if (!currentTrack) return null;

  const isDarkMode = theme === 'dark';

  return (
    <>
      <div 
        ref={playerRef}
        className={cn(
          "fixed left-1/2 bottom-4 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl z-50",
          "rounded-lg shadow-xl backdrop-blur-md",
          isDarkMode 
            ? "bg-gradient-to-r from-zinc-900/95 via-zinc-800/95 to-zinc-900/95 border border-zinc-800" 
            : "bg-gradient-to-r from-white/95 via-zinc-50/95 to-white/95 border border-zinc-200",
          "transition-all duration-300 cursor-grab active:cursor-grabbing",
          isDragging && "opacity-90"
        )}
        style={{
          transform: `translate(calc(-50% + ${playerPosition.x}px), ${playerPosition.y}px)`,
        }}
        draggable="true"
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        <div className="flex items-center justify-center h-1.5">
          <div className={cn(
            "h-4 w-8 rounded-t-md flex items-center justify-center",
            isDarkMode ? "bg-zinc-800" : "bg-zinc-200"
          )}>
            <GripVertical className={cn(
              "h-3 w-3",
              isDarkMode ? "text-zinc-600" : "text-zinc-400"
            )} />
          </div>
        </div>

        <div className={cn(
          "p-4",
          isExpanded && "pb-6"
        )}>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 rounded-md">
              <img 
                src={`https://picsum.photos/seed/${currentTrack.id}/48/48`}
                alt={currentTrack.title}
                className="object-cover"
              />
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium truncate">{currentTrack.title}</div>
                  <div className={cn(
                    "text-sm truncate",
                    isDarkMode ? "text-zinc-400" : "text-zinc-500"
                  )}>
                    {currentTrack.artist}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={toggleMute}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                    <div className="w-20">
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                        className={cn(
                          isDarkMode 
                            ? "bg-zinc-800" 
                            : "bg-zinc-200"
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={previousTrack}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={isDarkMode ? "secondary" : "default"}
                      size="icon"
                      className={cn(
                        "h-8 w-8",
                        !isDarkMode && "bg-zinc-900 hover:bg-zinc-800"
                      )}
                      onClick={() => isPlaying ? pauseTrack() : resumeTrack()}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={nextTrack}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={cn(
                        "h-8 w-8",
                        isShuffled && "text-primary"
                      )}
                      onClick={toggleShuffle}
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={cn(
                        "h-8 w-8",
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
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 space-y-1">
                  <Slider
                    value={[position]}
                    max={100}
                    step={0.1}
                    onValueChange={handleSeek}
                    className={cn(
                      isDarkMode 
                        ? "bg-zinc-800" 
                        : "bg-zinc-200"
                    )}
                  />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Queue Panel */}
      {showQueuePanel && (
        <div className={cn(
          "fixed right-4 bottom-24 w-80 rounded-lg shadow-xl z-40",
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
    </>
  );
}
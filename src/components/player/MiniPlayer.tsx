import { usePlayerStore, formatTime } from "@/lib/player";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { useState, useEffect } from "react";

export function MiniPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    position,
    duration,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    setPosition,
    toggleExpanded
  } = usePlayerStore();
  
  const [currentTime, setCurrentTime] = useState(0);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Update current time based on position
  useEffect(() => {
    if (duration) {
      setCurrentTime((position / 100) * duration);
    }
  }, [position, duration]);

  if (!currentTrack) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 h-16 z-50",
      "border-t",
      isDarkMode 
        ? "bg-zinc-900/95 backdrop-blur-md border-zinc-800" 
        : "bg-white/95 backdrop-blur-md border-zinc-200"
    )}>
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-3 w-1/4">
          <img 
            src={`https://picsum.photos/seed/${currentTrack.id}/40/40`}
            alt={currentTrack.title}
            className="h-10 w-10 rounded object-cover"
          />
          <div className="min-w-0">
            <div className="font-medium text-sm truncate">{currentTrack.title}</div>
            <div className="text-xs text-muted-foreground truncate">{currentTrack.artist}</div>
          </div>
        </div>
        
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center gap-2 mb-1">
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
          
          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="text-xs text-muted-foreground w-8 text-right">
              {formatTime(currentTime)}
            </div>
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
            <div className="text-xs text-muted-foreground w-8">
              {formatTime(duration)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end w-1/4">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={toggleExpanded}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
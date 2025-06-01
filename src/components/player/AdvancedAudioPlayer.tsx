import { useState, useRef, useEffect } from "react";
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
  Shuffle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import WaveSurfer from "wavesurfer.js";

export function AdvancedAudioPlayer() {
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

  const [currentTime, setCurrentTime] = useState(0);
  const [albumRotation, setAlbumRotation] = useState(0);
  const [waveformReady, setWaveformReady] = useState(false);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const rotationIntervalRef = useRef<number | null>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Initialize WaveSurfer
  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        progressColor: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        cursorColor: 'transparent',
        barWidth: 2,
        barGap: 2,
        barRadius: 3,
        height: 60,
        normalize: true,
        responsive: true,
      });

      wavesurfer.on('ready', () => {
        setWaveformReady(true);
        if (isPlaying) {
          wavesurfer.play();
        }
      });

      wavesurfer.on('interaction', (newTime) => {
        const newPosition = (newTime / duration) * 100;
        setPosition(newPosition);
      });

      wavesurferRef.current = wavesurfer;

      return () => {
        wavesurfer.destroy();
        wavesurferRef.current = null;
      };
    }
  }, []);

  // Update waveform colors when theme changes
  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setOptions({
        waveColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        progressColor: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
      });
    }
  }, [isDarkMode]);

  // Load audio when track changes
  useEffect(() => {
    if (currentTrack && wavesurferRef.current) {
      setWaveformReady(false);
      
      // In a real app, you would load the actual audio file
      // For this demo, we'll use a sample audio URL
      const audioUrl = 'https://wavesurfer-js.org/example/media/demo.wav';
      wavesurferRef.current.load(audioUrl);
      
      // Reset position
      setPosition(0);
    }
  }, [currentTrack]);

  // Update waveform progress based on position
  useEffect(() => {
    if (wavesurferRef.current && waveformReady && !wavesurferRef.current.isPlaying()) {
      const seekPosition = (position / 100) * (wavesurferRef.current.getDuration() || 0);
      wavesurferRef.current.seekTo(position / 100);
    }
  }, [position, waveformReady]);

  // Play/pause waveform based on isPlaying state
  useEffect(() => {
    if (wavesurferRef.current && waveformReady) {
      if (isPlaying) {
        wavesurferRef.current.play();
      } else {
        wavesurferRef.current.pause();
      }
    }
  }, [isPlaying, waveformReady]);

  // Update current time based on position
  useEffect(() => {
    if (duration) {
      setCurrentTime((position / 100) * duration);
    }
  }, [position, duration]);

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

  // Rotate album cover when playing
  useEffect(() => {
    if (isPlaying) {
      rotationIntervalRef.current = window.setInterval(() => {
        setAlbumRotation(prev => (prev + 0.2) % 360);
      }, 16);
    } else if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current);
      rotationIntervalRef.current = null;
    }
    
    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, [isPlaying]);

  if (!currentTrack) return null;

  return (
    <div className={cn(
      "w-full max-w-3xl mx-auto rounded-xl overflow-hidden",
      "border shadow-lg",
      isDarkMode 
        ? "bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800" 
        : "bg-gradient-to-br from-white to-zinc-100 border-zinc-200"
    )}>
      <div className="p-6 space-y-6">
        {/* Album Cover with Holographic Effect */}
        <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64">
          <div 
            className={cn(
              "absolute inset-0 rounded-full overflow-hidden",
              "before:absolute before:inset-0 before:z-10",
              "before:bg-gradient-to-br before:from-pink-300/30 before:via-purple-300/30 before:to-blue-300/30",
              "after:absolute after:inset-0 after:z-20",
              "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
              "shadow-xl"
            )}
            style={{ 
              transform: `rotate(${albumRotation}deg)`,
              transition: isPlaying ? 'none' : 'transform 0.5s ease-out'
            }}
          >
            <img 
              src={`https://picsum.photos/seed/${currentTrack.id}/400/400`}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_70%)] animate-pulse"></div>
          </div>
          
          {/* Center hole */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/80 z-30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-zinc-400"></div>
          </div>
        </div>
        
        {/* Track Info */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold">{currentTrack.title}</h2>
          <p className="text-muted-foreground">{currentTrack.artist}</p>
        </div>
        
        {/* Waveform Visualization */}
        <div className="relative h-16">
          <div ref={waveformRef} className="absolute inset-0"></div>
          
          {/* Fallback progress bar when waveform is loading */}
          {!waveformReady && (
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${position}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Time indicators */}
          <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">
            {formatTime(currentTime)}
          </div>
          <div className="absolute -bottom-6 right-0 text-xs text-muted-foreground">
            {formatTime(duration)}
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                "h-10 w-10",
                isShuffled && "text-primary"
              )}
              onClick={toggleShuffle}
            >
              <Shuffle className="h-5 w-5" />
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
              className="h-12 w-12"
              onClick={previousTrack}
            >
              <SkipBack className="h-6 w-6" />
            </Button>
            <Button 
              variant={isDarkMode ? "secondary" : "default"}
              size="icon"
              className={cn(
                "h-16 w-16",
                !isDarkMode && "bg-zinc-900 hover:bg-zinc-800"
              )}
              onClick={() => isPlaying ? pauseTrack() : resumeTrack()}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-12 w-12"
              onClick={nextTrack}
            >
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>
          
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
            <div className="w-20">
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
  );
}
import { useState, useEffect } from "react";
import { usePlayerStore } from "@/lib/player";
import { ModernAudioPlayer } from "./ModernAudioPlayer";
import { ExpandedPlayer } from "./ExpandedPlayer";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { useTracksStore } from "@/lib/tracks";

export function PlayerProvider() {
  const { currentTrack, isPlaying, isExpanded, isMinimized, toggleMinimized, playTrack } = usePlayerStore();
  const [playerType, setPlayerType] = useState<'none' | 'modern' | 'expanded' | 'minimized'>('none');
  const { tracks } = useTracksStore();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    if (!currentTrack || !isPlaying) {
      setPlayerType('none');
    } else if (isMinimized) {
      setPlayerType('minimized');
    } else if (isExpanded) {
      setPlayerType('expanded');
    } else {
      setPlayerType('modern');
    }
  }, [currentTrack, isExpanded, isMinimized, isPlaying]);
  
  if (playerType === 'none') return null;
  
  if (playerType === 'minimized') {
    return (
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "fixed bottom-4 right-4 z-50",
          "shadow-md",
          isDarkMode 
            ? "bg-zinc-900/95 backdrop-blur-md border-zinc-800" 
            : "bg-white/95 backdrop-blur-md border-zinc-200"
        )}
        onClick={toggleMinimized}
      >
        <Music className="h-4 w-4 mr-2" />
        Show Player
      </Button>
    );
  }
  
  if (playerType === 'expanded') {
    return <ExpandedPlayer />;
  }
  
  return <ModernAudioPlayer />;
}
import { usePlayerStore } from "@/lib/player";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, X, Grip } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

export function QueuePanel() {
  const { 
    queue, 
    history, 
    currentTrack, 
    playTrack, 
    removeFromQueue 
  } = usePlayerStore();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="h-96 flex flex-col">
      <ScrollArea className="flex-1">
        {currentTrack && (
          <div className="p-3 border-b">
            <div className="text-xs font-medium mb-2 text-muted-foreground">Now Playing</div>
            <div className={cn(
              "flex items-center gap-3 p-2 rounded-md",
              isDarkMode ? "bg-zinc-800/50" : "bg-zinc-100/80"
            )}>
              <img 
                src={`https://picsum.photos/seed/${currentTrack.id}/32/32`}
                alt={currentTrack.title}
                className="h-8 w-8 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-sm truncate">{currentTrack.title}</div>
                <div className="text-xs text-muted-foreground truncate">{currentTrack.artist}</div>
              </div>
            </div>
          </div>
        )}

        {queue.length > 0 && (
          <div className="p-3 border-b">
            <div className="text-xs font-medium mb-2 text-muted-foreground">Next Up</div>
            <div className="space-y-1">
              {queue.map((track, index) => (
                <div 
                  key={`${track.id}-${index}`}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md group",
                    "hover:bg-muted/50 transition-colors"
                  )}
                >
                  <Grip className="h-3 w-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img 
                    src={`https://picsum.photos/seed/${track.id}/32/32`}
                    alt={track.title}
                    className="h-8 w-8 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm truncate">{track.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{track.artist}</div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => playTrack(track)}
                    >
                      <Play className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => removeFromQueue(track.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="p-3">
            <div className="text-xs font-medium mb-2 text-muted-foreground">Recently Played</div>
            <div className="space-y-1">
              {[...history].reverse().slice(0, 5).map((track, index) => (
                <div 
                  key={`${track.id}-${index}`}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md group",
                    "hover:bg-muted/50 transition-colors"
                  )}
                >
                  <img 
                    src={`https://picsum.photos/seed/${track.id}/32/32`}
                    alt={track.title}
                    className="h-8 w-8 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm truncate">{track.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{track.artist}</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => playTrack(track)}
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {queue.length === 0 && history.length === 0 && !currentTrack && (
          <div className="p-6 text-center text-muted-foreground">
            <p>Your queue is empty</p>
            <p className="text-sm">Add tracks to your queue to get started</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
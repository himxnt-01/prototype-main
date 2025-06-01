import { useState, useEffect } from "react";
import { Track } from "@/types/track";
import { cn } from "@/lib/utils";

interface LyricsTabProps {
  track: Track;
}

export function LyricsTab({ track }: LyricsTabProps) {
  const [formattedLyrics, setFormattedLyrics] = useState<string>("");

  useEffect(() => {
    if (track.lyrics) {
      // Format lyrics with proper line breaks and styling
      const formatted = formatLyrics(track.lyrics);
      setFormattedLyrics(formatted);
    }
  }, [track.lyrics]);

  if (!track.lyrics) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No lyrics available for this track.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Lyrics</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Language:</span>
            <span className="text-sm">{track.metadata.language || "English"}</span>
            {track.metadata.explicit && (
              <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">
                Explicit
              </span>
            )}
          </div>
        </div>

        <div 
          className={cn(
            "rounded-lg border border-border p-6 bg-card",
            "whitespace-pre-wrap font-sans text-base leading-relaxed"
          )}
          dangerouslySetInnerHTML={{ __html: formattedLyrics }}
        />
      </div>
    </div>
  );
}

// Function to format lyrics with HTML for display
function formatLyrics(lyrics: string): string {
  // Split by line breaks
  const lines = lyrics.split('\n');
  
  // Process each line
  const processedLines = lines.map(line => {
    // Skip empty lines
    if (!line.trim()) {
      return '<br/>';
    }
    
    // Check if line is a section header (e.g., "Verse 1:", "Chorus:")
    if (/^(Verse|Chorus|Bridge|Pre-Chorus|Outro|Intro|Hook)(\s\d+)?:$/i.test(line)) {
      return `<div class="font-semibold text-primary mt-4 mb-2">${line}</div>`;
    }
    
    // Regular line
    return `<div>${line}</div>`;
  });
  
  return processedLines.join('');
}
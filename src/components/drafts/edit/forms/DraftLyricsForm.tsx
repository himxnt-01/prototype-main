import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";
import { Draft } from "@/types/draft";
import { cn } from "@/lib/utils";

// Mock implementation of the store, as the original is missing
const useDraftFormStore = () => ({
  // Change this to "yes" to simulate a released track and trigger the AI
  isReleased: "no", 
});

interface DraftLyricsFormProps {
  lyrics: Draft['lyrics'];
  onChange: (updatedLyrics: Draft['lyrics']) => void;
}

const MOCK_LYRICS = `[Verse 1]
City lights reflecting in your eyes
Digital dreams in neon skies
Walking through the rain at midnight
Everything feels so alive

[Chorus]
Electric dreams, they never fade
In this cyberpunk parade
Neon hearts and binary code
Dancing down this digital road`;

export function DraftLyricsForm({ lyrics, onChange }: DraftLyricsFormProps) {
  const { isReleased } = useDraftFormStore();
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);
  const [hasLoadedLyrics, setHasLoadedLyrics] = useState(false);
  const content = lyrics?.content || '';

  useEffect(() => {
    if (isReleased === "yes" && !hasLoadedLyrics && !content) {
      setIsLoadingLyrics(true);
      
      // Simulate AI loading lyrics
      setTimeout(() => {
        onChange({
          content: MOCK_LYRICS,
          language: "English",
        });
        setIsLoadingLyrics(false);
        setHasLoadedLyrics(true);
      }, 1500);
    }
  }, [isReleased, hasLoadedLyrics, content, onChange]);

  return (
    <div className="space-y-6 p-6">
      {isReleased === "yes" && isLoadingLyrics && (
        <Alert className="bg-blue-500/10 text-blue-500 border-blue-500/20">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          <AlertDescription>
            Our Prelude AI has detected lyrics for this track. Loading content...
          </AlertDescription>
        </Alert>
      )}

      {isReleased === "yes" && !isLoadingLyrics && hasLoadedLyrics && (
        <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
          <CheckCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            We've found and populated the lyrics for this track. Feel free to make any necessary edits.
          </AlertDescription>
        </Alert>
      )}

      <div className={cn(
        "space-y-4",
        isLoadingLyrics && "opacity-50 pointer-events-none"
      )}>
        <Textarea
          value={content}
          onChange={(e) => onChange({ ...lyrics, content: e.target.value })}
          placeholder="Enter lyrics here..."
          className="min-h-[400px] font-mono"
        />
      </div>
    </div>
  );
}
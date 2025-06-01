import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";
import { Draft } from "@/types/draft";
import { useDraftFormStore } from "@/lib/draftForm";
import { cn } from "@/lib/utils";

interface DraftLyricsFormProps {
  draft: Draft;
  onChange: (changes: Partial<Draft>) => void;
}

const MOCK_LYRICS = [
  `Verse 1:
City lights reflecting in your eyes
Digital dreams in neon skies
Walking through the rain at midnight
Everything feels so alive

Chorus:
Electric dreams, they never fade
In this cyberpunk parade
Neon hearts and binary code
Dancing down this digital road

Verse 2:
Hologram memories in the air
Virtual reality everywhere
Breaking through the matrix tonight
Finding love in pure moonlight`,
  `Verse 1:
Ocean waves crash on distant shores
Memories drift like grains of sand
Time stands still, yet moves forward
In this moment, hand in hand

Chorus:
Beneath the stars we find our way
Through storms and calm, come what may
Your love's the anchor in my sea
Forever where I want to be

Bridge:
The tides may change, the winds may blow
But our love will always grow`,
  `Verse 1:
Midnight shadows dance and sway
Urban echoes fade away
In this moment, we're alive
As the city learns to fly

Chorus:
We are the dreamers of the night
Painting colors burning bright
In this world of endless sound
Lost and found, but heaven bound

Verse 2:
Streetlight symphonies play on
Till the breaking of the dawn
Every heartbeat tells a tale
Of love that cannot fail`
];

export function DraftLyricsForm({ draft, onChange }: DraftLyricsFormProps) {
  const { isReleased, isScanning } = useDraftFormStore();
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);
  const [hasLoadedLyrics, setHasLoadedLyrics] = useState(false);

  useEffect(() => {
    if (isReleased === "yes" && !hasLoadedLyrics) {
      setIsLoadingLyrics(true);
      
      // Simulate AI loading lyrics
      setTimeout(() => {
        const randomLyrics = MOCK_LYRICS[Math.floor(Math.random() * MOCK_LYRICS.length)];
        onChange({
          lyrics: {
            content: randomLyrics,
            language: "English",
            explicit: false
          }
        });
        setIsLoadingLyrics(false);
        setHasLoadedLyrics(true);
      }, 2000);
    }
  }, [isReleased, onChange, hasLoadedLyrics]);

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
          value={draft.lyrics?.content || ""}
          onChange={(e) => onChange({
            lyrics: {
              ...draft.lyrics,
              content: e.target.value
            }
          })}
          placeholder="Enter lyrics here..."
          className="min-h-[400px] font-mono"
        />
      </div>
    </div>
  );
}
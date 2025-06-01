import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Zap, Star } from "lucide-react";

const MOOD_ICONS = {
  "Inspirational": Star,
  "Energetic": Zap,
  "Emotional": Heart,
  "Playful": Sparkles
} as const;

interface BriefMoodProps {
  moods: string[];
}

export function BriefMood({ moods }: BriefMoodProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Mood:</span>
      <div className="flex flex-wrap gap-1">
        {moods.map((mood) => {
          const Icon = MOOD_ICONS[mood as keyof typeof MOOD_ICONS];
          return (
            <Badge 
              key={mood} 
              variant="secondary" 
              className="bg-pink-500/10 text-pink-500"
            >
              {Icon && <Icon className="h-3.5 w-3.5 mr-1" />}
              {mood}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

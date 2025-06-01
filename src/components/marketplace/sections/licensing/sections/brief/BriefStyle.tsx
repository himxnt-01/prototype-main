import { Badge } from "@/components/ui/badge";
import { Music2, AudioWaveform, Sparkles } from "lucide-react";

const STYLE_ICONS = {
  "Orchestral": Music2,
  "Electronic": AudioWaveform,
  "Pop": Music2,
  "Ambient": AudioWaveform,
  "Hybrid": Sparkles
} as const;

interface BriefStyleProps {
  styles: string[];
}

export function BriefStyle({ styles }: BriefStyleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Style:</span>
      <div className="flex flex-wrap gap-1">
        {styles.map((style) => {
          const Icon = STYLE_ICONS[style as keyof typeof STYLE_ICONS];
          return (
            <Badge 
              key={style} 
              variant="secondary" 
              className="bg-purple-500/10 text-purple-500"
            >
              {Icon && <Icon className="h-3.5 w-3.5 mr-1" />}
              {style}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

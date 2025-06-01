import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface BriefReferencesProps {
  tracks?: string[];
}

export function BriefReferences({ tracks }: BriefReferencesProps) {
  if (!tracks?.length) return null;

  return (
    <div className="space-y-2">
      <span className="text-sm text-muted-foreground">Reference Tracks:</span>
      <div className="space-y-2">
        {tracks.map((track) => (
          <div 
            key={track}
            className={cn(
              "flex items-center justify-between p-2 rounded-md",
              "bg-background/50 hover:bg-background/70",
              "transition-colors"
            )}
          >
            <div className="text-sm">{track}</div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

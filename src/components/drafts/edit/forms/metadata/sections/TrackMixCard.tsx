import { Mix } from "@/types/mix";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { TYPE_STYLES } from "@/config/mixCategories";

interface TrackMixCardProps {
  mix: Mix;
  onSelect: () => void;
}

export function TrackMixCard({ mix, onSelect }: TrackMixCardProps) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-lg",
      "border bg-card-gradient hover:bg-card transition-colors"
    )}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="font-medium truncate">{mix.title}</h4>
          <Badge
            variant="secondary"
            className={cn("capitalize shrink-0", TYPE_STYLES[mix.type])}
          >
            {mix.type.replace("_", " ")}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <span>{mix.duration}</span>
          <span>•</span>
          <span className="truncate">{mix.metadata.mixer}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Play className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={onSelect}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
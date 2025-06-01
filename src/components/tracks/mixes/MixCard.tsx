import { Mix } from "@/types/mix";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { MixActions } from "./MixActions";
import { cn } from "@/lib/utils";
import { TYPE_STYLES } from "@/config/mixCategories";

interface MixCardProps {
  mix: Mix;
}

export function MixCard({ mix }: MixCardProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-card-gradient hover:bg-card transition-colors">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-medium truncate">{mix.title}</h4>
          <Badge
            variant="secondary"
            className={cn("capitalize shrink-0", TYPE_STYLES[mix.type])}
          >
            {mix.type.replace("_", " ")}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
          <span>{mix.duration}</span>
          <span>•</span>
          <span>{mix.metadata.mixer}</span>
          {mix.metadata.notes && (
            <>
              <span>•</span>
              <span className="truncate text-muted-foreground/70">
                {mix.metadata.notes}
              </span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Play className="h-4 w-4" />
        </Button>
        <MixActions mix={mix} />
      </div>
    </div>
  );
}
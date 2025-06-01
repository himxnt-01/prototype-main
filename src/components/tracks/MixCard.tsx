import { Mix } from "@/types/mix";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TYPE_STYLES } from "@/config/mixCategories";

interface MixCardProps {
  mix: Mix;
}

export function MixCard({ mix }: MixCardProps) {
  return (
    <div className="group flex items-center justify-between p-3 rounded-md border border-border bg-card-gradient hover:bg-card transition-colors">
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
          {mix.metadata.notes && (
            <>
              <span>•</span>
              <span className="truncate text-muted-foreground/70">{mix.metadata.notes}</span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Play className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Mix</DropdownMenuItem>
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
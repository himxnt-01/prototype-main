import { Mix } from "@/types/mix";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Play, Share2, FileEdit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MixCardProps {
  mix: Mix;
}

const TYPE_STYLES = {
  radio_edit: "bg-blue-500/10 text-blue-500",
  extended: "bg-indigo-500/10 text-indigo-500",
  instrumental: "bg-purple-500/10 text-purple-500",
  acapella: "bg-pink-500/10 text-pink-500",
  remix: "bg-yellow-500/10 text-yellow-500",
  acoustic: "bg-green-500/10 text-green-500",
  live: "bg-orange-500/10 text-orange-500",
  clean: "bg-teal-500/10 text-teal-500",
  tv_edit: "bg-cyan-500/10 text-cyan-500",
  film_score: "bg-violet-500/10 text-violet-500",
  trailer: "bg-rose-500/10 text-rose-500",
};

export function MixCard({ mix }: MixCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{mix.title}</h4>
            <Badge
              variant="secondary"
              className={cn("capitalize", TYPE_STYLES[mix.type])}
            >
              {mix.type.replace("_", " ")}
            </Badge>
            {mix.approvalStatus === "approved" && (
              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                Approved
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground space-x-2">
            <span>{mix.duration}</span>
            <span>•</span>
            <span>{mix.metadata.date}</span>
            {mix.version && (
              <>
                <span>•</span>
                <span>v{mix.version}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileEdit className="h-4 w-4 mr-2" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem>View History</DropdownMenuItem>
              <DropdownMenuItem>Download Stems</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete Mix
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {(mix.metadata.notes || mix.technicalNotes) && (
        <div className="px-4 py-3 border-t border-border bg-muted/50">
          <div className="text-sm space-y-1">
            {mix.metadata.notes && (
              <p className="text-muted-foreground">{mix.metadata.notes}</p>
            )}
            {mix.technicalNotes && (
              <p className="text-xs text-muted-foreground/80">{mix.technicalNotes}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
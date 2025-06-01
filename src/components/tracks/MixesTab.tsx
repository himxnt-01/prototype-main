import { Mix } from "@/types/mix";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MixesTabProps {
  mixes?: Mix[];
  isParentTrack: boolean;
  parentTrackTitle?: string;
}

export function MixesTab({ mixes, isParentTrack, parentTrackTitle }: MixesTabProps) {
  if (!isParentTrack) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        This is a mix of "{parentTrackTitle}". Mixes cannot have their own mixes.
      </div>
    );
  }

  if (!mixes?.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        No mixes available for this track.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {mixes.map((mix) => (
        <div
          key={mix.id}
          className="flex items-start justify-between rounded-lg border p-4 border-border"
        >
          <div className="space-y-1">
            <div className="font-medium">{mix.title}</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Duration: {mix.duration}</div>
              <div>Mixed by: {mix.metadata.mixer}</div>
              {mix.metadata.notes && <div>Notes: {mix.metadata.notes}</div>}
            </div>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "capitalize",
              mix.type === "radio_edit" && "bg-blue-500/10 text-blue-500",
              mix.type === "instrumental" && "bg-purple-500/10 text-purple-500",
              mix.type === "acoustic" && "bg-green-500/10 text-green-500",
              mix.type === "remix" && "bg-yellow-500/10 text-yellow-500"
            )}
          >
            {mix.type.replace("_", " ")}
          </Badge>
        </div>
      ))}
    </div>
  );
}
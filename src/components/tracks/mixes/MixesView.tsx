import { Mix } from "@/types/mix";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MixesHeader } from "./MixesHeader";
import { MixCategories } from "./MixCategories";

interface MixesViewProps {
  mixes?: Mix[];
  isParentTrack: boolean;
  parentTrackTitle?: string;
}

export function MixesView({ mixes, isParentTrack, parentTrackTitle }: MixesViewProps) {
  if (!isParentTrack && parentTrackTitle) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        This is a mix of "{parentTrackTitle}". Mixes cannot have their own mixes.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Available Mixes</h2>
          <p className="text-sm text-muted-foreground">
            {mixes?.length || 0} mix{mixes?.length !== 1 ? "es" : ""} available
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {mixes?.length ? (
            <MixCategories mixes={mixes} />
          ) : (
            <div className="text-sm text-muted-foreground text-center py-8">
              No mixes available. Create a new mix to get started.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
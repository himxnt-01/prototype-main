import { Mix } from "@/types/mix";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MixCard } from "./MixCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MIX_CATEGORIES } from "@/config/mixCategories";

interface MixesViewProps {
  mixes?: Mix[];
  isParentTrack: boolean;
  parentTrackTitle?: string;
}

export function MixesView({ mixes, isParentTrack, parentTrackTitle }: MixesViewProps) {
  if (!isParentTrack && parentTrackTitle) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        This is a mix of "{parentTrackTitle}". Mixes cannot have their own mixes.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium">Available Mixes</h3>
          <p className="text-sm text-muted-foreground">
            {mixes?.length || 0} mix{mixes?.length !== 1 ? "es" : ""} available
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Mix
        </Button>
      </div>

      <ScrollArea className="flex-1 -mx-4">
        <div className="px-4 space-y-8">
          {MIX_CATEGORIES.map((category) => {
            const categoryMixes = mixes?.filter(mix => 
              category.types.includes(mix.type)
            ) || [];

            if (categoryMixes.length === 0) return null;

            return (
              <div key={category.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    {category.label}
                    <Badge variant="secondary" className="text-xs">
                      {categoryMixes.length}
                    </Badge>
                  </h4>
                </div>
                <div className="space-y-2">
                  {categoryMixes.map((mix) => (
                    <MixCard key={mix.id} mix={mix} />
                  ))}
                </div>
              </div>
            );
          })}

          {(!mixes || mixes.length === 0) && (
            <div className="text-sm text-muted-foreground text-center py-8">
              No mixes available. Create a new mix to get started.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
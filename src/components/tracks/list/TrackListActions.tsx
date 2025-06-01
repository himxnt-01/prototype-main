import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTracksStore } from "@/lib/tracks";
import { SelectionActions } from "@/components/shared/SelectionActions";
import { Search, Filter, ArrowDownUp, Sparkles } from "lucide-react";
import { SortMenu } from "./menus/SortMenu";
import { FilterMenu } from "./menus/FilterMenu";

export function TrackListActions() {
  const { 
    isSelectionMode, 
    toggleSelectionMode, 
    selectedTrackIds,
    selectAllTracks,
    clearSelection,
    tracks
  } = useTracksStore();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <SelectionActions
          isSelectionMode={isSelectionMode}
          selectedCount={selectedTrackIds.size}
          totalCount={tracks.length}
          onToggleMode={toggleSelectionMode}
          onSelectAll={selectAllTracks}
          onClearSelection={clearSelection}
        />
        
        <SortMenu />
        <FilterMenu />
      </div>

      <div className="flex-1 flex items-center gap-2 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search tracks..." 
            className="pl-8"
          />
        </div>
        <Button variant="secondary" size="icon">
          <Sparkles className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
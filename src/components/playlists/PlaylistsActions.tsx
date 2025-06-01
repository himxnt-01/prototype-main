import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlaylistsStore } from "@/lib/playlists";
import { SelectionActions } from "@/components/shared/SelectionActions";
import { Search, Filter, ArrowDownUp, Sparkles } from "lucide-react";
import { SortMenu } from "./menus/SortMenu";
import { FilterMenu } from "./menus/FilterMenu";
import { ViewToggle } from "./ViewToggle";

export function PlaylistsActions() {
  const { 
    isSelectionMode, 
    toggleSelectionMode, 
    selectedPlaylistIds,
    selectAllPlaylists,
    clearSelection,
    playlists
  } = usePlaylistsStore();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <SelectionActions
          isSelectionMode={isSelectionMode}
          selectedCount={selectedPlaylistIds.size}
          totalCount={playlists.length}
          onToggleMode={toggleSelectionMode}
          onSelectAll={selectAllPlaylists}
          onClearSelection={clearSelection}
        />
        
        <SortMenu />
        <FilterMenu />
        <ViewToggle />
      </div>

      <div className="flex-1 flex items-center gap-2 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search playlists..." 
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
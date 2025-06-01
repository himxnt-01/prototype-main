import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAlbumsStore } from "@/lib/albums";
import { SelectionActions } from "@/components/shared/SelectionActions";
import { Search, Filter, ArrowDownUp, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewToggle } from "./ViewToggle";

export function AlbumsActions() {
  const { 
    isSelectionMode, 
    toggleSelectionMode, 
    selectedAlbumIds,
    selectAllAlbums,
    clearSelection,
    albums,
    viewMode,
    setViewMode
  } = useAlbumsStore();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <SelectionActions
          isSelectionMode={isSelectionMode}
          selectedCount={selectedAlbumIds.size}
          totalCount={albums.length}
          onToggleMode={toggleSelectionMode}
          onSelectAll={selectAllAlbums}
          onClearSelection={clearSelection}
        />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Title (A-Z)</DropdownMenuItem>
            <DropdownMenuItem>Artist (A-Z)</DropdownMenuItem>
            <DropdownMenuItem>Release Date</DropdownMenuItem>
            <DropdownMenuItem>Number of Tracks</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Albums</DropdownMenuItem>
            <DropdownMenuItem>EPs</DropdownMenuItem>
            <DropdownMenuItem>Singles</DropdownMenuItem>
            <DropdownMenuItem>Genre</DropdownMenuItem>
            <DropdownMenuItem>Release Year</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      <div className="flex-1 flex items-center gap-2 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search albums..." 
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
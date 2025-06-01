import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useArtistsStore } from "@/lib/artists";
import { SelectionActions } from "@/components/shared/SelectionActions";
import { Search, Filter, ArrowDownUp, X } from "lucide-react";
import { ViewToggle } from "./ViewToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ArtistsActions() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { 
    isSelectionMode, 
    toggleSelectionMode, 
    selectedArtistIds,
    selectAllArtists,
    clearSelection,
    artists,
    viewMode,
    setViewMode,
    isDetailsOpen
  } = useArtistsStore();

  const showExpandedSearch = isSearchFocused && isDetailsOpen;

  return (
    <div className="relative">
      <div className={cn(
        "flex items-center gap-3 transition-opacity duration-300",
        showExpandedSearch && "opacity-0"
      )}>
        <div className="flex items-center gap-2">
          <SelectionActions
            isSelectionMode={isSelectionMode}
            selectedCount={selectedArtistIds.size}
            totalCount={artists.length}
            onToggleMode={toggleSelectionMode}
            onSelectAll={selectAllArtists}
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
              <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>Monthly Listeners</DropdownMenuItem>
              <DropdownMenuItem>Total Plays</DropdownMenuItem>
              <DropdownMenuItem>Followers</DropdownMenuItem>
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
              <DropdownMenuItem>Genre</DropdownMenuItem>
              <DropdownMenuItem>Monthly Listeners</DropdownMenuItem>
              <DropdownMenuItem>Location</DropdownMenuItem>
              <DropdownMenuItem>Has Albums</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        <div className="flex-1 flex items-center gap-2 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search artists..." 
              className="pl-8"
              onFocus={() => setIsSearchFocused(true)}
            />
          </div>
        </div>
      </div>

      {/* Expanded Search */}
      <div className={cn(
        "absolute inset-0 transition-all duration-300",
        showExpandedSearch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      )}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search artists..." 
            className="w-full h-12 pl-10 pr-12 text-lg"
            autoFocus
            onBlur={() => setIsSearchFocused(false)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => setIsSearchFocused(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
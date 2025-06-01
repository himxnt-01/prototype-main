import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ArrowDownUp, 
  Filter, 
  Search, 
  Sparkles,
  ListChecks,
  FileEdit,
  CheckSquare,
  X
} from "lucide-react";
import { useTracksStore } from "@/lib/tracks";

export function TracksActions() {
  const { 
    isSelectionMode, 
    toggleSelectionMode, 
    selectedTrackIds,
    selectAllTracks,
    clearSelection,
    tracks
  } = useTracksStore();

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center gap-2">
        {isSelectionMode ? (
          <>
            <div className="text-sm text-muted-foreground">
              {selectedTrackIds.size} tracks selected
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Bulk Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={selectAllTracks}>
                  Select All ({tracks.length})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={clearSelection}>
                  Clear Selection
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileEdit className="h-4 w-4 mr-2" />
                  Edit Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleSelectionMode}
            >
              <X className="h-4 w-4 mr-2" />
              Exit Selection
            </Button>
          </>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleSelectionMode}
          >
            <ListChecks className="h-4 w-4 mr-2" />
            Select Tracks
          </Button>
        )}
        
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
            <DropdownMenuItem>Date Added</DropdownMenuItem>
            <DropdownMenuItem>Duration</DropdownMenuItem>
            <DropdownMenuItem>BPM</DropdownMenuItem>
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
            <DropdownMenuItem>Key</DropdownMenuItem>
            <DropdownMenuItem>BPM Range</DropdownMenuItem>
            <DropdownMenuItem>Release Date</DropdownMenuItem>
            <DropdownMenuItem>Writers</DropdownMenuItem>
            <DropdownMenuItem>Tags</DropdownMenuItem>
            <DropdownMenuItem>Sync Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
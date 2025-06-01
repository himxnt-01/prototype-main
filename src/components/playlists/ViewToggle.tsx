import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { usePlaylistsStore, ViewMode } from "@/lib/playlists";
import { cn } from "@/lib/utils";

export function ViewToggle() {
  const { viewMode, setViewMode } = usePlaylistsStore();

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <div className="flex items-center gap-1 border rounded-md bg-muted/50">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2",
          viewMode === 'grid' && "bg-background shadow-sm"
        )}
        onClick={() => handleViewChange('grid')}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2",
          viewMode === 'list' && "bg-background shadow-sm"
        )}
        onClick={() => handleViewChange('list')}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
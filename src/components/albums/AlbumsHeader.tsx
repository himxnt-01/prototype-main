import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Play } from "lucide-react";
import { AlbumsActions } from "./AlbumsActions";
import { CreateAlbumDialog } from "./CreateAlbumDialog";

export function AlbumsHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-4">
        <Button size="icon" variant="secondary">
          <Play className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Albums</h1>
          <p className="text-sm text-muted-foreground">
            Browse and manage your album releases
          </p>
        </div>
        <div className="flex-1" />
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Album
        </Button>
      </div>
      <AlbumsActions />

      <CreateAlbumDialog 
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
}
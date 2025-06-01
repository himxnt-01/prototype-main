import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { TrackListActions } from "./TrackListActions";

export function TrackListHeader() {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-4">
        <Button size="icon" variant="secondary">
          <Play className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Tracks</h1>
      </div>
      <TrackListActions />
    </div>
  );
}
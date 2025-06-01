import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TracksActions } from "./TracksActions";

export function TracksHeader() {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-4">
        <Button size="icon" variant="secondary">
          <Play className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Tracks</h1>
      </div>
      <TracksActions />
    </div>
  );
}
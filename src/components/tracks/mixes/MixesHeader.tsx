import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MixesHeaderProps {
  mixCount: number;
}

export function MixesHeader({ mixCount }: MixesHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-medium">Available Mixes</h3>
        <p className="text-sm text-muted-foreground">
          {mixCount} mix{mixCount !== 1 ? "es" : ""} available
        </p>
      </div>
      <Button size="sm">
        <Plus className="h-4 w-4 mr-2" />
        New Mix
      </Button>
    </div>
  );
}
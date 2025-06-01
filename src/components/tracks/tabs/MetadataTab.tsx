import { TrackMetadata } from "@/types/track";
import { Button } from "@/components/ui/button";
import { FileEdit } from "lucide-react";

interface MetadataTabProps {
  metadata: TrackMetadata;
}

export function MetadataTab({ metadata }: MetadataTabProps) {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-4">
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key}>
            <div className="text-sm text-muted-foreground capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <div className="text-sm">
              {Array.isArray(value) ? value.join(", ") : value?.toString()}
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-border">
        <Button variant="outline" size="sm">
          <FileEdit className="h-4 w-4 mr-2" />
          Edit Metadata
        </Button>
      </div>
    </div>
  );
}
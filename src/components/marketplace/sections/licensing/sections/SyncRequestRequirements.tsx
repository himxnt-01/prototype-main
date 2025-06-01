import { Badge } from "@/components/ui/badge";
import { Requirements } from "../types";

interface SyncRequestRequirementsProps {
  requirements: Requirements;
}

export function SyncRequestRequirements({ requirements }: SyncRequestRequirementsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {requirements.stems && (
          <Badge variant="secondary">Stems Required</Badge>
        )}
        {requirements.formats.map((format) => (
          <Badge key={format} variant="secondary">
            {format}
          </Badge>
        ))}
        {requirements.custom_edits && (
          <Badge variant="secondary">Custom Edits</Badge>
        )}
        {requirements.loop_points && (
          <Badge variant="secondary">Loop Points Required</Badge>
        )}
        {requirements.variations && (
          <Badge variant="secondary">
            {requirements.variations.length} Versions Required
          </Badge>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        <div>Delivery Method: {requirements.delivery}</div>
        {requirements.variations && (
          <div>Required Versions: {requirements.variations.join(", ")}</div>
        )}
      </div>
    </div>
  );
}
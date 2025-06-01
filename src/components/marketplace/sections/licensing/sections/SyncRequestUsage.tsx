import { Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Usage } from "../types";

interface SyncRequestUsageProps {
  usage: Usage;
}

export function SyncRequestUsage({ usage }: SyncRequestUsageProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Globe className="h-4 w-4" />
        Usage Rights
      </div>
      
      <div className="space-y-2">
        <div>
          <div className="text-sm text-muted-foreground">Primary Usage</div>
          <div className="font-medium">{usage.primary}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">Secondary Usage</div>
          <div className="flex flex-wrap gap-1">
            {usage.secondary.map((use) => (
              <Badge key={use} variant="secondary">
                {use}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Territory</span>
            <span className="text-sm">{usage.territory}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Duration</span>
            <span className="text-sm">{usage.duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Exclusivity</span>
            <span className="text-sm">{usage.exclusivity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
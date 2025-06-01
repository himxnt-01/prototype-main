import { Globe, Clock, Shield } from "lucide-react";
import { Usage } from "../../types";
import { Badge } from "@/components/ui/badge";

interface SyncRequestUsageProps {
  usage: Usage;
}

export function SyncRequestUsage({ usage }: SyncRequestUsageProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
        <Globe className="h-4 w-4" />
        Usage Rights
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="font-medium">{usage.primary}</div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {usage.secondary.map((use) => (
              <Badge 
                key={use}
                variant="secondary"
                className="bg-blue-500/5 text-blue-600/90 border-blue-500/20"
              >
                {use}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Territory</span>
            <span>{usage.territory}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Duration</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-blue-500" />
              {usage.duration}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Exclusivity</span>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-blue-500" />
              {usage.exclusivity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
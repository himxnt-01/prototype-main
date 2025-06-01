import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

interface BriefAudienceProps {
  audience?: string;
}

export function BriefAudience({ audience }: BriefAudienceProps) {
  if (!audience) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Target Audience:</span>
      <Badge variant="secondary">
        <Target className="h-3.5 w-3.5 mr-1" />
        {audience}
      </Badge>
    </div>
  );
}

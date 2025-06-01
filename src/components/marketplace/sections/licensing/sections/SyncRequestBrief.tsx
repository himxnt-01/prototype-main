import { Brief } from "../types";
import { BriefMood } from "./brief/BriefMood";
import { BriefStyle } from "./brief/BriefStyle";
import { BriefReferences } from "./brief/BriefReferences";
import { BriefAudience } from "./brief/BriefAudience";
import { cn } from "@/lib/utils";

interface SyncRequestBriefProps {
  brief: Brief;
}

export function SyncRequestBrief({ brief }: SyncRequestBriefProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Music Brief</h3>
      
      <div className={cn(
        "p-4 rounded-lg space-y-4",
        "bg-gradient-to-br from-card/30 via-card/20 to-background/10",
        "border border-border/50"
      )}>
        <p className="text-sm text-muted-foreground">{brief.description}</p>
        
        <div className="space-y-4">
          <BriefMood moods={brief.mood} />
          <BriefStyle styles={brief.style} />
          <BriefReferences tracks={brief.reference_tracks} />
          <BriefAudience audience={brief.target_audience} />
        </div>
      </div>
    </div>
  );
}
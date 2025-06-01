import { ScrollArea } from "@/components/ui/scroll-area";
import { Draft } from "@/types/draft";
import { WritersSection } from "./sections/WritersSection";
import { PublishingSection } from "./sections/PublishingSection";
import { MasterRightsSection } from "./sections/MasterRightsSection";
import { cn } from "@/lib/utils";

interface RightsFormProps {
  draft: Draft;
  onDirtyChange: (isDirty: boolean) => void;
}

export function RightsForm({ draft, onDirtyChange }: RightsFormProps) {
  // Initialize empty rights object if not present
  const rights = draft.rights || {
    writers: [],
    publishers: [],
    masterOwners: []
  };

  const handleChange = () => {
    onDirtyChange(true);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Rights & Ownership</h2>
          <p className="text-sm text-muted-foreground">
            Manage the rights and ownership information for this track
          </p>
        </div>

        <div className="space-y-8">
          <WritersSection 
            writers={rights.writers} 
            onChange={handleChange} 
          />

          <div className={cn(
            "h-px",
            "bg-gradient-to-r from-border/0 via-border to-border/0"
          )} />

          <PublishingSection 
            publishers={rights.publishers} 
            onChange={handleChange} 
          />

          <div className={cn(
            "h-px",
            "bg-gradient-to-r from-border/0 via-border to-border/0"
          )} />

          <MasterRightsSection 
            masterOwners={rights.masterOwners} 
            onChange={handleChange} 
          />
        </div>
      </div>
    </ScrollArea>
  );
}

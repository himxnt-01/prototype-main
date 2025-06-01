import { Draft } from "@/types/draft";
import { WritersSection } from "./rights/sections/WritersSection";
import { PublishingSection } from "./rights/sections/PublishingSection";
import { MasterRightsSection } from "./rights/sections/MasterRightsSection";

interface DraftRightsFormProps {
  draft: Draft;
}

export function DraftRightsForm({ draft }: DraftRightsFormProps) {
  // Initialize empty rights object if not present
  const rights = draft.rights || {
    writers: [],
    publishers: [],
    masterOwners: []
  };

  const handleWritersChange = (writers: typeof rights.writers) => {
    draft.rights = { ...rights, writers };
  };

  const handlePublishersChange = (publishers: typeof rights.publishers) => {
    draft.rights = { ...rights, publishers };
  };

  const handleMasterOwnersChange = (masterOwners: typeof rights.masterOwners) => {
    draft.rights = { ...rights, masterOwners };
  };

  return (
    <div className="p-6">
      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Rights & Ownership</h2>
          <p className="text-sm text-muted-foreground">
            Manage the rights and ownership information for this track
          </p>
        </div>

        <div className="space-y-8">
          <WritersSection 
            writers={rights.writers} 
            onChange={handleWritersChange} 
          />

          <div className="h-px bg-border/50" />

          <PublishingSection 
            publishers={rights.publishers} 
            onChange={handlePublishersChange} 
          />

          <div className="h-px bg-border/50" />

          <MasterRightsSection 
            masterOwners={rights.masterOwners} 
            onChange={handleMasterOwnersChange} 
          />
        </div>
      </div>
    </div>
  );
}
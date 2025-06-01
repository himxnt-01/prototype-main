import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle } from "lucide-react";
import { Draft } from "@/types/draft";
import { PublishingSection } from "./sections/PublishingSection";
import { MasterRightsSection } from "./sections/MasterRightsSection";
import { cn } from "@/lib/utils";
import { useDraftFormStore } from "@/lib/draftForm";
import { Button } from "@/components/ui/button";

interface DraftRightsFormProps {
  draft: Draft;
  onChange: (changes: Partial<Draft>) => void;
}

// Mock AI-suggested rights data
const MOCK_AI_RIGHTS = {
  publishers: [
    { name: "Echo Publishing", share: 70, territories: ["Worldwide"] },
    { name: "Night Owl Music", share: 30, territories: ["USA"] }
  ],
  masterOwners: [
    { name: "Universal Music Group", share: 100, territories: ["Worldwide"] }
  ]
};

export function DraftRightsForm({ draft, onChange }: DraftRightsFormProps) {
  const { isReleased, hasLoadedRights, setHasLoadedRights } = useDraftFormStore();
  const [isLoadingRights, setIsLoadingRights] = useState(false);
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  
  // Initialize empty rights object if not present
  if (!draft.rights) {
    draft.rights = {
      writers: [],
      publishers: [],
      masterOwners: []
    };
  }

  // Effect to load AI rights data when tab is viewed and song is released
  useEffect(() => {
    if (isReleased === "yes" && !hasLoadedRights) {
      setIsLoadingRights(true);
      
      // Simulate AI loading rights data
      setTimeout(() => {
        onChange({
          rights: {
            ...draft.rights,
            ...MOCK_AI_RIGHTS
          }
        });
        setIsLoadingRights(false);
        setHasLoadedRights(true);
      }, 2000);
    }
  }, [isReleased, draft.rights, onChange, hasLoadedRights, setHasLoadedRights]);

  const handlePublishersChange = () => {
    onChange({ rights: draft.rights });
  };

  const handleMasterOwnersChange = () => {
    onChange({ rights: draft.rights });
  };

  const handleConfirmRights = () => {
    setRightsConfirmed(true);
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

        {isReleased === "yes" && isLoadingRights && (
          <Alert className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <AlertDescription>
              We've found rights information for this released track. Loading data...
            </AlertDescription>
          </Alert>
        )}

        {isReleased === "yes" && !isLoadingRights && hasLoadedRights && (
          <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              {rightsConfirmed 
                ? "Rights information confirmed. You can still make changes if needed."
                : "We've found and populated rights information for this released track. Please review and confirm."}
            </AlertDescription>
          </Alert>
        )}

        <div className={cn(
          "space-y-8",
          isLoadingRights && "opacity-50 pointer-events-none"
        )}>
          <MasterRightsSection 
            masterOwners={draft.rights.masterOwners} 
            onChange={handleMasterOwnersChange} 
          />

          <div className="h-px bg-border/50" />

          <PublishingSection 
            publishers={draft.rights.publishers} 
            onChange={handlePublishersChange} 
          />

          {isReleased === "yes" && !isLoadingRights && hasLoadedRights && !rightsConfirmed && (
            <div className="flex justify-end mt-8">
              <Button onClick={handleConfirmRights}>
                Confirm Rights Information
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
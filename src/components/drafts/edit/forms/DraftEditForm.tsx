import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDraftsStore } from "@/lib/drafts";
import { Draft } from "@/types/draft";
import { TabList, TabTrigger, TabContent } from "@/components/ui/custom-tabs";
import { SaveButton } from "./SaveButton";
import { SaveToLibraryButton } from "./SaveToLibraryButton";
import { MetadataForm } from "./metadata/MetadataForm";
import { DraftRightsForm } from "./rights/DraftRightsForm";
import { DraftLyricsForm } from "./DraftLyricsForm";
import { DraftTagsForm } from "./DraftTagsForm";
import { DraftStatusForm } from "./DraftStatusForm";
import { useDraftFormStore } from "@/lib/draftForm";

const EDIT_TABS = [
  { id: "metadata", label: "Metadata" },
  { id: "rights", label: "Rights" },
  { id: "lyrics", label: "Lyrics" },
  { id: "tags", label: "Tags" },
  { id: "status", label: "Status" }
] as const;

type EditTab = typeof EDIT_TABS[number]["id"];

export function DraftEditForm() {
  const { drafts, selectedDraftId, publishDraft } = useDraftsStore();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<EditTab>("metadata");
  const [isSaving, setIsSaving] = useState(false);
  const [draftState, setDraftState] = useState<Draft | null>(null);
  const { setIsReleased, setHasLoadedRights } = useDraftFormStore();

  useEffect(() => {
    const draft = drafts.find(d => d.id === selectedDraftId);
    if (draft) {
      setDraftState({ ...draft });
      // Set a default "released" status, since it's not in the DB
      setIsReleased("no");
    }
  }, [selectedDraftId, drafts, setIsReleased]);

  useEffect(() => {
    // Reset form state when tab changes
    if (currentTab === "metadata") {
      setIsReleased(undefined);
    }
  }, [currentTab, setIsReleased]);

  if (!draftState) return null;

  const handleSave = async () => {
    if (!draftState) return;
    setIsSaving(true);
    try {
      // We only need to pass the values that can be edited.
      // The `publishDraft` function handles adding `is_published` and `updated_at`.
      // We also exclude `artist` as it's a client-side derived field.
      const { id, created_at, lastModified, progress, user_id, artist, ...valuesToUpdate } = draftState;
      await publishDraft(draftState.id, valuesToUpdate);
      navigate('/tracks');
    } catch (error) {
      console.error("Failed to save and publish draft:", error);
      // Here you could show an error toast to the user
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (changes: Partial<Draft>) => {
    setDraftState(prev => ({
      ...prev!,
      ...changes
    }));
  };

  const handleTabChange = (tab: EditTab) => {
    setCurrentTab(tab);
    
    // Reset rights loading state when switching to rights tab
    if (tab === "rights") {
      setHasLoadedRights(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 border-b">
        <TabList>
          {EDIT_TABS.map(tab => (
            <TabTrigger
              key={tab.id}
              id={tab.id}
              label={tab.label}
              isActive={currentTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
            />
          ))}
        </TabList>

        <div className="flex items-center gap-2 py-2">
          <SaveButton 
            onSave={handleSave}
            isSaving={isSaving}
          />
          {currentTab === "status" && (
            <SaveToLibraryButton draft={draftState} />
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <TabContent id="metadata" currentTab={currentTab}>
          <MetadataForm 
            draft={draftState}
            onChange={handleChange}
          />
        </TabContent>

        <TabContent id="rights" currentTab={currentTab}>
          <DraftRightsForm 
            draft={draftState}
            onChange={handleChange}
          />
        </TabContent>

        <TabContent id="lyrics" currentTab={currentTab}>
          <DraftLyricsForm 
            draft={draftState}
            onChange={handleChange}
          />
        </TabContent>

        <TabContent id="tags" currentTab={currentTab}>
          <DraftTagsForm 
            draft={draftState}
            onChange={handleChange}
          />
        </TabContent>

        <TabContent id="status" currentTab={currentTab}>
          <DraftStatusForm 
            draft={draftState}
            onChange={handleChange}
          />
        </TabContent>
      </div>
    </div>
  );
}
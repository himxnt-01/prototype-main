import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDraftsStore } from "@/lib/drafts";
import { DraftEditHeader } from "./DraftEditHeader";
import { DraftEditContent } from "./DraftEditContent";

export type ViewId = 'metadata' | 'rights' | 'lyrics' | 'tags' | 'status' | 'licensing';

export function DraftEditView() {
  const { drafts, selectedDraftId, publishDraft } = useDraftsStore();
  const draft = drafts.find(d => d.id === selectedDraftId);

  if (!draft) {
    return null;
  }

  const handleSave = async () => {
    if (draft) {
      await publishDraft(draft.id);
      // Optional: Add navigation or a success message here
    }
  };

  return (
    <div className="h-full flex flex-col">
      <DraftEditHeader draft={draft} />
      <Tabs defaultValue="metadata" className="flex-1 flex flex-col">
        <div className="flex items-center border-b px-6 h-12">
          <TabsList className="flex-1 justify-start p-0 border-none bg-transparent">
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="rights">Rights</TabsTrigger>
            <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <DraftEditContent draft={draft} />
        </div>
      </Tabs>
    </div>
  );
}

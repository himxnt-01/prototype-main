import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDraftsStore } from "@/lib/drafts";
import { DraftEditHeader } from "./DraftEditHeader";
import { DraftEditContent } from "./DraftEditContent";

export type ViewId = 'metadata' | 'rights' | 'lyrics' | 'tags' | 'status' | 'licensing';

export function DraftEditView() {
  const { drafts, selectedDraftId } = useDraftsStore();
  const draft = drafts.find(d => d.id === selectedDraftId);

  if (!draft) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <DraftEditHeader draft={draft} />
      <Tabs defaultValue="metadata" className="flex-1">
        <TabsList className="w-full justify-start border-b rounded-none px-6 h-12">
          <TabsTrigger value="metadata" className="data-[state=active]:bg-transparent">
            Metadata
          </TabsTrigger>
          <TabsTrigger value="rights" className="data-[state=active]:bg-transparent">
            Rights
          </TabsTrigger>
          <TabsTrigger value="lyrics" className="data-[state=active]:bg-transparent">
            Lyrics
          </TabsTrigger>
          <TabsTrigger value="tags" className="data-[state=active]:bg-transparent">
            Tags
          </TabsTrigger>
          <TabsTrigger value="status" className="data-[state=active]:bg-transparent">
            Status
          </TabsTrigger>
          <TabsTrigger value="licensing" className="data-[state=active]:bg-transparent">
            Licensing
          </TabsTrigger>
        </TabsList>
        <DraftEditContent draft={draft} />
      </Tabs>
    </div>
  );
}

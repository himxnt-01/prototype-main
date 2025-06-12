import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { Draft } from "@/types/draft";
import { useDraftsStore } from "@/lib/drafts";
import { DraftMetadataForm } from "./forms/DraftMetadataForm";
import { DraftRightsForm } from "./forms/DraftRightsForm";
import { DraftLyricsForm } from "./forms/DraftLyricsForm";
import { DraftTagsForm } from "./forms/DraftTagsForm";
import { DraftStatusForm } from "./forms/DraftStatusForm";

interface DraftEditContentProps {
  draft: Draft;
}

export function DraftEditContent({ draft }: DraftEditContentProps) {
  const { updateDraft } = useDraftsStore();

  const handleUpdate = (updates: Partial<Draft>) => {
    updateDraft(draft.id, updates);
  };

  return (
    <ScrollArea className="flex-1">
      <TabsContent value="metadata">
        <DraftMetadataForm 
          draft={draft} 
          onChange={handleUpdate} 
        />
      </TabsContent>

      <TabsContent value="rights">
        <DraftRightsForm 
          draft={draft} 
        />
      </TabsContent>

      <TabsContent value="lyrics">
        <DraftLyricsForm 
          lyrics={draft.lyrics} 
          onChange={(lyrics) => handleUpdate({ lyrics })} 
        />
      </TabsContent>

      <TabsContent value="tags">
        <DraftTagsForm draft={draft} onChange={handleUpdate}/>
      </TabsContent>

      <TabsContent value="status">
        <DraftStatusForm 
          draft={draft}
          onChange={handleUpdate} 
        />
      </TabsContent>
    </ScrollArea>
  );
}
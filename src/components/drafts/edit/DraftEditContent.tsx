import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { Draft } from "@/types/draft";
import { ViewId } from "./DraftEditView";
// import { DraftMetadataForm } from "./forms/metadata/DraftMetadataForm";
import { DraftRightsForm } from "./forms/DraftRightsForm";
import { DraftLyricsForm } from "./forms/DraftLyricsForm";
import { DraftTagsForm } from "./forms/DraftTagsForm";
import { DraftStatusForm } from "./forms/DraftStatusForm";
import { TrackLicensingForm } from "./forms/licensing/TrackLicensingForm";
import { useDraftsStore } from "@/lib/drafts";

interface DraftEditContentProps {
  draft: Draft;
}

export function DraftEditContent({ draft }: DraftEditContentProps) {
  const { updateDraft } = useDraftsStore();

  const handleUpdate = (updates: Partial<Draft>) => {
    updateDraft(draft.id, { ...draft, ...updates });
  };

  return (
    <ScrollArea className="flex-1">
      <TabsContent value="metadata">
        {/* Temporarily commented out due to missing component
        <DraftMetadataForm 
          metadata={draft.metadata} 
          onChange={(metadata) => handleUpdate({ metadata })} 
        />
        */}
        <div className="p-6">
          <p className="text-muted-foreground">Metadata form temporarily unavailable</p>
        </div>
      </TabsContent>

      <TabsContent value="rights">
        <DraftRightsForm 
          draft={draft} 
          onChange={handleUpdate} 
        />
      </TabsContent>

      <TabsContent value="lyrics">
        <DraftLyricsForm 
          lyrics={draft.lyrics} 
          onChange={(lyrics) => handleUpdate({ lyrics })} 
        />
      </TabsContent>

      <TabsContent value="tags">
        <DraftTagsForm 
          tags={draft.tags} 
          onChange={(tags) => handleUpdate({ tags })} 
        />
      </TabsContent>

      <TabsContent value="status">
        <DraftStatusForm 
          status={draft.status} 
          onChange={(status) => handleUpdate({ status })} 
        />
      </TabsContent>

      <TabsContent value="licensing">
        <TrackLicensingForm 
          draft={draft}
          onChange={handleUpdate}
        />
      </TabsContent>
    </ScrollArea>
  );
}
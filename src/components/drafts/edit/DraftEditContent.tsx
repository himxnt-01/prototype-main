import { ScrollArea } from "@/components/ui/scroll-area";
import { Draft } from "@/types/draft";
import { ViewId } from "./DraftEditView";
import { MetadataForm } from "./forms/metadata/MetadataForm";
import { DraftRightsForm } from "./forms/DraftRightsForm";
import { DraftLyricsForm } from "./forms/DraftLyricsForm";
import { DraftTagsForm } from "./forms/DraftTagsForm";
import { DraftStatusForm } from "./forms/DraftStatusForm";
import { useDraftsStore } from "@/lib/drafts";

interface DraftEditContentProps {
  draft: Draft;
  currentView: ViewId;
}

export function DraftEditContent({ draft, currentView }: DraftEditContentProps) {
  const { updateDraft } = useDraftsStore();

  const handleUpdate = (field: string, value: any) => {
    const updatedDraft = { ...draft };
    const fields = field.split('.');
    let current: any = updatedDraft;
    
    for (let i = 0; i < fields.length - 1; i++) {
      if (!current[fields[i]]) {
        current[fields[i]] = {};
      }
      current = current[fields[i]];
    }
    
    current[fields[fields.length - 1]] = value;
    updateDraft(draft.id, updatedDraft);
  };

  const renderContent = () => {
    switch (currentView) {
      case "metadata":
        return (
          <MetadataForm
            draft={draft}
            onUpdate={handleUpdate}
          />
        );

      case "rights":
        return (
          <DraftRightsForm
            rights={draft.rights}
            onChange={(rights) => handleUpdate("rights", rights)}
          />
        );

      case "lyrics":
        return (
          <DraftLyricsForm
            lyrics={draft.lyrics}
            onChange={(lyrics) => handleUpdate("lyrics", lyrics)}
          />
        );

      case "tags":
        return (
          <DraftTagsForm
            selectedTags={draft.tags || []}
            verifiedTags={draft.verifiedTags || []}
            onChange={(tags) => handleUpdate("tags", tags)}
            onVerify={(tag) => {
              const verifiedTags = draft.verifiedTags || [];
              const newVerifiedTags = verifiedTags.includes(tag)
                ? verifiedTags.filter(t => t !== tag)
                : [...verifiedTags, tag];
              handleUpdate("verifiedTags", newVerifiedTags);
            }}
          />
        );

      case "status":
        return (
          <DraftStatusForm
            status={draft.status}
            onChange={(status) => handleUpdate("status", status)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">
        {renderContent()}
      </ScrollArea>
    </div>
  );
}
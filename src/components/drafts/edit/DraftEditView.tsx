import { useDraftsStore } from "@/lib/drafts";
import { DraftEditHeader } from "./DraftEditHeader";
import { DraftEditForm } from "./forms/DraftEditForm";

export function DraftEditView() {
  const { drafts, selectedDraftId } = useDraftsStore();
  const draft = drafts.find(d => d.id === selectedDraftId);

  if (!draft) return null;

  return (
    <div className="h-full flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <DraftEditHeader draft={draft} />
      <DraftEditForm />
    </div>
  );
}

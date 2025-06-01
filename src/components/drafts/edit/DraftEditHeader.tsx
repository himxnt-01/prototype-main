
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useDraftsStore } from "@/lib/drafts";
import { Draft } from "@/types/draft";

interface DraftEditHeaderProps {
  draft: Draft;
}

export function DraftEditHeader({ draft }: DraftEditHeaderProps) {
  const { closeDetails } = useDraftsStore();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <img 
          src={`https://picsum.photos/seed/${draft.id}/48/48`}
          alt={draft.title}
          className="w-12 h-12 rounded-md object-cover"
        />
        <div>
          <h2 className="font-semibold">{draft.title}</h2>
          <p className="text-sm text-muted-foreground">{draft.artist}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={closeDetails}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

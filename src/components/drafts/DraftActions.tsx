import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Draft } from "@/types/draft";
import { EditDraftDialog } from "./EditDraftDialog";
import { useDraftsStore } from "@/lib/drafts";

interface DraftActionsProps {
  draft: Draft;
}

export function DraftActions({ draft }: DraftActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const updateDraft = useDraftsStore((state) => state.updateDraft);

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleSave = (updatedDraft: Draft) => {
    updateDraft(draft.id, updatedDraft);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Submit for Review</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditDraftDialog
        draft={draft}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSave}
      />
    </>
  );
}
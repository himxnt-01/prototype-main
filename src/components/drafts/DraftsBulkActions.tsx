import { Button } from "@/components/ui/button";
import { useDraftsStore } from "@/lib/drafts";
import { ListChecks, FileEdit, CheckSquare, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ApplyTemplateDialog } from "./bulk-actions/ApplyTemplateDialog";
import { useState } from "react";

export function DraftsBulkActions() {
  const { 
    isSelectionMode, 
    toggleSelectionMode, 
    selectedDraftIds,
    selectAllDrafts,
    clearSelection,
    drafts,
    updateDraft
  } = useDraftsStore();

  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  const handleApplyTemplate = (template: any) => {
    // Apply template to all selected drafts
    selectedDraftIds.forEach(id => {
      const draft = drafts.find(d => d.id === id);
      if (draft) {
        updateDraft(id, {
          ...draft,
          metadata: {
            ...draft.metadata,
            ...template.metadata
          },
          rights: {
            ...draft.rights,
            ...template.rights
          },
          status: {
            ...draft.status,
            ...template.status
          }
        });
      }
    });
    setIsTemplateDialogOpen(false);
  };

  if (!isSelectionMode) {
    return (
      <Button 
        variant="outline" 
        size="sm"
        onClick={toggleSelectionMode}
      >
        <ListChecks className="h-4 w-4 mr-2" />
        Select Drafts
      </Button>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">
          {selectedDraftIds.size} selected
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <CheckSquare className="h-4 w-4 mr-2" />
              Bulk Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={selectAllDrafts}>
              Select All ({drafts.length})
            </DropdownMenuItem>
            <DropdownMenuItem onClick={clearSelection}>
              Clear Selection
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsTemplateDialogOpen(true)}>
              <FileEdit className="h-4 w-4 mr-2" />
              Apply Template
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleSelectionMode}
        >
          <X className="h-4 w-4 mr-2" />
          Exit Selection
        </Button>
      </div>

      <ApplyTemplateDialog
        open={isTemplateDialogOpen}
        onOpenChange={setIsTemplateDialogOpen}
        onApply={handleApplyTemplate}
        selectedCount={selectedDraftIds.size}
      />
    </>
  );
}

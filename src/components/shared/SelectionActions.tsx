import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ListChecks,
  FileEdit,
  CheckSquare,
  X
} from "lucide-react";

interface SelectionActionsProps {
  isSelectionMode: boolean;
  selectedCount: number;
  totalCount: number;
  onToggleMode: () => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onEdit?: () => void;
  customActions?: React.ReactNode;
}

export function SelectionActions({
  isSelectionMode,
  selectedCount,
  totalCount,
  onToggleMode,
  onSelectAll,
  onClearSelection,
  onEdit,
  customActions
}: SelectionActionsProps) {
  if (!isSelectionMode) {
    return (
      <Button 
        variant="outline" 
        size="sm"
        onClick={onToggleMode}
      >
        <ListChecks className="h-4 w-4 mr-2" />
        Select Items
      </Button>
    );
  }

  return (
    <>
      <div className="text-sm text-muted-foreground">
        {selectedCount} selected
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <CheckSquare className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onSelectAll}>
            Select All ({totalCount})
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClearSelection}>
            Clear Selection
          </DropdownMenuItem>
          {onEdit && (
            <DropdownMenuItem onClick={onEdit}>
              <FileEdit className="h-4 w-4 mr-2" />
              Edit Selected
            </DropdownMenuItem>
          )}
          {customActions}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onToggleMode}
      >
        <X className="h-4 w-4 mr-2" />
        Exit Selection
      </Button>
    </>
  );
}
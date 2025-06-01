import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjectsStore } from "@/lib/projects";
import { SelectionActions } from "@/components/shared/SelectionActions";
import { Search, Filter, ArrowDownUp, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProjectsActions() {
  const { 
    isSelectionMode, 
    toggleSelectionMode, 
    selectedProjectIds,
    selectAllProjects,
    clearSelection,
    projects
  } = useProjectsStore();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <SelectionActions
          isSelectionMode={isSelectionMode}
          selectedCount={selectedProjectIds.size}
          totalCount={projects.length}
          onToggleMode={toggleSelectionMode}
          onSelectAll={selectAllProjects}
          onClearSelection={clearSelection}
        />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Due Date</DropdownMenuItem>
            <DropdownMenuItem>Progress</DropdownMenuItem>
            <DropdownMenuItem>Last Updated</DropdownMenuItem>
            <DropdownMenuItem>Title (A-Z)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Type</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
            <DropdownMenuItem>Due Date</DropdownMenuItem>
            <DropdownMenuItem>Collaborators</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 flex items-center gap-2 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-8"
          />
        </div>
        <Button variant="secondary" size="icon">
          <Sparkles className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
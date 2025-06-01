import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowDownUp, Sparkles } from "lucide-react";
import { DraftsBulkActions } from "./DraftsBulkActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DraftsActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <DraftsBulkActions />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Date Added</DropdownMenuItem>
            <DropdownMenuItem>Last Modified</DropdownMenuItem>
            <DropdownMenuItem>Title (A-Z)</DropdownMenuItem>
            <DropdownMenuItem>Progress</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
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
            <DropdownMenuItem>Status</DropdownMenuItem>
            <DropdownMenuItem>Phase</DropdownMenuItem>
            <DropdownMenuItem>Clearance</DropdownMenuItem>
            <DropdownMenuItem>High Priority</DropdownMenuItem>
            <DropdownMenuItem>Needs Review</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Search drafts..." 
          className="pl-8"
        />
      </div>
    </div>
  );
}

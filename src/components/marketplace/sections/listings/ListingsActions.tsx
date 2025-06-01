import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowDownUp } from "lucide-react";
import { ViewToggle } from "./ViewToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ListingsActionsProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function ListingsActions({ viewMode, onViewModeChange }: ListingsActionsProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Price (High to Low)</DropdownMenuItem>
            <DropdownMenuItem>Price (Low to High)</DropdownMenuItem>
            <DropdownMenuItem>Most Views</DropdownMenuItem>
            <DropdownMenuItem>Recently Added</DropdownMenuItem>
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
            <DropdownMenuItem>Genre</DropdownMenuItem>
            <DropdownMenuItem>Price Range</DropdownMenuItem>
            <DropdownMenuItem>Usage Rights</DropdownMenuItem>
            <DropdownMenuItem>Territory</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
      </div>

      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search listings..." className="pl-9" />
      </div>
    </div>
  );
}

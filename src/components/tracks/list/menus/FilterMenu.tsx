import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FilterMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Genre</DropdownMenuItem>
        <DropdownMenuItem>Key</DropdownMenuItem>
        <DropdownMenuItem>BPM Range</DropdownMenuItem>
        <DropdownMenuItem>Release Date</DropdownMenuItem>
        <DropdownMenuItem>Writers</DropdownMenuItem>
        <DropdownMenuItem>Tags</DropdownMenuItem>
        <DropdownMenuItem>Sync Status</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
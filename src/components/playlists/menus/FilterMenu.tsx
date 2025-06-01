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
        <DropdownMenuItem>Public Playlists</DropdownMenuItem>
        <DropdownMenuItem>Private Playlists</DropdownMenuItem>
        <DropdownMenuItem>Has Tracks</DropdownMenuItem>
        <DropdownMenuItem>Empty Playlists</DropdownMenuItem>
        <DropdownMenuItem>Recently Modified</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
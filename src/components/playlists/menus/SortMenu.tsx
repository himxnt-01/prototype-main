import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SortMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowDownUp className="h-4 w-4 mr-2" />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Title (A-Z)</DropdownMenuItem>
        <DropdownMenuItem>Date Created</DropdownMenuItem>
        <DropdownMenuItem>Last Modified</DropdownMenuItem>
        <DropdownMenuItem>Number of Tracks</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
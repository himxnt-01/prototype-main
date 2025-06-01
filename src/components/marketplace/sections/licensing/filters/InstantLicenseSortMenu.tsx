import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function InstantLicenseSortMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowDownUp className="h-4 w-4 mr-2" />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Price (Low to High)</DropdownMenuItem>
        <DropdownMenuItem>Price (High to Low)</DropdownMenuItem>
        <DropdownMenuItem>Most Licensed</DropdownMenuItem>
        <DropdownMenuItem>Recently Added</DropdownMenuItem>
        <DropdownMenuItem>Title (A-Z)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

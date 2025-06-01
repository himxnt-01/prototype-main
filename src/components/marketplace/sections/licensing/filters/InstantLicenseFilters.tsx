import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function InstantLicenseFilters() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Genre</DropdownMenuItem>
        <DropdownMenuItem>Price Range</DropdownMenuItem>
        <DropdownMenuItem>Usage Rights</DropdownMenuItem>
        <DropdownMenuItem>Territory</DropdownMenuItem>
        <DropdownMenuItem>Pre-cleared For</DropdownMenuItem>
        <DropdownMenuItem>Duration</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

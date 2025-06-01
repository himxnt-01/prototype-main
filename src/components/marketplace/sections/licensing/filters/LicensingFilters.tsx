import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LicensingFilters() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>All Requests</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Advertising</DropdownMenuItem>
        <DropdownMenuItem>Film & TV</DropdownMenuItem>
        <DropdownMenuItem>Gaming</DropdownMenuItem>
        <DropdownMenuItem>Documentary</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Urgent Only</DropdownMenuItem>
        <DropdownMenuItem>High Budget ($10k+)</DropdownMenuItem>
        <DropdownMenuItem>Includes Stems</DropdownMenuItem>
        <DropdownMenuItem>Exclusive Rights</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
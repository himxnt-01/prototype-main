import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
      <DropdownMenuContent align="end">
        <DropdownMenuItem>All Requests</DropdownMenuItem>
        <DropdownMenuItem>Pending</DropdownMenuItem>
        <DropdownMenuItem>Approved</DropdownMenuItem>
        <DropdownMenuItem>Declined</DropdownMenuItem>
        <DropdownMenuItem>Urgent Only</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

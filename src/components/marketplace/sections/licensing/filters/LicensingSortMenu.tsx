import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LicensingSortMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowDownUp className="h-4 w-4 mr-2" />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Newest First</DropdownMenuItem>
        <DropdownMenuItem>Oldest First</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Budget (High to Low)</DropdownMenuItem>
        <DropdownMenuItem>Budget (Low to High)</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Deadline (Soonest)</DropdownMenuItem>
        <DropdownMenuItem>Deadline (Latest)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import { Button } from "@/components/ui/button";
import { Download, Play, Share2, FileEdit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MixActions() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon">
        <Play className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Share2 className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <FileEdit className="h-4 w-4 mr-2" />
            Edit Details
          </DropdownMenuItem>
          <DropdownMenuItem>View History</DropdownMenuItem>
          <DropdownMenuItem>Download Stems</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            Delete Mix
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInboxStore } from "@/lib/inbox";
import { Search, Filter, ArrowDownUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function InboxActions() {
  const { setFilters, setSearch } = useInboxStore();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
            <DropdownMenuItem>Date (Oldest)</DropdownMenuItem>
            <DropdownMenuItem>Sender (A-Z)</DropdownMenuItem>
            <DropdownMenuItem>Subject (A-Z)</DropdownMenuItem>
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
            <DropdownMenuItem onSelect={() => setFilters({ type: 'sync_request' })}>
              Sync Requests
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilters({ type: 'file_share' })}>
              Shared Files
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilters({ type: 'message' })}>
              Messages
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilters({ read: false })}>
              Unread
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilters({ starred: true })}>
              Starred
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilters({ archived: true })}>
              Archived
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Search messages..." 
          className="pl-8"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

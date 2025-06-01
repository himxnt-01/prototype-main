import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Play, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LISTINGS } from "../grid/ListingsGrid";

interface ListingsTableProps {
  onSelect: (id: number) => void;
}

export function ListingsTable({ onSelect }: ListingsTableProps) {
  return (
    <div className="rounded-lg border bg-card-gradient">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LISTINGS.map((listing) => (
            <TableRow 
              key={listing.id}
              className="group cursor-pointer"
              onClick={() => onSelect(listing.id)}
            >
              <TableCell>
                <Avatar className="rounded-md w-10 h-10">
                  <img 
                    src={listing.coverUrl} 
                    alt={listing.title}
                    className="object-cover"
                  />
                </Avatar>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{listing.title}</div>
                  <div className="text-sm text-muted-foreground">{listing.artist}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-primary/10">
                  {listing.genre}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">${listing.price.toLocaleString()}</div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  Active
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Play preview
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Listing</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove Listing
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
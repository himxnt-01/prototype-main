import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Play } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ListingsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {LISTINGS.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <div className="aspect-square relative">
            <img 
              src={listing.coverUrl} 
              alt={listing.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-white">{listing.title}</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
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

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-black/50">
                    {listing.genre}
                  </Badge>
                  <Badge variant="secondary" className="bg-black/50">
                    ${listing.price}
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              size="icon"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                // Play preview
              }}
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

const LISTINGS = [
  {
    id: 1,
    title: "Summer Breeze",
    artist: "Sarah Chen",
    genre: "Electronic",
    price: 1500,
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Urban Echoes",
    artist: "The Night Collective",
    genre: "Alternative",
    price: 2000,
    coverUrl: "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?w=400&h=400&fit=crop"
  }
];

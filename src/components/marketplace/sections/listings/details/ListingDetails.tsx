import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Play, Share2, Download, Globe, Music2, Clock, DollarSign } from "lucide-react";
import { LISTINGS } from "../data/listings";

interface ListingDetailsProps {
  listingId: number;
  onClose: () => void;
}

export function ListingDetails({ listingId, onClose }: ListingDetailsProps) {
  const listing = LISTINGS.find(l => l.id === listingId);
  if (!listing) return null;

  return (
    <div className="h-full flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative h-48">
        <img 
          src={listing.coverUrl}
          alt={listing.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-6 -mt-12 relative space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{listing.title}</h2>
          <div className="text-lg text-muted-foreground">{listing.artist}</div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{listing.genre}</Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500">
              ${listing.price}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Preview
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <MetadataItem icon={Music2} label="Genre" value={listing.genre} />
            <MetadataItem icon={Clock} label="Duration" value="3:45" />
            <MetadataItem icon={Globe} label="Territory" value="Worldwide" />
            <MetadataItem icon={DollarSign} label="License Fee" value={`$${listing.price}`} />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Description</h3>
            <p className="text-sm text-muted-foreground">
              {listing.description || "No description available."}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Usage Rights</h3>
            <div className="text-sm text-muted-foreground">
              <ul className="list-disc pl-4 space-y-1">
                <li>Commercial use</li>
                <li>Worldwide distribution</li>
                <li>All media formats</li>
                <li>1 year license term</li>
              </ul>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

interface MetadataItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function MetadataItem({ icon: Icon, label, value }: MetadataItemProps) {
  return (
    <div className="space-y-1">
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

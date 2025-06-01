import { Track } from "@/types/track";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, DollarSign, Clock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstantLicenseCardProps {
  track: Track;
  onSelect: () => void;
}

export function InstantLicenseCard({ track, onSelect }: InstantLicenseCardProps) {
  const lowestPrice = Math.min(
    ...track.syncInfo.pricing.map(tier => tier.price)
  );

  return (
    <div 
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg cursor-pointer",
        "border bg-card-gradient hover:bg-card transition-colors",
        "group"
      )}
      onClick={onSelect}
    >
      <div className="relative aspect-square w-24 rounded-md overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${track.id}/96/96`}
          alt={track.title}
          className="object-cover"
        />
        <Button
          size="icon"
          className={cn(
            "absolute inset-0 m-auto h-8 w-8",
            "opacity-0 group-hover:opacity-100 transition-opacity",
            "bg-black/50 hover:bg-black/70"
          )}
          onClick={(e) => {
            e.stopPropagation();
            // Play preview
          }}
        >
          <Play className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-medium">{track.title}</h3>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10">
              <DollarSign className="h-3.5 w-3.5 mr-1" />
              From ${lowestPrice}
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
              <Clock className="h-3.5 w-3.5 mr-1" />
              Pre-cleared
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-muted">
            {track.genre}
          </Badge>
          {track.syncInfo.clearance.preClearedFor.map((usage) => (
            <Badge 
              key={usage} 
              variant="secondary"
              className="bg-green-500/10 text-green-500"
            >
              {usage}
            </Badge>
          ))}
          {track.syncInfo.clearance.territorialRestrictions.length === 0 && (
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
              <Globe className="h-3.5 w-3.5 mr-1" />
              Worldwide
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

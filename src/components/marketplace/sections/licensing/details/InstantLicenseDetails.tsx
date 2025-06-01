import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Track } from "@/types/track";
import { X, Play, Download, Share2, Globe, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstantLicenseDetailsProps {
  track: Track;
  onClose: () => void;
}

export function InstantLicenseDetails({ track, onClose }: InstantLicenseDetailsProps) {
  const [selectedTier] = useState(track.syncInfo.pricing[0]);

  return (
    <div className="h-full flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <img 
            src={`https://picsum.photos/seed/${track.id}/48/48`}
            alt={track.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <h2 className="font-semibold">{track.title}</h2>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Preview
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Track Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-muted">
                {track.genre}
              </Badge>
              <Badge variant="secondary" className="bg-muted">
                {track.bpm} BPM
              </Badge>
              <Badge variant="secondary" className="bg-muted">
                {track.key}
              </Badge>
              <Badge variant="secondary" className="bg-muted">
                {track.duration}
              </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Pre-cleared For</h3>
              <div className="flex flex-wrap gap-2">
                {track.syncInfo.clearance.preClearedFor.map((usage) => (
                  <Badge 
                    key={usage}
                    variant="secondary" 
                    className="bg-green-500/10 text-green-500"
                  >
                    {usage}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Usage Terms */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Usage Terms</h3>
            <div className="rounded-lg border p-4 space-y-3">
              {track.syncInfo.clearance.territorialRestrictions.length === 0 ? (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>Available Worldwide</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>Territory Restrictions Apply</span>
                </div>
              )}

              {selectedTier && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>License Term: {selectedTier.term}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {selectedTier.minimumGuarantee 
                        ? `Minimum Guarantee: $${selectedTier.minimumGuarantee.toLocaleString()}`
                        : "No Minimum Guarantee"
                      }
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-muted/50">
        <Button className="w-full">
          Purchase License - ${selectedTier.price.toLocaleString()}
        </Button>
      </div>
    </div>
  );
}

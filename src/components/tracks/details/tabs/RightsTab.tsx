import { Track } from "@/types/track";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RightsTabProps {
  track: Track;
}

export function RightsTab({ track }: RightsTabProps) {
  // Safely access rights data, providing default empty arrays
  const writers = track.rights?.writers || [];
  const publishers = track.rights?.publishers || [];
  const masterOwners = track.rights?.masterOwners || [];

  return (
    <div className="p-6">
      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Rights & Ownership</h2>
          <p className="text-sm text-muted-foreground">
            Rights and ownership information for this track
          </p>
        </div>

        <div className="space-y-8">
          {/* Writers Section */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-medium">Writers & Composers</h3>
              <p className="text-sm text-muted-foreground">
                Writers and composers who contributed to this track
              </p>
            </div>

            <div className="space-y-3">
              {writers.map((writer, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg bg-card border border-border"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{writer.name}</div>
                      <Badge variant="secondary" className="bg-primary/10">
                        {writer.share}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {writer.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-border/50" />

          {/* Publishing Section */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-medium">Publishing Rights</h3>
              <p className="text-sm text-muted-foreground">
                Publishing companies and their respective shares
              </p>
            </div>

            <div className="space-y-3">
              {publishers.map((publisher, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg bg-card border border-border"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{publisher.name}</div>
                      <Badge variant="secondary" className="bg-primary/10">
                        {publisher.share}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Territory: {publisher.territories?.join(", ") || "Worldwide"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-border/50" />

          {/* Master Rights Section */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-medium">Master Rights</h3>
              <p className="text-sm text-muted-foreground">
                Master rights owners and their respective shares
              </p>
            </div>

            <div className="space-y-3">
              {masterOwners.map((owner, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg bg-card border border-border"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{owner.name}</div>
                      <Badge variant="secondary" className="bg-primary/10">
                        {owner.share}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Territory: {owner.territories?.join(", ") || "Worldwide"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Track } from "@/types/track";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RightsTabProps {
  track: Track;
}

export function RightsTab({ track }: RightsTabProps) {
  // Use track rights or generate mock data if not available
  const rights = track.rights || generateMockRights(track);

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
              {rights.writers?.map((writer, index) => (
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
              {rights.publishers?.map((publisher, index) => (
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
              {rights.masterOwners?.map((owner, index) => (
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

// Generate mock rights data based on track ID
function generateMockRights(track: Track) {
  // Use track ID to create deterministic but varied mock data
  const seed = track.id % 5;
  
  const publishers = [
    { name: "Universal Music Publishing", share: 100, territories: ["Worldwide"] },
    { name: "Sony Music Publishing", share: 70, territories: ["Worldwide"] },
    { name: "Warner Chappell Music", share: 50, territories: ["Worldwide"] },
    { name: "Kobalt Music Publishing", share: 60, territories: ["Worldwide"] },
    { name: "BMG Rights Management", share: 80, territories: ["Worldwide"] }
  ];
  
  const masterOwners = [
    { name: "Universal Music Group", share: 100, territories: ["Worldwide"] },
    { name: "Sony Music Entertainment", share: 100, territories: ["Worldwide"] },
    { name: "Warner Music Group", share: 100, territories: ["Worldwide"] },
    { name: "Believe Digital", share: 100, territories: ["Worldwide"] },
    { name: "AWAL", share: 100, territories: ["Worldwide"] }
  ];
  
  const writers = [
    [
      { name: track.artist, role: "Composer/Lyricist", share: 100 }
    ],
    [
      { name: track.artist, role: "Composer", share: 50 },
      { name: "Jane Smith", role: "Lyricist", share: 50 }
    ],
    [
      { name: track.artist, role: "Composer", share: 40 },
      { name: "John Doe", role: "Lyricist", share: 40 },
      { name: "Max Producer", role: "Producer", share: 20 }
    ],
    [
      { name: track.artist, role: "Composer/Lyricist", share: 70 },
      { name: "Sarah Williams", role: "Composer", share: 30 }
    ],
    [
      { name: track.artist, role: "Composer/Lyricist", share: 60 },
      { name: "Mike Johnson", role: "Producer", share: 40 }
    ]
  ];
  
  return {
    publishers: [publishers[seed]],
    masterOwners: [masterOwners[seed]],
    writers: writers[seed]
  };
}
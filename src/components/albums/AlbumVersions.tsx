import { Album } from "@/lib/albums";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Download } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AlbumVersionsProps {
  album: Album;
}

export function AlbumVersions({ album }: AlbumVersionsProps) {
  // In a real app, this would come from the API
  const versions = [
    {
      id: 1,
      title: "Deluxe Edition",
      type: "deluxe",
      releaseDate: "2024-02-15",
      extraTracks: 5
    },
    {
      id: 2,
      title: "Instrumental Version",
      type: "instrumental",
      releaseDate: "2024-01-20"
    },
    {
      id: 3,
      title: "2024 Remaster",
      type: "remaster",
      releaseDate: "2024-03-01"
    }
  ];

  if (versions.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Available Versions</h3>
      <div className="space-y-2">
        {versions.map((version) => (
          <div 
            key={version.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg",
              "border bg-card-gradient hover:bg-card transition-colors"
            )}
          >
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="font-medium">{version.title}</div>
                {version.extraTracks && (
                  <Badge variant="secondary" className="bg-primary/20">
                    +{version.extraTracks} Tracks
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Released {format(new Date(version.releaseDate), "MMMM d, yyyy")}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
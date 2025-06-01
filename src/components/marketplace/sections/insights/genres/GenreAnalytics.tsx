import { Card } from "@/components/ui/card";
import { GenreChart } from "./GenreChart";
import { GenreList } from "./GenreList";

export function GenreAnalytics() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Genre Performance</h3>
          <p className="text-sm text-muted-foreground">
            Most requested genres and their growth
          </p>
        </div>

        <div className="h-[300px]">
          <GenreChart data={GENRES} />
        </div>

        <GenreList genres={GENRES} />
      </div>
    </Card>
  );
}

export const GENRES = [
  {
    name: "Electronic",
    growth: 24,
    requests: 156,
    topUsage: "Advertising, Gaming"
  },
  {
    name: "Ambient",
    growth: 18,
    requests: 98,
    topUsage: "Film, Documentary"
  },
  {
    name: "Hip Hop",
    growth: 15,
    requests: 87,
    topUsage: "Social Media, Sports"
  },
  {
    name: "Indie Rock",
    growth: 12,
    requests: 76,
    topUsage: "Film, TV Shows"
  }
];

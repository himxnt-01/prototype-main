import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface GenreListProps {
  genres: Array<{
    name: string;
    growth: number;
    topUsage: string;
  }>;
}

export function GenreList({ genres }: GenreListProps) {
  return (
    <div className="space-y-4">
      {genres.map((genre) => (
        <div key={genre.name} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{genre.name}</span>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              {genre.growth}%
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            Most requested in: {genre.topUsage}
          </div>
        </div>
      ))}
    </div>
  );
}

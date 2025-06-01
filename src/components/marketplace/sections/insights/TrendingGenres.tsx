import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function TrendingGenres() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Trending Genres</h3>
          
          <div className="h-[300px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GENRES} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))'
                  }}
                />
                <Bar 
                  dataKey="requests" 
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {GENRES.map((genre) => (
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
        </div>
      </div>
    </Card>
  );
}

const GENRES = [
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

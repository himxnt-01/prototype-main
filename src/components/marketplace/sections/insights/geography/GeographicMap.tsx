import { MapGrid } from "./map/MapGrid";
import { MapLegend } from "./map/MapLegend";

interface GeographicMapProps {
  data: Array<{
    region: string;
    revenue: number;
    deals: number;
    growth: number;
  }>;
}

export function GeographicMap({ data }: GeographicMapProps) {
  const maxRevenue = Math.max(...data.map(m => m.revenue));

  return (
    <div className="relative w-full h-full rounded-lg bg-card-gradient border overflow-hidden">
      <MapGrid data={data} maxRevenue={maxRevenue} />
      <MapLegend />
    </div>
  );
}

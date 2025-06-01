import { MapRegion } from "./MapRegion";

interface MapGridProps {
  data: Array<{
    region: string;
    revenue: number;
    deals: number;
    growth: number;
  }>;
  maxRevenue: number;
}

export function MapGrid({ data, maxRevenue }: MapGridProps) {
  return (
    <div className="absolute inset-0 grid grid-cols-2 gap-px p-4">
      {REGIONS.map((region) => (
        <MapRegion 
          key={region.name}
          name={region.name}
          data={data.find(m => m.region === region.name)}
          maxRevenue={maxRevenue}
          className={region.className}
        />
      ))}
    </div>
  );
}

const REGIONS = [
  {
    name: "North America",
    className: "col-span-1 row-span-1"
  },
  {
    name: "Europe",
    className: "col-span-1 row-span-1"
  },
  {
    name: "Asia Pacific",
    className: "col-span-1 row-span-1"
  },
  {
    name: "Latin America",
    className: "col-span-1 row-span-1"
  }
] as const;

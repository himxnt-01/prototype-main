export function MapLegend() {
  return (
    <div className="absolute bottom-2 right-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <LegendItem label="Low" opacity={0.2} />
        <LegendItem label="Medium" opacity={0.5} />
        <LegendItem label="High" opacity={1} />
      </div>
    </div>
  );
}

interface LegendItemProps {
  label: string;
  opacity: number;
}

function LegendItem({ label, opacity }: LegendItemProps) {
  return (
    <div className="flex items-center gap-1">
      <div 
        className="w-2 h-2 rounded-full" 
        style={{ backgroundColor: `hsla(var(--primary) / ${opacity})` }}
      />
      {label}
    </div>
  );
}

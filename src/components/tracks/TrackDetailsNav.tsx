import { Button } from "@/components/ui/button";
import { useTrackDetailsStore } from "@/lib/trackDetails";
import { cn } from "@/lib/utils";

interface TrackDetailsNavProps {
  views: Array<{ id: string; label: string }>;
}

export function TrackDetailsNav({ views }: TrackDetailsNavProps) {
  const { currentView, setCurrentView } = useTrackDetailsStore();

  return (
    <div className="w-48 border-r border-border p-4">
      <nav className="space-y-1">
        {views.map(view => (
          <Button
            key={view.id}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              currentView === view.id && "bg-muted"
            )}
            onClick={() => setCurrentView(view.id)}
          >
            {view.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}
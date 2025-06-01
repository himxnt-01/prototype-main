import { ScrollArea } from "@/components/ui/scroll-area";
import { useTrackDetailsStore } from "@/lib/trackDetails";

interface TrackDetailsContentProps {
  views: Array<{ id: string; component: React.ReactNode }>;
}

export function TrackDetailsContent({ views }: TrackDetailsContentProps) {
  const { currentView } = useTrackDetailsStore();
  const currentComponent = views.find(view => view.id === currentView)?.component;

  return (
    <ScrollArea className="h-full">
      {currentComponent}
    </ScrollArea>
  );
}
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ViewId } from "./DraftEditView";

interface DraftEditTabsProps {
  views: Array<{ id: ViewId; label: string }>;
  currentView: ViewId;
  onViewChange: (view: ViewId) => void;
}

export function DraftEditTabs({ views, currentView, onViewChange }: DraftEditTabsProps) {
  return (
    <div className="flex items-center gap-1 px-4 border-b">
      {views.map(view => (
        <Button
          key={view.id}
          variant="ghost"
          size="sm"
          className={cn(
            "relative h-11 rounded-none",
            currentView === view.id && [
              "bg-background",
              "after:absolute after:bottom-0 after:left-0 after:right-0",
              "after:h-0.5 after:bg-primary after:rounded-full"
            ]
          )}
          onClick={() => onViewChange(view.id)}
        >
          {view.label}
        </Button>
      ))}
    </div>
  );
}
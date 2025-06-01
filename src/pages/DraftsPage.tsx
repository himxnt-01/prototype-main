import { DraftsHeader } from "@/components/drafts/DraftsHeader";
import { DraftsList } from "@/components/drafts/DraftsList";
import { DraftEditView } from "@/components/drafts/edit/DraftEditView";
import { useDraftsStore } from "@/lib/drafts";
import { cn } from "@/lib/utils";

export function DraftsPage() {
  const { isDetailsOpen } = useDraftsStore();

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-6">
      <div className={cn(
        "flex-1 min-w-0 transition-all duration-300",
        isDetailsOpen && "lg:max-w-[calc(100%-500px)]"
      )}>
        <DraftsHeader />
        <DraftsList />
      </div>

      {isDetailsOpen && (
        <div className="hidden lg:block w-[500px] h-full">
          <div className="rounded-lg border border-border bg-card-gradient shadow-md h-full overflow-hidden">
            <DraftEditView />
          </div>
        </div>
      )}
    </div>
  );
}

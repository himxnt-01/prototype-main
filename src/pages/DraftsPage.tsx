import { useEffect } from "react";
import { DraftsHeader } from "@/components/drafts/DraftsHeader";
import { DraftsList } from "@/components/drafts/DraftsList";
import { DraftEditView } from "@/components/drafts/edit/DraftEditView";
import { useDraftsStore } from "@/lib/drafts";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DraftsPage() {
  const {
    isDetailsOpen,
    fetchDrafts,
    isLoading,
    error,
    subscribeToChanges
  } = useDraftsStore();

  useEffect(() => {
    fetchDrafts();
    const unsubscribe = subscribeToChanges();

    return () => {
      unsubscribe();
    };
  }, [fetchDrafts, subscribeToChanges]);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your drafts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-lg">
          <AlertTitle>Error Loading Drafts</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

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
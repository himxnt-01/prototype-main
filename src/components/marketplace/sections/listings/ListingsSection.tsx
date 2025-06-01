import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ListingsGrid } from "./grid/ListingsGrid";
import { ListingsTable } from "./table/ListingsTable";
import { ListingsActions } from "./ListingsActions";
import { ListingDetails } from "./details/ListingDetails";
import { cn } from "@/lib/utils";

export function ListingsSection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null);

  const handleSelectListing = (id: number) => {
    setSelectedListingId(id);
  };

  return (
    <div className="h-[calc(100vh-16rem)] flex gap-6">
      <div className={cn(
        "flex-1 min-w-0 flex flex-col transition-all duration-300",
        selectedListingId && "lg:max-w-[calc(100%-500px)]"
      )}>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Active Listings</h2>
            <p className="text-sm text-muted-foreground">
              Manage and optimize your marketplace listings
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            List New Track
          </Button>
        </div>

        <ListingsActions viewMode={viewMode} onViewModeChange={setViewMode} />

        <div className="flex-1 min-h-0 overflow-auto">
          {viewMode === 'grid' ? (
            <ListingsGrid onSelect={handleSelectListing} />
          ) : (
            <ListingsTable onSelect={handleSelectListing} />
          )}
        </div>
      </div>

      {selectedListingId && (
        <div className="hidden lg:block w-[500px] min-w-[500px]">
          <div className="h-full rounded-lg border border-border bg-card-gradient shadow-md overflow-hidden">
            <ListingDetails 
              listingId={selectedListingId} 
              onClose={() => setSelectedListingId(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

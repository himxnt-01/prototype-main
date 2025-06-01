import { Button } from "@/components/ui/button";
import { Store, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function MarketplaceHeader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Store className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Marketplace</h1>
          <Badge variant="secondary" className="bg-primary/20">
            BETA
          </Badge>
        </div>
        <div className="flex-1" />
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          List New Track
        </Button>
      </div>
      <p className="text-muted-foreground">
        Discover licensing opportunities and manage your music catalog's marketplace presence
      </p>
    </div>
  );
}
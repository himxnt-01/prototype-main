import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowDownUp } from "lucide-react";
import { DraftsActions } from "./DraftsActions";

export function DraftsHeader() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Drafts</h1>
        <p className="text-muted-foreground">
          Manage your work in progress tracks and recordings
        </p>
      </div>
      <DraftsActions />
    </div>
  );
}
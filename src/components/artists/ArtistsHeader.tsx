import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic2 } from "lucide-react";
import { ArtistsActions } from "./ArtistsActions";

export function ArtistsHeader() {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Mic2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Artists</h1>
          <p className="text-sm text-muted-foreground">
            Browse and manage your artist catalog
          </p>
        </div>
      </div>
      <ArtistsActions />
    </div>
  );
}
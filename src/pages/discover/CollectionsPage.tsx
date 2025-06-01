import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  FolderHeart, 
  FolderPlus, 
  Music, 
  LogIn
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CollectionsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Collections</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search collections..." 
              className="pl-9"
            />
          </div>
          <Button>
            <FolderPlus className="h-4 w-4 mr-2" />
            New Collection
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="h-24 w-24 rounded-full bg-muted/50 flex items-center justify-center">
          <FolderHeart className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Sign in to view your collections</h2>
          <p className="text-muted-foreground max-w-md">
            Create collections to organize your favorite tracks, save playlists for different projects, and access them from anywhere.
          </p>
        </div>
        <div className="flex gap-4">
          <Button className="gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
          <Button variant="outline" className="gap-2">
            <Music className="h-4 w-4" />
            Browse Music
          </Button>
        </div>
      </div>
    </div>
  );
}
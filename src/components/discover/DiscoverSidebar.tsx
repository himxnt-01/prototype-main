import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Compass, 
  Music, 
  Heart, 
  FolderHeart, 
  Store, 
  ShoppingBag, 
  Inbox, 
  Users2,
  FolderKanban,
  Search
} from "lucide-react";

interface DiscoverSidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function DiscoverSidebar({ currentTab, onTabChange }: DiscoverSidebarProps) {
  const sidebarItems = [
    { id: "discover", label: "Discover", icon: Compass },
    { id: "search", label: "Search Catalog", icon: Search },
    { id: "genres", label: "Genres", icon: Music },
    { id: "moods", label: "Moods", icon: Heart },
    { id: "stores", label: "Stores", icon: Store },
    { id: "collections", label: "Collections", icon: FolderHeart },
    { id: "projects", label: "My Projects", icon: FolderKanban },
    { id: "purchases", label: "Purchases & Licenses", icon: ShoppingBag },
    { id: "inbox", label: "Inbox & Team", icon: Users2 },
  ];

  return (
    <div className="h-full w-64 border-r border-border bg-card flex flex-col">
      <div className="flex items-center h-16 px-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-foreground hover:text-foreground">
          <img src="/zen-logo.png" alt="Zen" className="h-6 w-6" />
          <span className="text-lg font-semibold">Zen</span>
        </Link>
      </div>

      <div className="flex-1 py-4 px-2 space-y-1 overflow-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                currentTab === item.id && "bg-primary/10 text-primary"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className={cn(
                "h-4 w-4 mr-2",
                currentTab === item.id && "text-primary"
              )} />
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
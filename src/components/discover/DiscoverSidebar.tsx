import { cn } from "@/lib/utils";
import { useLocation } from "@/hooks/useLocation";
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
  const { navigate } = useLocation();

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
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 p-0 h-auto"
          onClick={() => navigate("/")}
        >
          <img src="/zen-logo.png" alt="Zen" className="h-6 w-6" />
          <span className="text-lg font-semibold">Zen</span>
        </Button>
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
import { cn } from "@/lib/utils";
import { useLocation } from "@/hooks/useLocation";
import { Button } from "@/components/ui/button";

interface LogoProps {
  isCollapsed: boolean;
}

export function Logo({ isCollapsed }: LogoProps) {
  const { navigate } = useLocation();

  return (
    <div className={cn(
      "flex items-center h-16 px-6",
      isCollapsed ? "justify-center" : "justify-start"
    )}>
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 p-0 h-auto"
        onClick={() => navigate("/")}
      >
        <img src="/zen-logo.png" alt="Zen" className="h-6 w-6" />
        {!isCollapsed && (
          <span className="text-lg font-semibold">Zen</span>
        )}
      </Button>
    </div>
  );
}
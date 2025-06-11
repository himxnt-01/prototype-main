import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  isCollapsed: boolean;
}

export function Logo({ isCollapsed }: LogoProps) {
  return (
    <div className={cn(
      "flex items-center h-16 px-6",
      isCollapsed ? "justify-center" : "justify-start"
    )}>
      <Link to="/" className="flex items-center gap-2 text-foreground hover:text-foreground">
        <img src="/zen-logo.png" alt="Zen" className="h-6 w-6" />
        {!isCollapsed && (
          <span className="text-lg font-semibold">Zen</span>
        )}
      </Link>
    </div>
  );
}
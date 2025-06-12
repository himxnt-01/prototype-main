import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  icon: LucideIcon;
  label: React.ReactNode;
  path: string; // Path is required for NavLink
  onClick?: () => void; // onClick is optional
  isCollapsed: boolean;
  isActive?: boolean; // isActive can be passed in, but NavLink handles it
}

export function NavItem({ icon: Icon, label, path, isCollapsed }: NavItemProps) {
  const linkContent = (
    <>
      <Icon className={cn("h-4 w-4 shrink-0", !isCollapsed && "mr-2")} />
      {!isCollapsed && (
        <span className="truncate">{label}</span>
      )}
    </>
  );

  const link = (
    <NavLink
      to={path}
      end // Ensures exact match for active route
      className={({ isActive }) => cn(
        "flex items-center p-2 rounded-md transition-colors w-full",
        "hover:bg-muted text-muted-foreground hover:text-foreground",
        isCollapsed ? "justify-center" : "justify-start",
        isActive && [
          "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary",
          "after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2",
          "after:w-1 after:h-6 after:rounded-l-full after:bg-primary"
        ]
      )}
    >
      {linkContent}
    </NavLink>
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {link}
        </TooltipTrigger>
        <TooltipContent side="right" className="font-normal">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
}
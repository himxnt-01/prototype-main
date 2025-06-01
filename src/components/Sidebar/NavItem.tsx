import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLocation } from "@/hooks/useLocation";

interface NavItemProps {
  icon: LucideIcon;
  label: React.ReactNode;
  path: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

export function NavItem({ icon: Icon, label, path, isCollapsed, isActive }: NavItemProps) {
  const { navigate } = useLocation();

  const button = (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start transition-colors",
        isCollapsed && "justify-center px-2",
        isActive && [
          "bg-primary/10 text-primary hover:bg-primary/20",
          "after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2",
          "after:w-1 after:h-6 after:rounded-l-full after:bg-primary"
        ]
      )}
      onClick={() => navigate(path)}
    >
      <Icon className={cn(
        "h-4 w-4 shrink-0",
        !isCollapsed && "mr-2",
        isActive && "text-primary"
      )} />
      {!isCollapsed && (
        <span className="truncate">{label}</span>
      )}
    </Button>
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent side="right" className="font-normal">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CollapseButtonProps {
  isCollapsed: boolean;
  onClick: () => void;
}

export function CollapseButton({ isCollapsed, onClick }: CollapseButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute -right-4 top-6 h-8 w-8 rounded-full border bg-background"
      onClick={onClick}
    >
      <ChevronLeft className={cn(
        "h-4 w-4 transition-transform",
        isCollapsed && "rotate-180"
      )} />
    </Button>
  );
}
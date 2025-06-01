import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TabTriggerProps {
  id: string;
  label: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export function TabTrigger({ id, label, isActive, onClick }: TabTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "relative h-11 rounded-none",
        isActive && [
          "bg-background",
          "after:absolute after:bottom-0 after:left-0 after:right-0",
          "after:h-0.5 after:bg-primary after:rounded-full"
        ]
      )}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface SaveButtonProps {
  onSave: () => void;
  isDirty?: boolean;
  className?: string;
}

export function SaveButton({ onSave, isDirty, className }: SaveButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onSave}
      disabled={!isDirty}
      className={cn(
        "transition-all duration-300",
        isDirty && "border-primary text-primary hover:bg-primary/10",
        className
      )}
    >
      <Save className="h-4 w-4 mr-2" />
      Save Changes
    </Button>
  );
}

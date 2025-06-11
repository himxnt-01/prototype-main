import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SaveButtonProps {
  onSave: () => void;
  isSaving?: boolean;
  className?: string;
}

export function SaveButton({ onSave, isSaving, className }: SaveButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onSave}
      disabled={isSaving}
      className={cn(
        "transition-all duration-300",
        "border-border hover:bg-muted",
        className
      )}
    >
      {isSaving ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Save className="h-4 w-4 mr-2" />
      )}
      {isSaving ? 'Saving...' : 'Save Changes'}
    </Button>
  );
}

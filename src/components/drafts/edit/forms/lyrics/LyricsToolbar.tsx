import { Button } from "@/components/ui/button";
import { Save, Bold, Italic, List, AlignCenter } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FORMATTING_BUTTONS = [
  { key: 'b', format: 'bold', label: 'Bold', icon: Bold },
  { key: 'i', format: 'italic', label: 'Italic', icon: Italic },
  { key: 'l', format: 'list', label: 'List', icon: List },
  { key: 'e', format: 'center', label: 'Center', icon: AlignCenter },
] as const;

interface LyricsToolbarProps {
  isDirty: boolean;
  onSave: () => void;
  onFormat: (format: string) => void;
}

export function LyricsToolbar({ isDirty, onSave, onFormat }: LyricsToolbarProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="flex items-center gap-1 border rounded-md bg-background">
        {FORMATTING_BUTTONS.map(({ format, label, icon: Icon, key }) => (
          <Tooltip key={format}>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => onFormat(format)}
              >
                <Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {label} (⌘/Ctrl+{key.toUpperCase()})
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            onClick={onSave}
            disabled={!isDirty}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </TooltipTrigger>
        <TooltipContent>Save (⌘/Ctrl+S)</TooltipContent>
      </Tooltip>
    </div>
  );
}
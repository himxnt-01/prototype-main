import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Writer } from "@/types/draft";

interface WriterCardProps {
  writer: Writer;
  onRemove: () => void;
  onUpdate: (updates: Partial<Writer>) => void;
}

const ROLES = [
  "Composer",
  "Lyricist",
  "Composer/Lyricist",
  "Arranger",
  "Producer"
] as const;

export function WriterCard({ writer, onRemove, onUpdate }: WriterCardProps) {
  return (
    <div className={cn(
      "p-3 rounded-lg",
      "bg-card border border-border",
      "hover:bg-card/80 transition-colors"
    )}>
      <div className="space-y-3">
        {/* Name field takes full width on top */}
        <div className="flex items-center gap-3">
          <Input
            value={writer.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Writer name"
            className="flex-1"
          />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onRemove}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Role and Share on second row */}
        <div className="grid grid-cols-2 gap-3">
          <Select
            value={writer.role}
            onValueChange={(value) => onUpdate({ role: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            value={writer.share}
            onChange={(e) => onUpdate({ share: parseInt(e.target.value) })}
            placeholder="Share %"
          />
        </div>
      </div>
    </div>
  );
}

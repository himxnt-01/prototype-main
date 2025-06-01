import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface LyricsTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

export function LyricsTextarea({ value, onChange }: LyricsTextareaProps) {
  return (
    <Textarea
      placeholder="Enter lyrics here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "min-h-[200px] resize-none",
        "font-mono text-base leading-relaxed",
        "bg-background/50"
      )}
    />
  );
}
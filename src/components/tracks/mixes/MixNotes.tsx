import { Mix } from "@/types/mix";

interface MixNotesProps {
  mix: Mix;
}

export function MixNotes({ mix }: MixNotesProps) {
  return (
    <div className="px-4 py-3 border-t bg-muted/50">
      <div className="text-sm space-y-1">
        {mix.metadata.notes && (
          <p className="text-muted-foreground">{mix.metadata.notes}</p>
        )}
        {mix.technicalNotes && (
          <p className="text-xs text-muted-foreground/80">{mix.technicalNotes}</p>
        )}
      </div>
    </div>
  );
}
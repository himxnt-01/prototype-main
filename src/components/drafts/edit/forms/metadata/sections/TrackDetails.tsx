import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { Disc3, Timer, Music2, Clock } from "lucide-react";
import { Draft } from "@/types/draft";
import { Badge } from "@/components/ui/badge";

interface TrackDetailsProps {
  draft: Draft;
  onChange: (changes: Partial<Draft>) => void;
}

export function TrackDetails({ draft, onChange }: TrackDetailsProps) {
  const handleChange = (key: keyof Draft['metadata'], value: any) => {
    onChange({ metadata: { ...draft.metadata, [key]: value } });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField label="Genre" icon={Disc3}>
        <div className="flex flex-wrap gap-2 pt-2">
          {draft.metadata?.genre?.map((g) => (
            <Badge key={g} variant="secondary">{g}</Badge>
          ))}
          {!draft.metadata?.genre?.length && <p className="text-sm text-muted-foreground">No genre specified</p>}
        </div>
      </FormField>

      <FormField label="BPM" icon={Timer}>
        <Input
          type="number"
          placeholder="e.g., 120"
          value={draft.metadata?.bpm || ""}
          onChange={(e) => handleChange("bpm", parseInt(e.target.value))}
        />
      </FormField>

      <FormField label="Key" icon={Music2}>
        <Input
          placeholder="e.g., Am"
          value={draft.metadata?.key || ""}
          onChange={(e) => handleChange("key", e.target.value)}
        />
      </FormField>

      <FormField label="Duration" icon={Clock}>
        <Input
          placeholder="e.g., 3:45"
          value={draft.metadata?.duration || ""}
          readOnly
        />
      </FormField>
    </div>
  );
}
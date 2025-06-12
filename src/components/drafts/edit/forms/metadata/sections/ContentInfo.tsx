import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "./FormField";
import { Globe2, AlertTriangle } from "lucide-react";
import { Draft } from "@/types/draft";

interface ContentInfoProps {
  draft: Draft;
  onChange: (changes: Partial<Draft>) => void;
}

export function ContentInfo({ draft, onChange }: ContentInfoProps) {
  const handleChange = (key: keyof Draft, value: any) => {
    onChange({ [key]: value });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField label="Language" icon={Globe2}>
        <Input
          placeholder="e.g., English"
          value={draft.metadata?.language || ""}
          onChange={(e) => onChange({ metadata: { ...draft.metadata, language: e.target.value } })}
        />
      </FormField>

      <FormField label="Explicit" icon={AlertTriangle}>
        <Select
          value={draft.metadata?.explicit_content ? "yes" : "no"}
          onValueChange={(value) => onChange({ metadata: { ...draft.metadata, explicit_content: value === "yes" } })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no">No</SelectItem>
            <SelectItem value="yes">Yes</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>
  );
}
import { Input } from "@/components/ui/input";
import { FormField } from "../FormField";
import { Music, User } from "lucide-react";
import { Draft } from "@/types/draft";

interface BasicInfoProps {
  draft: Draft;
  onChange: (changes: Partial<Draft>) => void;
}

export function BasicInfo({ draft, onChange }: BasicInfoProps) {
  const handleChange = (key: keyof Draft, value: any) => {
    onChange({ [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <FormField label="Title" icon={Music}>
          <Input
            placeholder="Track title"
            value={draft.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </FormField>

        <FormField label="Artist" icon={User}>
          <Input
            placeholder="Artist name"
            value={draft.artist || ""}
            onChange={(e) => handleChange("artist", e.target.value)}
          />
        </FormField>
      </div>
    </div>
  );
}
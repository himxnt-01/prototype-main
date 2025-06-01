import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "../FormField";
import { Globe2, AlertTriangle } from "lucide-react";
import { Draft } from "@/types/draft";

interface ContentInfoProps {
  metadata: Draft["metadata"];
  onChange: (metadata: Draft["metadata"]) => void;
}

export function ContentInfo({ metadata, onChange }: ContentInfoProps) {
  // Initialize empty metadata if not present
  const data = metadata || {};

  const handleChange = (key: keyof Draft["metadata"], value: any) => {
    const updatedMetadata = { ...data, [key]: value };
    onChange(updatedMetadata);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField label="Language" icon={Globe2}>
        <Input
          placeholder="e.g., English"
          value={data.language || ""}
          onChange={(e) => handleChange("language", e.target.value)}
        />
      </FormField>

      <FormField label="Explicit" icon={AlertTriangle}>
        <Select
          value={data.explicit ? "yes" : "no"}
          onValueChange={(value) => handleChange("explicit", value === "yes")}
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
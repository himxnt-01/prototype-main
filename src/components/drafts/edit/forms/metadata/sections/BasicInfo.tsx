import { Input } from "@/components/ui/input";
import { FormField } from "../FormField";
import { Music, User } from "lucide-react";
import { Draft } from "@/types/draft";

interface BasicInfoProps {
  metadata: Draft["metadata"];
  onChange: (metadata: Draft["metadata"]) => void;
}

export function BasicInfo({ metadata, onChange }: BasicInfoProps) {
  // Initialize empty metadata if not present
  const data = metadata || {};

  const handleChange = (key: keyof Draft["metadata"], value: any) => {
    const updatedMetadata = { ...data, [key]: value };
    onChange(updatedMetadata);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <FormField label="Title" icon={Music}>
          <Input
            placeholder="Track title"
            value={data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </FormField>

        <FormField label="Artist" icon={User}>
          <Input
            placeholder="Artist name"
            value={data.artist || ""}
            onChange={(e) => handleChange("artist", e.target.value)}
          />
        </FormField>
      </div>
    </div>
  );
}
import { Input } from "@/components/ui/input";
import { FormField } from "../FormField";
import { Barcode, Calendar } from "lucide-react";
import { Draft } from "@/types/draft";

interface CommercialInfoProps {
  metadata: Draft["metadata"];
  onChange: (metadata: Draft["metadata"]) => void;
}

export function CommercialInfo({ metadata, onChange }: CommercialInfoProps) {
  // Initialize empty metadata if not present
  const data = metadata || {};

  const handleChange = (key: keyof Draft["metadata"], value: any) => {
    const updatedMetadata = { ...data, [key]: value };
    onChange(updatedMetadata);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField label="ISRC Code" icon={Barcode}>
        <Input
          placeholder="e.g., USRC17607839"
          value={data.isrc || ""}
          onChange={(e) => handleChange("isrc", e.target.value)}
        />
      </FormField>

      <FormField label="Release Date" icon={Calendar}>
        <Input
          type="date"
          value={data.releaseDate || ""}
          onChange={(e) => handleChange("releaseDate", e.target.value)}
        />
      </FormField>
    </div>
  );
}
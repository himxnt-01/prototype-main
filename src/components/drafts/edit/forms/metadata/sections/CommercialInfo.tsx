import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { Barcode, Calendar } from "lucide-react";
import { Draft } from "@/types/draft";

interface CommercialInfoProps {
  draft: Draft;
  onChange: (changes: Partial<Draft>) => void;
}

export function CommercialInfo({ draft, onChange }: CommercialInfoProps) {
  const handleChange = (key: keyof Draft, value: any) => {
    onChange({ [key]: value });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField label="ISRC Code" icon={Barcode}>
        <Input
          placeholder="e.g., USRC17607839"
          value={""}
          readOnly
        />
      </FormField>

      <FormField label="Release Date" icon={Calendar}>
        <Input
          type="date"
          value={""}
          readOnly
        />
      </FormField>
    </div>
  );
}
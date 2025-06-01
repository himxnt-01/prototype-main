import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Draft } from "@/types/draft";

interface EditRightsTabProps {
  rights?: Draft["rights"];
  onChange: (rights: Draft["rights"]) => void;
}

export function EditRightsTab({ rights = {}, onChange }: EditRightsTabProps) {
  const handleChange = (key: keyof Draft["rights"], value: any) => {
    onChange({ ...rights, [key]: value });
  };

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="publisher">Publisher</Label>
          <Input
            id="publisher"
            value={rights.publisher || ""}
            onChange={(e) => handleChange("publisher", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="masterRightsOwner">Master Rights Owner</Label>
          <Input
            id="masterRightsOwner"
            value={rights.masterRightsOwner || ""}
            onChange={(e) => handleChange("masterRightsOwner", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
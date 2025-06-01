import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Draft } from "@/types/draft";
import { TERRITORIES } from "@/data/constants";

interface DraftRightsFormProps {
  rights?: Draft["rights"];
  onChange: (rights: Draft["rights"]) => void;
}

export function DraftRightsForm({ rights = {}, onChange }: DraftRightsFormProps) {
  const handleChange = (key: keyof Draft["rights"], value: any) => {
    onChange({ ...rights, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Rights & Licensing</h3>
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

          <div className="col-span-2 space-y-2">
            <Label>Territories</Label>
            <Select
              value={rights.territories?.[0]}
              onValueChange={(value) => handleChange("territories", [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select territory" />
              </SelectTrigger>
              <SelectContent>
                {TERRITORIES.map((territory) => (
                  <SelectItem key={territory} value={territory}>
                    {territory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Draft } from "@/types/draft";

interface EditMetadataTabProps {
  metadata?: Draft["metadata"];
  onChange: (metadata: Draft["metadata"]) => void;
}

export function EditMetadataTab({ metadata = {}, onChange }: EditMetadataTabProps) {
  const handleChange = (key: keyof Draft["metadata"], value: string | number | boolean) => {
    onChange({ ...metadata, [key]: value });
  };

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            value={metadata.genre || ""}
            onChange={(e) => handleChange("genre", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bpm">BPM</Label>
          <Input
            id="bpm"
            type="number"
            value={metadata.bpm || ""}
            onChange={(e) => handleChange("bpm", parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="key">Key</Label>
          <Input
            id="key"
            value={metadata.key || ""}
            onChange={(e) => handleChange("key", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={metadata.duration || ""}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="isrc">ISRC</Label>
          <Input
            id="isrc"
            value={metadata.isrc || ""}
            onChange={(e) => handleChange("isrc", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="iswc">ISWC</Label>
          <Input
            id="iswc"
            value={metadata.iswc || ""}
            onChange={(e) => handleChange("iswc", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "../FormField";
import { Disc3, Timer, Music2, Clock } from "lucide-react";
import { Draft } from "@/types/draft";
import { MUSIC_GENRES } from "@/data/constants";

interface TrackDetailsProps {
  metadata: Draft["metadata"];
  onChange: (metadata: Draft["metadata"]) => void;
}

export function TrackDetails({ metadata, onChange }: TrackDetailsProps) {
  // Initialize empty metadata if not present
  const data = metadata || {};

  const handleChange = (key: keyof Draft["metadata"], value: any) => {
    const updatedMetadata = { ...data, [key]: value };
    onChange(updatedMetadata);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField label="Genre" icon={Disc3}>
        <Select
          value={data.genre}
          onValueChange={(value) => handleChange("genre", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {MUSIC_GENRES.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="BPM" icon={Timer}>
        <Input
          type="number"
          placeholder="e.g., 120"
          value={data.bpm || ""}
          onChange={(e) => handleChange("bpm", parseInt(e.target.value))}
        />
      </FormField>

      <FormField label="Key" icon={Music2}>
        <Input
          placeholder="e.g., Am"
          value={data.key || ""}
          onChange={(e) => handleChange("key", e.target.value)}
        />
      </FormField>

      <FormField label="Duration" icon={Clock}>
        <Input
          placeholder="e.g., 3:45"
          value={data.duration || ""}
          onChange={(e) => handleChange("duration", e.target.value)}
        />
      </FormField>
    </div>
  );
}
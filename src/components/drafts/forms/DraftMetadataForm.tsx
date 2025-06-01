import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Draft } from "@/types/draft";
import { MUSIC_GENRES } from "@/data/constants";

interface DraftMetadataFormProps {
  metadata?: Draft["metadata"];
  onChange: (metadata: Draft["metadata"]) => void;
}

export function DraftMetadataForm({ metadata = {}, onChange }: DraftMetadataFormProps) {
  const handleChange = (key: keyof Draft["metadata"], value: any) => {
    onChange({ ...metadata, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Metadata</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select
              value={metadata.genre}
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

          <div className="space-y-2">
            <Label htmlFor="producer">Producer</Label>
            <Input
              id="producer"
              value={metadata.producer || ""}
              onChange={(e) => handleChange("producer", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mixer">Mixer</Label>
            <Input
              id="mixer"
              value={metadata.mixer || ""}
              onChange={(e) => handleChange("mixer", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
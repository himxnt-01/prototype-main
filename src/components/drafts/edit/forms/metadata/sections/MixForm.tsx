import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mix, MixType } from "@/types/mix";
import { MixFileUpload } from "./MixFileUpload";

interface MixFormProps {
  mix?: Mix;
  onSave: (mix: Mix) => void;
  onCancel: () => void;
}

const MIX_TYPES: Array<{ value: MixType; label: string }> = [
  { value: "radio_edit", label: "Radio Edit" },
  { value: "extended", label: "Extended Mix" },
  { value: "instrumental", label: "Instrumental" },
  { value: "acapella", label: "Acapella" },
  { value: "remix", label: "Remix" },
  { value: "acoustic", label: "Acoustic" },
  { value: "live", label: "Live" },
  { value: "clean", label: "Clean" },
  { value: "tv_edit", label: "TV Edit" },
  { value: "film_score", label: "Film Score" },
  { value: "trailer", label: "Trailer" },
];

export function MixForm({ mix, onSave, onCancel }: MixFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "radio_edit" as MixType,
    isrc: "",
    mixer: "",
    notes: "",
    file: null as File | null,
  });

  // Initialize form data when editing an existing mix
  useEffect(() => {
    if (mix) {
      setFormData({
        title: mix.title,
        type: mix.type,
        isrc: mix.metadata.isrc || "",
        mixer: mix.metadata.mixer,
        notes: mix.metadata.notes || "",
        file: null,
      });
    }
  }, [mix]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd upload the file first and get duration
    const updatedMix: Mix = {
      id: mix?.id || Date.now(),
      title: formData.title,
      type: formData.type,
      duration: mix?.duration || "0:00", // Keep existing duration if editing
      metadata: {
        mixer: formData.mixer,
        date: mix?.metadata.date || new Date().toISOString(),
        isrc: formData.isrc,
        notes: formData.notes,
      },
      approvalStatus: mix?.approvalStatus || "pending",
      version: mix ? incrementVersion(mix.version) : "1.0",
    };

    onSave(updatedMix);
  };

  const incrementVersion = (version: string): string => {
    const [major, minor] = version.split(".").map(Number);
    return `${major}.${minor + 1}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Mix Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Radio Edit"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Mix Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: MixType) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MIX_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="isrc">ISRC Code</Label>
          <Input
            id="isrc"
            value={formData.isrc}
            onChange={(e) => setFormData({ ...formData, isrc: e.target.value })}
            placeholder="e.g., USRC12345678"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mixer">Mixed By</Label>
          <Input
            id="mixer"
            value={formData.mixer}
            onChange={(e) => setFormData({ ...formData, mixer: e.target.value })}
            placeholder="e.g., John Smith"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Add any additional notes about this mix..."
          className="h-20"
        />
      </div>

      {!mix && (
        <MixFileUpload
          file={formData.file}
          onChange={(file) => setFormData({ ...formData, file })}
        />
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {mix ? "Save Changes" : "Create Mix"}
        </Button>
      </div>
    </form>
  );
}
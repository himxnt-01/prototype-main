import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "@/components/drafts/edit/forms/metadata/FormField";
import { Music, User, Barcode, Calendar, Disc3, Timer, Music2, Clock } from "lucide-react";
import { Track } from "@/types/track";
import { MUSIC_GENRES } from "@/data/constants";

interface MetadataTabProps {
  track: Track;
}

export function MetadataTab({ track }: MetadataTabProps) {
  // Use track metadata or initialize empty object
  const metadata = track.metadata || {};

  return (
    <div className="space-y-10 p-6">
      {/* Basic Info */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <FormField label="Title" icon={Music}>
            <Input
              value={track.title}
              readOnly
              className="bg-muted/50"
            />
          </FormField>

          <FormField label="Artist" icon={User}>
            <Input
              value={track.artist}
              readOnly
              className="bg-muted/50"
            />
          </FormField>
        </div>
      </div>

      {/* Commercial Info */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Commercial Info</h3>
        <div className="grid grid-cols-2 gap-6">
          <FormField label="ISRC Code" icon={Barcode}>
            <Input
              value={metadata.isrc || ""}
              readOnly
              className="bg-muted/50"
            />
          </FormField>

          <FormField label="Release Date" icon={Calendar}>
            <Input
              value={metadata.releaseDate || ""}
              readOnly
              className="bg-muted/50"
            />
          </FormField>

          <FormField label="UPC" icon={Barcode}>
            <Input
              value={metadata.upc || ""}
              readOnly
              className="bg-muted/50"
            />
          </FormField>

          <FormField label="Copyright" icon={Barcode}>
            <Input
              value={metadata.copyright || ""}
              readOnly
              className="bg-muted/50"
            />
          </FormField>
        </div>
      </div>

      {/* Track Details */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Track Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <FormField label="Genre" icon={Disc3}>
            <Input
              value={track.genre}
              readOnly
              className="bg-muted/50"
            />
          </FormField>

          <FormField label="BPM" icon={Timer}>
            <Input
              value={track.bpm.toString()}
              readOnly
              className="bg-muted/50"
            />
          </FormField>

          <FormField label="Key" icon={Music2}>
            <Input
              value={track.key}
              readOnly
              className="bg-muted/50"
            />
          </FormField>

          <FormField label="Duration" icon={Clock}>
            <Input
              value={track.duration}
              readOnly
              className="bg-muted/50"
            />
          </FormField>
        </div>
      </div>

      {/* Production Info */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Production Info</h3>
        <div className="grid grid-cols-2 gap-6">
          <FormField label="Producer" icon={User}>
            <Input
              value={metadata.producer || ""}
              readOnly
              className="bg-muted/50"
            />
          </FormField>

          <FormField label="Mixer" icon={User}>
            <Input
              value={metadata.mixer || ""}
              readOnly
              className="bg-muted/50"
            />
          </FormField>

          <FormField label="Mastering Engineer" icon={User}>
            <Input
              value={metadata.masteringEngineer || ""}
              readOnly
              className="bg-muted/50"
            />
          </FormField>

          <FormField label="Recording Location" icon={User}>
            <Input
              value={metadata.recordingLocation || ""}
              readOnly
              className="bg-muted/50"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
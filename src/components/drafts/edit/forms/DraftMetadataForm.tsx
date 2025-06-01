import { Draft } from "@/types/draft";
import { BasicInfo } from "./metadata/sections/BasicInfo";
import { CommercialInfo } from "./metadata/sections/CommercialInfo";
import { TrackDetails } from "./metadata/sections/TrackDetails";
import { ContentInfo } from "./metadata/sections/ContentInfo";

interface DraftMetadataFormProps {
  metadata: Draft["metadata"];
  onChange: (metadata: Draft["metadata"]) => void;
}

export function DraftMetadataForm({ metadata, onChange }: DraftMetadataFormProps) {
  const handleChange = (key: keyof Draft["metadata"], value: any) => {
    onChange({ ...metadata, [key]: value });
  };

  return (
    <div className="space-y-8">
      <BasicInfo metadata={metadata} onChange={handleChange} />
      <CommercialInfo metadata={metadata} onChange={handleChange} />
      <TrackDetails metadata={metadata} onChange={handleChange} />
      <ContentInfo metadata={metadata} onChange={handleChange} />
    </div>
  );
}
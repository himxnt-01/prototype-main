import { Draft } from "@/types/draft";
import { BasicInfo } from "./metadata/sections/BasicInfo";
import { CommercialInfo } from "./metadata/sections/CommercialInfo";
import { TrackDetails } from "./metadata/sections/TrackDetails";
import { ContentInfo } from "./metadata/sections/ContentInfo";

interface DraftMetadataFormProps {
  draft: Draft;
  onChange: (changes: Partial<Draft>) => void;
}

export function DraftMetadataForm({ draft, onChange }: DraftMetadataFormProps) {
  const handleChange = (changes: Partial<Draft>) => {
    const newDraft = { ...draft, ...changes };
    if (changes.metadata) {
      newDraft.metadata = { ...(draft.metadata || {}), ...changes.metadata };
    }
    onChange(newDraft);
  };

  return (
    <div className="space-y-8 p-6">
      <BasicInfo draft={draft} onChange={handleChange} />
      <CommercialInfo draft={draft} onChange={handleChange} />
      <TrackDetails draft={draft} onChange={handleChange} />
      <ContentInfo draft={draft} onChange={handleChange} />
    </div>
  );
}
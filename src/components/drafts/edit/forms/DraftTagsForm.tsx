import { Draft } from "@/types/draft";
import { Badge } from "@/components/ui/badge";

interface DraftTagsFormProps {
  draft: Draft;
  onChange: (changes: Partial<Draft>) => void;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold text-foreground mb-4">{children}</h3>
);

const Field = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <div>{children}</div>
  </div>
);

export function DraftTagsForm({ draft, onChange }: DraftTagsFormProps) {
  const handleTagChange = (key: keyof Draft, value: any) => {
    onChange({ [key]: value });
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <SectionTitle>Primary Tags</SectionTitle>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Key">
            <p className="text-sm h-10 flex items-center">{draft.key || "-"}</p>
          </Field>
          <Field label="Emotional Arc">
            <p className="text-sm h-10 flex items-center">{draft.emotional_arc || "-"}</p>
          </Field>
        </div>
      </div>
      
      <div>
        <SectionTitle>Secondary Tags</SectionTitle>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Mood">
            <div className="flex flex-wrap gap-2 pt-2 min-h-[40px]">
              {draft.moods?.map((m) => <Badge key={m} variant="secondary">{m}</Badge>)}
              {!draft.moods?.length && <p className="text-sm text-muted-foreground">-</p>}
            </div>
          </Field>
          <Field label="Genre">
            <div className="flex flex-wrap gap-2 pt-2 min-h-[40px]">
              {draft.genre?.map((g) => <Badge key={g} variant="secondary">{g}</Badge>)}
              {!draft.genre?.length && <p className="text-sm text-muted-foreground">-</p>}
            </div>
          </Field>
        </div>
      </div>

      <div>
        <SectionTitle>Instrument & Vocal</SectionTitle>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Vocal Style">
            <p className="text-sm h-10 flex items-center">{draft.vocal_type || "-"}</p>
          </Field>
          <Field label="Instruments">
            <p className="text-sm text-muted-foreground">{draft.instruments?.join(', ') || "-"}</p>
          </Field>
        </div>
      </div>

      <div>
        <SectionTitle>Compositional Details</SectionTitle>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Harmony">
             <p className="text-sm h-10 flex items-center">{draft.harmony || "-"}</p>
          </Field>
           <Field label="Chord Progression">
             <p className="text-sm text-muted-foreground">{draft.chord_progression || "-"}</p>
          </Field>
        </div>
      </div>
      
      <div>
        <SectionTitle>Cultural & Lyrical Context</SectionTitle>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Lyrical Theme">
            <p className="text-sm h-10 flex items-center">{draft.lyrical_theme || "-"}</p>
          </Field>
          <Field label="Cultural Fusion">
            <p className="text-sm h-10 flex items-center">{draft.cultural_fusion || "-"}</p>
          </Field>
          <Field label="Historical Period">
            <p className="text-sm h-10 flex items-center">{draft.historical_period || "-"}</p>
          </Field>
        </div>
      </div>
    </div>
  );
}
import { Draft } from "@/types/draft";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface InfoCardProps {
  title: string;
  value?: React.ReactNode;
}

const InfoCard = ({ title, value }: InfoCardProps) => (
  <div className="bg-background/50 p-3 rounded-lg min-h-[74px]">
    <p className="text-xs text-muted-foreground mb-1">{title}</p>
    <div className="text-sm font-medium flex flex-wrap gap-1">{value || "-"}</div>
  </div>
);

interface DraftDetailsProps {
  draft: Draft;
}

export function DraftDetails({ draft }: DraftDetailsProps) {
  return (
    <div className="p-4 bg-transparent">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InfoCard title="Moods" value={draft.moods?.map((m) => <Badge key={m} variant="outline" className="font-normal">{m}</Badge>)} />
        <InfoCard title="Instruments" value={draft.instruments?.join(', ')} />
        <InfoCard title="Vocal Type" value={draft.vocal_type} />
        <InfoCard title="Explicit" value={draft.explicit_content ? "Yes" : "No"} />
        <InfoCard title="Lyrical Theme" value={draft.lyrical_theme} />
        <InfoCard title="Cultural Fusion" value={draft.cultural_fusion} />
        <InfoCard title="Harmony" value={draft.harmony} />
        <InfoCard title="Historical Period" value={draft.historical_period} />
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-1 text-sm">Chord Progression</h4>
          <p className="text-sm text-muted-foreground">
            {draft.chord_progression || "No chord progression data available."}
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-1 text-sm">Description</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {draft.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";

interface SyncRequestBriefProps {
  brief: {
    description: string;
    mood: string[];
    style: string[];
    reference_tracks?: string[];
    similar_projects?: string[];
    target_audience?: string;
  };
}

export function SyncRequestBrief({ brief }: SyncRequestBriefProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Music Brief</h4>
      <p className="text-sm text-muted-foreground">{brief.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Mood:</span>
          <div className="flex flex-wrap gap-1">
            {brief.mood.map((mood) => (
              <Badge key={mood} variant="secondary" className="bg-pink-500/10 text-pink-500">
                {mood}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Style:</span>
          <div className="flex flex-wrap gap-1">
            {brief.style.map((style) => (
              <Badge key={style} variant="secondary" className="bg-purple-500/10 text-purple-500">
                {style}
              </Badge>
            ))}
          </div>
        </div>

        {brief.reference_tracks && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">References:</span>
            <div className="flex flex-wrap gap-1">
              {brief.reference_tracks.map((track) => (
                <Badge key={track} variant="secondary">
                  {track}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {brief.target_audience && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Target Audience:</span>
            <Badge variant="secondary">{brief.target_audience}</Badge>
          </div>
        )}
      </div>
    </div>
  );
}
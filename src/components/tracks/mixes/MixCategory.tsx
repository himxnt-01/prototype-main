import { Mix } from "@/types/mix";
import { Badge } from "@/components/ui/badge";
import { MixCard } from "./MixCard";

interface MixCategoryProps {
  label: string;
  mixes: Mix[];
}

export function MixCategory({ label, mixes }: MixCategoryProps) {
  if (mixes.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-medium text-muted-foreground">
          {label}
        </h3>
        <Badge variant="secondary" className="text-xs">
          {mixes.length}
        </Badge>
      </div>
      <div className="space-y-2">
        {mixes.map((mix) => (
          <MixCard key={mix.id} mix={mix} />
        ))}
      </div>
    </div>
  );
}
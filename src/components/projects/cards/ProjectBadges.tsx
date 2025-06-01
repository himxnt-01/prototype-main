import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectBadgesProps {
  type: Project["type"];
  status: Project["status"];
}

const TYPE_STYLES = {
  album: "bg-blue-500/10 text-blue-500",
  ep: "bg-purple-500/10 text-purple-500",
  single: "bg-pink-500/10 text-pink-500",
  sync: "bg-yellow-500/10 text-yellow-500",
  collaboration: "bg-green-500/10 text-green-500",
} as const;

const STATUS_STYLES = {
  active: "bg-green-500/10 text-green-500",
  completed: "bg-blue-500/10 text-blue-500",
  archived: "bg-gray-500/10 text-gray-500",
} as const;

export function ProjectBadges({ type, status }: ProjectBadgesProps) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className={cn("capitalize", TYPE_STYLES[type])}>
        {type}
      </Badge>
      <Badge variant="secondary" className={cn("capitalize", STATUS_STYLES[status])}>
        {status}
      </Badge>
    </div>
  );
}
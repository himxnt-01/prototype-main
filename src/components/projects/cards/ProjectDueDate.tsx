import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface ProjectDueDateProps {
  dueDate: string;
}

export function ProjectDueDate({ dueDate }: ProjectDueDateProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Calendar className="h-4 w-4" />
      <span>Due {format(new Date(dueDate), "MMM d")}</span>
    </div>
  );
}
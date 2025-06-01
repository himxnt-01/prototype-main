import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface SyncRequestDeadlineProps {
  deadline: {
    submission: string;
    usage_start: string;
    fast_tracked: boolean;
  };
}

export function SyncRequestDeadline({ deadline }: SyncRequestDeadlineProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Calendar className="h-4 w-4" />
        Timeline
      </div>
      
      <div className="space-y-2">
        <div>
          <div className="text-sm text-muted-foreground">Submission Due</div>
          <div className="font-medium">
            {format(new Date(deadline.submission), "MMM d, yyyy")}
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">Usage Starts</div>
          <div className="font-medium">
            {format(new Date(deadline.usage_start), "MMM d, yyyy")}
          </div>
        </div>

        {deadline.fast_tracked && (
          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <Clock className="h-4 w-4" />
            Fast-tracked
          </div>
        )}
      </div>
    </div>
  );
}
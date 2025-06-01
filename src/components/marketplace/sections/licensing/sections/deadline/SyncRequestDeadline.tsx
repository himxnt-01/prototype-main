import { Calendar, Clock, Zap } from "lucide-react";
import { format } from "date-fns";
import { Deadline } from "../../types";
import { Badge } from "@/components/ui/badge";

interface SyncRequestDeadlineProps {
  deadline: Deadline;
}

export function SyncRequestDeadline({ deadline }: SyncRequestDeadlineProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-amber-600">
        <Calendar className="h-4 w-4" />
        Timeline
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="text-sm text-muted-foreground">Submission Due</div>
          <div className="font-medium flex items-center gap-2">
            {format(new Date(deadline.submission), "MMM d, yyyy")}
            {deadline.fast_tracked && (
              <Badge 
                variant="secondary"
                className="bg-amber-500/10 text-amber-500 border-amber-500/20"
              >
                <Zap className="h-3.5 w-3.5 mr-1" />
                Fast-tracked
              </Badge>
            )}
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">Usage Starts</div>
          <div className="font-medium flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            {format(new Date(deadline.usage_start), "MMM d, yyyy")}
          </div>
        </div>
      </div>
    </div>
  );
}
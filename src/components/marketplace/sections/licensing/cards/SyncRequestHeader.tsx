import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SyncRequestActions } from "../actions/SyncRequestActions";
import { SyncRequest } from "../types";
import { cn } from "@/lib/utils";
import { 
  Film, 
  Gamepad2, 
  Tv, 
  Video, 
  Clock, 
  DollarSign, 
  BadgeCheck,
  Building2
} from "lucide-react";

// Badge configurations with icons and consistent colors
const TYPE_BADGES = {
  "Documentary": { 
    icon: Film, 
    className: "bg-amber-500/15 text-amber-500 border-amber-500/20" 
  },
  "Gaming": { 
    icon: Gamepad2, 
    className: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20" 
  },
  "Advertising": { 
    icon: Video, 
    className: "bg-blue-500/15 text-blue-500 border-blue-500/20" 
  },
  "Film": { 
    icon: Film, 
    className: "bg-purple-500/15 text-purple-500 border-purple-500/20" 
  },
  "TV": { 
    icon: Tv, 
    className: "bg-indigo-500/15 text-indigo-500 border-indigo-500/20" 
  }
} as const;

const STATUS_BADGES = {
  "Pending": { 
    icon: Clock, 
    className: "bg-yellow-500/15 text-yellow-500 border-yellow-500/20" 
  },
  "Accepted": { 
    icon: BadgeCheck, 
    className: "bg-green-500/15 text-green-500 border-green-500/20" 
  },
  "Declined": { 
    icon: Clock, 
    className: "bg-red-500/15 text-red-500 border-red-500/20" 
  }
} as const;

interface SyncRequestHeaderProps {
  request: SyncRequest;
  onAccept: () => void;
}

export function SyncRequestHeader({ request, onAccept }: SyncRequestHeaderProps) {
  const TypeIcon = TYPE_BADGES[request.type as keyof typeof TYPE_BADGES]?.icon;
  const StatusIcon = STATUS_BADGES[request.status as keyof typeof STATUS_BADGES]?.icon;
  const typeBadgeStyle = TYPE_BADGES[request.type as keyof typeof TYPE_BADGES]?.className;
  const statusBadgeStyle = STATUS_BADGES[request.status as keyof typeof STATUS_BADGES]?.className;

  return (
    <div className={cn(
      "flex items-start justify-between p-6 border-b",
      "bg-gradient-to-b from-card/50 to-card/30",
      "backdrop-blur supports-[backdrop-filter]:bg-card/30"
    )}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className={cn(
            "h-12 w-12 ring-2 ring-border/50 ring-offset-2 ring-offset-background",
            "transition-shadow duration-300 group-hover:ring-border"
          )}>
            <img 
              src={request.client.avatar} 
              alt={request.client.name}
              className="object-cover"
            />
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <div className="font-medium">{request.title}</div>
              {request.client.verified && (
                <Badge 
                  variant="secondary" 
                  className="bg-blue-500/15 text-blue-500 border-blue-500/20"
                >
                  <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                  Verified Client
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              {request.client.name} • {request.client.company}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {TypeIcon && (
            <Badge 
              variant="secondary" 
              className={typeBadgeStyle}
            >
              <TypeIcon className="h-3.5 w-3.5 mr-1" />
              {request.type}
            </Badge>
          )}
          {StatusIcon && (
            <Badge 
              variant="secondary" 
              className={statusBadgeStyle}
            >
              <StatusIcon className="h-3.5 w-3.5 mr-1" />
              {request.status}
            </Badge>
          )}
          {request.urgent && (
            <Badge 
              variant="secondary" 
              className="bg-red-500/15 text-red-500 border-red-500/20"
            >
              <DollarSign className="h-3.5 w-3.5 mr-1" />
              High Value
            </Badge>
          )}
          {request.budget.amount >= 10000 && (
            <Badge 
              variant="secondary" 
              className="bg-green-500/15 text-green-500 border-green-500/20"
            >
              <DollarSign className="h-3.5 w-3.5 mr-1" />
              ${request.budget.amount.toLocaleString()}
            </Badge>
          )}
        </div>
      </div>

      <SyncRequestActions request={request} onAccept={onAccept} />
    </div>
  );
}
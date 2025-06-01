import { RequestType } from "./types";
import { Film, Gamepad2, Tv, Video } from "lucide-react";

export const REQUEST_TYPE_CONFIG = {
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

export const STATUS_CONFIG = {
  "Pending": { 
    className: "bg-yellow-500/15 text-yellow-500 border-yellow-500/20" 
  },
  "Accepted": { 
    className: "bg-green-500/15 text-green-500 border-green-500/20" 
  },
  "Declined": { 
    className: "bg-red-500/15 text-red-500 border-red-500/20" 
  }
} as const;

export const BUDGET_BADGE_STYLES = {
  high_value: "bg-green-500/15 text-green-500 border-green-500/20",
  urgent: "bg-red-500/15 text-red-500 border-red-500/20",
  negotiable: "bg-blue-500/15 text-blue-500 border-blue-500/20"
} as const;

export const USAGE_BADGE_STYLES = {
  primary: "bg-blue-500/15 text-blue-500 border-blue-500/20",
  secondary: "bg-indigo-500/15 text-indigo-500 border-indigo-500/20",
  exclusive: "bg-purple-500/15 text-purple-500 border-purple-500/20"
} as const;

export const DEADLINE_BADGE_STYLES = {
  fast_tracked: "bg-amber-500/15 text-amber-500 border-amber-500/20",
  upcoming: "bg-blue-500/15 text-blue-500 border-blue-500/20",
  overdue: "bg-red-500/15 text-red-500 border-red-500/20"
} as const;

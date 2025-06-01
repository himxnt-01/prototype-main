import { useState, useEffect } from "react";
import { Track } from "@/types/track";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { DollarSign, Film, Tv, Gamepad2, Radio, ShoppingBag, Check, X, Clock, Globe } from "lucide-react";

interface StatusTabProps {
  track: Track;
}

// Industry icons mapping
const INDUSTRY_ICONS = {
  "movies": { icon: Film, label: "Movies/Shows" },
  "commercials": { icon: ShoppingBag, label: "Commercials" },
  "tv": { icon: Tv, label: "TV" },
  "games": { icon: Gamepad2, label: "Video Games" },
  "radio": { icon: Radio, label: "Radio" },
  "all": { icon: Check, label: "All Industries" }
};

export function StatusTab({ track }: StatusTabProps) {
  // Use track status or default values
  const status = track.status || {
    phase: "published",
    clearance: {
      industries: ["movies", "tv", "commercials"],
      restrictedCountries: []
    },
    monetization: true,
    public: true,
    price: 5000,
    progress: 100,
    approvals: [
      { id: "1", name: track.artist, role: "Artist", type: "Writer", status: "approved" },
      { id: "2", name: "Music Publisher", role: "Publisher", type: "Publisher", status: "approved" }
    ]
  };

  return (
    <div className="space-y-10 p-6">
      {/* Progress Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Progress</h3>
          <Badge 
            variant="outline"
            className={cn(
              status.phase === "published" 
                ? "bg-green-500/10 text-green-500 border-green-500/20"
                : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
            )}
          >
            {status.phase === "published" ? "Published" : "In Progress"}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Completion</span>
            <span>{status.progress || 100}%</span>
          </div>
          <Progress 
            value={status.progress || 100} 
            className={cn(
              "h-2",
              (status.progress || 100) === 100 && "bg-green-500/20"
            )} 
          />
        </div>
        
        <div className="text-sm text-muted-foreground">
          Current phase: <span className="capitalize">{(status.phase || "published").replace(/_/g, ' ')}</span>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-medium">Pricing</h3>
        </div>
        
        <div className="text-2xl font-semibold">
          ${(status.price || 5000).toLocaleString()}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Licensing price for this track. Price may vary depending on usage rights.
        </p>
      </div>

      {/* Clearance Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Film className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium">Clearance</h3>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium">Cleared for use in:</div>
          <div className="grid grid-cols-2 gap-3">
            {(status.clearance?.industries || ["movies", "tv"]).map((industry) => {
              const { icon: Icon, label } = INDUSTRY_ICONS[industry as keyof typeof INDUSTRY_ICONS] || 
                { icon: Film, label: industry };
              
              return (
                <div 
                  key={industry}
                  className="flex items-center gap-2 p-2 rounded-md bg-blue-500/5 border border-blue-500/10"
                >
                  <Icon className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {(status.clearance?.restrictedCountries || []).length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Restricted Countries:</div>
            <div className="flex flex-wrap gap-2">
              {(status.clearance?.restrictedCountries || []).map((country) => (
                <Badge 
                  key={country}
                  variant="outline"
                  className="bg-red-500/10 text-red-500 border-red-500/20"
                >
                  {country}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Approval Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-medium">Approval</h3>
        </div>
        
        <div className="space-y-3 rounded-lg border p-4">
          {(status.approvals || []).map((approval) => (
            <div key={approval.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-normal">
                  {approval.type}
                </Badge>
                <span>{approval.name}</span>
              </div>
              <Badge 
                variant="secondary"
                className={cn(
                  approval.status === "approved" && "bg-green-500/10 text-green-500",
                  approval.status === "rejected" && "bg-red-500/10 text-red-500",
                  approval.status === "pending" && "bg-yellow-500/10 text-yellow-500"
                )}
              >
                {approval.status === "approved" && (
                  <Check className="h-3 w-3 mr-1" />
                )}
                {approval.status === "rejected" && (
                  <X className="h-3 w-3 mr-1" />
                )}
                {approval.status === "pending" && (
                  <Clock className="h-3 w-3 mr-1" />
                )}
                {approval.status === "approved" ? "Approved" : 
                 approval.status === "rejected" ? "Rejected" : "Pending"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
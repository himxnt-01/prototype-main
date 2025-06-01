import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { SyncRequest } from "../../types";
import { SyncRequestBrief } from "../../sections/SyncRequestBrief";
import { SyncRequestDetails } from "../../sections/SyncRequestDetails";
import { SyncRequestRequirements } from "../../sections/SyncRequestRequirements";
import { NegotiationTerms } from "../../sections/budget/BudgetNegotiationDialog";
import { cn } from "@/lib/utils";

interface RequestOverviewProps {
  request: SyncRequest;
  onNext: () => void;
  onNegotiate: (terms: NegotiationTerms) => void;
  onBack: () => void;
}

export function RequestOverview({ request, onNext, onNegotiate, onBack }: RequestOverviewProps) {
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="space-y-6 p-1">
          {/* Client Info */}
          <div className={cn(
            "p-4 rounded-lg",
            "bg-gradient-to-br from-card/30 via-card/20 to-background/10",
            "border border-border/50"
          )}>
            <div className="flex items-center gap-4">
              <img 
                src={request.client.avatar}
                alt={request.client.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{request.title}</h3>
                <div className="text-sm text-muted-foreground">
                  {request.client.name} • {request.client.company}
                </div>
              </div>
            </div>
          </div>

          {/* Brief */}
          <SyncRequestBrief brief={request.brief} />

          {/* Project Details */}
          <SyncRequestDetails 
            budget={request.budget}
            usage={request.usage}
            deadline={request.deadline}
            onNegotiate={onNegotiate}
          />

          {/* Technical Requirements */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Technical Requirements</h3>
            <div className={cn(
              "p-4 rounded-lg",
              "bg-gradient-to-br from-card/30 via-card/20 to-background/10"
            )}>
              <SyncRequestRequirements requirements={request.requirements} />
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Navigation - Now directly attached to content */}
      <div className="flex justify-end gap-2 pt-4 border-t mt-4">
        <Button variant="outline" onClick={onBack}>
          Cancel Request
        </Button>
        <Button 
          onClick={onNext}
          className={cn(
            "bg-blue-600 hover:bg-blue-700",
            "text-white",
            "border-blue-700/50",
            "shadow-lg shadow-blue-900/20",
            "transition-all duration-300",
            "hover:shadow-xl hover:shadow-blue-900/30",
            "active:shadow-md"
          )}
        >
          Continue to Project Setup
        </Button>
      </div>
    </div>
  );
}

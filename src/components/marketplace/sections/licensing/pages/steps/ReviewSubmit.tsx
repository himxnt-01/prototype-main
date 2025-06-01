import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { SyncRequest } from "../../types";
import { ProjectData } from "./project/types";
import { NegotiationTerms } from "../../sections/budget/BudgetNegotiationDialog";
import { cn } from "@/lib/utils";

interface ReviewSubmitProps {
  request: SyncRequest;
  projectData: ProjectData;
  negotiationTerms?: NegotiationTerms;
  onBack: () => void;
  onSubmit: () => void;
}

export function ReviewSubmit({ 
  request, 
  projectData,
  negotiationTerms,
  onBack, 
  onSubmit 
}: ReviewSubmitProps) {
  const hasChanges = !!negotiationTerms;
  const amountDiff = negotiationTerms 
    ? negotiationTerms.proposedAmount - request.budget.amount
    : 0;
  const percentDiff = amountDiff 
    ? (amountDiff / request.budget.amount * 100).toFixed(1)
    : 0;

  return (
    <ScrollArea className="h-[calc(100vh-16rem)]">
      <div className="space-y-6 p-1">
        {/* Changes Alert */}
        {hasChanges && (
          <Alert variant="warning" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You are proposing changes to the original terms. The client will need to review and approve these changes before proceeding.
            </AlertDescription>
          </Alert>
        )}

        {/* Budget Changes */}
        {hasChanges && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Proposedddd Changes</h3>
            <div className="rounded-lg border p-4 space-y-3 bg-card">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Budget Change</div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    ${request.budget.amount.toLocaleString()}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    ${negotiationTerms?.proposedAmount.toLocaleString()}
                  </span>
                  <Badge 
                    variant="secondary"
                    className={cn(
                      amountDiff > 0 
                        ? "bg-green-500/10 text-green-500" 
                        : "bg-amber-500/10 text-amber-500"
                    )}
                  >
                    {amountDiff > 0 ? "+" : ""}{percentDiff}%
                  </Badge>
                </div>
              </div>

              {negotiationTerms?.includeStems !== request.budget.includes_stems && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Stems</div>
                  <div>{negotiationTerms?.includeStems ? "Added" : "Removed"}</div>
                </div>
              )}

              {negotiationTerms?.notes && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Notes</div>
                  <div className="text-sm">{negotiationTerms.notes}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Project Details</h3>
          <div className="rounded-lg border p-4 space-y-4 bg-card">
            <div>
              <div className="text-sm text-muted-foreground">Title</div>
              <div>{projectData.title}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Description</div>
              <div>{projectData.description}</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Team Members</h3>
          <div className="rounded-lg border p-4 space-y-3 bg-card">
            {projectData.team.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div>
                  <div>{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.email}</div>
                </div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            onClick={onSubmit}
            className={cn(
              hasChanges 
                ? "bg-amber-600 hover:bg-amber-700" 
                : "bg-blue-600 hover:bg-blue-700",
              "text-white transition-colors"
            )}
          >
            {hasChanges ? "Request Changes" : "Accept & Create Project"}
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
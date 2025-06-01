import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Budget } from "../../types";
import { NegotiationTerms } from "./BudgetNegotiationDialog";

interface BudgetChangesProps {
  originalBudget: Budget;
  proposedTerms: NegotiationTerms;
}

export function BudgetChanges({ originalBudget, proposedTerms }: BudgetChangesProps) {
  const amountDiff = proposedTerms.proposedAmount - originalBudget.amount;
  const percentDiff = (amountDiff / originalBudget.amount * 100).toFixed(1);

  return (
    <div className="space-y-3 p-3 rounded-lg bg-muted/50">
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">Amount Change</div>
        <div className="flex items-center gap-2">
          <span>${originalBudget.amount.toLocaleString()}</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <span>${proposedTerms.proposedAmount.toLocaleString()}</span>
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

      {proposedTerms.includeStems !== originalBudget.includes_stems && (
        <div className="text-sm">
          <span className="text-muted-foreground">Stems: </span>
          {proposedTerms.includeStems ? "Added" : "Removed"}
        </div>
      )}

      {proposedTerms.notes && (
        <div className="text-sm">
          <div className="text-muted-foreground mb-1">Notes:</div>
          <p className="text-sm">{proposedTerms.notes}</p>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { Check } from "lucide-react";
import { Budget } from "../../types";
import { BudgetHeader } from "./BudgetHeader";
import { BudgetAmount } from "./BudgetAmount";
import { BudgetIncludes } from "./BudgetIncludes";
import { BudgetNegotiationDialog, NegotiationTerms } from "./BudgetNegotiationDialog";

interface SyncRequestBudgetProps {
  budget: Budget;
  onNegotiate?: (terms: NegotiationTerms) => void;
}

export function SyncRequestBudget({ budget, onNegotiate }: SyncRequestBudgetProps) {
  const [isNegotiating, setIsNegotiating] = useState(false);

  const handleNegotiate = (terms: NegotiationTerms) => {
    onNegotiate?.(terms);
    setIsNegotiating(false);
  };

  return (
    <>
      <div className="space-y-4">
        <BudgetHeader 
          onNegotiate={() => setIsNegotiating(true)}
          isNegotiable={budget.negotiable}
        />
        
        <div className="space-y-3">
          <BudgetAmount budget={budget} />
          
          {budget.usage_includes && (
            <BudgetIncludes items={budget.usage_includes} />
          )}

          {budget.includes_stems && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Check className="h-3.5 w-3.5" />
              Includes stems
            </div>
          )}
        </div>
      </div>

      <BudgetNegotiationDialog
        budget={budget}
        open={isNegotiating}
        onOpenChange={setIsNegotiating}
        onSubmit={handleNegotiate}
      />
    </>
  );
}
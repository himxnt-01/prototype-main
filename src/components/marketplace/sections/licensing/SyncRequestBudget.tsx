import { DollarSign } from "lucide-react";

interface SyncRequestBudgetProps {
  budget: {
    amount: number;
    type: string;
    currency: string;
    negotiable: boolean;
    episodes?: number;
    includes_stems?: boolean;
    usage_includes?: string[];
  };
}

export function SyncRequestBudget({ budget }: SyncRequestBudgetProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <DollarSign className="h-4 w-4" />
        Budget
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-semibold">
          ${budget.amount.toLocaleString()}
        </div>
        
        <div className="text-sm text-muted-foreground space-y-1">
          <div className="capitalize">
            {budget.type.replace('_', ' ')}
            {budget.episodes && ` (${budget.episodes} episodes)`}
          </div>
          {budget.negotiable && <div>Negotiable</div>}
          {budget.includes_stems && <div>Includes Stems</div>}
          {budget.usage_includes && (
            <div>Includes: {budget.usage_includes.join(', ')}</div>
          )}
        </div>
      </div>
    </div>
  );
}
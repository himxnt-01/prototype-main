import { DollarSign, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Budget } from "../../types";

interface BudgetAmountProps {
  budget: Budget;
}

export function BudgetAmount({ budget }: BudgetAmountProps) {
  const totalValue = budget.episodes 
    ? budget.amount * budget.episodes
    : budget.amount;

  return (
    <div>
      <div className="text-2xl font-semibold">
        ${budget.amount.toLocaleString()}
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="capitalize">{budget.type.replace('_', ' ')}</span>
        {budget.episodes && (
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>
              Total value: ${totalValue.toLocaleString()}
              <br />
              {budget.episodes} episodes × ${budget.amount.toLocaleString()}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
import { SyncRequestBudget } from "./budget/SyncRequestBudget";
import { SyncRequestUsage } from "./usage/SyncRequestUsage";
import { SyncRequestDeadline } from "./deadline/SyncRequestDeadline";
import { Budget, Usage, Deadline } from "../types";
import { cn } from "@/lib/utils";

interface SyncRequestDetailsProps {
  budget: Budget;
  usage: Usage;
  deadline: Deadline;
}

export function SyncRequestDetails({ budget, usage, deadline }: SyncRequestDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Budget Card */}
      <div className={cn(
        "p-4 rounded-lg",
        "bg-card border border-border",
        "hover:bg-card/80 transition-colors duration-300",
        budget.amount >= 10000 && "ring-1 ring-primary/20"
      )}>
        <SyncRequestBudget budget={budget} />
      </div>

      {/* Usage Card */}
      <div className={cn(
        "p-4 rounded-lg",
        "bg-card border border-border",
        "hover:bg-card/80 transition-colors duration-300",
        usage.exclusivity === "Exclusive" && "ring-1 ring-primary/20"
      )}>
        <SyncRequestUsage usage={usage} />
      </div>

      {/* Deadline Card */}
      <div className={cn(
        "p-4 rounded-lg",
        "bg-card border border-border",
        "hover:bg-card/80 transition-colors duration-300",
        deadline.fast_tracked && "ring-1 ring-primary/20"
      )}>
        <SyncRequestDeadline deadline={deadline} />
      </div>
    </div>
  );
}
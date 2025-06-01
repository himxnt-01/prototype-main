import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BudgetHeaderProps {
  onNegotiate?: () => void;
  isNegotiable?: boolean;
}

export function BudgetHeader({ onNegotiate, isNegotiable }: BudgetHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-medium">
        <DollarSign className="h-4 w-4 text-primary" />
        Budget
      </div>
      {isNegotiable && onNegotiate && (
        <Button 
          variant="outline" 
          size="sm"
          className="h-7 text-xs"
          onClick={onNegotiate}
        >
          Negotiate Terms
        </Button>
      )}
    </div>
  );
}
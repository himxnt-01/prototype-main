import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BudgetIncludesProps {
  items: string[];
}

export function BudgetIncludes({ items }: BudgetIncludesProps) {
  if (!items?.length) return null;

  return (
    <div className="space-y-1.5">
      <div className="text-sm text-muted-foreground">Includes:</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge 
            key={item}
            variant="secondary" 
            className="bg-muted"
          >
            <Check className="h-3 w-3 mr-1" />
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
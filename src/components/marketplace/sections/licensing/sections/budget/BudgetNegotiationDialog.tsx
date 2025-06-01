import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Budget } from "../../types";
import { cn } from "@/lib/utils";

interface BudgetNegotiationDialogProps {
  budget: Budget;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (terms: NegotiationTerms) => void;
}

export interface NegotiationTerms {
  proposedAmount: number;
  includeStems: boolean;
  additionalUsage: string[];
  notes: string;
}

export function BudgetNegotiationDialog({ 
  budget, 
  open, 
  onOpenChange,
  onSubmit 
}: BudgetNegotiationDialogProps) {
  const [terms, setTerms] = useState<NegotiationTerms>({
    proposedAmount: budget.amount,
    includeStems: budget.includes_stems || false,
    additionalUsage: budget.usage_includes || [],
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(terms);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Negotiate Budget Terms</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Proposed Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={terms.proposedAmount}
                  onChange={(e) => setTerms({ ...terms, proposedAmount: Number(e.target.value) })}
                  className="pl-7"
                  min={0}
                />
              </div>
              {terms.proposedAmount < budget.amount && (
                <p className="text-sm text-amber-500">
                  This is {((budget.amount - terms.proposedAmount) / budget.amount * 100).toFixed(1)}% lower than the original amount
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="stems" className="cursor-pointer">Include Stems</Label>
              <Switch
                id="stems"
                checked={terms.includeStems}
                onCheckedChange={(checked) => setTerms({ ...terms, includeStems: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea
                value={terms.notes}
                onChange={(e) => setTerms({ ...terms, notes: e.target.value })}
                placeholder="Explain your proposed changes..."
                className="h-32"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit"
              className={cn(
                "bg-blue-600 hover:bg-blue-700",
                "text-white",
                "border-blue-700/50",
                "transition-all duration-300"
              )}
            >
              Submit Proposal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
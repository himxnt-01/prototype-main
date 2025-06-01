import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LicensePricingTierProps {
  tier: {
    name: string;
    usage: string[];
    price: number;
    term: string;
    territories: string[];
    minimumGuarantee?: number;
    rushFee?: number;
    customizationFee?: number;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export function LicensePricingTier({ tier, isSelected, onSelect }: LicensePricingTierProps) {
  return (
    <div 
      className={cn(
        "p-4 rounded-lg border transition-all duration-300",
        "hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
        isSelected && [
          "border-primary bg-primary/5",
          "ring-1 ring-primary/20"
        ]
      )}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="font-medium">{tier.name}</h4>
          <p className="text-sm text-muted-foreground">{tier.term}</p>
        </div>
        <div className="text-lg font-semibold">
          ${tier.price.toLocaleString()}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {tier.usage.map((use) => (
          <Badge 
            key={use}
            variant="secondary" 
            className="bg-muted"
          >
            {use}
          </Badge>
        ))}
      </div>

      {(tier.rushFee || tier.customizationFee) && (
        <div className="text-sm text-muted-foreground space-y-1">
          {tier.rushFee && (
            <div>Rush Fee Available: +${tier.rushFee.toLocaleString()}</div>
          )}
          {tier.customizationFee && (
            <div>Customization: +${tier.customizationFee.toLocaleString()}</div>
          )}
        </div>
      )}
    </div>
  );
}

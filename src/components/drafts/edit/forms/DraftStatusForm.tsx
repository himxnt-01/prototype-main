// src/components/drafts/edit/forms/DraftStatusForm.tsx
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Draft, LicenseTier } from "@/types/draft";
import { cn } from "@/lib/utils";
import { Check, Info } from "lucide-react";

interface DraftStatusFormProps {
  draft: Draft;
  onChange: (updates: Partial<Draft>) => void;
}

export function DraftStatusForm({ draft, onChange }: DraftStatusFormProps) {
  const [selectedTier, setSelectedTier] = useState<LicenseTier>(draft.licensing?.tier || 'standard');
  
  const licensing = draft.licensing || {
    tier: 'standard' as LicenseTier,
    isExclusive: false,
    territories: ['Worldwide'],
    usageTypes: [],
    restrictions: '',
    customPrice: null,
    requiresLicense: true
  };

  const handleTierChange = (tier: LicenseTier) => {
    setSelectedTier(tier);
    onChange({
      licensing: {
        ...licensing,
        tier
      }
    });
  };

  const handleLicensingChange = (updates: Partial<typeof licensing>) => {
    onChange({
      licensing: {
        ...licensing,
        ...updates
      }
    });
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-12rem)] overflow-hidden">
      <div className="space-y-1 px-6 pt-6">
        <h2 className="text-lg font-semibold">Licensing Configuration</h2>
        <p className="text-sm text-muted-foreground">
          Set up licensing terms and requirements for this track
        </p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-6 pb-6">
        <div className="flex items-center justify-between pt-4">
          <div className="space-y-0.5">
            <Label>Require Licensing</Label>
            <p className="text-sm text-muted-foreground">
              Toggle whether this track requires a license for use
            </p>
          </div>
          <Switch
            checked={licensing.requiresLicense}
            onCheckedChange={(requiresLicense) => 
              handleLicensingChange({ requiresLicense })
            }
          />
        </div>

        {licensing.requiresLicense && (
          <>
            <div className="space-y-3">
              <Label>Licensing Tier</Label>
              <RadioGroup
                value={selectedTier}
                onValueChange={handleTierChange}
                className="space-y-3"
              >
                <label
                  htmlFor="instant-tier"
                  className={cn(
                    "relative flex flex-col rounded-lg border-2 p-4 cursor-pointer transition-all",
                    "hover:border-emerald-500/50 hover:bg-emerald-500/5",
                    selectedTier === 'instant' 
                      ? "border-emerald-500 bg-emerald-500/10" 
                      : "border-border"
                  )}
                >
                  <RadioGroupItem id="instant-tier" value="instant" className="sr-only" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-emerald-400">Instant License</h3>
                      <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">$2,000 - $75,000</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Instant licensing for immediate use. License within minutes if you like the track.
                    </p>
                    <div className="flex items-center text-xs text-emerald-400">
                      <Info className="h-3 w-3 mr-1" />
                      <span>Fastest clearance option</span>
                    </div>
                  </div>
                  {selectedTier === 'instant' && (
                    <Check className="absolute top-4 right-4 h-4 w-4 text-emerald-500" />
                  )}
                </label>

                <label
                  htmlFor="standard-tier"
                  className={cn(
                    "relative flex flex-col rounded-lg border-2 p-4 cursor-pointer transition-all",
                    "hover:border-blue-500/50 hover:bg-blue-500/5",
                    selectedTier === 'standard' 
                      ? "border-blue-500 bg-blue-500/10" 
                      : "border-border"
                  )}
                >
                  <RadioGroupItem id="standard-tier" value="standard" className="sr-only" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-blue-400">Standard License</h3>
                      <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">$3,000 - $50,000</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Our benchmark licensing tier. Guaranteed review and approval within 3-5 business days.
                    </p>
                    <div className="flex items-center text-xs text-blue-400">
                      <Info className="h-3 w-3 mr-1" />
                      <span>Standard clearance process</span>
                    </div>
                  </div>
                  {selectedTier === 'standard' && (
                    <Check className="absolute top-4 right-4 h-4 w-4 text-blue-500" />
                  )}
                </label>

                <label
                  htmlFor="bespoke-tier"
                  className={cn(
                    "relative flex flex-col rounded-lg border-2 p-4 cursor-pointer transition-all",
                    "hover:border-amber-500/50 hover:bg-amber-500/5",
                    selectedTier === 'bespoke' 
                      ? "border-amber-500 bg-amber-500/10" 
                      : "border-border"
                  )}
                >
                  <RadioGroupItem id="bespoke-tier" value="bespoke" className="sr-only" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-amber-400">Bespoke Request</h3>
                      <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">Custom Pricing</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      For complex clearances involving multiple publishers or unavailable artists. Extended timeline for big catalog songs.
                    </p>
                    <div className="flex items-center text-xs text-amber-400">
                      <Info className="h-3 w-3 mr-1" />
                      <span>Complex clearance process</span>
                    </div>
                  </div>
                  {selectedTier === 'bespoke' && (
                    <Check className="absolute top-4 right-4 h-4 w-4 text-amber-500" />
                  )}
                </label>
              </RadioGroup>
            </div>

            {selectedTier === 'bespoke' && (
              <div className="space-y-2">
                <Label>Custom Price</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Enter custom price"
                    value={licensing.customPrice || ''}
                    onChange={(e) => 
                      handleLicensingChange({ 
                        customPrice: parseFloat(e.target.value) 
                      })
                    }
                    className="w-40"
                  />
                  <Badge variant="outline">USD</Badge>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Exclusive Rights</Label>
                <p className="text-sm text-muted-foreground">
                  Grant exclusive rights to the licensee
                </p>
              </div>
              <Switch
                checked={licensing.isExclusive}
                onCheckedChange={(isExclusive) => 
                  handleLicensingChange({ isExclusive })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Allowed Usage Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Commercial',
                  'Broadcast',
                  'Streaming',
                  'Social Media',
                  'Film/TV',
                  'Games'
                ].map((type) => (
                  <div
                    key={type}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-all",
                      licensing.usageTypes?.includes(type) 
                        ? "border-primary bg-primary/5" 
                        : "border-border"
                    )}
                    onClick={() => {
                      const usageTypes = licensing.usageTypes || [];
                      const updated = usageTypes.includes(type)
                        ? usageTypes.filter(t => t !== type)
                        : [...usageTypes, type];
                      handleLicensingChange({ usageTypes: updated });
                    }}
                  >
                    <Switch
                      checked={licensing.usageTypes?.includes(type)}
                      className="pointer-events-none"
                    />
                    <span className="text-sm font-medium">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Restrictions</Label>
              <Textarea
                placeholder="Specify any restrictions or limitations for the use of this track..."
                value={licensing.restrictions}
                onChange={(e) => handleLicensingChange({ restrictions: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Button className="w-full" onClick={() => console.log('Save licensing config')}>
                Save Configuration
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
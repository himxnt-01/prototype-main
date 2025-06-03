import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Draft } from "@/types/draft";
import { cn } from "@/lib/utils";
import { DollarSign, Film, Tv, Gamepad2, Radio, ShoppingBag, Check, X, Clock, Globe, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DraftStatusFormProps {
  draft?: Draft;
  onChange: (changes: Partial<Draft>) => void;
  isLoading?: boolean;
}

// Industry options for clearance
const INDUSTRIES = [
  { id: "movies", label: "Movies/Shows", icon: Film },
  { id: "commercials", label: "Commercials", icon: ShoppingBag },
  { id: "tv", label: "TV", icon: Tv },
  { id: "games", label: "Video Games", icon: Gamepad2 },
  { id: "radio", label: "Radio", icon: Radio },
  { id: "all", label: "All of the above", icon: Check },
];

type RightsHolderStatus = 'pending' | 'approved' | 'rejected';

export function DraftStatusForm({ draft, onChange, isLoading = false }: DraftStatusFormProps) {
  // Initialize state with empty values if draft is undefined
  const [customPrice, setCustomPrice] = useState(
    draft?.licensing?.customPrice?.toString() || ""
  );
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    draft?.licensing?.usageTypes || []
  );
  const [restrictedTerritories, setRestrictedTerritories] = useState<string[]>(
    draft?.licensing?.territories || []
  );

  // Get rights holders from the draft
  const rightsHolders = draft ? [
    ...(draft.rights?.writers || []).map(writer => ({ 
      id: writer.name, 
      name: writer.name, 
      role: writer.role || "Writer",
      type: "Writer",
      status: 'pending' as RightsHolderStatus
    })),
    ...(draft.rights?.publishers || []).map(publisher => ({ 
      id: publisher.name, 
      name: publisher.name, 
      role: "Publisher",
      type: "Publisher",
      status: 'pending' as RightsHolderStatus
    })),
    ...(draft.rights?.masterOwners || []).map(owner => ({ 
      id: owner.name, 
      name: owner.name, 
      role: "Master Rights Owner",
      type: "Master Owner",
      status: 'pending' as RightsHolderStatus
    }))
  ] : [];

  // Update draft status when form values change
  useEffect(() => {
    if (!draft) return;

    const numPrice = customPrice ? parseInt(customPrice) : null;
    
    onChange({
      licensing: {
        ...draft.licensing,
        customPrice: numPrice,
        usageTypes: selectedIndustries,
        territories: restrictedTerritories,
        tier: 'custom',
        isExclusive: false,
        requiresLicense: true,
        restrictions: ''
      }
    });
  }, [customPrice, selectedIndustries, restrictedTerritories, onChange, draft]);

  const handleIndustryToggle = (industryId: string) => {
    if (industryId === "all") {
      // If "All of the above" is selected, clear other selections
      setSelectedIndustries(["all"]);
    } else {
      // If any specific industry is selected, remove "All of the above"
      const newSelection = selectedIndustries.includes(industryId)
        ? selectedIndustries.filter(id => id !== industryId)
        : [...selectedIndustries.filter(id => id !== "all"), industryId];
      
      setSelectedIndustries(newSelection);
    }
  };

  const handleTerritoryChange = (value: string) => {
    if (!restrictedTerritories.includes(value)) {
      setRestrictedTerritories([...restrictedTerritories, value]);
    }
  };

  const handleRemoveTerritory = (territory: string) => {
    setRestrictedTerritories(restrictedTerritories.filter(t => t !== territory));
  };

  if (isLoading) {
    return (
      <div className="space-y-8 p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="text-muted-foreground space-y-2">
          <X className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-medium">No Draft Selected</h3>
          <p className="text-sm">Please select a draft to view and edit its status.</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-10 p-6">
        {/* Pricing Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium">Pricing</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Set your licensing price. Typical price ranges between $2,000 to $200,000 depending on usage rights.
          </p>
          
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="number"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              placeholder="Enter price"
              className="pl-8"
              min="0"
            />
          </div>
        </div>

        {/* Usage Types Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">Usage Types</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Select which industries you want your music to be used in
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {INDUSTRIES.map((industry) => {
              const Icon = industry.icon;
              const isSelected = selectedIndustries.includes(industry.id);
              
              return (
                <div 
                  key={industry.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                    isSelected 
                      ? "bg-primary/10 border-primary/30" 
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => handleIndustryToggle(industry.id)}
                >
                  <Checkbox 
                    checked={isSelected}
                    onCheckedChange={() => handleIndustryToggle(industry.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <div className="flex items-center gap-2">
                    <Icon className={cn(
                      "h-4 w-4",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={isSelected ? "font-medium" : ""}>{industry.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Territory Restrictions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-medium">Territory Restrictions</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Select territories where you don't want your music to be licensed
          </p>
          
          <div className="space-y-4">
            <Select onValueChange={handleTerritoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select territories to restrict" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {restrictedTerritories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {restrictedTerritories.map(territory => (
                  <Badge 
                    key={territory} 
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive/10"
                    onClick={() => handleRemoveTerritory(territory)}
                  >
                    {territory}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rights Holders Approval Status */}
        {rightsHolders.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-medium">Rights Holder Approvals</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Track the approval status of all rights holders
            </p>
            
            <div className="space-y-3">
              {rightsHolders.map((holder) => (
                <div 
                  key={holder.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <div className="font-medium">{holder.name}</div>
                    <div className="text-sm text-muted-foreground">{holder.role}</div>
                  </div>
                  <Badge variant={holder.status === 'pending' ? 'outline' : 'secondary'}>
                    {holder.status === 'approved' && <Check className="h-3 w-3 mr-1" />}
                    {holder.status === 'rejected' && <X className="h-3 w-3 mr-1" />}
                    {holder.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {holder.status.charAt(0).toUpperCase() + holder.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

// List of countries for the dropdown
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", 
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", 
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", 
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", 
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", 
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", 
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];
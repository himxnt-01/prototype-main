import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Draft } from "@/types/draft";
import { cn } from "@/lib/utils";
import { DollarSign, Film, Tv, Gamepad2, Radio, ShoppingBag, Check, X, Clock, Globe } from "lucide-react";

interface DraftStatusFormProps {
  draft: Draft;
  onChange: (changes: Partial<Draft>) => void;
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

export function DraftStatusForm({ draft, onChange }: DraftStatusFormProps) {
  const [price, setPrice] = useState(draft.status?.price?.toString() || "");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    draft.status?.clearance?.industries || []
  );
  const [restrictedCountries, setRestrictedCountries] = useState<string[]>(
    draft.status?.clearance?.restrictedCountries || []
  );

  // Get rights holders from the draft
  const rightsHolders = [
    ...(draft.rights?.writers || []).map(writer => ({ 
      id: writer.name, 
      name: writer.name, 
      role: writer.role,
      type: "Writer",
      status: "pending" as "approved" | "rejected" | "pending"
    })),
    ...(draft.rights?.publishers || []).map(publisher => ({ 
      id: publisher.name, 
      name: publisher.name, 
      role: "Publisher",
      type: "Publisher",
      status: "pending" as "approved" | "rejected" | "pending"
    })),
    ...(draft.rights?.masterOwners || []).map(owner => ({ 
      id: owner.name, 
      name: owner.name, 
      role: "Master Rights Owner",
      type: "Master Owner",
      status: "pending" as "approved" | "rejected" | "pending"
    }))
  ];

  // Update draft status when form values change
  useEffect(() => {
    const numPrice = price ? parseInt(price) : undefined;
    
    onChange({
      status: {
        ...draft.status,
        price: numPrice,
        clearance: {
          industries: selectedIndustries,
          restrictedCountries: restrictedCountries
        },
        approvals: rightsHolders.map(holder => ({
          id: holder.id,
          name: holder.name,
          role: holder.role,
          type: holder.type,
          status: holder.status
        }))
      }
    });
  }, [price, selectedIndustries, restrictedCountries, onChange]);

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

  const handleCountryChange = (value: string) => {
    if (!restrictedCountries.includes(value)) {
      setRestrictedCountries([...restrictedCountries, value]);
    }
  };

  const handleRemoveCountry = (country: string) => {
    setRestrictedCountries(restrictedCountries.filter(c => c !== country));
  };

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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="pl-8"
              min="0"
            />
          </div>
        </div>

        {/* Clearance Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium">Clearance</h3>
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

        {/* Country Restrictions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-medium">Country Restrictions</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Select countries where you don't want your music to be licensed
          </p>
          
          <div className="space-y-4">
            <Select onValueChange={handleCountryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select countries to restrict" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {restrictedCountries.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {restrictedCountries.map(country => (
                  <Badge 
                    key={country} 
                    variant="secondary"
                    className="bg-purple-500/10 text-purple-500 pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    {country}
                    <button 
                      className="ml-1 rounded-full hover:bg-purple-500/20 p-0.5"
                      onClick={() => handleRemoveCountry(country)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Approval Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium">Approval</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Requires approval of all rights holders to list on our Platform
          </p>
          
          <div className="space-y-3 rounded-lg border p-4">
            {rightsHolders.length > 0 ? (
              rightsHolders.map((holder) => (
                <div key={holder.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-normal">
                      {holder.type}
                    </Badge>
                    <span>{holder.name}</span>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={cn(
                      holder.status === "approved" && "bg-green-500/10 text-green-500",
                      holder.status === "rejected" && "bg-red-500/10 text-red-500",
                      holder.status === "pending" && "bg-yellow-500/10 text-yellow-500"
                    )}
                  >
                    {holder.status === "approved" && (
                      <Check className="h-3 w-3 mr-1" />
                    )}
                    {holder.status === "rejected" && (
                      <X className="h-3 w-3 mr-1" />
                    )}
                    {holder.status === "pending" && (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {holder.status === "approved" ? "Approved" : 
                     holder.status === "rejected" ? "Rejected" : "Pending"}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-2">
                No rights holders defined. Please add them in the Rights section.
              </div>
            )}
          </div>
        </div>
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
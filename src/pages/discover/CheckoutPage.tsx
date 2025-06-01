import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  CreditCard, 
  ShoppingCart, 
  FileText, 
  Building, 
  Globe, 
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { discoverTracks } from "@/data/discoverTracks";
import { useLocation } from "@/hooks/useLocation";

// Define usage types
const USAGE_TYPES = [
  { id: "video_game", label: "Video Game", description: "For use in video games, mobile games, or interactive media" },
  { id: "movie_tv", label: "Movie/TV Series", description: "For use in films, TV shows, or streaming series" },
  { id: "commercial", label: "Commercial/Advertisement", description: "For use in commercials, advertisements, or promotional content" },
  { id: "other", label: "Other", description: "For other usage types (please specify)" }
];

// Define budget ranges
const BUDGET_RANGES = [
  { id: "under10k", label: "Under $10,000", value: "under10k" },
  { id: "10k-50k", label: "$10,000 - $50,000", value: "10k-50k" },
  { id: "50k-100k", label: "$50,000 - $100,000", value: "50k-100k" },
  { id: "100k-500k", label: "$100,000 - $500,000", value: "100k-500k" },
  { id: "over500k", label: "Over $500,000", value: "over500k" }
];

// Define countries
const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", 
  "France", "Japan", "China", "Brazil", "India", "Mexico", "Spain", 
  "Italy", "Netherlands", "Sweden", "South Korea", "Worldwide"
];

interface CheckoutPageProps {
  cartItems: number[];
}

export function CheckoutPage({ cartItems }: CheckoutPageProps) {
  const { navigate } = useLocation();
  const [currentStep, setCurrentStep] = useState<'usage' | 'details' | 'payment' | 'confirmation'>('usage');
  const [usageType, setUsageType] = useState<string>("");
  const [otherUsageType, setOtherUsageType] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [countries, setCountries] = useState<string[]>(["Worldwide"]);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Get cart items from the tracks data
  const cartTracks = discoverTracks.filter(track => cartItems.includes(track.id)).map(track => {
    // Generate a deterministic but varied price based on track id
    const basePrice = 2000 + (track.id * 1337) % 198000;
    // Round to nearest thousand
    const roundedPrice = Math.round(basePrice / 1000) * 1000;
    return {
      ...track,
      price: roundedPrice
    };
  });

  // Calculate total
  const subtotal = cartTracks.reduce((sum, track) => sum + track.price, 0);
  const tax = Math.round(subtotal * 0.08); // 8% tax
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    if (value === "Worldwide") {
      setCountries(["Worldwide"]);
    } else {
      const newCountries = countries.filter(c => c !== "Worldwide");
      if (!newCountries.includes(value)) {
        setCountries([...newCountries, value]);
      }
    }
  };

  const removeCountry = (country: string) => {
    setCountries(countries.filter(c => c !== country));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      setCurrentStep('confirmation');
    }, 2000);
  };

  const isUsageStepValid = usageType && (usageType !== "other" || otherUsageType) && budget && companyName && countries.length > 0 && agreeTerms;
  
  const isDetailsStepValid = 
    formData.firstName && 
    formData.lastName && 
    formData.email && 
    formData.phone && 
    formData.address && 
    formData.city && 
    formData.state && 
    formData.zip && 
    formData.country;

  const isPaymentStepValid = 
    formData.cardNumber && 
    formData.cardName && 
    formData.expiry && 
    formData.cvc;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/discover")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <img src="/zen-logo.png" alt="Zen Sync" className="h-8" />
              <span className="font-semibold text-lg">Zen Sync</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">{cartItems.length} items</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">Checkout</h1>
            <div className="flex items-center">
              <div className={cn(
                "flex items-center",
                currentStep !== 'usage' && "text-muted-foreground"
              )}>
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center mr-2",
                  currentStep === 'usage' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  1
                </div>
                <span className="mr-4">Usage Information</span>
              </div>
              <div className={cn(
                "h-px w-8 bg-border",
                currentStep === 'usage' && "bg-muted"
              )} />
              <div className={cn(
                "flex items-center",
                (currentStep !== 'details' && currentStep !== 'payment' && currentStep !== 'confirmation') && "text-muted-foreground"
              )}>
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center mx-2",
                  (currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation') 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  2
                </div>
                <span className="mr-4">Contact Details</span>
              </div>
              <div className={cn(
                "h-px w-8 bg-border",
                (currentStep === 'usage' || currentStep === 'details') && "bg-muted"
              )} />
              <div className={cn(
                "flex items-center",
                (currentStep !== 'payment' && currentStep !== 'confirmation') && "text-muted-foreground"
              )}>
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center mx-2",
                  (currentStep === 'payment' || currentStep === 'confirmation') 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  3
                </div>
                <span>Payment</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentStep === 'usage' && (
                <div className="space-y-8">
                  <div className="rounded-lg border bg-card-gradient p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Usage Information</h2>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>What is this music being used for?</Label>
                        <RadioGroup value={usageType} onValueChange={setUsageType}>
                          {USAGE_TYPES.map(type => (
                            <div key={type.id} className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted/50">
                              <RadioGroupItem value={type.id} id={type.id} />
                              <div className="grid gap-1.5">
                                <Label htmlFor={type.id} className="font-medium">{type.label}</Label>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      {usageType === "other" && (
                        <div className="space-y-2">
                          <Label htmlFor="otherUsageType">Please specify usage type</Label>
                          <Input 
                            id="otherUsageType" 
                            value={otherUsageType}
                            onChange={(e) => setOtherUsageType(e.target.value)}
                            placeholder="e.g., Podcast, Mobile App, etc."
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="budget">What is the budget of your program?</Label>
                        <Select value={budget} onValueChange={setBudget}>
                          <SelectTrigger id="budget">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            {BUDGET_RANGES.map(range => (
                              <SelectItem key={range.id} value={range.value}>
                                {range.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyName">What is the name of your company?</Label>
                        <Input 
                          id="companyName" 
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Enter company name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>What countries is this song going to be used for this license?</Label>
                        <Select onValueChange={handleCountryChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select countries" />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRIES.map(country => (
                              <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {countries.map(country => (
                            <Badge 
                              key={country} 
                              variant="secondary"
                              className="pl-2 pr-1 py-1 flex items-center gap-1"
                            >
                              {country}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-4 w-4 p-0 hover:bg-muted"
                                onClick={() => removeCountry(country)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="terms" 
                            checked={agreeTerms}
                            onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="terms" className="text-sm font-medium leading-none">
                              I agree to the terms and conditions
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              I confirm that this music will not be used for pornographic content, war propaganda, political campaigns, or any content that could harm the artist, label, or platform. I understand that I am liable for any misuse of the licensed content.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={() => setCurrentStep('details')}
                      disabled={!isUsageStepValid}
                    >
                      Continue to Contact Details
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 'details' && (
                <div className="space-y-8">
                  <div className="rounded-lg border bg-card-gradient p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Contact Details</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter last name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter street address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input 
                          id="state" 
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Enter state or province"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">Zip/Postal Code</Label>
                        <Input 
                          id="zip" 
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          placeholder="Enter zip or postal code"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select 
                          value={formData.country} 
                          onValueChange={(value) => setFormData({...formData, country: value})}
                        >
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRIES.filter(c => c !== "Worldwide").map(country => (
                              <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentStep('usage')}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep('payment')}
                      disabled={!isDetailsStepValid}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 'payment' && (
                <div className="space-y-8">
                  <div className="rounded-lg border bg-card-gradient p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Payment Information</h2>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            id="cardNumber" 
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input 
                          id="cardName" 
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="Enter name as it appears on card"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input 
                            id="cvc" 
                            name="cvc"
                            value={formData.cvc}
                            onChange={handleInputChange}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentStep('details')}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={!isPaymentStepValid || isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Complete Purchase"}
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 'confirmation' && (
                <div className="space-y-8">
                  <div className="rounded-lg border bg-card-gradient p-6 space-y-6 text-center">
                    <div className="flex justify-center">
                      <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold">Thank You for Your Purchase!</h2>
                    <p className="text-muted-foreground">
                      Your order has been successfully processed. You will receive a confirmation email shortly with your license details and download links.
                    </p>
                    <div className="pt-4 border-t">
                      <div className="text-sm text-muted-foreground">Order Reference</div>
                      <div className="font-medium">ZEN-{Math.floor(Math.random() * 1000000)}</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button 
                      onClick={() => navigate("/discover")}
                    >
                      Return to Discover
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="rounded-lg border bg-card-gradient p-6 space-y-6 sticky top-6">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                
                <ScrollArea className="h-[300px] -mx-2 px-2">
                  <div className="space-y-4">
                    {cartTracks.map(track => (
                      <div key={track.id} className="flex gap-3">
                        <img 
                          src={`https://picsum.photos/seed/${track.id}/48/48`} 
                          alt={track.title}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{track.title}</div>
                          <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="bg-pink-600/10 text-pink-600">
                              {track.genre}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${track.price.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <div className="flex items-start gap-2 text-sm">
                    <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">License Type:</span> Commercial Use
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Building className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Company:</span> {companyName || "Not specified"}
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Globe className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Territories:</span> {countries.join(", ")}
                    </div>
                  </div>
                </div>

                {currentStep === 'usage' && (
                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-500" />
                      <div className="text-muted-foreground">
                        Please complete the usage information to proceed with your purchase.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
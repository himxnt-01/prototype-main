'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, X, AlertCircle, CheckCircle, Loader2, Check, ChevronsUpDown, Plus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Comprehensive list of countries
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Bulgaria",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Croatia",
  "Czech Republic",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Kazakhstan",
  "Kenya",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Serbia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Venezuela",
  "Vietnam"
];

// List of instruments
const instruments = [
  "Acoustic Guitar",
  "Electric Guitar",
  "Bass Guitar",
  "Piano",
  "Keyboard",
  "Drums",
  "Violin",
  "Viola",
  "Cello",
  "Double Bass",
  "Flute",
  "Clarinet",
  "Saxophone",
  "Trumpet",
  "Trombone",
  "French Horn",
  "Tuba",
  "Accordion",
  "Harmonica",
  "Banjo",
  "Mandolin",
  "Ukulele",
  "Harp",
  "Synthesizer",
  "Vocals"
];

// List of software
const softwareOptions = [
  "FL Studio",
  "Ableton Live",
  "Logic Pro",
  "Pro Tools",
  "Bitwig",
  "Reason",
  "Studio One",
  "Cubase",
  "Reaper",
  "GarageBand"
];

export function BulletproofProfile() {
  interface ProfileData {
    name: string;
    bio: string;
    city: string;
    country: string;
    instrument: string; // Keep for backward compatibility
    selectedInstruments: string[];
    selectedSoftware: string[];
  }

  const [profile, setProfile] = useState<ProfileData>(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('userProfile');
      const defaultProfile = {
        name: '',
        bio: '',
        city: '',
        country: 'Italy',
        instrument: '',
        selectedInstruments: [],
        selectedSoftware: []
      };
      
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        // Migrate old profile data to new format
        return {
          ...defaultProfile,
          ...parsed,
          selectedInstruments: parsed.selectedInstruments || [],
          selectedSoftware: parsed.selectedSoftware || []
        };
      }
      
      return defaultProfile;
    }
    return {
      name: '',
      bio: '',
      city: '',
      country: 'Italy',
      instrument: '',
      selectedInstruments: [],
      selectedSoftware: []
    };
  });
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // Profile picture states
  const [avatarPreview, setAvatarPreview] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userAvatar');
    }
    return null;
  });

  // Header banner states
  const [bannerPreview, setBannerPreview] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('profile_header');
    }
    return null;
  });

  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Country select state
  const [countryOpen, setCountryOpen] = useState(false);

  // Instruments dropdown state
  const [instrumentsOpen, setInstrumentsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev: ProfileData) => {
      const newProfile = { ...prev, [name]: value };
      localStorage.setItem('userProfile', JSON.stringify(newProfile));
      return newProfile;
    });
  };

  const handleImageUpload = (file: File, type: 'avatar' | 'banner') => {
    setUploadError(null);

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Only JPG, PNG and WebP images are allowed');
      return;
    }

    // Create preview and save to localStorage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      try {
        if (type === 'avatar') {
          setAvatarPreview(base64Image);
          localStorage.setItem('userAvatar', base64Image);
        } else {
          setBannerPreview(base64Image);
          localStorage.setItem('profile_header', base64Image);
        }
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
        setUploadError('Failed to save image (storage full)');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleImageUpload(file, 'avatar');
  };

  const handleBannerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleImageUpload(file, 'banner');
  };

  const clearAvatar = () => {
    setAvatarPreview(null);
    localStorage.removeItem('userAvatar');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearBanner = () => {
    setBannerPreview(null);
    localStorage.removeItem('profile_header');
    if (bannerInputRef.current) {
      bannerInputRef.current.value = '';
    }
  };

  const handleCountrySelect = (country: string) => {
    setProfile(prev => {
      const newProfile = { ...prev, country };
      localStorage.setItem('userProfile', JSON.stringify(newProfile));
      return newProfile;
    });
    setCountryOpen(false);
  };

  const addInstrument = (instrument: string) => {
    if (!profile.selectedInstruments.includes(instrument)) {
      setProfile(prev => {
        const newProfile = {
          ...prev,
          selectedInstruments: [...prev.selectedInstruments, instrument]
        };
        localStorage.setItem('userProfile', JSON.stringify(newProfile));
        return newProfile;
      });
    }
    setInstrumentsOpen(false);
  };

  const removeInstrument = (instrument: string) => {
    setProfile(prev => {
      const newProfile = {
        ...prev,
        selectedInstruments: prev.selectedInstruments.filter(i => i !== instrument)
      };
      localStorage.setItem('userProfile', JSON.stringify(newProfile));
      return newProfile;
    });
  };

  const toggleSoftware = (software: string) => {
    setProfile(prev => {
      const newProfile = {
        ...prev,
        selectedSoftware: prev.selectedSoftware.includes(software)
          ? prev.selectedSoftware.filter(s => s !== software)
          : [...prev.selectedSoftware, software]
      };
      localStorage.setItem('userProfile', JSON.stringify(newProfile));
      return newProfile;
    });
  };

  const saveProfile = () => {
    setSaving(true);
    setMessage('');

    try {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setMessage('✅ Profile saved successfully!');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner Section */}
      <div className="relative w-full h-[200px] group">
        {/* Banner Image or Gradient */}
        <div 
          className={cn(
            "w-full h-full rounded-lg overflow-hidden cursor-pointer",
            "transition-all duration-200",
            !bannerPreview && "bg-gradient-to-r from-blue-600 to-purple-600"
          )}
          onClick={() => bannerInputRef.current?.click()}
        >
          {bannerPreview && (
            <img 
              src={bannerPreview} 
              alt="Profile banner"
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Hover Overlay */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-black/50 opacity-0 group-hover:opacity-100",
            "transition-opacity duration-200"
          )}>
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-white" />
              <span className="text-white text-sm font-medium">
                {bannerPreview ? 'Change banner' : 'Add banner'}
              </span>
            </div>
          </div>

          {/* Clear Banner Button */}
          {bannerPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearBanner();
              }}
              className={cn(
                "absolute top-4 right-4 p-2 rounded-full",
                "bg-black/50 text-white",
                "opacity-0 group-hover:opacity-100",
                "transition-opacity duration-200",
                "hover:bg-black/70"
              )}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Hidden Banner Input */}
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleBannerSelect}
          className="hidden"
        />

        {/* Profile Picture Overlapping Banner */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative w-[132px] h-[132px] group">
            <div className="absolute inset-1.5 rounded-full bg-background" /> {/* Border effect */}
            <Avatar className="w-[132px] h-[132px] border-4 border-background relative z-10">
              <AvatarImage
                src={avatarPreview || undefined}
                alt="Profile picture"
                className="object-cover"
              />
              <AvatarFallback className="bg-muted text-4xl">
                {profile.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            {/* Upload button with hover effect */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center gap-2 z-20",
                "bg-black/50 rounded-full opacity-0 group-hover:opacity-100",
                "transition-opacity duration-200"
              )}
            >
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
              {avatarPreview && (
                <button
                  onClick={clearAvatar}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarSelect}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Profile Content (shifted down to account for overlapping avatar) */}
      <div className="pt-20 px-6 space-y-6">
        {/* Error message */}
        {uploadError && (
          <p className="text-sm text-destructive text-center">{uploadError}</p>
        )}

        {/* Name field */}
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={profile.city}
            onChange={handleInputChange}
            placeholder="Your city"
          />
        </div>
        
        <div>
          <Label htmlFor="country">Country</Label>
          <Popover open={countryOpen} onOpenChange={setCountryOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={countryOpen}
                className="w-full justify-between"
              >
                {profile.country || "Select country..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-auto">
                  {countries.map((country) => (
                    <CommandItem
                      key={country}
                      value={country}
                      onSelect={() => handleCountrySelect(country)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          profile.country === country ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {country}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="instruments">Instruments</Label>
          <div className="space-y-4">
            <Popover open={instrumentsOpen} onOpenChange={setInstrumentsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={instrumentsOpen}
                  className="w-full justify-between"
                >
                  Select instruments...
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search instruments..." />
                  <CommandEmpty>No instrument found.</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-auto">
                    {instruments.map((instrument) => (
                      <CommandItem
                        key={instrument}
                        value={instrument}
                        onSelect={() => addInstrument(instrument)}
                      >
                        <div className="flex items-center justify-between w-full">
                          {instrument}
                          <Plus className="h-4 w-4 shrink-0 opacity-50" />
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {profile.selectedInstruments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.selectedInstruments.map((instrument) => (
                  <Badge
                    key={instrument}
                    variant="secondary"
                    className="pl-3 pr-2 py-1 flex items-center gap-1"
                  >
                    {instrument}
                    <button
                      onClick={() => removeInstrument(instrument)}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="software">Software</Label>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {softwareOptions.map((software) => (
                <button
                  key={software}
                  onClick={() => toggleSoftware(software)}
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "hover:bg-accent hover:text-accent-foreground",
                    "h-9 px-4",
                    profile.selectedSoftware.includes(software)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {software}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button 
          onClick={saveProfile} 
          disabled={saving || !profile.name.trim()}
          className="w-full"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <CheckCircle className="h-4 w-4 mr-2" />
          )}
          {saving ? 'Saving...' : 'Save Profile'}
        </Button>

        {message && (
          <Alert className={message.includes('✅') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
} 
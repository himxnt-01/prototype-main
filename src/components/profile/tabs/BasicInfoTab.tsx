import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileData } from "@/types/profiles";

interface BasicInfoTabProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  validationErrors: Record<string, string>;
}

export function BasicInfoTab({ 
  profileData, 
  setProfileData, 
  validationErrors 
}: BasicInfoTabProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayItemAdd = (field: keyof ProfileData, value: string) => {
    if (!value.trim()) return;
    
    setProfileData(prev => {
      const currentArray = prev[field] as string[];
      if (!currentArray.includes(value)) {
        return {
          ...prev,
          [field]: [...currentArray, value]
        };
      }
      return prev;
    });
  };

  const handleArrayItemRemove = (field: keyof ProfileData, index: number) => {
    setProfileData(prev => {
      const currentArray = prev[field] as string[];
      return {
        ...prev,
        [field]: currentArray.filter((_, i) => i !== index)
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="instrument">Instrument/Role</Label>
        <Input
          id="instrument"
          name="instrument"
          value={profileData.instrument}
          onChange={handleInputChange}
          placeholder="e.g., Guitarist, Producer, Composer"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={profileData.bio}
          onChange={handleInputChange}
          placeholder="Tell us about yourself"
          className={cn("min-h-[120px]", validationErrors.bio ? "border-destructive" : "")}
        />
        {validationErrors.bio && (
          <p className="text-sm text-destructive">{validationErrors.bio}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={profileData.city}
            onChange={handleInputChange}
            placeholder="Your city"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={profileData.country}
            onChange={handleInputChange}
            placeholder="Your country"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Genres</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {profileData.genres.map((genre, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="pl-2 pr-1 py-1 flex items-center gap-1"
            >
              {genre}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 hover:bg-muted"
                onClick={() => handleArrayItemRemove('genres', index)}
              >
                <ChevronLeft className="h-3 w-3 rotate-45" />
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            id="genre-input"
            placeholder="Add a genre"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const input = e.currentTarget;
                handleArrayItemAdd('genres', input.value);
                input.value = '';
              }
            }}
          />
          <Button 
            variant="outline"
            onClick={() => {
              const input = document.getElementById('genre-input') as HTMLInputElement;
              handleArrayItemAdd('genres', input.value);
              input.value = '';
            }}
          >
            Add
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Influences</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {profileData.influences.map((influence, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="pl-2 pr-1 py-1 flex items-center gap-1"
            >
              {influence}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 hover:bg-muted"
                onClick={() => handleArrayItemRemove('influences', index)}
              >
                <ChevronLeft className="h-3 w-3 rotate-45" />
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            id="influence-input"
            placeholder="Add an influence"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const input = e.currentTarget;
                handleArrayItemAdd('influences', input.value);
                input.value = '';
              }
            }}
          />
          <Button 
            variant="outline"
            onClick={() => {
              const input = document.getElementById('influence-input') as HTMLInputElement;
              handleArrayItemAdd('influences', input.value);
              input.value = '';
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
} 
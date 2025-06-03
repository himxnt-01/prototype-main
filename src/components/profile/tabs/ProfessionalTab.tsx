import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileData } from "@/types/profiles";

interface ProfessionalTabProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  validationErrors: Record<string, string>;
}

export function ProfessionalTab({ 
  profileData, 
  setProfileData, 
  validationErrors 
}: ProfessionalTabProps) {
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
        <Label htmlFor="education">Education</Label>
        <Input
          id="education"
          name="education"
          value={profileData.education}
          onChange={handleInputChange}
          placeholder="Your education background"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="experience">Experience</Label>
        <Textarea
          id="experience"
          name="experience"
          value={profileData.experience}
          onChange={handleInputChange}
          placeholder="Your professional experience"
          className="min-h-[100px]"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label htmlFor="hasPublishingDeal">Publishing Deal</Label>
          <Switch
            id="hasPublishingDeal"
            checked={profileData.hasPublishingDeal}
            onCheckedChange={(checked) => 
              setProfileData(prev => ({ ...prev, hasPublishingDeal: checked }))
            }
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {profileData.hasPublishingDeal ? "Yes" : "No"}
        </span>
      </div>
      
      {profileData.hasPublishingDeal && (
        <div className="space-y-2">
          <Label htmlFor="publishingCompany">Publishing Company</Label>
          <Input
            id="publishingCompany"
            name="publishingCompany"
            value={profileData.publishingCompany}
            onChange={handleInputChange}
            placeholder="Name of publishing company"
            className={validationErrors.publishingCompany ? "border-destructive" : ""}
          />
          {validationErrors.publishingCompany && (
            <p className="text-sm text-destructive">{validationErrors.publishingCompany}</p>
          )}
        </div>
      )}
      
      <div className="space-y-2">
        <Label>Equipment</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {profileData.equipment.map((item, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="pl-2 pr-1 py-1 flex items-center gap-1"
            >
              {item}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 hover:bg-muted"
                onClick={() => handleArrayItemRemove('equipment', index)}
              >
                <ChevronLeft className="h-3 w-3 rotate-45" />
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            id="equipment-input"
            placeholder="Add equipment"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const input = e.currentTarget;
                handleArrayItemAdd('equipment', input.value);
                input.value = '';
              }
            }}
          />
          <Button 
            variant="outline"
            onClick={() => {
              const input = document.getElementById('equipment-input') as HTMLInputElement;
              handleArrayItemAdd('equipment', input.value);
              input.value = '';
            }}
          >
            Add
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Software</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {profileData.software.map((item, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="pl-2 pr-1 py-1 flex items-center gap-1"
            >
              {item}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 hover:bg-muted"
                onClick={() => handleArrayItemRemove('software', index)}
              >
                <ChevronLeft className="h-3 w-3 rotate-45" />
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            id="software-input"
            placeholder="Add software"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const input = e.currentTarget;
                handleArrayItemAdd('software', input.value);
                input.value = '';
              }
            }}
          />
          <Button 
            variant="outline"
            onClick={() => {
              const input = document.getElementById('software-input') as HTMLInputElement;
              handleArrayItemAdd('software', input.value);
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
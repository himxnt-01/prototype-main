import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArtistProfile } from "@/types/profiles";

interface ProfessionalTabProps {
  form: UseFormReturn<ArtistProfile>;
}

export function ProfessionalTab({ form }: ProfessionalTabProps) {
  const handleArrayItemAdd = (field: keyof ArtistProfile, value: string) => {
    if (!value.trim()) return;
    
    const currentArray = form.getValues(field) as string[];
    if (!currentArray.includes(value)) {
      form.setValue(field, [...currentArray, value]);
    }
  };
  
  const handleArrayItemRemove = (field: keyof ArtistProfile, index: number) => {
    const currentArray = form.getValues(field) as string[];
    form.setValue(
      field,
      currentArray.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-2">
        <Label htmlFor="education">Education</Label>
        <Input
          id="education"
          {...form.register("education")}
          placeholder="Your education background"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="experience">Experience</Label>
        <Textarea
          id="experience"
          {...form.register("experience")}
          placeholder="Your professional experience"
          className="min-h-[100px]"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label htmlFor="hasPublishingDeal">Publishing Deal</Label>
          <Switch
            id="hasPublishingDeal"
            checked={form.getValues("publishing_deal")}
            onCheckedChange={(checked) => 
              form.setValue("publishing_deal", checked)
            }
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {form.getValues("publishing_deal") ? "Yes" : "No"}
        </span>
      </div>
      
      {form.getValues("publishing_deal") && (
        <div className="space-y-2">
          <Label htmlFor="publishingCompany">Publishing Company</Label>
          <Input
            id="publishingCompany"
            {...form.register("publishing_company")}
            placeholder="Name of publishing company"
            className={cn(
              form.formState.errors.publishing_company && "border-destructive"
            )}
          />
          {form.formState.errors.publishing_company && (
            <p className="text-sm text-destructive">
              {form.formState.errors.publishing_company.message}
            </p>
          )}
        </div>
      )}
      
      <div className="space-y-2">
        <Label>Equipment</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.getValues("equipment").map((item, index) => (
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
                onClick={() => handleArrayItemRemove("equipment", index)}
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
                handleArrayItemAdd("equipment", input.value);
                input.value = '';
              }
            }}
          />
          <Button 
            variant="outline"
            onClick={() => {
              const input = document.getElementById('equipment-input') as HTMLInputElement;
              handleArrayItemAdd("equipment", input.value);
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
          {form.getValues("software").map((item, index) => (
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
                onClick={() => handleArrayItemRemove("software", index)}
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
                handleArrayItemAdd("software", input.value);
                input.value = '';
              }
            }}
          />
          <Button 
            variant="outline"
            onClick={() => {
              const input = document.getElementById('software-input') as HTMLInputElement;
              handleArrayItemAdd("software", input.value);
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
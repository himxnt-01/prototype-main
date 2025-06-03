import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArtistProfile } from "@/types/profiles";

interface BasicInfoTabProps {
  form: UseFormReturn<ArtistProfile>;
}

export function BasicInfoTab({ form }: BasicInfoTabProps) {
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
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          {...form.register("bio")}
          placeholder="Tell us about yourself"
          className={cn(
            "min-h-[120px]",
            form.formState.errors.bio && "border-destructive"
          )}
        />
        {form.formState.errors.bio && (
          <p className="text-sm text-destructive">
            {form.formState.errors.bio.message}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            {...form.register("location.city")}
            placeholder="Your city"
            className={cn(
              form.formState.errors.location?.city && "border-destructive"
            )}
          />
          {form.formState.errors.location?.city && (
            <p className="text-sm text-destructive">
              {form.formState.errors.location.city.message}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            {...form.register("location.country")}
            placeholder="Your country"
            className={cn(
              form.formState.errors.location?.country && "border-destructive"
            )}
          />
          {form.formState.errors.location?.country && (
            <p className="text-sm text-destructive">
              {form.formState.errors.location.country.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Genres</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.getValues("genres").map((genre, index) => (
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
                onClick={() => handleArrayItemRemove("genres", index)}
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
                handleArrayItemAdd("genres", input.value);
                input.value = '';
              }
            }}
          />
          <Button 
            variant="outline"
            onClick={() => {
              const input = document.getElementById('genre-input') as HTMLInputElement;
              handleArrayItemAdd("genres", input.value);
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
          {form.getValues("influences").map((influence, index) => (
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
                onClick={() => handleArrayItemRemove("influences", index)}
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
                handleArrayItemAdd("influences", input.value);
                input.value = '';
              }
            }}
          />
          <Button 
            variant="outline"
            onClick={() => {
              const input = document.getElementById('influence-input') as HTMLInputElement;
              handleArrayItemAdd("influences", input.value);
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  SellerProfileFormData,
  genreOptions,
  sellerProfileSchema,
} from "@/types/seller";
import { useImageUpload } from "@/hooks/useImageUpload";

interface SellerProfileFormProps {
  onSubmit: (data: SellerProfileFormData) => void;
  defaultValues?: Partial<SellerProfileFormData>;
}

export function SellerProfileForm({
  onSubmit,
  defaultValues,
}: SellerProfileFormProps) {
  const form = useForm<SellerProfileFormData>({
    resolver: zodResolver(sellerProfileSchema),
    defaultValues: {
      displayName: "",
      bio: "",
      genres: [],
      equipment: [],
      socialLinks: {
        instagram: "",
        soundcloud: "",
        spotify: "",
      },
      location: {
        city: "",
        country: "",
      },
      ...defaultValues,
    },
  });

  const profileImageUpload = useImageUpload({
    onImageChange: (image) => form.setValue("profileImage", image),
  });

  const headerImageUpload = useImageUpload({
    onImageChange: (image) => form.setValue("headerImage", image),
  });

  const addEquipment = () => {
    const equipment = form.getValues("equipment");
    form.setValue("equipment", [...equipment, ""]);
  };

  const removeEquipment = (index: number) => {
    const equipment = form.getValues("equipment");
    form.setValue(
      "equipment",
      equipment.filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    {...field}
                    className="min-h-[100px]"
                    maxLength={500}
                  />
                  <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                    {field.value?.length || 0}/500
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="profileImage"
            render={() => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <div
                    {...profileImageUpload.getRootProps()}
                    className={cn(
                      "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer",
                      profileImageUpload.isDragActive && "border-primary"
                    )}
                  >
                    <input {...profileImageUpload.getInputProps()} />
                    {profileImageUpload.preview ? (
                      <div className="relative">
                        <img
                          src={profileImageUpload.preview}
                          alt="Profile preview"
                          className="max-h-[200px] mx-auto rounded"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            profileImageUpload.reset();
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p>Drag & drop or click to upload profile image</p>
                    )}
                  </div>
                </FormControl>
                {profileImageUpload.error && (
                  <FormMessage>{profileImageUpload.error}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="headerImage"
            render={() => (
              <FormItem>
                <FormLabel>Header Image</FormLabel>
                <FormControl>
                  <div
                    {...headerImageUpload.getRootProps()}
                    className={cn(
                      "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer",
                      headerImageUpload.isDragActive && "border-primary"
                    )}
                  >
                    <input {...headerImageUpload.getInputProps()} />
                    {headerImageUpload.preview ? (
                      <div className="relative">
                        <img
                          src={headerImageUpload.preview}
                          alt="Header preview"
                          className="max-h-[200px] mx-auto rounded"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            headerImageUpload.reset();
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p>Drag & drop or click to upload header image</p>
                    )}
                  </div>
                </FormControl>
                {headerImageUpload.error && (
                  <FormMessage>{headerImageUpload.error}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genres</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Select
                    onValueChange={(value) =>
                      field.onChange([...field.value, value])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select genres" />
                    </SelectTrigger>
                    <SelectContent>
                      {genreOptions.map((genre) => (
                        <SelectItem
                          key={genre}
                          value={genre}
                          disabled={field.value.includes(genre)}
                        >
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((genre, index) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() =>
                          field.onChange(
                            field.value.filter((_, i) => i !== index)
                          )
                        }
                      >
                        {genre}
                        <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="equipment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment/Software</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {field.value.map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={field.value[index]}
                        onChange={(e) => {
                          const newEquipment = [...field.value];
                          newEquipment[index] = e.target.value;
                          field.onChange(newEquipment);
                        }}
                        placeholder="Enter equipment or software"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEquipment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addEquipment}
                  >
                    Add Equipment
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="socialLinks.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://instagram.com/..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialLinks.soundcloud"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SoundCloud URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://soundcloud.com/..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialLinks.spotify"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spotify URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://open.spotify.com/..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Save Profile</Button>
      </form>
    </Form>
  );
} 
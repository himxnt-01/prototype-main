import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { cn } from "@/lib/utils";
import { licensorProfileSchema } from "@/types/profiles";
import type { LicensorProfile } from "@/types/profiles";
import { getProfile, saveProfile, subscribeToProfileChanges } from "@/lib/profiles";
import { supabase } from "@/lib/supabase";

export function LicensorProfileForm() {
  const [isSaving, setIsSaving] = useState(false);
  const autoSaveTimerRef = useRef<NodeJS.Timeout>();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const form = useForm<LicensorProfile>({
    resolver: zodResolver(licensorProfileSchema),
    defaultValues: {
      role: "licensor",
      display_name: "",
      bio: "",
      company_info: {
        name: "",
        website: "",
      },
      license_types: [],
      territories: [],
      catalog_access: "direct",
      social_links: {
        instagram: "",
        soundcloud: "",
        spotify: "",
      },
      location: {
        city: "",
        country: "",
      },
    },
  });

  // Load initial profile data
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const profile = await getProfile(user.id);
      if (profile && profile.role === "licensor") {
        form.reset(profile);
      }
    };

    loadProfile();
  }, [form]);

  // Subscribe to real-time updates
  useEffect(() => {
    const setupSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      return subscribeToProfileChanges(user.id, (profile) => {
        if (profile.role === "licensor") {
          form.reset(profile);
        }
      });
    };

    const unsubscribe = setupSubscription();
    return () => {
      unsubscribe.then(unsub => unsub?.());
    };
  }, [form]);

  const handleSave = async (data: LicensorProfile, isDraft = false) => {
    setIsSaving(true);
    try {
      await saveProfile(data, isDraft);
      setLastSaved(new Date());
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Licensor Profile</h1>
        {lastSaved && (
          <p className="text-sm text-muted-foreground">
            Last saved: {lastSaved.toLocaleTimeString()}
          </p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => handleSave(data))} className="space-y-8">
          {/* Basic form fields */}
          <FormField
            control={form.control}
            name="display_name"
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
                  <Textarea {...field} className="min-h-[100px]" maxLength={500} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Save buttons */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSave(form.getValues(), true)}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Save as Draft</>
              )}
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Publish Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 
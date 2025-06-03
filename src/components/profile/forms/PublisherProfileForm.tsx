import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { publisherProfileSchema } from "@/types/profiles";
import type { PublisherProfile } from "@/types/profiles";
import { getProfile, saveProfile, subscribeToProfileChanges } from "@/lib/profiles";
import { supabase } from "@/lib/supabase";

// Debug helper
const debugLog = (step: string, data?: any) => {
  console.group(`🔍 PublisherProfileForm - ${step}`);
  console.log('Timestamp:', new Date().toISOString());
  if (data) console.log('Data:', data);
  console.groupEnd();
};

export function PublisherProfileForm() {
  const [isSaving, setIsSaving] = useState(false);
  const autoSaveTimerRef = useRef<NodeJS.Timeout>();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const form = useForm<PublisherProfile>({
    resolver: zodResolver(publisherProfileSchema),
    defaultValues: {
      role: "publisher",
      display_name: "",
      bio: "",
      company_info: {
        name: "",
        founded_year: new Date().getFullYear(),
        website: "",
      },
      catalog_size: 0,
      territories: [],
      collection_societies: [],
      sub_publishers: [],
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
    debugLog('Component Mounted');
    
    const loadProfile = async () => {
      debugLog('Loading Profile - Started');
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        debugLog('Loading Profile - No User Found');
        return;
      }

      debugLog('Loading Profile - User Found', { userId: user.id });
      const profile = await getProfile(user.id);
      debugLog('Loading Profile - Profile Data', profile);

      if (profile && profile.role === "publisher") {
        form.reset(profile);
        debugLog('Loading Profile - Profile Loaded Successfully');
      }
    };

    loadProfile();
  }, [form]);

  // Subscribe to real-time updates
  useEffect(() => {
    const setupSubscription = async () => {
      debugLog('Setting up Real-time Subscription');
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        debugLog('Subscription Setup - No User Found');
        return;
      }

      return subscribeToProfileChanges(user.id, (profile) => {
        debugLog('Real-time Update Received', profile);
        if (profile.role === "publisher") {
          form.reset(profile);
        }
      });
    };

    const unsubscribe = setupSubscription();
    return () => {
      unsubscribe.then(unsub => unsub?.());
    };
  }, [form]);

  const handleSave = async (data: PublisherProfile, isDraft = false) => {
    debugLog('Save Attempt Started', { isDraft, data });
    
    try {
      setIsSaving(true);
      debugLog('Save Status - Setting isSaving to true');
      
      // Verify user authentication
      const { data: { user } } = await supabase.auth.getUser();
      debugLog('Auth Check', { 
        isAuthenticated: !!user,
        userId: user?.id 
      });

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Validate form data
      const validationResult = publisherProfileSchema.safeParse(data);
      debugLog('Validation Result', {
        success: validationResult.success,
        errors: !validationResult.success ? validationResult.error.errors : null
      });

      if (!validationResult.success) {
        console.error('Validation failed:', validationResult.error);
        toast.error('Please fix form errors before saving');
        return;
      }

      // Save to Supabase
      debugLog('Attempting to Save Profile', data);
      const savedProfile = await saveProfile(data, isDraft);
      debugLog('Save Response', savedProfile);
      
      if (!savedProfile) {
        throw new Error('Failed to save profile');
      }

      debugLog('Save Successful', savedProfile);
      setLastSaved(new Date());
    } catch (error) {
      debugLog('Save Error', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      toast.error(error instanceof Error ? error.message : 'Failed to save profile');
    } finally {
      setIsSaving(false);
      debugLog('Save Process Completed');
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Publisher Profile</h1>
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
                <FormLabel>Publisher Name</FormLabel>
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
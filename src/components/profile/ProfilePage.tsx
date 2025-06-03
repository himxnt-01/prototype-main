import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, FileCheck, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "@/hooks/useLocation";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { ProfessionalTab } from "./tabs/ProfessionalTab";
import { SocialLinksTab } from "./tabs/SocialLinksTab";
import { ProfileHeader } from "./ProfileHeader";
import { cn } from "@/lib/utils";
import { ProfileData } from "@/types/profiles";
import { getProfile, saveProfile } from "@/lib/profiles";
import { supabase } from "@/lib/supabase";

const defaultProfileData: ProfileData = {
  name: "",
  artistType: "independent",
  instrument: "",
  bio: "",
  city: "",
  country: "",
  instagramUrl: "",
  spotifyUrl: "",
  appleMusicUrl: "",
  soundcloudUrl: "",
  youtubeUrl: "",
  websiteUrl: "",
  hasPublishingDeal: false,
  publishingCompany: "",
  equipment: [],
  software: [],
  genres: [],
  influences: [],
  education: "",
  experience: "",
  profile_picture: "",
  header_image: ""
};

export function ProfilePage() {
  const { navigate } = useLocation();
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [currentTab, setCurrentTab] = useState("basic");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load saved profile data
  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoadError("User not authenticated");
          return;
        }

        const savedProfile = await getProfile(user.id);
        if (savedProfile) {
          setProfileData(savedProfile);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setLoadError("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!profileData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!profileData.bio.trim()) {
      errors.bio = "Bio is required";
    }
    
    if (profileData.hasPublishingDeal && !profileData.publishingCompany.trim()) {
      errors.publishingCompany = "Publishing company name is required";
    }
    
    // Validate URLs
    const urlFields = ['instagramUrl', 'spotifyUrl', 'appleMusicUrl', 'soundcloudUrl', 'youtubeUrl', 'websiteUrl'] as const;
    urlFields.forEach(field => {
      const url = profileData[field];
      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        errors[field] = "URL must start with http:// or https://";
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAsDraft = async () => {
    setIsSaving(true);
    try {
      await saveProfile(profileData, true);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving draft:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishProfile = async () => {
    if (!validateForm()) {
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }
    
    setIsPublishing(true);
    try {
      await saveProfile(profileData, false);
      setIsPublished(true);
      setTimeout(() => setIsPublished(false), 3000);
    } catch (error) {
      console.error("Error publishing profile:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/tracks")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">Edit Profile</h1>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProfileHeader 
            profileData={profileData}
            setProfileData={setProfileData}
          />
          
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="social">Social & Links</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6 pt-4">
              <BasicInfoTab 
                profileData={profileData}
                setProfileData={setProfileData}
                validationErrors={validationErrors}
              />
            </TabsContent>
            
            <TabsContent value="professional" className="space-y-6 pt-4">
              <ProfessionalTab 
                profileData={profileData}
                setProfileData={setProfileData}
                validationErrors={validationErrors}
              />
            </TabsContent>
            
            <TabsContent value="social" className="space-y-6 pt-4">
              <SocialLinksTab 
                profileData={profileData}
                setProfileData={setProfileData}
                validationErrors={validationErrors}
              />
            </TabsContent>
          </Tabs>
          
          {/* Save Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button 
              variant="outline"
              onClick={handleSaveAsDraft}
              disabled={isSaving || isPublishing}
              className="min-w-[140px]"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save as Draft
            </Button>
            
            <Button 
              onClick={handlePublishProfile}
              disabled={isSaving || isPublishing}
              className={cn(
                "min-w-[140px]",
                isPublished && "bg-green-600 hover:bg-green-700"
              )}
            >
              {isPublishing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : isPublished ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Published!
                </>
              ) : (
                <>
                  <FileCheck className="h-4 w-4 mr-2" />
                  Publish Profile
                </>
              )}
            </Button>
          </div>
          
          {/* Success/Error Messages */}
          {isSuccess && (
            <Alert className="bg-green-500/10 border-green-500/20 text-green-500">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Profile saved successfully as a draft.
              </AlertDescription>
            </Alert>
          )}
          
          {Object.keys(validationErrors).length > 0 && (
            <Alert className="bg-destructive/10 border-destructive/20 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please fix the validation errors before publishing your profile.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
} 
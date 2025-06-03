import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Camera, Loader2 } from "lucide-react";
import { ProfileData } from "@/types/profiles";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ProfileHeaderProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

export function ProfileHeader({ profileData, setProfileData }: ProfileHeaderProps) {
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const headerImageInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const [isUploadingHeader, setIsUploadingHeader] = useState(false);

  async function uploadImage(file: File, type: 'profile' | 'header'): Promise<string | null> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('❌ Auth error:', authError.message);
        throw new Error('Authentication error');
      }
      if (!user) {
        console.error('❌ No authenticated user found');
        throw new Error('Not authenticated');
      }

      console.log('🔑 User ID:', user.id);
      console.log('📁 File type:', type);

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${type}-${Date.now()}.${fileExt}`;

      console.log(`🚀 Starting ${type} image upload:`, fileName);

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('❌ Storage upload error:', uploadError.message);
        throw uploadError;
      }

      console.log('✅ File uploaded successfully');

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      console.log('📎 Public URL generated:', publicUrl);

      // Update the profile directly
      const updateData = type === 'profile' 
        ? { profile_picture: publicUrl }
        : { header_image: publicUrl };

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', user.id);

      if (updateError) {
        console.error('❌ Update error:', updateError.message);
        console.error('❌ Error details:', updateError);
        throw updateError;
      }

      console.log('✅ Profile updated successfully');
      return publicUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Upload failed:', errorMessage);
      toast.error('Failed to upload image');
      return null;
    }
  }
  
  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Show temporary preview
      const tempUrl = URL.createObjectURL(file);
      setProfileData(prev => ({
        ...prev,
        profile_picture: tempUrl
      }));

      // Upload to Supabase
      setIsUploadingProfile(true);
      try {
        const publicUrl = await uploadImage(file, 'profile');
        if (publicUrl) {
          setProfileData(prev => ({
            ...prev,
            profile_picture: publicUrl
          }));
          toast.success('Profile picture updated');
        }
      } finally {
        setIsUploadingProfile(false);
      }
    }
  };
  
  const handleHeaderImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Show temporary preview
      const tempUrl = URL.createObjectURL(file);
      setProfileData(prev => ({
        ...prev,
        header_image: tempUrl
      }));

      // Upload to Supabase
      setIsUploadingHeader(true);
      try {
        const publicUrl = await uploadImage(file, 'header');
        if (publicUrl) {
          setProfileData(prev => ({
            ...prev,
            header_image: publicUrl
          }));
          toast.success('Header image updated');
        }
      } finally {
        setIsUploadingHeader(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {/* Header Image */}
      <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
        <img 
          src={profileData.header_image || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=400&auto=format&fit=crop"} 
          alt="Profile header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70"
          onClick={() => headerImageInputRef.current?.click()}
          disabled={isUploadingHeader}
        >
          {isUploadingHeader ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
        </Button>
        
        <input
          type="file"
          ref={headerImageInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleHeaderImageChange}
        />
      </div>
      
      {/* Profile Picture and Basic Info */}
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="relative">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-background">
            <img 
              src={profileData.profile_picture || "https://github.com/shadcn.png"} 
              alt={profileData.name}
              className="object-cover"
            />
          </Avatar>
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
            onClick={() => profilePicInputRef.current?.click()}
            disabled={isUploadingProfile}
          >
            {isUploadingProfile ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </Button>
          
          <input
            type="file"
            ref={profilePicInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              placeholder="Your name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="artistType">Artist Type</Label>
            <RadioGroup 
              value={profileData.artistType} 
              onValueChange={(value: "independent" | "signed") => 
                setProfileData(prev => ({ ...prev, artistType: value }))
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="independent" id="independent" />
                <Label htmlFor="independent">Independent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="signed" id="signed" />
                <Label htmlFor="signed">Signed</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </>
  );
} 
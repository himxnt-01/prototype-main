import { supabase } from './supabase';
import { ArtistProfile } from '@/types/profiles';
import { toast } from 'sonner';

// Debug helper
const debugLog = (step: string, data?: any) => {
  console.group(`🔍 ArtistProfile - ${step}`);
  console.log('Timestamp:', new Date().toISOString());
  if (data) console.log('Data:', data);
  console.groupEnd();
};

export async function getArtistProfile(userId: string): Promise<ArtistProfile | null> {
  try {
    debugLog('Fetching Artist Profile', { userId });

    const { data: profile, error } = await supabase
      .from('artists')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      debugLog('Error Fetching Profile', error);
      throw error;
    }

    if (!profile) {
      debugLog('No Profile Found');
      return null;
    }

    // Transform the database record into our ArtistProfile type
    const artistProfile: ArtistProfile = {
      id: profile.id,
      user_id: profile.user_id,
      role: profile.role || "independent-artist",
      display_name: profile.name,
      name: profile.name,
      bio: profile.bio,
      profile_image: profile.profile_picture ? { url: profile.profile_picture } : undefined,
      header_image: profile.header_image ? { url: profile.header_image } : undefined,
      genres: profile.genres || [],
      influences: profile.influences || [],
      equipment: profile.equipment || [],
      software: profile.software || [],
      education: profile.education,
      experience: profile.experience,
      publishing_deal: profile.publishing_deal || false,
      publishing_company: profile.publishing_company,
      social_links: {
        website: profile.social_links?.website || "",
        instagram: profile.social_links?.instagram || "",
        twitter: profile.social_links?.twitter || "",
        soundcloud: profile.social_links?.soundcloud || "",
        spotify: profile.social_links?.spotify || "",
        youtube: profile.social_links?.youtube || "",
        apple_music: profile.social_links?.apple_music || "",
      },
      location: {
        city: profile.location?.city || "",
        country: profile.location?.country || "",
      },
      status: profile.status || "draft",
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    };

    debugLog('Profile Fetched', artistProfile);
    return artistProfile;
  } catch (error) {
    debugLog('Error in getArtistProfile', error);
    toast.error('Error loading profile');
    return null;
  }
}

export async function saveArtistProfile(
  profile: Partial<ArtistProfile>, 
  isDraft = false
): Promise<ArtistProfile | null> {
  try {
    debugLog('Saving Artist Profile', { profile, isDraft });

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Prepare the profile data for saving
    const timestamp = new Date().toISOString();
    const profileData = {
      user_id: user.id,
      role: profile.role || "independent-artist",
      name: profile.display_name || profile.name,
      bio: profile.bio,
      profile_picture: profile.profile_image?.url,
      header_image: profile.header_image?.url,
      genres: profile.genres || [],
      influences: profile.influences || [],
      equipment: profile.equipment || [],
      software: profile.software || [],
      education: profile.education,
      experience: profile.experience,
      publishing_deal: profile.publishing_deal || false,
      publishing_company: profile.publishing_company,
      social_links: profile.social_links || {},
      location: profile.location || {},
      status: isDraft ? 'draft' : 'published',
      updated_at: timestamp,
    };

    // Update or insert profile
    const { data, error } = await supabase
      .from('artists')
      .upsert(profileData)
      .select()
      .single();

    if (error) {
      debugLog('Error Saving Profile', error);
      throw error;
    }

    debugLog('Profile Saved', data);
    toast.success(isDraft ? 'Draft saved successfully' : 'Profile published successfully');
    
    return data as ArtistProfile;
  } catch (error) {
    debugLog('Error in saveArtistProfile', error);
    toast.error('Error saving profile');
    return null;
  }
}

export async function uploadProfileImage(
  userId: string,
  file: File,
  type: 'profile' | 'header' = 'profile'
): Promise<string | null> {
  try {
    debugLog('Uploading Profile Image', { userId, fileName: file.name, type });

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${type}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file);

    if (uploadError) {
      debugLog('Error Uploading Image', uploadError);
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);

    debugLog('Image Uploaded', { publicUrl });
    return publicUrl;
  } catch (error) {
    debugLog('Error in uploadProfileImage', error);
    toast.error('Error uploading image');
    return null;
  }
}

export async function subscribeToProfileChanges(
  userId: string,
  callback: (profile: ArtistProfile) => void
): Promise<() => void> {
  const subscription = supabase
    .channel(`artist-profile:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'artists',
        filter: `user_id=eq.${userId}`,
      },
      async (payload) => {
        debugLog('Real-time Update Received', payload);
        const profile = await getArtistProfile(userId);
        if (profile) {
          callback(profile);
        }
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
} 
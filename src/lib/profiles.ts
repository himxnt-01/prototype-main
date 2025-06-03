import { supabase } from './supabase';
import { ProfileData } from '@/types/profiles';
import { toast } from 'sonner';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// Helper function to ensure tables exist
async function ensureTablesExist() {
  try {
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session) {
      throw new Error('No authenticated session');
    }

    // Get user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', session.user.id)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      // Try to create user
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: session.user.id,
          role: 'independent-artist'
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating user:', insertError);
        throw new Error('Failed to ensure user exists');
      }
    }

    // Get profile data
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', session.user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      // Try to create profile
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          user_id: session.user.id,
          display_name: session.user.email?.split('@')[0] || '',
          status: 'draft'
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating profile:', insertError);
        throw new Error('Failed to ensure profile exists');
      }
    }
  } catch (error) {
    console.error('Error in ensureTablesExist:', error);
    throw error;
  }
}

// Generic profile getter that works with any profile type
export async function getProfile(userId: string): Promise<ProfileData | null> {
  try {
    // First ensure tables and records exist
    await ensureTablesExist();

    // Get user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      throw new Error('Failed to fetch user data');
    }

    // Get profile data
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw new Error('Failed to fetch profile data');
    }

    // Return profile data in the expected format
    return {
      name: profileData.display_name || '',
      artistType: userData.role === 'signed-artist' ? 'signed' : 'independent',
      instrument: profileData.instrument || '',
      bio: profileData.bio || '',
      city: profileData.city || '',
      country: profileData.country || '',
      instagramUrl: profileData.social_links?.instagram || '',
      spotifyUrl: profileData.social_links?.spotify || '',
      appleMusicUrl: profileData.social_links?.apple_music || '',
      soundcloudUrl: profileData.social_links?.soundcloud || '',
      youtubeUrl: profileData.social_links?.youtube || '',
      websiteUrl: profileData.social_links?.website || '',
      hasPublishingDeal: profileData.has_publishing_deal || false,
      publishingCompany: profileData.publishing_company || '',
      equipment: profileData.equipment || [],
      software: profileData.software || [],
      genres: profileData.genres || [],
      influences: profileData.influences || [],
      education: profileData.education || '',
      experience: profileData.experience || '',
      profile_picture: profileData.profile_picture || '',
      header_image: profileData.header_image || ''
    };
  } catch (error) {
    console.error('Error in getProfile:', error);
    throw error;
  }
}

export async function saveProfile(profile: Partial<ProfileData>, isDraft = false): Promise<ProfileData | null> {
  try {
    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user found');

    // First ensure the user exists by trying to get it
    const { data: existingUser, error: userSelectError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userSelectError || !existingUser) {
      // User doesn't exist, create it
      const { error: userInsertError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          role: profile.artistType === 'signed' ? 'signed-artist' : 'independent-artist'
        });

      if (userInsertError) {
        console.error('Error creating user:', userInsertError);
        throw new Error('Failed to create user');
      }
    }

    // Check if profile exists
    const { data: existingProfile, error: profileSelectError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileSelectError || !existingProfile) {
      // Profile doesn't exist, create it
      const { error: profileInsertError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          display_name: profile.name || '',
          status: 'draft'
        });

      if (profileInsertError) {
        console.error('Error creating profile:', profileInsertError);
        throw new Error('Failed to create profile');
      }
    }

    // Prepare the profile data
    const updateData = {
      display_name: profile.name || '',
      bio: profile.bio || '',
      city: profile.city || '',
      country: profile.country || '',
      instrument: profile.instrument || '',
      education: profile.education || '',
      experience: profile.experience || '',
      has_publishing_deal: profile.hasPublishingDeal || false,
      publishing_company: profile.publishingCompany || '',
      profile_picture: profile.profile_picture || '',
      header_image: profile.header_image || '',
      social_links: {
        instagram: profile.instagramUrl || '',
        spotify: profile.spotifyUrl || '',
        apple_music: profile.appleMusicUrl || '',
        soundcloud: profile.soundcloudUrl || '',
        youtube: profile.youtubeUrl || '',
        website: profile.websiteUrl || ''
      },
      equipment: profile.equipment || [],
      software: profile.software || [],
      genres: profile.genres || [],
      influences: profile.influences || [],
      status: isDraft ? 'draft' : 'published',
      updated_at: new Date().toISOString()
    };

    // Update the profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating profile:', updateError);
      throw new Error('Failed to update profile');
    }

    toast.success(isDraft ? 'Draft saved successfully' : 'Profile published successfully');
    
    // Return updated profile data
    return await getProfile(user.id);
  } catch (error) {
    console.error('Error saving profile:', error);
    toast.error('Failed to save profile');
    throw error;
  }
}

export async function subscribeToProfileChanges(
  userId: string,
  callback: (profile: ProfileData) => void
): Promise<() => void> {
  const subscription = supabase
    .channel(`profile:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'profiles',
        filter: `user_id=eq.${userId}`,
      },
      async (payload: RealtimePostgresChangesPayload<any>) => {
        // Get the updated profile data
        const profile = await getProfile(userId);
        if (profile) {
          callback(profile);
        }
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    subscription.unsubscribe();
  };
}

export async function getUserRole(): Promise<string | null> {
  try {
    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // First try to get role from user metadata
    const userRole = user.user_metadata?.role;
    if (userRole) return userRole;
    
    // If not in metadata, check the users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user role:', userError);
      // If table doesn't exist, return default role
      if (userError.code === '42P01') {
        return 'independent-artist';
      }
      return null;
    }

    return userData?.role || 'independent-artist';
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return null;
  }
}

export function getProfilePath(role: string): string {
  if (!role) return '/auth/role-selection';
  
  switch (role?.toLowerCase()) {
    case 'independent-artist':
    case 'signed-artist':
      return '/artist/profile';
    case 'label':
      return '/label/profile';
    case 'publisher':
      return '/publisher/profile';
    case 'sync-agency':
      return '/agency/profile';
    case 'music-supervisor':
      return '/supervisor/profile';
    case 'licensor':
      return '/licensor/profile';
    default:
      // If role doesn't match known types, go to role selection
      return '/auth/role-selection';
  }
}

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

    // First get the profile to ensure it exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    console.log('📋 Current profile:', profile);
    console.log('❓ Profile error:', profileError);

    if (profileError) {
      console.error('❌ Error fetching profile:', profileError.message);
      // Try to create profile
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          display_name: user.email?.split('@')[0] || '',
          status: 'draft'
        })
        .select()
        .single();

      if (insertError) {
        console.error('❌ Failed to create profile:', insertError.message);
        throw new Error('Failed to ensure profile exists');
      }
    }

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

    // Use direct SQL query to update the profile
    const columnName = type === 'profile' ? 'profile_picture' : 'header_image';
    const { data: result, error: updateError } = await supabase.rpc(
      'update_profile_image',
      { 
        p_user_id: user.id,
        p_column_name: columnName,
        p_image_url: publicUrl
      }
    );

    if (updateError) {
      console.error('❌ Update error:', updateError.message);
      console.error('❌ Error details:', updateError);
      throw updateError;
    }

    console.log('✅ Profile updated successfully:', result);
    return publicUrl;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Upload failed:', errorMessage);
    toast.error('Failed to upload image');
    return null;
  }
} 
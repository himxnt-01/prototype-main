import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { getProfilePath } from '@/lib/profiles';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

// Debug helper
const debugLog = (step: string, data?: any) => {
  console.group(`🔍 ProfileNavigation - ${step}`);
  console.log('Timestamp:', new Date().toISOString());
  if (data) console.log('Data:', data);
  console.groupEnd();
};

export function useProfileNavigation() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const navigateToProfile = useCallback(async () => {
    try {
      debugLog('Navigation Started', { user: user?.id, loading });

      // If still loading auth state, wait
      if (loading) {
        debugLog('Auth Loading - Waiting');
        return;
      }
      
      // Check authentication
      if (!user) {
        debugLog('Not Authenticated - Redirecting to Login');
        navigate('/auth/login');
        return;
      }

      // First try to get role from user metadata
      const userRole = user.user_metadata?.role;
      debugLog('Metadata Check', { userRole });

      if (userRole) {
        const profilePath = getProfilePath(userRole);
        debugLog('Navigating to Profile (from metadata)', { role: userRole, path: profilePath });
        navigate(profilePath);
        return;
      }

      // If no role in metadata, check profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      debugLog('Profile Data Check', { profileData, error: profileError });

      if (profileError) {
        debugLog('Profile Error', { error: profileError });
        // If no profile exists, redirect to role selection
        toast.error('Please select your role to continue');
        navigate('/auth/role-selection');
        return;
      }

      if (!profileData?.role) {
        debugLog('No Role Found');
        toast.error('Please select your role to continue');
        navigate('/auth/role-selection');
        return;
      }

      // Navigate to role-specific profile page
      const profilePath = getProfilePath(profileData.role);
      debugLog('Navigating to Profile', { role: profileData.role, path: profilePath });
      navigate(profilePath);
      
    } catch (error) {
      debugLog('Navigation Error', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      toast.error('Error accessing profile');
      // On error, redirect to role selection
      navigate('/auth/role-selection');
    }
  }, [navigate, user, loading]);

  return { navigateToProfile };
} 
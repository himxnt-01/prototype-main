import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { getUserRole, getProfilePath } from '@/lib/profiles';
import { ProfilePage } from './ProfilePage';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

// Debug helper
const debugLog = (step: string, data?: any) => {
  console.group(`🔍 RoleBasedProfile - ${step}`);
  console.log('Timestamp:', new Date().toISOString());
  if (data) console.log('Data:', data);
  console.groupEnd();
};

export function RoleBasedProfile() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      try {
        debugLog('Checking Role - Started');
        const userRole = await getUserRole();
        debugLog('Role Retrieved', { role: userRole });
        
        setRole(userRole);
        setLoading(false);

        if (!userRole) {
          debugLog('No Role Found');
          setError('Please complete your profile setup');
          toast.error('Please select your role to continue');
          navigate('/auth/role-selection', { replace: true });
          return;
        }

        // Redirect if on wrong route
        const correctPath = getProfilePath(userRole);
        debugLog('Path Check', { 
          current: window.location.pathname, 
          correct: correctPath 
        });
        
        if (window.location.pathname !== correctPath) {
          navigate(correctPath, { replace: true });
        }
      } catch (err) {
        debugLog('Error', { error: err });
        setError('Error loading profile');
        setLoading(false);
      }
    };

    checkRole();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Render the profile page if we have a valid role
  if (role) {
    return <ProfilePage />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-4">Profile Not Available</h1>
      <p className="text-muted-foreground">
        Please complete the signup process to access your profile.
      </p>
    </div>
  );
} 
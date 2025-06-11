import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useLocation } from '@/hooks/useLocation';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { navigate } = useLocation();

  // Define which roles go to which section
  const rightsHoldersRoles = ['independent-artist', 'signed-artist', 'label', 'publisher'];
  const licensorsRoles = ['sync-agency', 'music-supervisor', 'licensor'];

  useEffect(() => {
    // Check if we have access to update password
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Invalid or expired reset link. Please request a new password reset.");
      }
    };
    
    checkSession();
  }, []);

  const handleUpdatePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setError(error.message);
        console.error("Password update error:", error.message);
      } else {
        setSuccess(true);
        
        // Get the current user's role
        const { data: { user } } = await supabase.auth.getUser();
        const userRole = user?.user_metadata?.role;

        // Set timeout to show success message before redirecting
        setTimeout(() => {
          if (userRole) {
            if (rightsHoldersRoles.includes(userRole)) {
              console.log(`Redirecting user with role '${userRole}' to /tracks (Catalog Management)`);
              navigate('/tracks');
            } else if (licensorsRoles.includes(userRole)) {
              console.log(`Redirecting user with role '${userRole}' to /licensors (Discover Music)`);
              navigate('/licensors');
            } else {
              console.warn("User logged in with an unrecognized role:", userRole);
              navigate('/auth/login');
            }
          } else {
            console.warn("User role not found in metadata after password update.");
            navigate('/auth/login');
          }
        }, 3000);
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Update Password</h1>
          
          {success ? (
            <Alert className="w-full max-w-sm bg-green-500/10 border-green-500/20 text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Password updated successfully! Redirecting...
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4 w-full max-w-sm p-8 bg-card text-card-foreground rounded-lg shadow-lg">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">New Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                  minLength={8}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full"
                  minLength={8}
                />
              </div>

              {error && (
                <Alert className="bg-destructive/10 border-destructive/20 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={loading || !password || !confirmPassword}
                className="w-full"
              >
                {loading ? 'Updating Password...' : 'Update Password'}
              </Button>
            </form>
          )}
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
} 
// src/auth/login.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Link, useNavigate } from 'react-router-dom';

// Import common layout components
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Define which roles go to which section
  const rightsHoldersRoles = ['independent-artist', 'signed-artist', 'label', 'publisher'];
  const licensorsRoles = ['sync-agency', 'music-supervisor', 'licensor'];

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting login with email:', email);
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) {
        console.error("Login error:", authError.message);
        setError(authError.message);
        return;
      }

      if (!data?.user || !data?.session) {
        console.error("No user or session data returned");
        setError("Login failed. Please try again.");
        return;
      }

      // Login successful, now determine redirection based on role
      const userRole = data.user.user_metadata?.role;
      console.log("User role detected:", userRole);

      if (userRole) {
        if (rightsHoldersRoles.includes(userRole)) {
          console.log(`Redirecting to /tracks (Catalog Management)`);
          navigate('/tracks');
        } else if (licensorsRoles.includes(userRole)) {
          console.log(`Redirecting to /licensors (Discover Music)`);
          navigate('/licensors');
        } else {
          console.warn("Unrecognized role:", userRole);
          setError("Login successful, but your role could not be recognized. Please contact support.");
          navigate('/discover');
        }
      } else {
        console.warn("No role found in metadata");
        setError("Login successful, but your profile is incomplete. Please contact support.");
        navigate('/discover');
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Log In to Zen Sync</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm p-8 bg-card text-card-foreground rounded-lg shadow-lg">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full mb-4"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
            
            <div className="text-sm text-center space-y-4">
              <Link 
                to="/auth/reset-password"
                className="text-primary hover:underline block w-full"
              >
                Forgot your password?
              </Link>

              <div className="text-muted-foreground">
                Don't have an account?{' '}
                <Link 
                  to="/auth/signup" 
                  className="text-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
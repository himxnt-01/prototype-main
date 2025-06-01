// src/auth/login.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase'; // Make sure this path is correct and supabase client is initialized

// Import common layout components from App.tsx context (these are likely for the login page's own layout)
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PlayerProvider } from "@/components/player/PlayerProvider";

import { useLocation } from '@/hooks/useLocation'; // Assuming this hook provides 'navigate'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { navigate } = useLocation(); // Destructure navigate from useLocation

  // Define which roles go to which section
  const rightsHoldersRoles = ['independent-artist', 'signed-artist', 'label', 'publisher'];
  const licensorsRoles = ['sync-agency', 'music-supervisor', 'licensor'];

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) {
        setError(authError.message);
        console.error("Login error:", authError.message);
      } else if (data.user && data.session) {
        // Login successful, now determine redirection based on role
        const userRole = data.user.user_metadata?.role; // Access the role from user_metadata

        console.log("User role detected from Supabase metadata:", userRole);

        if (userRole) {
          if (rightsHoldersRoles.includes(userRole)) {
            console.log(`Redirecting user with role '${userRole}' to /tracks (Catalog Management)`);
            navigate('/tracks'); // <--- CRITICAL CHANGE: Redirect to /tracks
          } else if (licensorsRoles.includes(userRole)) {
            console.log(`Redirecting user with role '${userRole}' to /licensors (Discover Music)`);
            navigate('/licensors');
          } else {
            // Fallback for an unrecognized role (shouldn't happen if roles are consistent)
            console.warn("User logged in with an unrecognized role:", userRole);
            setError("Login successful, but your role could not be recognized for redirection. Please contact support.");
            navigate('/discover'); // Redirect to a default page if role is unknown
          }
        } else {
          // Fallback if role is missing in user_metadata (should not happen if signup works)
          console.warn("User role not found in metadata after successful login.");
          setError("Login successful, but your profile information is incomplete. Please contact support.");
          navigate('/discover'); // Redirect to a default page if role is missing
        }
      } else {
        // This case should theoretically not be hit if authError is null and data.user/session are also null
        setError("An unexpected response received from login service.");
        console.error("Unexpected login result:", data);
      }
    } catch (err) {
      console.error("An unexpected error occurred during login:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Ensure loading is set to false in all cases
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

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            Don't have an account? {' '}
            <a href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </div>
        <PlayerProvider />
      </TooltipProvider>
    </ThemeProvider>
  );
}
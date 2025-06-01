// src/auth/signup.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/lib/supabase'; // Make sure this path is correct and supabase client is initialized

// Import common layout components from App.tsx context
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PlayerProvider } from "@/components/player/PlayerProvider";

import { useLocation } from '@/hooks/useLocation'; // Assuming this hook provides 'navigate'

// All 7 role options with kebab-case values for Supabase
const roleOptions = [
  { value: 'independent-artist', label: 'Independent Artist' },
  { value: 'signed-artist', label: 'Signed Artist' },
  { value: 'label', label: 'Label' },
  { value: 'publisher', label: 'Publisher' },
  { value: 'sync-agency', label: 'Sync Agency' },
  { value: 'music-supervisor', label: 'Music Supervisor' },
  { value: 'licensor', label: 'Licensor' },
];

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // State for the selected role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success messages

  const { navigate } = useLocation(); // Destructure navigate from useLocation

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear previous messages
    setError(null);
    setSuccessMessage(null);

    // Basic validation: ensure a role is selected
    if (!role) {
      setError("Please select your primary role.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: { // Use 'options.data' to send metadata like role during signup
              data: {
                  role: role // Send the selected role in user_metadata
              }
          }
      });

      if (authError) {
          setError(authError.message);
          console.error("Auth error:", authError.message);
          return; // Stop here if auth fails
      }

      // --- Core Logic Refinement: Determining the next state after successful signUp call ---

      // If authData.session is present, it means the user was immediately authenticated.
      // This happens if email confirmation is OFF, or if the user is somehow already confirmed/logged in.
      if (authData.session) {
          // *** REMOVED: supabase.from('users').insert() call as it's now handled by DB trigger ***

          setSuccessMessage("Sign up successful! Welcome!");
          console.log("User successfully signed up and profile created via DB trigger!");
          navigate('/discover'); // Redirect on full success

      // If authData.session is NULL, it means the user was NOT immediately authenticated.
      // This is the expected path when email confirmation is ON.
      } else if (authData.session === null) {
          setSuccessMessage("Confirmation email sent! Please check your inbox to activate your account.");
          console.log("User signed up, but email confirmation needed. No session immediately created.");
          // Reset form fields after successful signup initiation
          setEmail('');
          setPassword('');
          setRole('');
          // Do NOT navigate, keep user on signup page to see message
      } else {
          // This "else" block should ideally not be hit if Supabase returns consistent data.
          // It's a fallback for any truly unexpected authData structure where session is neither present nor explicitly null.
          setError("An unexpected response received from signup service.");
          console.error("Unexpected authData structure (session is not null, but also not present):", authData);
      }

    } catch (err) {
      console.error("An unexpected error occurred during try/catch:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Ensure loading is set to false in all cases
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Sign Up for Zen Sync</h1>
          <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full max-w-sm p-8 bg-card text-card-foreground rounded-lg shadow-lg">
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
              <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
              <Select onValueChange={setRole} value={role}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your primary role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            <Button
              type="submit"
              disabled={loading || !email || !password || !role}
              className="w-full"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account? {' '}
            <a href="/auth/login" className="text-primary hover:underline">
              Log in
            </a>
          </p>
        </div>
        <PlayerProvider />
      </TooltipProvider>
    </ThemeProvider>
  );
}
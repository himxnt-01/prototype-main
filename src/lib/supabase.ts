// supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check for undefined values and throw error if missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("ERROR: Supabase configuration is incomplete!");
  console.error("Make sure you have the following environment variables set in your .env file:");
  console.error("VITE_SUPABASE_URL");
  console.error("VITE_SUPABASE_ANON_KEY");
  throw new Error("Supabase configuration is missing. Check your .env file.");
}

// Create the Supabase client with additional options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public'
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
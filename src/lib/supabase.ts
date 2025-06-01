import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lgtkfiwqyolgglganvxd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndGtmaXdxeW9sZ2dsZ2FudnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MDEyMjYsImV4cCI6MjA2NDE3NzIyNn0.mQonNrnKHFhQNZG2sYUdJVvvIm1RyeVWI3rFlGX3bZI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
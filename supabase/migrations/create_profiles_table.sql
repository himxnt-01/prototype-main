-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Only drop and recreate the profiles table if needed
DO $$ 
BEGIN
  -- Drop the trigger first if it exists
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  
  -- Drop the function if it exists
  DROP FUNCTION IF EXISTS public.handle_new_user();

  -- Create or replace the function
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.profiles (user_id, role, display_name)
    VALUES (new.id, COALESCE(new.raw_user_meta_data->>'role', 'independent-artist'), new.raw_user_meta_data->>'name');
    RETURN new;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  -- Create the trigger
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

  -- Check if profiles table exists
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles'
  ) THEN
    -- Create profiles table
    CREATE TABLE public.profiles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      role TEXT NOT NULL CHECK (role IN ('independent-artist', 'signed-artist', 'label', 'publisher', 'sync-agency', 'music-supervisor', 'licensor')),
      display_name TEXT,
      bio TEXT,
      profile_picture TEXT,
      header_image TEXT,
      social_links JSONB DEFAULT '{}'::jsonb,
      location JSONB DEFAULT '{}'::jsonb,
      status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
    );

    -- Set up Row Level Security (RLS)
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can view their own profile"
      ON public.profiles FOR SELECT
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can update their own profile"
      ON public.profiles FOR UPDATE
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can insert their own profile"
      ON public.profiles FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Insert profiles for existing users that don't have one yet
INSERT INTO public.profiles (user_id, role, display_name)
SELECT 
  id as user_id,
  COALESCE(raw_user_meta_data->>'role', 'independent-artist') as role,
  COALESCE(raw_user_meta_data->>'name', raw_user_meta_data->>'full_name', 'User') as display_name
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.profiles); 
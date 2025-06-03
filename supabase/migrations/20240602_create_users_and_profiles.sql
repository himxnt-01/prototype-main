-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'independent-artist' CHECK (role IN ('independent-artist', 'signed-artist', 'label', 'publisher', 'sync-agency', 'music-supervisor', 'licensor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  bio TEXT,
  city TEXT,
  country TEXT,
  instrument TEXT,
  education TEXT,
  experience TEXT,
  has_publishing_deal BOOLEAN DEFAULT false,
  publishing_company TEXT,
  profile_picture TEXT,
  header_image TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  equipment TEXT[] DEFAULT ARRAY[]::TEXT[],
  software TEXT[] DEFAULT ARRAY[]::TEXT[],
  genres TEXT[] DEFAULT ARRAY[]::TEXT[],
  influences TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Profiles are viewable by owner" ON public.profiles;
DROP POLICY IF EXISTS "Profiles are updatable by owner" ON public.profiles;
DROP POLICY IF EXISTS "Profiles are insertable by owner" ON public.profiles;

-- Create updated policies for users table
CREATE POLICY "Enable read access for authenticated users"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert for own user"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for own user"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create updated policies for profiles table
CREATE POLICY "Enable read access for own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable insert for own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into users table with error handling
  BEGIN
    INSERT INTO public.users (id, role, created_at, updated_at)
    VALUES (
      new.id,
      COALESCE(new.raw_user_meta_data->>'role', 'independent-artist'),
      TIMEZONE('utc', NOW()),
      TIMEZONE('utc', NOW())
    );
  EXCEPTION WHEN unique_violation THEN
    -- If user already exists, ignore
    NULL;
  END;
  
  -- Insert into profiles table with error handling
  BEGIN
    INSERT INTO public.profiles (
      user_id,
      display_name,
      status,
      created_at,
      updated_at
    )
    VALUES (
      new.id,
      COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
      'draft',
      TIMEZONE('utc', NOW()),
      TIMEZONE('utc', NOW())
    );
  EXCEPTION WHEN unique_violation THEN
    -- If profile already exists, ignore
    NULL;
  END;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create stored procedure to ensure user exists
CREATE OR REPLACE FUNCTION public.ensure_user_exists(user_id UUID, user_role TEXT)
RETURNS void AS $$
BEGIN
  INSERT INTO public.users (id, role, created_at, updated_at)
  VALUES (
    user_id,
    user_role,
    TIMEZONE('utc', NOW()),
    TIMEZONE('utc', NOW())
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    updated_at = TIMEZONE('utc', NOW()),
    role = EXCLUDED.role
  WHERE users.role IS NULL OR users.role = '';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create stored procedure to ensure profile exists
CREATE OR REPLACE FUNCTION public.ensure_profile_exists(user_id UUID, display_name TEXT)
RETURNS void AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id,
    display_name,
    status,
    created_at,
    updated_at
  )
  VALUES (
    user_id,
    display_name,
    'draft',
    TIMEZONE('utc', NOW()),
    TIMEZONE('utc', NOW())
  )
  ON CONFLICT (user_id) DO UPDATE
  SET 
    updated_at = TIMEZONE('utc', NOW()),
    display_name = CASE 
      WHEN profiles.display_name IS NULL OR profiles.display_name = '' 
      THEN EXCLUDED.display_name 
      ELSE profiles.display_name 
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.ensure_user_exists TO authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_profile_exists TO authenticated;

-- Create RLS policies for the functions
CREATE POLICY "Enable access to ensure_user_exists for authenticated users"
  ON public.users
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable access to ensure_profile_exists for authenticated users"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true); 
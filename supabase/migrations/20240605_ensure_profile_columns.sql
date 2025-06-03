-- Drop any existing columns with wrong names
DO $$ 
BEGIN
  -- Drop profile_image if it exists
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'profile_image'
  ) THEN
    ALTER TABLE public.profiles DROP COLUMN profile_image;
  END IF;

  -- Drop header_image if it exists with wrong type
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'header_image'
    AND data_type != 'text'
  ) THEN
    ALTER TABLE public.profiles DROP COLUMN header_image;
  END IF;
END $$;

-- Ensure correct columns exist
DO $$ 
BEGIN
  -- Add profile_picture if it doesn't exist
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'profile_picture'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN profile_picture TEXT;
  END IF;

  -- Add header_image if it doesn't exist
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'header_image'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN header_image TEXT;
  END IF;
END $$;

-- Notify supabase to refresh schema cache
NOTIFY pgrst, 'reload schema'; 
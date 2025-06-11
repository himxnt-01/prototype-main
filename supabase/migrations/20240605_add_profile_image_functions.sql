-- Drop existing function if it exists
DROP FUNCTION IF EXISTS update_profile_image;

-- Function to update profile picture
CREATE OR REPLACE FUNCTION update_profile_picture(
  user_id UUID,
  image_url TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSONB;
BEGIN
  -- Ensure the profile exists
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = $1) THEN
    INSERT INTO profiles (user_id, display_name, status)
    VALUES ($1, '', 'draft');
  END IF;

  -- Update the profile picture
  UPDATE profiles 
  SET profile_picture = $2,
      updated_at = NOW()
  WHERE user_id = $1;

  -- Get the updated record
  SELECT row_to_json(p)::jsonb INTO v_result
  FROM profiles p
  WHERE p.user_id = $1;

  RETURN v_result;
END;
$$;

-- Function to update header image
CREATE OR REPLACE FUNCTION update_header_image(
  user_id UUID,
  image_url TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSONB;
BEGIN
  -- Ensure the profile exists
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = $1) THEN
    INSERT INTO profiles (user_id, display_name, status)
    VALUES ($1, '', 'draft');
  END IF;

  -- Update the header image
  UPDATE profiles 
  SET header_image = $2,
      updated_at = NOW()
  WHERE user_id = $1;

  -- Get the updated record
  SELECT row_to_json(p)::jsonb INTO v_result
  FROM profiles p
  WHERE p.user_id = $1;

  RETURN v_result;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION update_profile_picture TO authenticated;
GRANT EXECUTE ON FUNCTION update_header_image TO authenticated;

-- Ensure the columns exist
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
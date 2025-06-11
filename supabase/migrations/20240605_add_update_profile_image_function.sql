-- Create a function to update profile images using dynamic SQL
CREATE OR REPLACE FUNCTION update_profile_image(
  p_user_id UUID,
  p_column_name TEXT,
  p_image_url TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSONB;
BEGIN
  -- Validate column name to prevent SQL injection
  IF p_column_name NOT IN ('profile_picture', 'header_image') THEN
    RAISE EXCEPTION 'Invalid column name';
  END IF;

  -- Ensure the profile exists
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = p_user_id) THEN
    INSERT INTO profiles (user_id, display_name, status)
    VALUES (p_user_id, '', 'draft');
  END IF;

  -- Build and execute the dynamic SQL
  EXECUTE format(
    'UPDATE profiles SET %I = $1, updated_at = NOW() WHERE user_id = $2 RETURNING *',
    p_column_name
  ) USING p_image_url, p_user_id;

  -- Get the updated record
  SELECT row_to_json(p)::jsonb INTO v_result
  FROM profiles p
  WHERE p.user_id = p_user_id;

  RETURN v_result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_profile_image TO authenticated;

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
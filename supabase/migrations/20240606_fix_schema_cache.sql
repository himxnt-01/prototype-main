-- First, let's make sure our columns exist
DO $$ 
BEGIN
    -- Check if profile_picture column exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'profile_picture'
    ) THEN
        ALTER TABLE profiles ADD COLUMN profile_picture TEXT;
    END IF;

    -- Check if header_image column exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'header_image'
    ) THEN
        ALTER TABLE profiles ADD COLUMN header_image TEXT;
    END IF;
END $$;

-- Force PostgREST to reload its schema cache
NOTIFY pgrst, 'reload schema';

-- Grant proper permissions
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON profiles TO service_role;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;

-- Create new policies
CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = user_id);

-- Ensure the table has RLS enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Output the current structure for verification
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles'; 
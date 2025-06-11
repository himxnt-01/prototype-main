-- First, let's see what columns we actually have
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles';

-- Add missing columns if needed
DO $$ 
BEGIN
    -- Add profile_picture if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'profile_picture'
    ) THEN
        ALTER TABLE profiles ADD COLUMN profile_picture TEXT;
    END IF;

    -- Add header_image if it doesn't exist
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

-- Force a schema cache refresh
NOTIFY pgrst, 'reload schema';

-- Verify the columns again
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles'
AND column_name IN ('profile_picture', 'header_image'); 
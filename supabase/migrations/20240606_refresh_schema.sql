-- Drop and recreate the columns to force a schema refresh
ALTER TABLE profiles 
    DROP COLUMN IF EXISTS profile_picture,
    DROP COLUMN IF EXISTS header_image;

ALTER TABLE profiles 
    ADD COLUMN profile_picture TEXT,
    ADD COLUMN header_image TEXT;

-- Force schema refresh
NOTIFY pgrst, 'reload schema';

-- Verify columns exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles'
AND column_name IN ('profile_picture', 'header_image'); 
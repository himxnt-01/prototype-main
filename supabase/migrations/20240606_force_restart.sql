-- Force PostgREST to restart and refresh its schema cache
ALTER ROLE authenticator NOINHERIT;
ALTER ROLE authenticator INHERIT;
NOTIFY pgrst, 'reload schema';

-- Double check the columns exist
SELECT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name = 'profile_picture'
) as has_profile_picture,
EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name = 'header_image'
) as has_header_image; 
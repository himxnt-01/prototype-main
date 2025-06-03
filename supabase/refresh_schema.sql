-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';

-- Verify the function exists and check its signature
SELECT 
    p.proname as function_name,
    pg_get_function_identity_arguments(p.oid) as argument_types
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
AND p.proname = 'update_profile_image_v2'; 
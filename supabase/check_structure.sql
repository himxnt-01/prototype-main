-- Check profiles table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_name = 'profiles'
ORDER BY ordinal_position;

-- Check profile_images table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_name = 'profile_images'
ORDER BY ordinal_position; 
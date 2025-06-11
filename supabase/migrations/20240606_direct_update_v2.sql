-- Drop existing function if it exists
DROP FUNCTION IF EXISTS update_profile_direct;

-- Create function with proper error handling and validation
CREATE OR REPLACE FUNCTION update_profile_direct(
    user_id UUID,
    column_name TEXT,
    value TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result JSONB;
BEGIN
    -- Validate column name
    IF column_name NOT IN ('profile_picture', 'header_image') THEN
        RAISE EXCEPTION 'Invalid column name: must be profile_picture or header_image';
    END IF;

    -- Ensure profile exists
    INSERT INTO profiles (user_id, display_name, status)
    VALUES (user_id, '', 'draft')
    ON CONFLICT (user_id) DO NOTHING;

    -- Update the column using dynamic SQL and return the updated record
    EXECUTE format(
        'UPDATE profiles SET %I = $1, updated_at = NOW() WHERE user_id = $2 RETURNING row_to_json(profiles)::jsonb',
        column_name
    ) INTO v_result
    USING value, user_id;

    IF v_result IS NULL THEN
        RAISE EXCEPTION 'Profile not found for user_id: %', user_id;
    END IF;

    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error updating profile: % %', SQLERRM, SQLSTATE;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION update_profile_direct TO authenticated;

-- Verify function exists
SELECT routine_name, data_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name = 'update_profile_direct'; 
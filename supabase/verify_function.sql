-- Drop and recreate the function to ensure clean state
DROP FUNCTION IF EXISTS update_profile_image_v2;

CREATE OR REPLACE FUNCTION update_profile_image_v2(
    p_user_id uuid,
    p_type text,
    p_url text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result jsonb;
BEGIN
    -- Validate type
    IF p_type NOT IN ('profile', 'header') THEN
        RAISE EXCEPTION 'Invalid type: must be profile or header';
    END IF;

    -- Ensure profile exists
    INSERT INTO profiles (user_id, display_name, status)
    VALUES (p_user_id, '', 'draft')
    ON CONFLICT (user_id) DO NOTHING;

    -- Insert or update the image
    INSERT INTO profile_images (user_id, type, url)
    VALUES (p_user_id, p_type, p_url)
    ON CONFLICT (user_id, type) 
    DO UPDATE SET url = EXCLUDED.url, updated_at = NOW();

    -- Get the updated profile details
    SELECT row_to_json(pd)::jsonb INTO v_result
    FROM profile_details pd 
    WHERE user_id = p_user_id;

    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error updating profile image: % %', SQLERRM, SQLSTATE;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION update_profile_image_v2(uuid, text, text) TO authenticated;

-- Force schema cache refresh
NOTIFY pgrst, 'reload schema';

-- Verify the function
SELECT 
    proname as function_name,
    pronargs as num_arguments,
    proargnames as argument_names,
    proargtypes as argument_types,
    proargmodes as argument_modes
FROM pg_proc 
WHERE proname = 'update_profile_image_v2'
AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public'); 
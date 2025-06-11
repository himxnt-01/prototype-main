-- Create a function that uses dynamic SQL to update profile columns
CREATE OR REPLACE FUNCTION update_profile_direct(
    user_id UUID,
    column_name TEXT,
    value TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Validate column name
    IF column_name NOT IN ('profile_picture', 'header_image') THEN
        RAISE EXCEPTION 'Invalid column name';
    END IF;

    -- Ensure profile exists
    INSERT INTO profiles (user_id, display_name, status)
    VALUES (user_id, '', 'draft')
    ON CONFLICT (user_id) DO NOTHING;

    -- Update the column using dynamic SQL
    EXECUTE format(
        'UPDATE profiles SET %I = $1, updated_at = NOW() WHERE user_id = $2',
        column_name
    ) USING value, user_id;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION update_profile_direct TO authenticated;

-- Test the function
SELECT update_profile_direct(
    '12d651ae-814d-4997-903e-20fc8197f8a8'::uuid,
    'profile_picture',
    'test_url'
); 
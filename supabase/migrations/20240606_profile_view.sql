-- Create a view that combines profiles with images
CREATE OR REPLACE VIEW profile_details AS
SELECT 
    p.*,
    COALESCE(pp.url, '') as profile_picture,
    COALESCE(hp.url, '') as header_image
FROM 
    profiles p
LEFT JOIN profile_images pp ON p.user_id = pp.user_id AND pp.type = 'profile'
LEFT JOIN profile_images hp ON p.user_id = hp.user_id AND hp.type = 'header';

-- Grant access to the view
GRANT SELECT ON profile_details TO authenticated;

-- Create function to update profile images
CREATE OR REPLACE FUNCTION update_profile_image_v2(
    p_user_id UUID,
    p_type TEXT,
    p_url TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Insert or update the image
    INSERT INTO profile_images (user_id, type, url)
    VALUES (p_user_id, p_type, p_url)
    ON CONFLICT (user_id, type) 
    DO UPDATE SET url = p_url, updated_at = NOW();

    -- Return the updated profile details
    RETURN (
        SELECT row_to_json(pd)::jsonb 
        FROM profile_details pd 
        WHERE user_id = p_user_id
    );
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION update_profile_image_v2 TO authenticated; 
-- First, create the profile_images table
CREATE TABLE IF NOT EXISTS profile_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('profile', 'header')),
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id, type)
);

-- Enable RLS
ALTER TABLE profile_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own images"
    ON profile_images FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own images"
    ON profile_images FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own images"
    ON profile_images FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own images"
    ON profile_images FOR DELETE
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON profile_images TO authenticated;
GRANT ALL ON profile_images TO service_role;

-- Create the view with explicit column selection
CREATE OR REPLACE VIEW profile_details AS
SELECT 
    p.user_id,
    p.display_name,
    p.status,
    p.created_at,
    p.updated_at,
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

-- Migrate existing data (if any)
INSERT INTO profile_images (user_id, type, url)
SELECT user_id, 'profile', profile_picture
FROM profiles
WHERE profile_picture IS NOT NULL AND profile_picture != ''
ON CONFLICT DO NOTHING;

INSERT INTO profile_images (user_id, type, url)
SELECT user_id, 'header', header_image
FROM profiles
WHERE header_image IS NOT NULL AND header_image != ''
ON CONFLICT DO NOTHING; 
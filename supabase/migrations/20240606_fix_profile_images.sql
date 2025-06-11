-- Drop any existing functions to avoid conflicts
DROP FUNCTION IF EXISTS update_profile_image;
DROP FUNCTION IF EXISTS update_profile_picture;
DROP FUNCTION IF EXISTS update_header_image;

-- Create a single, reliable function for updating profile images
CREATE OR REPLACE FUNCTION update_profile_image(
    p_user_id UUID,
    p_image_type TEXT,
    p_image_url TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_column_name TEXT;
    v_result JSONB;
BEGIN
    -- Validate image type
    IF p_image_type NOT IN ('profile', 'header') THEN
        RAISE EXCEPTION 'Invalid image type. Must be either ''profile'' or ''header''';
    END IF;

    -- Set the correct column name based on image type
    v_column_name := CASE 
        WHEN p_image_type = 'profile' THEN 'profile_picture'
        ELSE 'header_image'
    END;

    -- Ensure profile exists
    INSERT INTO profiles (user_id, display_name, status)
    VALUES (p_user_id, '', 'draft')
    ON CONFLICT (user_id) DO NOTHING;

    -- Update the image
    EXECUTE format(
        'UPDATE profiles SET %I = $1, updated_at = NOW() WHERE user_id = $2 RETURNING row_to_json(profiles)::jsonb',
        v_column_name
    ) INTO v_result
    USING p_image_url, p_user_id;

    RETURN v_result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_profile_image TO authenticated;

-- Ensure storage bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- Update storage policies
DROP POLICY IF EXISTS "Users can upload their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;
DROP POLICY IF EXISTS "Public read access" ON storage.objects;

-- Create updated policies
CREATE POLICY "Users can upload their own images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'profile-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'profile-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'profile-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema'; 
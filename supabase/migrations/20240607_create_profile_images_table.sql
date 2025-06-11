-- Drop existing function if it exists
DROP FUNCTION IF EXISTS update_profile_image(UUID, TEXT, TEXT);

-- Create profile_images table
CREATE TABLE IF NOT EXISTS public.profile_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('profile', 'header')),
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, type)
);

-- Add RLS policies
ALTER TABLE public.profile_images ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view their own profile images
CREATE POLICY "Users can view their own profile images"
    ON public.profile_images
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Allow authenticated users to insert their own profile images
CREATE POLICY "Users can insert their own profile images"
    ON public.profile_images
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to update their own profile images
CREATE POLICY "Users can update their own profile images"
    ON public.profile_images
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to delete their own profile images
CREATE POLICY "Users can delete their own profile images"
    ON public.profile_images
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Grant access to authenticated users
GRANT ALL ON public.profile_images TO authenticated;

-- Create function to update profile image
CREATE OR REPLACE FUNCTION update_profile_image(
    p_user_id UUID,
    p_image_type TEXT,
    p_image_url TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_result JSONB;
BEGIN
    -- Validate type
    IF p_image_type NOT IN ('profile', 'header') THEN
        RAISE EXCEPTION 'Invalid image type';
    END IF;

    -- Insert or update the image
    INSERT INTO profile_images (user_id, type, url)
    VALUES (p_user_id, p_image_type, p_image_url)
    ON CONFLICT (user_id, type) 
    DO UPDATE SET 
        url = EXCLUDED.url,
        updated_at = NOW();

    -- Also update the corresponding field in profiles table
    UPDATE profiles 
    SET 
        CASE 
            WHEN p_image_type = 'profile' THEN profile_picture = p_image_url
            WHEN p_image_type = 'header' THEN header_image = p_image_url
        END,
        updated_at = NOW()
    WHERE user_id = p_user_id;

    -- Get the updated profile
    SELECT row_to_json(p)::jsonb INTO v_result
    FROM profiles p
    WHERE p.user_id = p_user_id;

    RETURN v_result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_profile_image(UUID, TEXT, TEXT) TO authenticated; 
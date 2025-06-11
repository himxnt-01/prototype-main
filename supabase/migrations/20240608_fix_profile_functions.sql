-- Ensure tables exist first
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY,
    role TEXT NOT NULL DEFAULT 'independent-artist',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    display_name TEXT,
    bio TEXT,
    city TEXT,
    country TEXT,
    instrument TEXT,
    education TEXT,
    experience TEXT,
    has_publishing_deal BOOLEAN DEFAULT false,
    publishing_company TEXT,
    profile_picture TEXT,
    header_image TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    equipment TEXT[] DEFAULT ARRAY[]::TEXT[],
    software TEXT[] DEFAULT ARRAY[]::TEXT[],
    genres TEXT[] DEFAULT ARRAY[]::TEXT[],
    influences TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
    -- Users policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Users can view their own data'
    ) THEN
        CREATE POLICY "Users can view their own data" ON public.users
            FOR SELECT USING (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Users can update their own data'
    ) THEN
        CREATE POLICY "Users can update their own data" ON public.users
            FOR UPDATE USING (auth.uid() = id);
    END IF;

    -- Profiles policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Profiles are viewable by owner'
    ) THEN
        CREATE POLICY "Profiles are viewable by owner" ON public.profiles
            FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Profiles are updatable by owner'
    ) THEN
        CREATE POLICY "Profiles are updatable by owner" ON public.profiles
            FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS public.ensure_user_exists(UUID, TEXT);
DROP FUNCTION IF EXISTS public.ensure_profile_exists(UUID, TEXT);
DROP FUNCTION IF EXISTS public.update_profile(UUID, JSONB);

-- Create function to ensure user exists
CREATE OR REPLACE FUNCTION public.ensure_user_exists(
    p_user_id UUID,
    p_role TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_result JSONB;
BEGIN
    INSERT INTO public.users (id, role, updated_at)
    VALUES (p_user_id, p_role, NOW())
    ON CONFLICT (id) DO UPDATE
    SET 
        role = EXCLUDED.role,
        updated_at = NOW()
    RETURNING jsonb_build_object(
        'id', id,
        'role', role,
        'updated_at', updated_at
    ) INTO v_result;

    RETURN v_result;
END;
$$;

-- Create function to ensure profile exists
CREATE OR REPLACE FUNCTION public.ensure_profile_exists(
    p_user_id UUID,
    p_display_name TEXT DEFAULT ''
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_result JSONB;
BEGIN
    INSERT INTO public.profiles (
        user_id,
        display_name,
        status,
        created_at,
        updated_at
    )
    VALUES (
        p_user_id,
        p_display_name,
        'draft',
        NOW(),
        NOW()
    )
    ON CONFLICT (user_id) DO UPDATE
    SET 
        display_name = CASE 
            WHEN profiles.display_name IS NULL OR profiles.display_name = '' 
            THEN EXCLUDED.display_name 
            ELSE profiles.display_name 
        END,
        updated_at = NOW()
    RETURNING jsonb_build_object(
        'id', id,
        'user_id', user_id,
        'display_name', display_name,
        'status', status,
        'updated_at', updated_at
    ) INTO v_result;

    RETURN v_result;
END;
$$;

-- Create function to update profile
CREATE OR REPLACE FUNCTION public.update_profile(
    p_user_id UUID,
    p_profile JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_result JSONB;
BEGIN
    -- Update the profile
    UPDATE profiles
    SET
        display_name = COALESCE(p_profile->>'display_name', display_name),
        bio = COALESCE(p_profile->>'bio', bio),
        city = COALESCE(p_profile->>'city', city),
        country = COALESCE(p_profile->>'country', country),
        instrument = COALESCE(p_profile->>'instrument', instrument),
        education = COALESCE(p_profile->>'education', education),
        experience = COALESCE(p_profile->>'experience', experience),
        has_publishing_deal = COALESCE((p_profile->>'has_publishing_deal')::boolean, has_publishing_deal),
        publishing_company = COALESCE(p_profile->>'publishing_company', publishing_company),
        profile_picture = COALESCE(p_profile->>'profile_picture', profile_picture),
        header_image = COALESCE(p_profile->>'header_image', header_image),
        social_links = COALESCE(p_profile->'social_links', social_links),
        equipment = COALESCE(p_profile->'equipment'::text[], equipment),
        software = COALESCE(p_profile->'software'::text[], software),
        genres = COALESCE(p_profile->'genres'::text[], genres),
        influences = COALESCE(p_profile->'influences'::text[], influences),
        status = COALESCE(p_profile->>'status', status),
        updated_at = NOW()
    WHERE user_id = p_user_id
    RETURNING jsonb_build_object(
        'id', id,
        'user_id', user_id,
        'display_name', display_name,
        'status', status,
        'updated_at', updated_at
    ) INTO v_result;

    RETURN v_result;
END;
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_user_exists(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_profile_exists(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_profile(UUID, JSONB) TO authenticated; 
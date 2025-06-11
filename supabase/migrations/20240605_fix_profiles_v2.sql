-- First, let's see what columns we actually have
CREATE OR REPLACE FUNCTION get_profile_columns()
RETURNS TABLE (column_name text, data_type text)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT c.column_name::text, c.data_type::text
    FROM information_schema.columns c
    WHERE c.table_schema = 'public'
    AND c.table_name = 'profiles';
END;
$$;

-- Get the columns
SELECT * FROM get_profile_columns();

-- Now recreate the table with all needed columns
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX profiles_user_id_idx ON profiles(user_id);

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema'; 
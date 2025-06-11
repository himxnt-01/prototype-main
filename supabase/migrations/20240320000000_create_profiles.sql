-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (
    role IN (
      'independent-artist', 'signed-artist',
      'label', 'publisher', 'sync-agency',
      'music-supervisor', 'licensor'
    )
  ),
  display_name TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 3 AND 50),
  bio TEXT CHECK (char_length(bio) <= 500),
  profile_image JSONB,
  header_image JSONB,
  genres TEXT[] DEFAULT '{}',
  equipment TEXT[] DEFAULT '{}',
  social_links JSONB DEFAULT '{
    "instagram": "",
    "soundcloud": "",
    "spotify": ""
  }'::jsonb,
  location JSONB NOT NULL DEFAULT '{
    "city": "",
    "country": ""
  }'::jsonb,
  company_info JSONB,
  roster_size INTEGER,
  catalog_size INTEGER,
  territories TEXT[] DEFAULT '{}',
  distribution_partners TEXT[] DEFAULT '{}',
  collection_societies TEXT[] DEFAULT '{}',
  sub_publishers TEXT[] DEFAULT '{}',
  client_types TEXT[] DEFAULT '{}',
  exclusive_representation BOOLEAN,
  specialties TEXT[] DEFAULT '{}',
  notable_projects TEXT[] DEFAULT '{}',
  preferred_genres TEXT[] DEFAULT '{}',
  license_types TEXT[] DEFAULT '{}',
  catalog_access TEXT,
  record_label TEXT,
  management TEXT,
  booking_agent TEXT,
  publishing_deal BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX profiles_user_id_idx ON profiles(user_id);
CREATE INDEX profiles_role_idx ON profiles(role);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can create own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own profile
CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to automatically set updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at(); 
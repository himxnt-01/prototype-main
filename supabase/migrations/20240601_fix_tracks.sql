-- Drop existing tracks table and recreate it
DROP TABLE IF EXISTS public.tracks;

-- Create tracks table with correct schema
CREATE TABLE public.tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    artist_id UUID NOT NULL,
    audio_url TEXT,
    is_published BOOLEAN DEFAULT false,
    explicit_content BOOLEAN DEFAULT false,
    duration INTEGER,
    bpm INTEGER,
    genre TEXT[],
    key TEXT,
    cover_art_url TEXT,
    instruments TEXT[],
    vocal_type TEXT,
    album_id UUID,
    label_id UUID,
    analysis_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS on tracks table
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;

-- Create policies for tracks table
CREATE POLICY "Enable read access for all users" ON public.tracks
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.tracks
    FOR INSERT WITH CHECK (auth.uid() = artist_id);

CREATE POLICY "Enable update for track owners" ON public.tracks
    FOR UPDATE USING (auth.uid() = artist_id);

CREATE POLICY "Enable delete for track owners" ON public.tracks
    FOR DELETE USING (auth.uid() = artist_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating updated_at
CREATE TRIGGER update_tracks_updated_at
    BEFORE UPDATE ON public.tracks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
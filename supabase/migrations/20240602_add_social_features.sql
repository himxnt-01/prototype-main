-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    bio TEXT,
    profile_pic_url TEXT,
    header_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create followers table (private to each artist)
CREATE TABLE public.followers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artist_id UUID REFERENCES public.profiles(id),
    follower_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    UNIQUE(artist_id, follower_id)
);

-- Create shared_tracks table
CREATE TABLE public.shared_tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    track_id UUID REFERENCES public.tracks(id),
    shared_by UUID REFERENCES public.profiles(id),
    shared_with UUID REFERENCES public.profiles(id),
    share_type TEXT NOT NULL CHECK (share_type IN ('private', 'public')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create playlists table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.playlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    cover_url TEXT,
    created_by UUID REFERENCES public.profiles(id),
    is_private BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create playlist_tracks table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.playlist_tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    playlist_id UUID REFERENCES public.playlists(id) ON DELETE CASCADE,
    track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    UNIQUE(playlist_id, track_id)
);

-- Create shared_playlists table
CREATE TABLE public.shared_playlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    playlist_id UUID REFERENCES public.playlists(id),
    shared_by UUID REFERENCES public.profiles(id),
    shared_with UUID REFERENCES public.profiles(id),
    share_type TEXT NOT NULL CHECK (share_type IN ('private', 'public')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_playlists ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create policies for followers (private to artists)
CREATE POLICY "Artists can view their own followers" ON public.followers
    FOR SELECT USING (auth.uid() = artist_id);

CREATE POLICY "Users can follow/unfollow artists" ON public.followers
    FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow artists" ON public.followers
    FOR DELETE USING (auth.uid() = follower_id);

-- Create policies for shared tracks
CREATE POLICY "Users can view tracks shared with them" ON public.shared_tracks
    FOR SELECT USING (
        auth.uid() = shared_with 
        OR auth.uid() = shared_by 
        OR share_type = 'public'
    );

CREATE POLICY "Users can share their own tracks" ON public.shared_tracks
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.tracks 
            WHERE id = track_id 
            AND artist_id = auth.uid()
        )
    );

-- Create policies for playlists
CREATE POLICY "Users can view public playlists" ON public.playlists
    FOR SELECT USING (
        NOT is_private 
        OR auth.uid() = created_by
    );

CREATE POLICY "Users can create playlists" ON public.playlists
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own playlists" ON public.playlists
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own playlists" ON public.playlists
    FOR DELETE USING (auth.uid() = created_by);

-- Create policies for playlist tracks
CREATE POLICY "Users can view tracks in viewable playlists" ON public.playlist_tracks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.playlists
            WHERE id = playlist_id
            AND (NOT is_private OR created_by = auth.uid())
        )
    );

CREATE POLICY "Playlist owners can modify tracks" ON public.playlist_tracks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.playlists
            WHERE id = playlist_id
            AND created_by = auth.uid()
        )
    );

-- Create policies for shared playlists
CREATE POLICY "Users can view playlists shared with them" ON public.shared_playlists
    FOR SELECT USING (
        auth.uid() = shared_with 
        OR auth.uid() = shared_by 
        OR share_type = 'public'
    );

CREATE POLICY "Users can share their own playlists" ON public.shared_playlists
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.playlists 
            WHERE id = playlist_id 
            AND created_by = auth.uid()
        )
    );

-- Create trigger to update updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for tables with updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_playlists_updated_at
    BEFORE UPDATE ON public.playlists
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
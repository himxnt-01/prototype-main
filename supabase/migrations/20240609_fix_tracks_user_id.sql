-- First check if user_id column exists
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'tracks' 
        AND column_name = 'user_id'
    ) THEN
        -- Add user_id column if it doesn't exist
        ALTER TABLE public.tracks 
        ADD COLUMN user_id UUID REFERENCES auth.users(id);

        -- Create index for better query performance
        CREATE INDEX IF NOT EXISTS idx_tracks_user_id ON public.tracks(user_id);

        -- Update existing tracks to have the current user's ID
        UPDATE public.tracks 
        SET user_id = artist_id 
        WHERE user_id IS NULL;

        -- Make the column NOT NULL after setting values
        ALTER TABLE public.tracks 
        ALTER COLUMN user_id SET NOT NULL;
    END IF;
END $$; 
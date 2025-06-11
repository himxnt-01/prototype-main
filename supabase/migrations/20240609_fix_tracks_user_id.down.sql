-- Drop the index first
DROP INDEX IF EXISTS idx_tracks_user_id;

-- Drop the user_id column (this will automatically drop the foreign key constraint)
ALTER TABLE public.tracks 
DROP COLUMN IF EXISTS user_id; 
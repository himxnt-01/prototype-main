-- Add user_id column to tracks table
ALTER TABLE tracks 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create index for better query performance
CREATE INDEX idx_tracks_user_id ON tracks(user_id);

-- Make user_id non-nullable after adding it
-- We do this in a separate step to handle existing records
ALTER TABLE tracks 
ALTER COLUMN user_id SET NOT NULL;

-- Add cascade delete (optional - uncomment if you want tracks deleted when user is deleted)
-- ALTER TABLE tracks
-- DROP CONSTRAINT tracks_user_id_fkey,
-- ADD CONSTRAINT tracks_user_id_fkey
--   FOREIGN KEY (user_id)
--   REFERENCES auth.users(id)
--   ON DELETE CASCADE; 
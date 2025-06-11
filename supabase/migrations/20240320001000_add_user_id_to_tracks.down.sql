-- Step 1: Drop the foreign key constraint
ALTER TABLE tracks
DROP CONSTRAINT IF EXISTS tracks_user_id_fkey;

-- Step 2: Drop the index
DROP INDEX IF EXISTS idx_tracks_user_id;

-- Step 3: Drop the user_id column
ALTER TABLE tracks 
DROP COLUMN IF EXISTS user_id; 
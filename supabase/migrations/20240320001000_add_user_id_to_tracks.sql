-- Step 1: Add the user_id column (initially nullable)
ALTER TABLE tracks 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Step 2: Create an index for better query performance
CREATE INDEX idx_tracks_user_id ON tracks(user_id);

-- Step 3: Update existing tracks to have your user ID
UPDATE tracks 
SET user_id = '12d651ae-814d-4997-903e-20fc8197f8a8'
WHERE user_id IS NULL;

-- Step 4: Make the column NOT NULL after setting default value
ALTER TABLE tracks 
ALTER COLUMN user_id SET NOT NULL;

-- Step 5: Add a proper foreign key constraint with cascade delete
ALTER TABLE tracks
ADD CONSTRAINT tracks_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE; 
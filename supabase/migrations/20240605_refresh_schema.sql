-- Refresh schema cache for profiles table
ALTER TABLE public.profiles 
  RENAME COLUMN profile_picture TO profile_picture_temp;

ALTER TABLE public.profiles 
  RENAME COLUMN profile_picture_temp TO profile_picture;

ALTER TABLE public.profiles 
  RENAME COLUMN header_image TO header_image_temp;

ALTER TABLE public.profiles 
  RENAME COLUMN header_image_temp TO header_image;

-- Notify supabase to refresh schema cache
NOTIFY pgrst, 'reload schema'; 
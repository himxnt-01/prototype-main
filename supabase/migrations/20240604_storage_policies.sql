-- Create storage bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('profile-images', 'profile-images', true)
on conflict (id) do nothing;

-- Policy to allow authenticated users to upload their own images
create policy "Users can upload their own images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'profile-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow users to update their own images
create policy "Users can update their own images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'profile-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow users to delete their own images
create policy "Users can delete their own images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'profile-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow public access to read images
create policy "Public read access"
on storage.objects for select
to public
using (bucket_id = 'profile-images'); 
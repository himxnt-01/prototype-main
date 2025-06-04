--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: call_process_track_upload_function(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.call_process_track_upload_function() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$DECLARE
  SUPABASE_URL TEXT := current_setting('supabase_url', true);
  SERVICE_ROLE_KEY TEXT := current_setting('supabase_service_role_key', true);
  FUNCTION_URL TEXT;
  HEADERS JSONB;
  BODY_TO_SEND JSONB; -- Renamed to avoid conflict with response 'body'
  RESPONSE_BODY TEXT; -- Changed from RESPONSE_TEXT to RESPONSE_BODY for clarity
  STATUS_CODE INT;
BEGIN
  FUNCTION_URL := SUPABASE_URL || '/functions/v1/process-track-upload';

  HEADERS := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer ' || SERVICE_ROLE_KEY
  );

  BODY_TO_SEND := jsonb_build_object(
    'type', 'INSERT',
    'table', TG_TABLE_NAME,
    'record', to_jsonb(NEW)
  );

  -- *** CRITICAL CHANGE HERE: Select 'body' instead of 'content' ***
  SELECT content::text, status -- <--- CORRECTED LINE
INTO RESPONSE_BODY, STATUS_CODE
FROM net.http_post(
    url := FUNCTION_URL,
    headers := HEADERS,
    body := BODY_TO_SEND
) AS r;

  RAISE LOG 'Edge Function Response - Status: %, Body: %', STATUS_CODE, RESPONSE_BODY;

  IF STATUS_CODE <> 200 THEN
      RAISE WARNING 'Edge Function call failed with status %: %', STATUS_CODE, RESPONSE_BODY;
  END IF;

  RETURN NEW;
END;$$;


--
-- Name: get_profile_columns(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_profile_columns() RETURNS TABLE(column_name text, data_type text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT c.column_name::text, c.data_type::text
    FROM information_schema.columns c
    WHERE c.table_schema = 'public'
    AND c.table_name = 'profiles';
END;
$$;


--
-- Name: get_user_tracks(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_user_tracks(user_id_input uuid) RETURNS TABLE(id uuid, title text, user_id uuid)
    LANGUAGE sql SECURITY DEFINER
    AS $$
  select id, title, user_id 
  from tracks 
  where user_id = user_id_input
  limit 10;
$$;


--
-- Name: handle_new_track_upload(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_track_upload() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  -- Only process files in the 'tracks' bucket
  IF NEW.bucket_id = 'tracks' THEN
    -- Log that we're processing
    RAISE LOG 'Processing storage upload: %', NEW.name;
    
    -- Call the Edge Function
    PERFORM
      net.http_post(
        url := 'https://lgtkfiwqyolgelganvxd.supabase.co/functions/v1/process-track-upload',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndGtmaXdxeW9sZ2dsZ2FudnhkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODYwMTIyNiwiZXhwIjoyMDY0MTc3MjI2fQ.K_d07Oijiyh1C4e6bujFMhCbdtxr6Vel5FVIajSHXXI"}',
        body := json_build_object(
          'object_id', NEW.id,
          'bucket_id', NEW.bucket_id,
          'object_name', NEW.name,
          'object_path', NEW.name
        )::text
      );
      
    RAISE LOG 'Called Edge Function for: %', NEW.name;
  END IF;
  RETURN NEW;
END;
$$;


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (
    NEW.id, -- The user ID from auth.users
    NEW.email, -- The email from auth.users
    (NEW.raw_user_meta_data ->> 'role')::text -- Extract 'role' from user_metadata
  );
  RETURN NEW;
END;
$$;


--
-- Name: trigger_cyanite_analysis(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.trigger_cyanite_analysis() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://lgtkfiwqyolgglganvxd.supabase.co/functions/v1/process-track-upload',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndGtmaXdxeW9sZ2dsZ2FudnhkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzQ2ODUyNCwiZXhwIjoyMDUzMDQ0NTI0fQ.K_d070jjyhIC4eGbujFHhCbdtxr6Vel5FVIajSHXXI',
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'trackId', NEW.id,
      'audioUrl', NEW.audio_url,
      'fileName', NEW.title
    )
  );
  RETURN NEW;
END;
$$;


--
-- Name: trigger_cyanite_retry(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.trigger_cyanite_retry() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  request_id bigint;
BEGIN
  -- If status changed from error to pending, retry
  IF OLD.analysis_status = 'error' AND NEW.analysis_status = 'pending' THEN
    SELECT net.http_post(
      url := 'https://lgtkflwqvolgelganvxd.supabase.co/functions/v1/process-track-upload',
      headers := jsonb_build_object(
        'Authorization', 'Bearer ' || current_setting('app.settings.supabase_service_role_key'),
        'Content-Type', 'application/json'
      ),
      body := jsonb_build_object(
        'trackId', NEW.id,
        'audioUrl', NEW.audio_url,
        'fileName', NEW.title,
        'type', 'TRACK_RETRY'
      )
    ) INTO request_id;
    
    NEW.analysis_status = 'processing';
  END IF;
  
  RETURN NEW;
END;
$$;


--
-- Name: update_profile_image_v2(uuid, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_profile_image_v2(p_user_id uuid, p_type text, p_url text) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_result jsonb;
BEGIN
    -- Validate type
    IF p_type NOT IN ('profile', 'header') THEN
        RAISE EXCEPTION 'Invalid type: must be profile or header';
    END IF;

    -- Ensure profile exists
    INSERT INTO profiles (user_id, display_name, status)
    VALUES (p_user_id, '', 'draft')
    ON CONFLICT (user_id) DO NOTHING;

    -- Insert or update the image
    INSERT INTO profile_images (user_id, type, url)
    VALUES (p_user_id, p_type, p_url)
    ON CONFLICT (user_id, type) 
    DO UPDATE SET url = EXCLUDED.url, updated_at = NOW();

    -- Get the updated profile details
    SELECT row_to_json(pd)::jsonb INTO v_result
    FROM profile_details pd 
    WHERE user_id = p_user_id;

    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error updating profile image: % %', SQLERRM, SQLSTATE;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: albums; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.albums (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    title text NOT NULL,
    artist_id uuid,
    label_id uuid,
    cover_art_url text,
    release_date date,
    is_published boolean DEFAULT false NOT NULL
);


--
-- Name: artists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.artists (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    profile_picture_url text,
    bio text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


--
-- Name: labels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.labels (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    logo_url text,
    description text,
    website_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


--
-- Name: profile_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profile_images (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid,
    type text NOT NULL,
    url text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    CONSTRAINT profile_images_type_check CHECK ((type = ANY (ARRAY['profile'::text, 'header'::text])))
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid,
    role text,
    display_name text,
    bio text,
    social_links jsonb DEFAULT '{}'::jsonb,
    location jsonb DEFAULT '{}'::jsonb,
    status text DEFAULT 'draft'::text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    profile_picture text,
    header_image text,
    avatar_url text,
    header_url text,
    CONSTRAINT profiles_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text])))
);


--
-- Name: profile_details; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.profile_details AS
 SELECT p.user_id,
    p.display_name,
    p.status,
    p.created_at,
    p.updated_at,
    COALESCE(pp.url, ''::text) AS profile_picture,
    COALESCE(hp.url, ''::text) AS header_image
   FROM ((public.profiles p
     LEFT JOIN public.profile_images pp ON (((p.user_id = pp.user_id) AND (pp.type = 'profile'::text))))
     LEFT JOIN public.profile_images hp ON (((p.user_id = hp.user_id) AND (hp.type = 'header'::text))));


--
-- Name: tracks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tracks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    title text NOT NULL,
    artist_id uuid,
    label_id uuid,
    audio_url text NOT NULL,
    cover_art_url text,
    duration integer,
    bpm integer,
    key text,
    instruments text[],
    vocal_type text,
    explicit_content boolean DEFAULT false NOT NULL,
    is_published boolean DEFAULT false NOT NULL,
    album_id uuid,
    analysis_status text,
    genre text[],
    error_message text,
    moods jsonb,
    user_id uuid NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid NOT NULL,
    email text NOT NULL,
    role text NOT NULL,
    updated_at timestamp with time zone
);


--
-- Name: users User_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- Name: users User_id: uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "User_id: uuid_key" UNIQUE (id);


--
-- Name: albums albums_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_id_key UNIQUE (id);


--
-- Name: albums albums_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_pkey PRIMARY KEY (id);


--
-- Name: artists artists_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_id_key UNIQUE (id);


--
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);


--
-- Name: artists artists_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_user_id_key UNIQUE (user_id);


--
-- Name: labels labels_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_id_key UNIQUE (id);


--
-- Name: labels labels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_pkey PRIMARY KEY (id);


--
-- Name: labels labels_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_user_id_key UNIQUE (user_id);


--
-- Name: profile_images profile_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile_images
    ADD CONSTRAINT profile_images_pkey PRIMARY KEY (id);


--
-- Name: profile_images profile_images_user_id_type_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile_images
    ADD CONSTRAINT profile_images_user_id_type_key UNIQUE (user_id, type);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: tracks tracks_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_id_key UNIQUE (id);


--
-- Name: tracks tracks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_pkey PRIMARY KEY (id);


--
-- Name: idx_tracks_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tracks_user_id ON public.tracks USING btree (user_id);


--
-- Name: profiles_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX profiles_user_id_idx ON public.profiles USING btree (user_id);


--
-- Name: albums albums_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE SET NULL;


--
-- Name: albums albums_label_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.labels(id) ON DELETE SET NULL;


--
-- Name: artists artists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: labels labels_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: profile_images profile_images_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile_images
    ADD CONSTRAINT profile_images_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: tracks tracks_album_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.albums(id) ON DELETE SET NULL;


--
-- Name: tracks tracks_label_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.labels(id) ON DELETE SET NULL;


--
-- Name: tracks tracks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: albums Enable delete for album owners; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable delete for album owners" ON public.albums FOR DELETE TO authenticated USING (((EXISTS ( SELECT 1
   FROM public.artists
  WHERE ((artists.id = albums.artist_id) AND (artists.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.labels
  WHERE ((labels.id = albums.label_id) AND (labels.user_id = auth.uid()))))));


--
-- Name: tracks Enable delete for track owners; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable delete for track owners" ON public.tracks FOR DELETE TO authenticated USING (((EXISTS ( SELECT 1
   FROM public.artists
  WHERE ((artists.id = tracks.artist_id) AND (artists.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.labels
  WHERE ((labels.id = tracks.label_id) AND (labels.user_id = auth.uid()))))));


--
-- Name: albums Enable insert for authenticated users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable insert for authenticated users" ON public.albums FOR INSERT TO authenticated WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: tracks Enable insert for authenticated users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable insert for authenticated users" ON public.tracks FOR INSERT TO authenticated WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: users Enable insert for authenticated users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable insert for authenticated users" ON public.users FOR INSERT TO authenticated WITH CHECK ((auth.uid() = id));


--
-- Name: artists Enable insert for owner; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable insert for owner" ON public.artists FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: labels Enable insert for owner; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable insert for owner" ON public.labels FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- Name: users Enable read access for all authenticated users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable read access for all authenticated users" ON public.users FOR SELECT TO authenticated USING ((auth.uid() IS NOT NULL));


--
-- Name: albums Enable select for all; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable select for all" ON public.albums FOR SELECT USING ((auth.uid() IS NOT NULL));


--
-- Name: tracks Enable select for all; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable select for all" ON public.tracks FOR SELECT TO anon USING ((auth.uid() IS NOT NULL));


--
-- Name: artists Enable select for all authenticated users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable select for all authenticated users" ON public.artists FOR SELECT TO authenticated USING ((auth.uid() IS NOT NULL));


--
-- Name: labels Enable select for all authenticated users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable select for all authenticated users" ON public.labels FOR SELECT TO authenticated USING ((auth.uid() IS NOT NULL));


--
-- Name: albums Enable update for album owners; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable update for album owners" ON public.albums FOR UPDATE TO authenticated USING (((EXISTS ( SELECT 1
   FROM public.artists
  WHERE ((artists.id = albums.artist_id) AND (artists.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.labels
  WHERE ((labels.id = albums.label_id) AND (labels.user_id = auth.uid())))))) WITH CHECK (((EXISTS ( SELECT 1
   FROM public.artists
  WHERE ((artists.id = albums.artist_id) AND (artists.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.labels
  WHERE ((labels.id = albums.label_id) AND (labels.user_id = auth.uid()))))));


--
-- Name: artists Enable update for owner; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable update for owner" ON public.artists FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: labels Enable update for owner; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable update for owner" ON public.labels FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: users Enable update for owner; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable update for owner" ON public.users FOR UPDATE TO authenticated USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));


--
-- Name: tracks Enable update for track owners; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable update for track owners" ON public.tracks FOR UPDATE TO anon USING (((EXISTS ( SELECT 1
   FROM public.artists
  WHERE ((artists.id = tracks.artist_id) AND (artists.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.labels
  WHERE ((labels.id = tracks.label_id) AND (labels.user_id = auth.uid())))))) WITH CHECK (((EXISTS ( SELECT 1
   FROM public.artists
  WHERE ((artists.id = tracks.artist_id) AND (artists.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.labels
  WHERE ((labels.id = tracks.label_id) AND (labels.user_id = auth.uid()))))));


--
-- Name: profile_images Users can delete their own images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own images" ON public.profile_images FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can delete their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own profile" ON public.profiles FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: tracks Users can insert own tracks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert own tracks" ON public.tracks FOR INSERT WITH CHECK ((auth.uid() = artist_id));


--
-- Name: profile_images Users can insert their own images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own images" ON public.profile_images FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: tracks Users can insert their own tracks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own tracks" ON public.tracks FOR INSERT TO authenticated WITH CHECK ((auth.uid() = artist_id));


--
-- Name: profile_images Users can update their own images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own images" ON public.profile_images FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: tracks Users can view own tracks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own tracks" ON public.tracks FOR SELECT USING ((auth.uid() = artist_id));


--
-- Name: profile_images Users can view their own images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own images" ON public.profile_images FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: profiles Users can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: tracks Users can view their own tracks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own tracks" ON public.tracks FOR SELECT TO authenticated USING ((auth.uid() = artist_id));


--
-- Name: albums; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;

--
-- Name: artists; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;

--
-- Name: labels; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.labels ENABLE ROW LEVEL SECURITY;

--
-- Name: profile_images; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profile_images ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


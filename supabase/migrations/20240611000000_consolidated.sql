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

CREATE OR REPLACE FUNCTION public.call_process_track_upload_function() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$DECLARE
  SUPABASE_URL TEXT := current_setting('supabase_url', true);
  SERVICE_ROLE_KEY TEXT := current_setting('supabase_service_role_key', true);
  FUNCTION_URL TEXT;
  HEADERS JSONB;
  BODY_TO_SEND JSONB;
  RESPONSE_BODY TEXT;
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

  SELECT content::text, status INTO RESPONSE_BODY, STATUS_CODE FROM net.http_post(url := FUNCTION_URL, headers := HEADERS, body := BODY_TO_SEND) AS r;

  RAISE LOG 'Edge Function Response - Status: %, Body: %', STATUS_CODE, RESPONSE_BODY;

  IF STATUS_CODE <> 200 THEN
      RAISE WARNING 'Edge Function call failed with status %: %', STATUS_CODE, RESPONSE_BODY;
  END IF;

  RETURN NEW;
END;$$;


--
-- Name: get_profile_columns(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE OR REPLACE FUNCTION public.get_profile_columns() RETURNS TABLE(column_name text, data_type text)
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

CREATE OR REPLACE FUNCTION public.get_user_tracks(user_id_input uuid) RETURNS TABLE(id uuid, title text, user_id uuid)
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

CREATE OR REPLACE FUNCTION public.handle_new_track_upload() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  -- This function is deprecated and its logic has been consolidated
  -- into the trigger on the 'tracks' table (trigger_cyanite_analysis).
  -- Leaving the function definition to prevent errors if the trigger isn't dropped,
  -- but making it a no-op.
  RAISE LOG 'handle_new_track_upload() is deprecated and was called for object: %', NEW.name;
  RETURN NEW;
END;
$$;


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (
    NEW.id, -- The user ID from auth.users
    NEW.email, -- The email from auth.users
    (NEW.raw_user_meta_data ->> 'role')::text -- Extract 'role' from user_metadata
  ) ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;


--
-- Name: trigger_cyanite_analysis(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE OR REPLACE FUNCTION public.trigger_cyanite_analysis() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  -- This function is deprecated. The analysis is now triggered
  -- from the client-side after a successful upload. This function
  -- is left in place to prevent errors but does nothing.
  RAISE LOG 'DEPRECATED: trigger_cyanite_analysis() was called but is disabled.';
  RETURN NEW;
END;
$$;


--
-- Name: trigger_cyanite_retry(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE OR REPLACE FUNCTION public.trigger_cyanite_retry() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  request_id bigint;
BEGIN
  -- If status changed from error to pending, retry
  IF OLD.analysis_status = 'error' AND NEW.analysis_status = 'pending' THEN
    SELECT net.http_post(
      url := 'https://lgtkflwqvolgelganvxd.supabase.co/functions/v1/analyze-audio-gemini',
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

CREATE OR REPLACE FUNCTION public.update_profile_image_v2(p_user_id uuid, p_type text, p_url text) RETURNS jsonb
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

CREATE TABLE IF NOT EXISTS public.albums (
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

CREATE TABLE IF NOT EXISTS public.artists (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    name text NOT NULL,
    bio text,
    profile_picture_url text,
    user_id uuid
);


--
-- Name: labels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS public.labels (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    name text NOT NULL,
    logo_url text,
    user_id uuid
);


--
-- Name: profile_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS public.profile_images (
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

CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid,
    display_name text,
    bio text,
    city text,
    country text,
    instrument text,
    education text,
    experience text,
    has_publishing_deal boolean,
    publishing_company text,
    social_links jsonb,
    equipment text,
    software text,
    genres text,
    influences text,
    status text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    profile_image text,
    header_image text
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE IF NOT EXISTS public.users (
    id uuid NOT NULL,
    email character varying(255),
    role text,
    created_at timestamp with time zone DEFAULT now(),
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
-- Name: profiles profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);


--
-- Name: tracks tracks_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_id_key UNIQUE (id);


--
-- Name: tracks tracks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--




--
-- Name: idx_tracks_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX IF NOT EXISTS idx_tracks_user_id ON public.tracks USING btree (user_id);


--
-- Name: profiles_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON public.profiles USING btree (user_id);


--
-- Name: albums albums_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id);


--
-- Name: albums albums_label_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.labels(id);


--
-- Name: artists artists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: labels labels_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: profile_images profile_images_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile_images
    ADD CONSTRAINT profile_images_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


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
    ADD CONSTRAINT tracks_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_id_fkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


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




--
-- Name: albums Enable insert for authenticated users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable insert for authenticated users" ON public.albums FOR INSERT TO authenticated WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: tracks Enable insert for authenticated users; Type: POLICY; Schema: public; Owner: -
--




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

CREATE OR REPLACE VIEW public.profile_details AS
 SELECT p.id,
    p.user_id,
    p.display_name,
    p.bio,
    p.city,
    p.country,
    p.instrument,
    p.education,
    p.experience,
    p.has_publishing_deal,
    p.publishing_company,
    p.social_links,
    p.equipment,
    p.software,
    p.genres,
    p.influences,
    p.status,
    p.created_at,
    p.updated_at,
    u.role,
    COALESCE(pp.url, ''::text) AS profile_picture,
    COALESCE(hp.url, ''::text) AS header_image
   FROM ((public.profiles p
     LEFT JOIN public.users u ON ((p.user_id = u.id)))
     LEFT JOIN public.profile_images pp ON (((p.user_id = pp.user_id) AND (pp.type = 'profile'::text))))
     LEFT JOIN public.profile_images hp ON (((p.user_id = hp.user_id) AND (hp.type = 'header'::text)));

CREATE POLICY "Allow authenticated users to read profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable CRUD for authenticated users only" ON public.tracks FOR ALL TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));





ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON TABLES FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON SEQUENCES FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;
GRANT ALL ON TABLE public.profiles TO service_role;
-- -- -- GRANT ALL ON VIEW public.profile_details TO anon;
-- -- -- GRANT ALL ON VIEW public.profile_details TO authenticated;
-- -- -- GRANT ALL ON VIEW public.profile_details TO service_role;
GRANT ALL ON TABLE public.tracks TO anon;
GRANT ALL ON TABLE public.tracks TO authenticated;
GRANT ALL ON TABLE public.tracks TO service_role;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON FUNCTION public.call_process_track_upload_function() TO anon;
GRANT ALL ON FUNCTION public.call_process_track_upload_function() TO authenticated;
GRANT ALL ON FUNCTION public.call_process_track_upload_function() TO service_role;
GRANT ALL ON FUNCTION public.get_profile_columns() TO anon;
GRANT ALL ON FUNCTION public.get_profile_columns() TO authenticated;
GRANT ALL ON FUNCTION public.get_profile_columns() TO service_role;
GRANT ALL ON FUNCTION public.get_user_tracks(user_id_input uuid) TO anon;
GRANT ALL ON FUNCTION public.get_user_tracks(user_id_input uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_user_tracks(user_id_input uuid) TO service_role;
GRANT ALL ON FUNCTION public.handle_new_track_upload() TO anon;
GRANT ALL ON FUNCTION public.handle_new_track_upload() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_track_upload() TO service_role;
GRANT ALL ON FUNCTION public.handle_new_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;
GRANT ALL ON FUNCTION public.trigger_cyanite_analysis() TO anon;
GRANT ALL ON FUNCTION public.trigger_cyanite_analysis() TO authenticated;
GRANT ALL ON FUNCTION public.trigger_cyanite_analysis() TO service_role;
GRANT ALL ON FUNCTION public.trigger_cyanite_retry() TO anon;
GRANT ALL ON FUNCTION public.trigger_cyanite_retry() TO authenticated;
GRANT ALL ON FUNCTION public.trigger_cyanite_retry() TO service_role;
GRANT ALL ON FUNCTION public.update_profile_image_v2(p_user_id uuid, p_type text, p_url text) TO anon;
GRANT ALL ON FUNCTION public.update_profile_image_v2(p_user_id uuid, p_type text, p_url text) TO authenticated;
GRANT ALL ON FUNCTION public.update_profile_image_v2(p_user_id uuid, p_type text, p_url text) TO service_role;
GRANT ALL ON TABLE public.albums TO anon;
GRANT ALL ON TABLE public.albums TO authenticated;
GRANT ALL ON TABLE public.albums TO service_role;
GRANT ALL ON TABLE public.artists TO anon;
GRANT ALL ON TABLE public.artists TO authenticated;
GRANT ALL ON TABLE public.artists TO service_role;
GRANT ALL ON TABLE public.labels TO anon;
GRANT ALL ON TABLE public.labels TO authenticated;
GRANT ALL ON TABLE public.labels TO service_role;
GRANT ALL ON TABLE public.profile_images TO anon;
GRANT ALL ON TABLE public.profile_images TO authenticated;
GRANT ALL ON TABLE public.profile_images TO service_role;
GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;
-- GRANT ALL ON VIEW public.profile_details TO anon;
-- GRANT ALL ON VIEW public.profile_details TO authenticated;
-- GRANT ALL ON VIEW public.profile_details TO service_role;
GRANT ALL ON TABLE public.tracks TO anon;
GRANT ALL ON TABLE public.tracks TO authenticated;
GRANT ALL ON TABLE public.tracks TO service_role;
GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;


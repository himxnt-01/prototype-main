-- 1. Create a function that calls the Edge Function
CREATE OR REPLACE FUNCTION public.request_gemini_analysis()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM net.http_post(
    url := supabase_url() || '/functions/v1/analyze-audio-gemini',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || supabase_service_role_key()
    ),
    body := jsonb_build_object('record', NEW)
  );
  RETURN NEW;
END;
$$;

-- 2. Create a trigger that fires after a new track is inserted
CREATE TRIGGER on_new_track_created
AFTER INSERT ON public.tracks
FOR EACH ROW
EXECUTE FUNCTION public.request_gemini_analysis(); 
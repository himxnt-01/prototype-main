-- Function to get column information
CREATE OR REPLACE FUNCTION get_column_info(table_name text, column_name text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    SELECT jsonb_build_object(
      'exists', true,
      'type', data_type,
      'nullable', is_nullable = 'YES'
    )
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = $1
      AND column_name = $2
  );
END;
$$; 
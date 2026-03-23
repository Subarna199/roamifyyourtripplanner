CREATE POLICY "Allow public insert on destinations"
ON public.destinations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
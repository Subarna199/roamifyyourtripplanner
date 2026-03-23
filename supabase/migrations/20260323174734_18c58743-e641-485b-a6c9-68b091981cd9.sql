CREATE POLICY "Allow public update on destinations"
ON public.destinations
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public delete on destinations"
ON public.destinations
FOR DELETE
TO anon, authenticated
USING (true);
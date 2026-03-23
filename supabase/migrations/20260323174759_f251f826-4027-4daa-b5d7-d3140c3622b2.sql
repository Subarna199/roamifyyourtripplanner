DROP POLICY IF EXISTS "Allow public insert on destinations" ON public.destinations;
DROP POLICY IF EXISTS "Allow public update on destinations" ON public.destinations;
DROP POLICY IF EXISTS "Allow public delete on destinations" ON public.destinations;

CREATE POLICY "Public can insert destinations"
ON public.destinations
FOR INSERT
TO anon, authenticated
WITH CHECK (coalesce(current_setting('request.jwt.claim.role', true), '') IN ('anon', 'authenticated'));

CREATE POLICY "Public can update destinations"
ON public.destinations
FOR UPDATE
TO anon, authenticated
USING (coalesce(current_setting('request.jwt.claim.role', true), '') IN ('anon', 'authenticated'))
WITH CHECK (coalesce(current_setting('request.jwt.claim.role', true), '') IN ('anon', 'authenticated'));

CREATE POLICY "Public can delete destinations"
ON public.destinations
FOR DELETE
TO anon, authenticated
USING (coalesce(current_setting('request.jwt.claim.role', true), '') IN ('anon', 'authenticated'));
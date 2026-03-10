-- Create destinations table
CREATE TABLE public.destinations (
    id SERIAL PRIMARY KEY,
    destination_city TEXT NOT NULL,
    country TEXT NOT NULL,
    region TEXT NOT NULL,
    avg_flight_price REAL NOT NULL,
    avg_hotel_price_per_night REAL NOT NULL,
    avg_daily_food_cost REAL NOT NULL,
    local_transport_daily_cost REAL NOT NULL,
    activity_avg_cost REAL NOT NULL,
    currency TEXT NOT NULL,
    currency_symbol TEXT NOT NULL,
    usd_rate REAL NOT NULL,
    image_emoji TEXT,
    tier TEXT CHECK(tier IN ('budget', 'moderate', 'premium')) NOT NULL,
    highlights TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Destinations are publicly readable"
ON public.destinations FOR SELECT
TO anon, authenticated
USING (true);
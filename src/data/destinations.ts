export interface Destination {
  destination_city: string;
  country: string;
  region: string;
  avg_flight_price: number; // per person (USD)
  avg_hotel_price_per_night: number; // USD
  avg_daily_food_cost: number; // per person/day USD
  local_transport_daily_cost: number; // per person/day USD
  activity_avg_cost: number; // total per person USD
  currency: string;
  currency_symbol: string;
  usd_rate: number; // 1 USD = X local currency
  image_emoji: string;
  tier: "budget" | "moderate" | "premium";
  highlights: string[];
}

export const destinations: Destination[] = [
  {
    destination_city: "Bangkok",
    country: "Thailand",
    region: "Asia",
    avg_flight_price: 650,
    avg_hotel_price_per_night: 55,
    avg_daily_food_cost: 18,
    local_transport_daily_cost: 8,
    activity_avg_cost: 120,
    currency: "THB",
    currency_symbol: "฿",
    usd_rate: 35.2,
    image_emoji: "🏯",
    tier: "budget",
    highlights: ["Street food paradise", "Grand Palace", "Night markets"],
  },
  {
    destination_city: "Bali",
    country: "Indonesia",
    region: "Asia",
    avg_flight_price: 780,
    avg_hotel_price_per_night: 65,
    avg_daily_food_cost: 22,
    local_transport_daily_cost: 12,
    activity_avg_cost: 180,
    currency: "IDR",
    currency_symbol: "Rp",
    usd_rate: 15750,
    image_emoji: "🌴",
    tier: "budget",
    highlights: ["Rice terraces", "Temple tours", "Surf beaches"],
  },
  {
    destination_city: "Lisbon",
    country: "Portugal",
    region: "Europe",
    avg_flight_price: 520,
    avg_hotel_price_per_night: 90,
    avg_daily_food_cost: 35,
    local_transport_daily_cost: 10,
    activity_avg_cost: 150,
    currency: "EUR",
    currency_symbol: "€",
    usd_rate: 0.92,
    image_emoji: "🚋",
    tier: "moderate",
    highlights: ["Historic trams", "Pasteis de nata", "Coastal cliffs"],
  },
  {
    destination_city: "Mexico City",
    country: "Mexico",
    region: "Americas",
    avg_flight_price: 350,
    avg_hotel_price_per_night: 75,
    avg_daily_food_cost: 25,
    local_transport_daily_cost: 7,
    activity_avg_cost: 100,
    currency: "MXN",
    currency_symbol: "$",
    usd_rate: 17.1,
    image_emoji: "🌮",
    tier: "budget",
    highlights: ["Aztec ruins", "Vibrant food scene", "Art & culture"],
  },
  {
    destination_city: "Tokyo",
    country: "Japan",
    region: "Asia",
    avg_flight_price: 900,
    avg_hotel_price_per_night: 120,
    avg_daily_food_cost: 45,
    local_transport_daily_cost: 20,
    activity_avg_cost: 250,
    currency: "JPY",
    currency_symbol: "¥",
    usd_rate: 149.5,
    image_emoji: "🗼",
    tier: "moderate",
    highlights: ["Cherry blossoms", "Ramen & sushi", "Shinjuku neon"],
  },
  {
    destination_city: "Paris",
    country: "France",
    region: "Europe",
    avg_flight_price: 680,
    avg_hotel_price_per_night: 180,
    avg_daily_food_cost: 65,
    local_transport_daily_cost: 18,
    activity_avg_cost: 300,
    currency: "EUR",
    currency_symbol: "€",
    usd_rate: 0.92,
    image_emoji: "🗼",
    tier: "premium",
    highlights: ["Eiffel Tower", "Louvre Museum", "Fine dining"],
  },
  {
    destination_city: "New York",
    country: "USA",
    region: "Americas",
    avg_flight_price: 300,
    avg_hotel_price_per_night: 220,
    avg_daily_food_cost: 70,
    local_transport_daily_cost: 15,
    activity_avg_cost: 280,
    currency: "USD",
    currency_symbol: "$",
    usd_rate: 1,
    image_emoji: "🗽",
    tier: "premium",
    highlights: ["Times Square", "Broadway shows", "World-class museums"],
  },
  {
    destination_city: "Cape Town",
    country: "South Africa",
    region: "Africa",
    avg_flight_price: 1100,
    avg_hotel_price_per_night: 85,
    avg_daily_food_cost: 28,
    local_transport_daily_cost: 14,
    activity_avg_cost: 200,
    currency: "ZAR",
    currency_symbol: "R",
    usd_rate: 18.6,
    image_emoji: "🦁",
    tier: "moderate",
    highlights: ["Table Mountain", "Safari nearby", "Waterfront dining"],
  },
  {
    destination_city: "Dubai",
    country: "UAE",
    region: "Middle East",
    avg_flight_price: 750,
    avg_hotel_price_per_night: 200,
    avg_daily_food_cost: 55,
    local_transport_daily_cost: 22,
    activity_avg_cost: 350,
    currency: "AED",
    currency_symbol: "د.إ",
    usd_rate: 3.67,
    image_emoji: "🏙️",
    tier: "premium",
    highlights: ["Burj Khalifa", "Desert safari", "Luxury malls"],
  },
  {
    destination_city: "Prague",
    country: "Czech Republic",
    region: "Europe",
    avg_flight_price: 490,
    avg_hotel_price_per_night: 70,
    avg_daily_food_cost: 28,
    local_transport_daily_cost: 8,
    activity_avg_cost: 130,
    currency: "CZK",
    currency_symbol: "Kč",
    usd_rate: 23.4,
    image_emoji: "🏰",
    tier: "budget",
    highlights: ["Old Town Square", "Castle district", "Beer culture"],
  },
  {
    destination_city: "Cancún",
    country: "Mexico",
    region: "Americas",
    avg_flight_price: 420,
    avg_hotel_price_per_night: 130,
    avg_daily_food_cost: 40,
    local_transport_daily_cost: 10,
    activity_avg_cost: 220,
    currency: "MXN",
    currency_symbol: "$",
    usd_rate: 17.1,
    image_emoji: "🏖️",
    tier: "moderate",
    highlights: ["Caribbean beaches", "Cenotes", "Mayan ruins"],
  },
  {
    destination_city: "Singapore",
    country: "Singapore",
    region: "Asia",
    avg_flight_price: 870,
    avg_hotel_price_per_night: 160,
    avg_daily_food_cost: 50,
    local_transport_daily_cost: 15,
    activity_avg_cost: 220,
    currency: "SGD",
    currency_symbol: "S$",
    usd_rate: 1.34,
    image_emoji: "🦁",
    tier: "premium",
    highlights: ["Gardens by the Bay", "Hawker centres", "Marina Bay Sands"],
  },
  {
  destination_city: "Pokhara",
  country: "Nepal",
  region: "Asia",
  avg_flight_price: 620,
  avg_hotel_price_per_night: 35,
  avg_daily_food_cost: 14,
  local_transport_daily_cost: 5,
  activity_avg_cost: 120,
  currency: "NPR",
  currency_symbol: "₨",
  usd_rate: 132.5,
  image_emoji: "🏞️",
  tier: "budget",
  highlights: ["Phewa Lake", "Paragliding", "Annapurna views"],
},
];

export interface TripParams {
  start_date: string;
  end_date: string;
  num_travelers: number;
  destination_filter?: string;
  region_filter?: string;
  budget_filter?: string;
}

export interface TripCost {
  destination: Destination;
  nights: number;
  num_travelers: number;
  flight_total: number;
  hotel_total: number;
  food_total: number;
  transport_total: number;
  activity_total: number;
  grand_total: number;
  per_person_total: number;
  cost_per_night: number;
}

export function calculateTripCost(dest: Destination, params: TripParams): TripCost {
  const start = new Date(params.start_date);
  const end = new Date(params.end_date);
  const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const n = params.num_travelers;

  const flight_total = dest.avg_flight_price * n;
  const hotel_total = dest.avg_hotel_price_per_night * nights;
  const food_total = dest.avg_daily_food_cost * nights * n;
  const transport_total = dest.local_transport_daily_cost * nights * n;
  const activity_total = dest.activity_avg_cost * n;

  const grand_total = flight_total + hotel_total + food_total + transport_total + activity_total;

  return {
    destination: dest,
    nights,
    num_travelers: n,
    flight_total,
    hotel_total,
    food_total,
    transport_total,
    activity_total,
    grand_total,
    per_person_total: grand_total / n,
    cost_per_night: grand_total / nights,
  };
}

export const regions = ["All Regions", "Asia", "Europe", "Americas", "Africa", "Middle East"];
export const tiers = ["All Budgets", "budget", "moderate", "premium"];

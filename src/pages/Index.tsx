import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { calculateTripCost, TripParams, TripCost, Destination } from "@/data/destinations";
import { TripPlannerForm } from "@/components/TripPlannerForm";
import { DestinationCard } from "@/components/DestinationCard";
import { SummaryStats } from "@/components/SummaryStats";
import { MapPin, TrendingDown, Globe } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";

const defaultParams: TripParams = {
  start_date: new Date().toISOString().split("T")[0],
  end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  num_travelers: 2,
  region_filter: "All Regions",
  budget_filter: "All Budgets",
};

export default function Index() {
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [results, setResults] = useState<TripCost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState<"total" | "perPerson" | "flight" | "hotel">("total");

  // Fetch destinations from database
  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("destination_city");

      if (!error && data) {
        const mapped: Destination[] = data.map((d) => ({
          destination_city: d.destination_city,
          country: d.country,
          region: d.region,
          avg_flight_price: d.avg_flight_price,
          avg_hotel_price_per_night: d.avg_hotel_price_per_night,
          avg_daily_food_cost: d.avg_daily_food_cost,
          local_transport_daily_cost: d.local_transport_daily_cost,
          activity_avg_cost: d.activity_avg_cost,
          currency: d.currency,
          currency_symbol: d.currency_symbol,
          usd_rate: d.usd_rate,
          image_emoji: d.image_emoji ?? "🌍",
          tier: (["budget", "moderate", "premium"].includes(d.tier) ? d.tier : "moderate") as Destination["tier"],
          highlights: d.highlights ?? [],
        }));
        setAllDestinations(mapped);
      }
    };
    fetchDestinations();
  }, []);

  // Run search when destinations load or change
  useEffect(() => {
    if (allDestinations.length > 0) {
      handleSearch(defaultParams);
    }
  }, [allDestinations]);

  const handleSearch = (params: TripParams) => {
    setIsLoading(true);

    setTimeout(() => {
      let filtered = allDestinations;

      if (params.region_filter && params.region_filter !== "All Regions") {
        filtered = filtered.filter((d) => d.region === params.region_filter);
      }
      if (params.budget_filter && params.budget_filter !== "All Budgets") {
        filtered = filtered.filter((d) => d.tier === params.budget_filter);
      }

      const computed = filtered.map((dest) => calculateTripCost(dest, params));
      computed.sort((a, b) => a.grand_total - b.grand_total);
      setResults(computed);
      setHasSearched(true);
      setIsLoading(false);
    }, 600);
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === "perPerson") return a.per_person_total - b.per_person_total;
    if (sortBy === "flight") return a.flight_total - b.flight_total;
    if (sortBy === "hotel") return a.hotel_total - b.hotel_total;
    return a.grand_total - b.grand_total;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-[560px] flex flex-col justify-end overflow-hidden">
        <img
          src={heroImage}
          alt="Travel destinations"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-gradient)" }}
        />

        {/* Navbar */}
        <div className="absolute top-0 left-0 right-0 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-accent" />
            <span className="text-primary-foreground font-bold text-xl tracking-tight">
              Roam<span className="text-accent">ify</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-card/10 border border-card/20 rounded-full px-3 py-1.5 backdrop-blur-sm">
            <TrendingDown className="h-4 w-4 text-accent" />
            <span className="text-primary-foreground text-sm font-medium">Best deals updated daily</span>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative px-6 pt-24 pb-0 max-w-7xl mx-auto w-full">
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent rounded-full px-3 py-1 text-sm font-semibold backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5" />
              {allDestinations.length} destinations compared
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3 leading-tight">
            Plan Smarter.<br />
            <span className="text-accent">Travel Better.</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-2xl">
            Compare real flight prices, hotel costs, food budgets & activities across top destinations — before you book.
          </p>

          {/* Search form */}
          <TripPlannerForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Bottom fade */}
        <div className="h-16 bg-gradient-to-t from-background to-transparent relative" />
      </div>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {hasSearched && results.length > 0 && (
          <>
            <SummaryStats results={results} />

            {/* Sort controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {results.length} Destination{results.length !== 1 ? "s" : ""} Found
                </h2>
                <p className="text-muted-foreground text-sm mt-0.5">
                  Total trip costs for {results[0]?.num_travelers} traveler{results[0]?.num_travelers !== 1 ? "s" : ""} · {results[0]?.nights} night{results[0]?.nights !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-medium">Sort by:</span>
                {(["total", "perPerson", "flight", "hotel"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                      sortBy === s
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {s === "total" ? "Total" : s === "perPerson" ? "Per Person" : s === "flight" ? "Flight" : "Hotel"}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedResults.map((tripCost, i) => (
                <DestinationCard key={tripCost.destination.destination_city} tripCost={tripCost} rank={i + 1} />
              ))}
            </div>
          </>
        )}

        {hasSearched && results.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-foreground mb-2">No destinations found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more options.</p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 animate-bounce">✈️</div>
            <p className="text-muted-foreground font-medium">Fetching the best deals for you...</p>
          </div>
        )}

        {/* Legend */}
        {hasSearched && results.length > 0 && (
          <div className="mt-12 p-5 bg-card rounded-2xl border border-border">
            <h4 className="font-semibold text-foreground mb-3 text-sm">Cost Breakdown Legend</h4>
            <div className="flex flex-wrap gap-4">
              {[
                { color: "bg-flight", label: "Flights (per person, round trip)" },
                { color: "bg-hotel", label: "Hotel (total nights)" },
                { color: "bg-food", label: "Food & Dining (all travelers)" },
                { color: "bg-transport", label: "Local Transport" },
                { color: "bg-activity", label: "Activities & Tours" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 border-t border-border pt-3">
              * Prices are estimates based on average market rates. Actual costs may vary based on season, booking time, and availability. All prices in USD.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

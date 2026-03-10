import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Globe, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Destination {
  id: number;
  destination_city: string;
  country: string;
  region: string;
  avg_flight_price: number;
  avg_hotel_price_per_night: number;
  avg_daily_food_cost: number;
  local_transport_daily_cost: number;
  activity_avg_cost: number;
  currency: string;
  currency_symbol: string;
  usd_rate: number;
  image_emoji: string;
  tier: string;
  highlights: string[];
}

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("destination_city");

      if (!error && data) {
        setDestinations(data);
      }
      setLoading(false);
    };
    fetchDestinations();
  }, []);

  const tierColor = (tier: string) => {
    switch (tier) {
      case "budget": return "bg-green-100 text-green-800 border-green-200";
      case "moderate": return "bg-amber-100 text-amber-800 border-amber-200";
      case "premium": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "";
    }
  };

  const formatUSD = (n: number) => `$${n.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-accent" />
            <span className="text-primary-foreground font-bold text-xl tracking-tight">
              Roam<span className="text-accent">ify</span>
            </span>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Planner
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Destinations Database
        </h1>
        <p className="text-muted-foreground mb-8">
          All {destinations.length} cities with costs and budget tiers from Lovable Cloud.
        </p>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 animate-bounce">✈️</div>
            <p className="text-muted-foreground font-medium">Loading destinations...</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border overflow-hidden bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead className="font-semibold">#</TableHead>
                  <TableHead className="font-semibold">City</TableHead>
                  <TableHead className="font-semibold">Country</TableHead>
                  <TableHead className="font-semibold">Region</TableHead>
                  <TableHead className="font-semibold text-right">Flight</TableHead>
                  <TableHead className="font-semibold text-right">Hotel/Night</TableHead>
                  <TableHead className="font-semibold text-right">Food/Day</TableHead>
                  <TableHead className="font-semibold text-right">Transport/Day</TableHead>
                  <TableHead className="font-semibold text-right">Activities</TableHead>
                  <TableHead className="font-semibold text-center">Budget Tier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {destinations.map((d, i) => (
                  <TableRow key={d.id} className="hover:bg-muted/40 transition-colors">
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    <TableCell className="font-semibold">
                      <span className="mr-1.5">{d.image_emoji}</span>
                      {d.destination_city}
                    </TableCell>
                    <TableCell>{d.country}</TableCell>
                    <TableCell>{d.region}</TableCell>
                    <TableCell className="text-right font-medium">{formatUSD(d.avg_flight_price)}</TableCell>
                    <TableCell className="text-right font-medium">{formatUSD(d.avg_hotel_price_per_night)}</TableCell>
                    <TableCell className="text-right font-medium">{formatUSD(d.avg_daily_food_cost)}</TableCell>
                    <TableCell className="text-right font-medium">{formatUSD(d.local_transport_daily_cost)}</TableCell>
                    <TableCell className="text-right font-medium">{formatUSD(d.activity_avg_cost)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={`capitalize ${tierColor(d.tier)}`}>
                        {d.tier}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}

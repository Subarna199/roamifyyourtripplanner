import { TripCost } from "@/data/destinations";
import { Plane, Hotel, Utensils, Bus, Ticket } from "lucide-react";

interface SummaryStatsProps {
  results: TripCost[];
}

export function SummaryStats({ results }: SummaryStatsProps) {
  if (results.length === 0) return null;

  const cheapest = results[0];
  const mostExpensive = results[results.length - 1];
  const avgTotal = Math.round(results.reduce((s, r) => s + r.grand_total, 0) / results.length);

  const stats = [
    {
      icon: <Plane className="h-5 w-5 text-flight" />,
      label: "Best Flight Deal",
      value: `$${Math.min(...results.map(r => r.destination.avg_flight_price)).toLocaleString()}`,
      sub: "per person",
    },
    {
      icon: <Hotel className="h-5 w-5 text-hotel" />,
      label: "Cheapest Hotel",
      value: `$${Math.min(...results.map(r => r.destination.avg_hotel_price_per_night)).toLocaleString()}`,
      sub: "per night",
    },
    {
      icon: <Utensils className="h-5 w-5 text-food" />,
      label: "Best Food Value",
      value: `$${Math.min(...results.map(r => r.destination.avg_daily_food_cost)).toLocaleString()}`,
      sub: "per person/day",
    },
    {
      icon: <Ticket className="h-5 w-5 text-activity" />,
      label: "Avg Trip Cost",
      value: `$${avgTotal.toLocaleString()}`,
      sub: `across ${results.length} destinations`,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="bg-card rounded-xl p-4 border border-border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            {s.icon}
            <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{s.value}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

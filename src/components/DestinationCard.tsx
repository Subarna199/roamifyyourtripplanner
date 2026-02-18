import { TripCost } from "@/data/destinations";
import { CostBreakdown } from "./CostBreakdown";
import { Moon, Users, TrendingUp } from "lucide-react";

interface DestinationCardProps {
  tripCost: TripCost;
  rank: number;
}

const tierConfig = {
  budget: { label: "Budget Friendly", className: "badge-budget" },
  moderate: { label: "Mid-Range", className: "badge-moderate" },
  premium: { label: "Premium", className: "badge-premium" },
};

export function DestinationCard({ tripCost, rank }: DestinationCardProps) {
  const { destination: dest, nights, num_travelers, grand_total, per_person_total } = tripCost;
  const tier = tierConfig[dest.tier];

  return (
    <div className="destination-card bg-card rounded-2xl overflow-hidden border border-border">
      {/* Header */}
      <div className="bg-primary px-5 py-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{dest.image_emoji}</span>
            <div>
              <h3 className="text-primary-foreground font-bold text-lg leading-tight">
                {dest.destination_city}
              </h3>
              <p className="text-primary-foreground/70 text-sm">{dest.country}</p>
            </div>
          </div>
          <span className={tier.className}>{tier.label}</span>
        </div>
        <div className="text-right">
          <div className="text-accent font-bold text-2xl">${grand_total.toLocaleString()}</div>
          <div className="text-primary-foreground/60 text-xs">total trip</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        <div className="px-3 py-2.5 text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-0.5">
            <Users className="h-3 w-3" /> Per person
          </div>
          <div className="font-bold text-foreground text-sm">${Math.round(per_person_total).toLocaleString()}</div>
        </div>
        <div className="px-3 py-2.5 text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-0.5">
            <Moon className="h-3 w-3" /> Nights
          </div>
          <div className="font-bold text-foreground text-sm">{nights}</div>
        </div>
        <div className="px-3 py-2.5 text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-0.5">
            <TrendingUp className="h-3 w-3" /> Currency
          </div>
          <div className="font-bold text-foreground text-sm">{dest.currency}</div>
        </div>
      </div>

      {/* Cost breakdown */}
      <div className="p-5">
        <CostBreakdown tripCost={tripCost} />
      </div>

      {/* Highlights */}
      <div className="px-5 pb-5">
        <div className="flex flex-wrap gap-1.5">
          {dest.highlights.map((h) => (
            <span
              key={h}
              className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

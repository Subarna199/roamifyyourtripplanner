import { TripCost } from "@/data/destinations";
import { Plane, Hotel, Utensils, Bus, Ticket } from "lucide-react";

interface CostBreakdownBarProps {
  label: string;
  value: number;
  total: number;
  colorClass: string;
  icon: React.ReactNode;
}

function CostBreakdownBar({ label, value, total, colorClass, icon }: CostBreakdownBarProps) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
          {icon}
          {label}
        </span>
        <span className="font-semibold text-foreground">${value.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`cost-bar ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

interface CostBreakdownProps {
  tripCost: TripCost;
}

export function CostBreakdown({ tripCost }: CostBreakdownProps) {
  const { flight_total, hotel_total, food_total, transport_total, activity_total, grand_total } = tripCost;

  const items = [
    { label: "Flights", value: flight_total, colorClass: "bg-flight", icon: <Plane className="h-3.5 w-3.5" /> },
    { label: "Hotels", value: hotel_total, colorClass: "bg-hotel", icon: <Hotel className="h-3.5 w-3.5" /> },
    { label: "Food & Dining", value: food_total, colorClass: "bg-food", icon: <Utensils className="h-3.5 w-3.5" /> },
    { label: "Local Transport", value: transport_total, colorClass: "bg-transport", icon: <Bus className="h-3.5 w-3.5" /> },
    { label: "Activities", value: activity_total, colorClass: "bg-activity", icon: <Ticket className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CostBreakdownBar key={item.label} {...item} total={grand_total} />
      ))}
    </div>
  );
}

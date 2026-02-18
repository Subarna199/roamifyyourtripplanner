import { useState } from "react";
import { TripParams, regions, tiers } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, Calendar } from "lucide-react";

interface TripPlannerFormProps {
  onSearch: (params: TripParams) => void;
  isLoading: boolean;
}

export function TripPlannerForm({ onSearch, isLoading }: TripPlannerFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [params, setParams] = useState<TripParams>({
    start_date: today,
    end_date: nextWeek,
    num_travelers: 2,
    region_filter: "All Regions",
    budget_filter: "All Budgets",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-form rounded-2xl p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Start Date */}
        <div className="space-y-1.5">
          <Label className="text-primary-foreground/90 text-sm font-medium flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> Departure Date
          </Label>
          <Input
            type="date"
            value={params.start_date}
            min={today}
            onChange={(e) => setParams((p) => ({ ...p, start_date: e.target.value }))}
            className="bg-card/90 border-card/50 text-foreground focus:border-accent"
            required
          />
        </div>

        {/* End Date */}
        <div className="space-y-1.5">
          <Label className="text-primary-foreground/90 text-sm font-medium flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> Return Date
          </Label>
          <Input
            type="date"
            value={params.end_date}
            min={params.start_date}
            onChange={(e) => setParams((p) => ({ ...p, end_date: e.target.value }))}
            className="bg-card/90 border-card/50 text-foreground focus:border-accent"
            required
          />
        </div>

        {/* Travelers */}
        <div className="space-y-1.5">
          <Label className="text-primary-foreground/90 text-sm font-medium flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> Travelers
          </Label>
          <Input
            type="number"
            min={1}
            max={20}
            value={params.num_travelers}
            onChange={(e) => setParams((p) => ({ ...p, num_travelers: parseInt(e.target.value) || 1 }))}
            className="bg-card/90 border-card/50 text-foreground focus:border-accent"
          />
        </div>

        {/* Region */}
        <div className="space-y-1.5">
          <Label className="text-primary-foreground/90 text-sm font-medium">Region</Label>
          <Select
            value={params.region_filter}
            onValueChange={(v) => setParams((p) => ({ ...p, region_filter: v }))}
          >
            <SelectTrigger className="bg-card/90 border-card/50 text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Budget filter + Search button */}
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="space-y-1.5 sm:w-52">
          <Label className="text-primary-foreground/90 text-sm font-medium">Budget Tier</Label>
          <Select
            value={params.budget_filter}
            onValueChange={(v) => setParams((p) => ({ ...p, budget_filter: v }))}
          >
            <SelectTrigger className="bg-card/90 border-card/50 text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tiers.map((t) => (
                <SelectItem key={t} value={t}>
                  {t === "All Budgets" ? "All Budgets" : t.charAt(0).toUpperCase() + t.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 sm:flex-none sm:px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2 h-10 text-base"
        >
          <Search className="h-4 w-4" />
          {isLoading ? "Calculating..." : "Find Best Deals"}
        </Button>
      </div>
    </form>
  );
}

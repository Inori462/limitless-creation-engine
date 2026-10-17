import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Ruler } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { StageBadge, VerificationBadge } from "./brand";
import { inr } from "@/lib/finance";
import type { Farm } from "@/lib/types";
import { useStore } from "@/lib/store";

export function FarmCard({ farm }: { farm: Farm }) {
  const raised = useStore((s) => s.participations.filter((p) => p.farmId === farm.id).reduce((a, p) => a + p.amount, 0));
  const pct = Math.min(100, (raised / farm.participationCap) * 100);
  return (
    <Link to="/farms/$id" params={{ id: farm.id }} className="group block overflow-hidden rounded-2xl border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <div className="relative h-44 overflow-hidden">
        <img src={farm.image} alt={farm.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex gap-2"><StageBadge stage={farm.stage} /><VerificationBadge v={farm.verification} /></div>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{farm.name}</h3>
          <p className="text-sm text-muted-foreground">by {farm.farmerName} · {farm.crop}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{farm.location}</span>
          <span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{farm.areaAcres} acres</span>
          <span className="col-span-2 flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />Harvest {farm.harvestDate}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted p-3 text-sm">
          <div><div className="text-xs text-muted-foreground">Est. cost</div><div className="font-semibold">{inr(farm.opCost)}</div></div>
          <div><div className="text-xs text-muted-foreground">Projected revenue</div><div className="font-semibold text-primary">{inr(farm.projectedRevenue)}</div></div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs"><span>Sample participation</span><span>{inr(raised)} / {inr(farm.participationCap)}</span></div>
          <Progress value={pct} />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>Crop health: <strong className={farm.health >= 75 ? "text-success" : farm.health >= 55 ? "text-warning" : "text-destructive"}>{farm.health ? `${farm.health}/100` : "Not started"}</strong></span>
          <span className="font-semibold text-primary group-hover:underline">View details →</span>
        </div>
      </div>
    </Link>
  );
}

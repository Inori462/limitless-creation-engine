import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PublicLayout } from "@/components/public-layout";
import { Panel, SimBadge, StatCard } from "@/components/brand";
import { useStore } from "@/lib/store";
import { farmTotals, inr } from "@/lib/finance";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — BHUMIJA" },
      { name: "description", content: "Illustrative climate and livelihood impact goals of the BHUMIJA platform." },
      { property: "og:title", content: "BHUMIJA Impact Goals" },
      { property: "og:description", content: "Climate-smart farming, shared risk and transparent farm finances." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Impact,
});

function Impact() {
  const farms = useStore((s) => s.farms);
  const records = useStore((s) => s.records);
  const byState = Object.values(
    farms.reduce<Record<string, { state: string; acres: number; farms: number }>>((a, f) => {
      a[f.state] ??= { state: f.state, acres: 0, farms: 0 };
      a[f.state].acres += f.areaAcres;
      a[f.state].farms += 1;
      return a;
    }, {}),
  );
  const t = farmTotals(records);
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SimBadge>Illustrative targets & sample data — not actual achievements</SimBadge>
        <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Impact we're designing for</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">BHUMIJA aims to make farms climate-resilient businesses. Below: goals for a pilot plus live totals from the sample data in this demo.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Sample farms listed" value={farms.length} />
          <StatCard label="Sample acres under management" value={farms.reduce((a, f) => a + f.areaAcres, 0)} />
          <StatCard label="Sample revenue recorded" value={inr(t.revenue)} />
          <StatCard label="Target water saved via drip" value="30%" hint="Pilot goal" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Sample acreage by state">
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={byState}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="state" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Bar dataKey="acres" fill="var(--chart-2)" radius={[6, 6, 0, 0]} /></BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
          <Panel title="Climate goals">
            <ul className="space-y-4">
              {[["Reduce crop loss from weather shocks", 25], ["Shift farms to drip / precision irrigation", 40], ["Adopt natural or organic inputs", 30], ["Digitise farm P&L records", 100]].map(([l, v]) => (
                <li key={l as string}><div className="flex justify-between text-sm"><span>{l}</span><span className="font-semibold">{v}%</span></div><div className="mt-1 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-leaf" style={{ width: `${v}%` }} /></div></li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>
    </PublicLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/public-layout";
import { Disclaimer } from "@/components/brand";
import { LIFECYCLE } from "@/lib/seed";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — BHUMIJA" },
      { name: "description", content: "The eight-step BHUMIJA lifecycle from business creation to profit and loss." },
      { property: "og:title", content: "How BHUMIJA Works" },
      { property: "og:description", content: "Business creation → digital ownership → cultivation → harvest → profit/loss." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HowItWorks,
});

const DETAILS: Record<string, string> = {
  "Business Creation": "A farmer registers the farm as an enterprise: crop, area, method, timeline and an estimated operating budget.",
  "Digital Ownership": "The operating budget is divided into illustrative digital shares that participants can model backing.",
  Cultivation: "Every activity — sowing, irrigation, inputs, labour — is logged with date and cost.",
  Monitoring: "Crop-health indicators and weather risk cards give everyone the same view of the field.",
  Harvest: "Harvest quantity and date are recorded against the cycle.",
  Sale: "Produce sales, buyer and price are captured as sale records.",
  Revenue: "Sales roll up into total revenue for the enterprise.",
  "Profit/Loss": "Net Profit/Loss = Total Revenue − Total Expenses, shared in proportion to each illustrative stake.",
};

function HowItWorks() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-semibold md:text-5xl">How BHUMIJA works</h1>
        <p className="mt-4 text-lg text-muted-foreground">Eight transparent steps take a farm from idea to a closed profit-and-loss statement.</p>
        <ol className="relative mt-12 space-y-8 border-l-2 border-leaf/40 pl-8">
          {LIFECYCLE.map((s, i) => (
            <li key={s} className="relative">
              <span className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
              <h2 className="text-xl font-semibold">{s}</h2>
              <p className="mt-1 text-muted-foreground">{DETAILS[s]}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 space-y-4">
          <Disclaimer />
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="gold"><Link to="/explore">Explore farms <ArrowRight /></Link></Button>
            <Button asChild variant="outline"><Link to="/register">Create an account</Link></Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

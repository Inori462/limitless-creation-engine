import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, CloudSun, Eye, Handshake, Leaf, LineChart, Satellite, ShieldCheck, Sprout, TrendingDown, Users, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PublicLayout } from "@/components/public-layout";
import { SimBadge } from "@/components/brand";
import { FarmCard } from "@/components/farm-card";
import { useStore } from "@/lib/store";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BHUMIJA — Transforming Farms into Sustainable Business Enterprises" },
      { name: "description", content: "A transparent, data-driven approach to agricultural ownership, crop monitoring and farm business management." },
      { property: "og:title", content: "BHUMIJA — Rooted in the Earth, Growing the Future" },
      { property: "og:description", content: "Share-driven farm enterprise platform prototype for AI for Climate Change." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

export const LIFECYCLE = ["Business Creation", "Digital Ownership", "Cultivation", "Monitoring", "Harvest", "Sale", "Revenue", "Profit/Loss"];

function Index() {
  const farms = useStore((s) => s.farms);
  return (
    <PublicLayout overlay>
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <img src={hero} alt="Indian farmland at golden hour" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-32 text-primary-foreground">
          <p className="mb-4 font-display text-lg italic text-gold">Rooted in the Earth, Growing the Future.</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">Transforming Farms into Sustainable Business Enterprises.</h1>
          <p className="mt-5 max-w-2xl text-lg opacity-90">Discover a transparent, data-driven approach to agricultural ownership, crop monitoring, and farm business management.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="gold"><Link to="/explore">Explore Farms <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="heroOutline"><Link to="/how-it-works">See How It Works</Link></Button>
          </div>
          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {[["1,200+", "farmers (target)"], ["₹4.8 Cr", "managed (illustrative)"], ["18%", "cost saved (target)"], ["30%", "less water (target)"]].map(([v, l]) => (
              <div key={l}><div className="font-display text-3xl font-semibold text-gold">{v}</div><div className="text-sm opacity-80">{l}</div></div>
            ))}
          </div>
          <SimBadge className="mt-4">Illustrative figures — not actual achievements</SimBadge>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-leaf">The problem</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Farming is run as a livelihood, not a business.</h2>
            <p className="mt-4 text-muted-foreground">Small farmers carry all the climate and market risk alone, with little access to structured capital, records or data.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [TrendingDown, "Unpredictable income", "Erratic monsoons and price swings wipe out a season."],
              [Wallet, "Capital gaps", "Informal credit at high interest for seeds and inputs."],
              [Eye, "No transparency", "Costs, yields and sales rarely get recorded."],
              [CloudSun, "Climate stress", "Drought, floods and heat waves hit crops harder each year."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Leaf;
              return <div key={t as string} className="rounded-2xl border bg-card p-5 shadow-soft"><I className="h-6 w-6 text-gold" /><h3 className="mt-3 font-semibold">{t as string}</h3><p className="mt-1 text-sm text-muted-foreground">{d as string}</p></div>;
            })}
          </div>
        </div>
      </section>

      {/* Solution + lifecycle */}
      <section className="bg-forest-gradient py-20 text-forest-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Our solution</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold md:text-4xl">Every farm becomes a transparent enterprise — from seed to statement.</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
            {LIFECYCLE.map((s, i) => (
              <div key={s} className="rounded-xl border border-forest-foreground/20 bg-forest-foreground/5 p-4">
                <div className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-1 text-sm font-medium">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-3xl font-semibold md:text-4xl">How it works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            [Sprout, "1. Farmers create an enterprise", "Register the farm, crop plan, timeline and estimated operating cost."],
            [Handshake, "2. Participants back a cycle", "Explore farms and model a hypothetical digital share of the crop cycle."],
            [LineChart, "3. Everyone tracks the season", "Monitoring, expenses, harvest and sales roll up into a live profit/loss."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Leaf;
            return <div key={t as string} className="rounded-2xl border bg-card p-6 shadow-soft"><div className="inline-flex rounded-xl bg-secondary p-3 text-primary"><I /></div><h3 className="mt-4 text-xl font-semibold">{t as string}</h3><p className="mt-2 text-muted-foreground">{d as string}</p></div>;
          })}
        </div>
      </section>

      {/* Featured farms */}
      <section className="bg-leaf-pattern py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h2 className="text-3xl font-semibold md:text-4xl">Featured farm enterprises</h2><SimBadge className="mt-2">Sample listings</SimBadge></div>
            <Button asChild variant="outline"><Link to="/explore">View all farms <ArrowRight /></Link></Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">{farms.slice(0, 3).map((f) => <FarmCard key={f.id} farm={f} />)}</div>
        </div>
      </section>

      {/* Benefits + Tech */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold">Key benefits</h2>
          <ul className="mt-6 space-y-4">
            {[
              [Users, "Shared risk, shared reward", "Risk is spread across participants instead of one family."],
              [ShieldCheck, "Verified & auditable", "Every activity, expense and sale leaves a record."],
              [Leaf, "Climate-smart choices", "Weather and crop-health insights guide decisions."],
              [BarChart3, "Business-grade reports", "Printable P&L statements for every crop cycle."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Leaf;
              return <li key={t as string} className="flex gap-4"><I className="mt-1 h-5 w-5 shrink-0 text-leaf" /><div><div className="font-semibold">{t as string}</div><div className="text-sm text-muted-foreground">{d as string}</div></div></li>;
            })}
          </ul>
        </div>
        <div className="rounded-3xl bg-secondary p-8">
          <h2 className="text-3xl font-semibold">Technology</h2>
          <p className="mt-2 text-muted-foreground">Built to plug into real data sources after the prototype stage.</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[[Satellite, "Sentinel-2 NDVI (planned)"], [CloudSun, "Weather APIs (planned)"], [BarChart3, "ML yield models (demo)"], [ShieldCheck, "Audit trails"]].map(([Icon, t]) => {
              const I = Icon as typeof Leaf;
              return <div key={t as string} className="flex items-center gap-2 rounded-xl bg-card p-3 text-sm font-medium shadow-soft"><I className="h-4 w-4 text-primary" />{t as string}</div>;
            })}
          </div>
        </div>
      </section>

      <ContactSection />
    </PublicLayout>
  );
}

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) er.message = "Message should be at least 10 characters.";
    setErrors(er);
    if (Object.keys(er).length) return;
    toast.success("Thanks! Your message was recorded (demo — no email is sent).");
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <section id="contact" className="bg-muted py-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold">Get in touch</h2>
          <p className="mt-3 text-muted-foreground">Questions about the BHUMIJA prototype, pilots or partnerships? Send us a note.</p>
          <p className="mt-6 text-sm text-muted-foreground">Team BHUMIJA · PCCOE International Grand Challenge 2026</p>
        </div>
        <form onSubmit={submit} className="space-y-3 rounded-2xl bg-card p-6 shadow-soft" noValidate>
          <div><Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />{errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}</div>
          <div><Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}</div>
          <div><Textarea placeholder="Message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />{errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}</div>
          <Button type="submit" className="w-full">Send message</Button>
        </form>
      </div>
    </section>
  );
}

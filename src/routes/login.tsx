import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, ShieldCheck, Sprout, User, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo, SimBadge } from "@/components/brand";
import { homeFor, login } from "@/lib/store";
import hero from "@/assets/farm-rice.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — BHUMIJA" },
      { name: "description", content: "Sign in to the BHUMIJA demo as a farmer, participant, admin or visitor." },
      { property: "og:title", content: "Login — BHUMIJA" },
      { property: "og:description", content: "Access your BHUMIJA demo dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

const DEMOS = [
  { email: "farmer@bhumija.demo", label: "Farmer", icon: Sprout },
  { email: "participant@bhumija.demo", label: "Participant", icon: Users },
  { email: "admin@bhumija.demo", label: "Administrator", icon: ShieldCheck },
  { email: "visitor@bhumija.demo", label: "Visitor / Demo", icon: User },
];

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={hero} alt="Paddy fields" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute bottom-12 left-12 right-12 text-primary-foreground">
          <p className="font-display text-3xl italic">"Rooted in the Earth, Growing the Future."</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Logo />
          {children}
        </div>
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const doLogin = async (e: string, p: string) => {
    setError("");
    if (!/^\S+@\S+\.\S+$/.test(e)) return setError("Enter a valid email address.");
    if (p.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      const u = await login(e, p);
      toast.success(`Welcome, ${u.name}!`);
      navigate({ to: homeFor(u.role) });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <h1 className="mt-8 text-3xl font-semibold">Welcome back</h1>
      <SimBadge className="mt-2">Simulated authentication — demo only</SimBadge>
      <form className="mt-6 space-y-4" noValidate onSubmit={(ev) => { ev.preventDefault(); doLogin(email, password); }}>
        <div className="space-y-1.5"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></div>
        <div className="space-y-1.5">
          <Label htmlFor="pw">Password</Label>
          <div className="relative">
            <Input id="pw" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}>{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
        </div>
        {error && <p className="rounded-lg bg-destructive/10 p-2 text-sm text-destructive">{error}</p>}
        <Button className="w-full" disabled={loading}>{loading && <Loader2 className="animate-spin" />} Login</Button>
      </form>
      <div className="mt-8">
        <p className="text-sm font-semibold">One-click demo accounts <span className="font-normal text-muted-foreground">(password: demo1234)</span></p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {DEMOS.map((d) => (
            <Button key={d.email} variant="outline" disabled={loading} onClick={() => doLogin(d.email, "demo1234")}><d.icon /> {d.label}</Button>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">New here? <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link></p>
    </AuthShell>
  );
}

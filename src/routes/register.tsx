import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimBadge } from "@/components/brand";
import { AuthShell } from "@/components/auth-shell";
import { homeFor, register } from "@/lib/store";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Get Started — BHUMIJA" },
      { name: "description", content: "Create a BHUMIJA demo account as a farmer, participant, admin or visitor." },
      { property: "og:title", content: "Join BHUMIJA" },
      { property: "og:description", content: "Register for the BHUMIJA farm enterprise demo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Register,
});

const ROLES: { v: Role; label: string; d: string }[] = [
  { v: "farmer", label: "Farmer", d: "Create and run farm enterprises" },
  { v: "participant", label: "Agricultural Participant", d: "Model participation in farms" },
  { v: "admin", label: "Administrator", d: "Verify and oversee records" },
  { v: "visitor", label: "Visitor / Demo", d: "Look around every area" },
];

function Register() {
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", password: "", confirm: "", region: "", role: "farmer" as Role });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Enter a valid email address.";
    if (f.password.length < 8) er.password = "Use at least 8 characters.";
    else if (!/\d/.test(f.password)) er.password = "Include at least one number.";
    if (f.confirm !== f.password) er.confirm = "Passwords don't match.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setLoading(true);
    try {
      const u = await register(f);
      toast.success("Account created (demo). You're signed in.");
      navigate({ to: homeFor(u.role) });
    } catch (err) {
      setErrors({ email: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const field = (k: "name" | "email" | "region", label: string, type = "text") => (
    <div className="space-y-1.5">
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} type={type} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
      {errors[k] && <p className="text-xs text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <AuthShell>
      <h1 className="mt-8 text-3xl font-semibold">Create your account</h1>
      <SimBadge className="mt-2">Simulated registration — stored only in this browser</SimBadge>
      <form onSubmit={submit} noValidate className="mt-6 space-y-4">
        <div>
          <Label>I am a…</Label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {ROLES.map((r) => (
              <button type="button" key={r.v} onClick={() => setF({ ...f, role: r.v })} className={cn("rounded-xl border p-3 text-left transition", f.role === r.v ? "border-primary bg-secondary ring-2 ring-primary/30" : "hover:bg-muted")}>
                <div className="text-sm font-semibold">{r.label}</div>
                <div className="text-xs text-muted-foreground">{r.d}</div>
              </button>
            ))}
          </div>
        </div>
        {field("name", "Full name")}
        {field("email", "Email", "email")}
        {field("region", "Region / District (optional)")}
        <div className="space-y-1.5">
          <Label htmlFor="pw">Password</Label>
          <div className="relative">
            <Input id="pw" type={show ? "text" : "password"} value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShow(!show)} aria-label="Toggle password visibility">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cf">Confirm password</Label>
          <Input id="cf" type={show ? "text" : "password"} value={f.confirm} onChange={(e) => setF({ ...f, confirm: e.target.value })} />
          {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
        </div>
        <Button className="w-full" variant="gold" disabled={loading}>{loading && <Loader2 className="animate-spin" />} Create account</Button>
      </form>
      <p className="mt-6 text-sm text-muted-foreground">Already registered? <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link></p>
    </AuthShell>
  );
}

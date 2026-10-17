import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./brand";
import { homeFor, useSession } from "@/lib/store";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/explore", label: "Explore Farms" },
  { to: "/impact", label: "Impact" },
] as const;

export function PublicLayout({ children, overlay }: { children: ReactNode; overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const user = useSession();
  return (
    <div className="min-h-screen bg-background">
      <header className={cn("z-40 w-full", overlay ? "absolute top-0" : "sticky top-0 border-b bg-background/90 backdrop-blur")}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Logo light={overlay} />
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={cn("text-sm font-medium transition-opacity hover:opacity-100", overlay ? "text-primary-foreground opacity-85" : "text-foreground opacity-75")} activeProps={{ className: "!opacity-100 underline underline-offset-8 decoration-gold decoration-2" }} activeOptions={{ exact: true }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <Button asChild variant="gold"><Link to={homeFor(user.role)}>My Dashboard</Link></Button>
            ) : (
              <>
                <Button asChild variant={overlay ? "heroOutline" : "ghost"}><Link to="/login">Login</Link></Button>
                <Button asChild variant="gold"><Link to="/register">Get Started</Link></Button>
              </>
            )}
          </div>
          <button className={cn("md:hidden", overlay ? "text-primary-foreground" : "text-foreground")} onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t bg-background px-4 py-4 md:hidden">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="block py-2 font-medium" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <div className="mt-3 flex gap-2">
              {user ? (
                <Button asChild variant="gold" className="flex-1"><Link to={homeFor(user.role)}>My Dashboard</Link></Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="flex-1"><Link to="/login">Login</Link></Button>
                  <Button asChild variant="gold" className="flex-1"><Link to="/register">Get Started</Link></Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest-gradient text-forest-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-3 max-w-sm text-sm opacity-80">Rooted in the Earth, Growing the Future. A hackathon prototype for the PCCOE International Grand Challenge 2026 — AI for Climate Change.</p>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold text-gold">Platform</h4>
          <Link to="/explore" className="block opacity-80 hover:opacity-100">Explore Farms</Link>
          <Link to="/how-it-works" className="block opacity-80 hover:opacity-100">How It Works</Link>
          <Link to="/impact" className="block opacity-80 hover:opacity-100">Impact</Link>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold text-gold">Company</h4>
          <Link to="/about" className="block opacity-80 hover:opacity-100">About</Link>
          <Link to="/contact" className="block opacity-80 hover:opacity-100">Contact</Link>
          <Link to="/privacy" className="block opacity-80 hover:opacity-100">Privacy</Link>
          <Link to="/terms" className="block opacity-80 hover:opacity-100">Terms</Link>
        </div>
      </div>
      <div className="border-t border-forest-foreground/15 py-4 text-center text-xs opacity-70">
        © 2026 BHUMIJA prototype. All figures are sample data. No real investments are offered.
      </div>
    </footer>
  );
}

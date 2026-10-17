import { Link, useNavigate } from "@tanstack/react-router";
import { BarChart3, CloudSun, Compass, LayoutDashboard, LogOut, RotateCcw, ShieldCheck, Sprout, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo, SimBadge } from "./brand";
import { logout, resetDemo, useSession } from "@/lib/store";
import type { Role } from "@/lib/types";

type NavItem = { to: "/farmer" | "/participant" | "/admin" | "/explore" | "/monitoring" | "/analytics" | "/finance"; label: string; icon: ReactNode; roles: Role[] };
const NAV: NavItem[] = [
  { to: "/farmer", label: "Farmer Dashboard", icon: <Sprout />, roles: ["farmer", "visitor"] },
  { to: "/participant", label: "Participant Dashboard", icon: <LayoutDashboard />, roles: ["participant", "visitor"] },
  { to: "/admin", label: "Admin Console", icon: <ShieldCheck />, roles: ["admin", "visitor"] },
  { to: "/explore", label: "Explore Farms", icon: <Compass />, roles: ["farmer", "participant", "admin", "visitor"] },
  { to: "/monitoring", label: "Crop Monitoring", icon: <CloudSun />, roles: ["farmer", "participant", "admin", "visitor"] },
  { to: "/analytics", label: "Analytics", icon: <BarChart3 />, roles: ["farmer", "participant", "admin", "visitor"] },
  { to: "/finance", label: "Harvest & Finance", icon: <Wallet />, roles: ["farmer", "admin", "visitor", "participant"] },
];

const roleLabel: Record<Role, string> = { farmer: "Farmer", participant: "Agri Participant", admin: "Administrator", visitor: "Visitor / Demo" };

export function AppLayout({ title, subtitle, roles, children, actions }: { title: string; subtitle?: string; roles?: Role[]; children: ReactNode; actions?: ReactNode }) {
  const user = useSession();
  const navigate = useNavigate();
  const items = NAV.filter((n) => !user || n.roles.includes(user.role));
  const allowed = !roles || (user && roles.includes(user.role));

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="no-print hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="p-5"><Logo light /></div>
        <nav className="flex-1 space-y-1 px-3">
          {items.map((n) => (
            <Link key={n.to} to={n.to} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium opacity-85 transition hover:bg-sidebar-accent hover:opacity-100 [&_svg]:h-4 [&_svg]:w-4" activeProps={{ className: "!bg-sidebar-primary !text-sidebar-primary-foreground !opacity-100" }}>
              {n.icon}{n.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-2 border-t border-sidebar-border p-4 text-sm">
          {user && (
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs opacity-70">{roleLabel[user.role]} · demo session</div>
            </div>
          )}
          <button onClick={() => { resetDemo(); toast.success("Demo data reset to the original sample set."); }} className="flex items-center gap-2 text-xs opacity-70 hover:opacity-100"><RotateCcw className="h-3 w-3" /> Reset demo data</button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="no-print sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-3 px-4 lg:px-8">
            <div className="lg:hidden"><Logo /></div>
            <div className="hidden lg:block"><SimBadge>Prototype · simulated data & authentication</SimBadge></div>
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <span className="hidden rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground sm:inline">{roleLabel[user.role]}</span>
                  <Button variant="outline" size="sm" onClick={() => { logout(); toast("Signed out."); navigate({ to: "/login", replace: true }); }}><LogOut /> Logout</Button>
                </>
              ) : (
                <Button asChild size="sm" variant="gold"><Link to="/login">Login</Link></Button>
              )}
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-2 lg:hidden">
            {items.map((n) => (
              <Link key={n.to} to={n.to} className="whitespace-nowrap rounded-full bg-muted px-3 py-1.5 text-xs font-medium" activeProps={{ className: "!bg-primary !text-primary-foreground" }}>{n.label}</Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
              {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
            </div>
            {allowed && actions}
          </div>
          {allowed ? children : (
            <div className="rounded-2xl border bg-card p-10 text-center shadow-soft">
              <h2 className="text-xl font-semibold">{user ? "This area is for another role" : "Please log in to continue"}</h2>
              <p className="mt-2 text-muted-foreground">{user ? `You're signed in as ${roleLabel[user.role]}. Switch to a ${roles?.map((r) => roleLabel[r]).join(" or ")} demo account.` : "Use one of the one-click demo accounts on the login page."}</p>
              <Button asChild className="mt-5" variant="gold"><Link to="/login">Go to login</Link></Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

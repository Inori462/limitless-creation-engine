import { Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Stage, Verification } from "@/lib/types";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden>
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.35" />
      <path d="M6 28 Q20 22 34 28" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M8 32 Q20 27 32 32" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M20 24 C 12 20, 12 10, 22 7 C 28 14, 26 21, 20 24 Z" fill="var(--gold)" />
      <path d="M20 24 L 22 9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", light ? "text-primary-foreground" : "text-primary")}>
      <LogoMark />
      <span className="font-display text-xl font-bold tracking-wide">BHUMIJA</span>
    </Link>
  );
}

export function SimBadge({ children = "Sample data", className }: { children?: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border border-gold/50 bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground", className)}>
      <FlaskConical className="h-3 w-3" /> {children}
    </span>
  );
}

export function Disclaimer({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-gold/50 bg-accent/60 p-3 text-sm text-accent-foreground">
      <FlaskConical className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{children ?? "Simulation for demonstration only. Participation does not represent a real investment or legal ownership. Returns are not guaranteed."}</p>
    </div>
  );
}

const stageStyles: Record<Stage, string> = {
  Planning: "bg-muted text-muted-foreground",
  Sowing: "bg-secondary text-secondary-foreground",
  Vegetative: "bg-leaf/15 text-primary",
  Flowering: "bg-gold/25 text-accent-foreground",
  Harvest: "bg-warning/20 text-accent-foreground",
  Sold: "bg-primary text-primary-foreground",
};
export function StageBadge({ stage }: { stage: Stage }) {
  return <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", stageStyles[stage])}>{stage}</span>;
}

const verStyles: Record<Verification, string> = {
  Pending: "bg-warning/20 text-accent-foreground",
  Verified: "bg-success/15 text-primary",
  Rejected: "bg-destructive/15 text-destructive",
};
export function VerificationBadge({ v }: { v: Verification }) {
  return <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", verStyles[v])}>{v}</span>;
}

export function StatCard({ label, value, hint, icon }: { label: string; value: ReactNode; hint?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        {icon && <span className="rounded-lg bg-secondary p-2 text-primary">{icon}</span>}
      </div>
      <div className="mt-2 font-display text-2xl font-semibold text-foreground">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl border bg-card p-5 shadow-soft", className)}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed bg-muted/40 p-10 text-center">
      <LogoMark className="mx-auto h-12 w-12 text-primary" />
      <h4 className="mt-3 text-lg font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

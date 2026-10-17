import { lazy, Suspense, useEffect, useState } from "react";
import type { Farm } from "@/lib/types";

const Inner = lazy(() => import("./farm-map-inner"));

export function FarmMap({ farms, height = 320 }: { farms: Pick<Farm, "id" | "name" | "lat" | "lng" | "crop" | "location">[]; height?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const fallback = <div style={{ height }} className="flex items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">Loading map…</div>;
  if (!mounted) return fallback;
  return (
    <Suspense fallback={fallback}>
      <div style={{ height }} className="overflow-hidden rounded-xl border">
        <Inner farms={farms} />
      </div>
    </Suspense>
  );
}

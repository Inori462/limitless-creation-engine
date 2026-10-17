import type { ReactNode } from "react";
import { PublicLayout } from "./public-layout";

export function InfoPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-16 leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
        <h1 className="text-4xl font-semibold text-foreground">{title}</h1>
        {children}
      </article>
    </PublicLayout>
  );
}

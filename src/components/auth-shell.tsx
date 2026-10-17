
import type { ReactNode } from "react";

interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-lg">
        <a
          href="/"
          className="mb-6 block text-center text-2xl font-bold tracking-tight text-primary"
        >
          BHUMIJA
        </a>

        <section className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          {children}
        </section>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Growing together, building a sustainable agricultural future.
        </p>
      </div>
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/info-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — BHUMIJA" },
      { name: "description", content: "How this BHUMIJA prototype handles demo data." },
      { property: "og:title", content: "Privacy Policy — BHUMIJA" },
      { property: "og:description", content: "How this BHUMIJA prototype handles demo data." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <InfoPage title="Privacy">
        <p>This prototype stores demo data only in your own browser (local storage). Nothing is sent to a server.</p>
        <h2>Passwords</h2><p>Demo passwords are hashed in the browser before being stored; plain-text passwords are never saved.</p>
        <h2>Clearing data</h2><p>Use "Reset demo data" in the dashboard sidebar, or clear your browser storage, to remove everything.</p>
    </InfoPage>
  );
}

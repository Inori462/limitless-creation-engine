import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/info-page";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BHUMIJA" },
      { name: "description", content: "BHUMIJA is a hackathon prototype built for the PCCOE International Grand Challenge 2026 under the theme AI for Climate Change." },
      { property: "og:title", content: "About BHUMIJA" },
      { property: "og:description", content: "BHUMIJA is a hackathon prototype built for the PCCOE International Grand Challenge 2026 under the theme AI for Climate Change." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <InfoPage title="About">
        <p>BHUMIJA — "born of the earth" — reimagines a farm as a structured business enterprise. Farmers register crop cycles as enterprises, participants model a hypothetical stake, and everyone tracks cultivation, harvest, sales and profit/loss transparently.</p>
        <h2>Our mission</h2><p>Help small farmers share climate and market risk, access structured capital, and make data-driven decisions.</p>
        <h2>Prototype status</h2><p>All data, authentication, verification and financial figures in this app are simulated for demonstration. No real money, ownership or approvals are involved.</p>
    </InfoPage>
  );
}

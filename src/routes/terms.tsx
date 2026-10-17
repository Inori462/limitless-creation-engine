import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/info-page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — BHUMIJA" },
      { name: "description", content: "Terms of use for the BHUMIJA demonstration prototype." },
      { property: "og:title", content: "Terms of Use — BHUMIJA" },
      { property: "og:description", content: "Terms of use for the BHUMIJA demonstration prototype." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <InfoPage title="Terms">
        <p>BHUMIJA is a demonstration prototype. Participation does not represent a real investment or legal ownership. Returns are not guaranteed.</p>
        <h2>No financial advice</h2><p>Estimates, yields and profit scenarios are illustrative and are not validated agricultural or financial forecasts.</p>
        <h2>No official verification</h2><p>Verification statuses are simulated and do not imply government KYC, land-title verification or official approvals.</p>
    </InfoPage>
  );
}

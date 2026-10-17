import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/public-layout";
import { ContactSection } from "@/components/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BHUMIJA" },
      { name: "description", content: "Contact the BHUMIJA team about pilots and partnerships." },
      { property: "og:title", content: "Contact BHUMIJA" },
      { property: "og:description", content: "Reach the BHUMIJA team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <PublicLayout>
      <ContactSection />
    </PublicLayout>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/rik/Nav";
import { Hero } from "@/components/rik/Hero";
import { Problem } from "@/components/rik/Problem";
import { Technology } from "@/components/rik/Technology";
import { Shields } from "@/components/rik/Shields";
import { Platform } from "@/components/rik/Platform";
import { InterestForm } from "@/components/rik/InterestForm";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RIK — The Road Has Never Had a Guardian" },
      {
        name: "description",
        content:
          "RIK is offline V2V automotive safety hardware built for Indian roads. Detects hazards 1.5km away with zero internet. Register for early access.",
      },
      { property: "og:title", content: "RIK — The Road Has Never Had a Guardian" },
      { property: "og:description", content: "Offline V2V protection. Built for Indian roads." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative bg-background text-foreground" style={{ overflowX: "clip" }}>
      <Nav />
      <Hero />
      <Problem />
      <Technology />
      <Shields />
      <Platform />
      <InterestForm />
      <footer className="border-t border-white/8 py-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          RIK · Making Every Road Safer · Early R&D Phase · India
        </p>
      </footer>
    </main>
  );
}

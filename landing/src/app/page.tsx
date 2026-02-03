import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { AgentsShowcase } from "@/components/sections/agents-showcase";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <section id="features">
        <Features />
      </section>
      <section id="agents">
        <AgentsShowcase />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <CTA />
      <Footer />
    </main>
  );
}

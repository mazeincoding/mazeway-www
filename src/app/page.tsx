import type { Metadata } from "next";
import { Header } from "@/components/header";
import { ConfigSection } from "@/components/config-section";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Services } from "@/components/services";

export const metadata: Metadata = {
  title: "Mazeway - Own Your Authentication Code",
  description:
    "Authentication should live in your project, not in node_modules. A complete, production-ready auth foundation you can build on.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col gap-24 px-4 py-24 md:px-8">
        <Hero />
        <Features />
        <ConfigSection />
        <Services />
      </main>
    </div>
  );
}

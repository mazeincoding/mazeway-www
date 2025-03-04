import { Header } from "@/components/header";
import { ConfigSection } from "@/components/config-section";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Services } from "@/components/services";

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

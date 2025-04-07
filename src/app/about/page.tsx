import Link from "next/link";
import { Header } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Mazeway",
  description:
    "Learn about Mazeway - a complete, production-ready authentication foundation that belongs in your project, not in node_modules.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col gap-12 py-16 lg:py-24 px-8">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Authentication that you own
          </h1>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-xl text-muted-foreground mb-12">
              Born from countless hours building authentication systems, Mazeway
              is the production-ready auth foundation that lives in your
              codebase, not buried in node_modules.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Why Mazeway?</h2>
              <p className="text-muted-foreground">
                Think Clerk, but you own every line of code. Like Shadcn UI
                revolutionized component libraries by putting the code in your
                project, Mazeway does the same for authentication. No vendor
                lock-in, no scaling costs, just clean, secure code you control.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                The Mazeway philosophy
              </h2>
              <p className="text-muted-foreground mb-4">
                We believe authentication should be:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Owned by you, not locked behind a service</li>
                <li>Affordable through smart infrastructure choices</li>
                <li>Completely customizable to your needs</li>
                <li>Open source and community-driven</li>
                <li>A foundation to build upon, not a black box</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                Complete Authentication
              </h2>
              <p className="text-muted-foreground mb-4">
                Mazeway provides everything modern applications need:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Multiple sign-in options including email/password, Google, and
                  GitHub
                </li>
                <li>
                  Comprehensive 2FA with authenticator app, SMS, and backup
                  codes
                </li>
                <li>Device session management and security alerts</li>
                <li>Complete user settings and profile management</li>
                <li>API rate limiting and DDoS protection built-in</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our story</h2>
              <p className="text-muted-foreground">
                Throughout 2024, I found myself building the same authentication
                systems over and over again. By April, I was dreaming of having
                a solid auth starter I could just clone for new projects. But it
                remained just that - a dream, a "future project". Then came
                December 9th, the day after my birthday, when I finally said
                "screw it, I'm building this" - and Mazeway was born. The next
                four months were intense. January 2025 hit hard - bugs
                everywhere, missing features, and moments where giving up felt
                tempting. But there was no choice but to push through. By late
                January, the bugs were getting squashed, features were falling
                into place, and what started as frustration was becoming
                something developers could actually build on.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

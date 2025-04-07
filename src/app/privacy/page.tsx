import Link from "next/link";
import { Header } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy - Mazeway",
  description:
    "Mazeway's privacy commitment - your authentication system, your data, your responsibility.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col gap-12 py-16 lg:py-24 px-8">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Privacy Statement
          </h1>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-xl text-muted-foreground mb-12">
              Mazeway is a codebase foundation that lives in YOUR project. We
              don't collect, store, or process any of your data.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                Your Data, Your Control
              </h2>
              <p className="text-muted-foreground">
                Mazeway is not a service - it's code that you own and run. This
                means:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  You own and control all data collected through your
                  implementation
                </li>
                <li>Your authentication data stays in your database</li>
                <li>We have zero access to your users or their data</li>
                <li>
                  You're responsible for your own privacy policy and data
                  handling
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Website Data</h2>
              <p className="text-muted-foreground">
                The only data we might collect is if you contact us through our
                website - in which case we'll have your email address. That's
                just common sense for responding to you.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">For Developers</h2>
              <p className="text-muted-foreground mb-4">
                When implementing Mazeway in your project, remember to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Create your own privacy policy that covers your specific
                  implementation
                </li>
                <li>
                  Configure data handling according to your jurisdiction's
                  requirements
                </li>
                <li>
                  Set up appropriate data protection measures for your users
                </li>
                <li>
                  Handle GDPR and other compliance requirements for your region
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p className="text-muted-foreground">
                Questions about implementing privacy features in your Mazeway
                setup? Check out our docs or{" "}
                <Link href="/contact" className="underline">
                  get in touch
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

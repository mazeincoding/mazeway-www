import Link from "next/link";
import { Header } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms - Mazeway",
  description:
    "Understand the terms of using Mazeway's authentication foundation in your projects.",
};

export default function PolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col gap-12 py-16 lg:py-24 px-8">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Terms of Use
          </h1>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-xl text-muted-foreground mb-12">
              Mazeway is an open-source authentication foundation. These terms
              outline how you can use, modify, and build upon our codebase.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">License</h2>
              <p className="text-muted-foreground mb-4">
                Mazeway is open-source software that you can freely:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use in any project (commercial or personal)</li>
                <li>Modify and customize to your needs</li>
                <li>Distribute with your applications</li>
                <li>Fork and improve upon</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Just like Shadcn UI, the code lives in your project - you own
                it, you control it.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">No Warranties</h2>
              <p className="text-muted-foreground mb-4">
                Important things to understand:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  The codebase is provided "as is" without warranty of any kind
                </li>
                <li>You're responsible for your implementation's security</li>
                <li>We're not liable for how you use or modify the code</li>
                <li>No guarantees about fitness for any particular purpose</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                Third-Party Services
              </h2>
              <p className="text-muted-foreground mb-4">
                The foundation integrates with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Supabase</li>
                <li>Resend</li>
                <li>Upstash Redis</li>
                <li>Trigger.dev</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You'll need to comply with their terms when using these services
                in your implementation. You're free to modify the code to use
                different services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                Your Implementation
              </h2>
              <p className="text-muted-foreground mb-4">
                When using Mazeway, you're responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Security of your implementation</li>
                <li>Compliance with laws in your jurisdiction</li>
                <li>Your own terms of service and privacy policy</li>
                <li>Keeping dependencies updated</li>
                <li>Any modifications you make to the code</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Contributing</h2>
              <p className="text-muted-foreground">
                Found a bug? Got an improvement? Contributions are welcome!
                Check out our GitHub repository for contribution guidelines. By
                contributing, you agree to license your code under the same
                terms as Mazeway.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
              <p className="text-muted-foreground">
                Need help with implementation or have questions? Check the docs
                or{" "}
                <Link href="/contact" className="underline">
                  reach out
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

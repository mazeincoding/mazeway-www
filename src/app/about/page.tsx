import Link from "next/link";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col gap-12 px-4 py-24 md:px-8">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Building Secure Auth for Modern Apps
          </h1>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-xl text-muted-foreground mb-12">
              Hi, I'm Maze. I'm a security-first developer who believes
              authentication should live in your project, not in a node_modules
              folder.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Why Me?</h2>
              <p className="text-muted-foreground">
                Security isn't an afterthought in my work—it's my default state
                of mind. Every line of code I write starts with "but what
                if...?" This obsession with edge cases and potential
                vulnerabilities means I catch security issues before they become
                problems. And most importantly: you own the code.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                My Security-First Mindset
              </h2>
              <p className="text-muted-foreground mb-4">
                I'm not interested in just making things work—I'm driven to make
                them right. This means:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Anticipating edge cases before they occur</li>
                <li>Questioning every assumption in the authentication flow</li>
                <li>
                  Building systems that are secure by design, not by accident
                </li>
                <li>Giving you complete control over your authentication</li>
                <li>Never compromising on security fundamentals</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">What You Get</h2>
              <p className="text-muted-foreground mb-4">
                My obsession with security translates into robust systems that
                you own and control:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Complete multi-factor authentication with proper edge case
                  handling
                </li>
                <li>Comprehensive device session management and tracking</li>
                <li>Security alerts for critical events</li>
                <li>Proper API rate limiting and DDoS protection</li>
                <li>Code that lives in your project, not in node_modules</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                Ready for Real Security?
              </h2>
              <p className="text-muted-foreground">
                If you want authentication that's truly yours, built by someone
                who obsesses over security edge cases, let's talk. I'll help you
                implement enterprise-grade security that you control, not a
                black box you're locked into.
              </p>
            </section>

            <div className="mt-12">
              <Link href="/contact">
                <Button size="lg" className="font-medium">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

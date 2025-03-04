import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import {
  CheckCircle2,
  Shield,
  Fingerprint,
  Bell,
  Lock,
  Code,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col gap-24 px-4 py-24 md:px-8">
        <Hero />
        <Features />
        <Services />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Complete auth foundation you can customize
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Drop in production-ready auth code with everything apps need
        </p>
        <div className="flex gap-3 mt-4 justify-center">
          <Link href="https://demo.mazeway.dev">
            <Button size="lg">Try demo</Button>
          </Link>
          <a
            href="https://github.com/mazeincoding/mazeway"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline">
              View on GitHub
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-3">
          Features
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Enterprise-Grade Authentication
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Security-first authentication with all the features modern
          applications need
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Lock />}
          title="Complete Authentication"
          description="Email/password and OAuth providers with secure signup, login, and password reset flows."
        />
        <FeatureCard
          icon={<Fingerprint />}
          title="Advanced 2FA"
          description="Authenticator app, SMS, and backup codes with seamless verification flows."
        />
        <FeatureCard
          icon={<Shield />}
          title="Device Management"
          description="Track active sessions, revoke device access, and receive alerts for new logins."
        />
        <FeatureCard
          icon={<Zap />}
          title="Security Focused"
          description="API rate limiting, multi-layer validation, and database-level security."
        />
        <FeatureCard
          icon={<Code />}
          title="Developer Friendly"
          description="Customizable configuration, clean code structure, and comprehensive documentation."
        />
        <FeatureCard
          icon={<Bell />}
          title="Implementation Services"
          description="Expert integration with your existing Next.js and Supabase applications."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-secondary w-10 h-10 flex items-center justify-center mb-4 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function Services() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-3">
          Services
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Implementation Services
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Secure your application with enterprise-grade authentication
          implemented by a security specialist
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold mb-6">Core Implementation</h3>
          <ul className="space-y-4 mb-8">
            <ServiceItem text="Complete authentication system" />
            <ServiceItem text="Multi-factor authentication" />
            <ServiceItem text="Device session management" />
            <ServiceItem text="Security alerts and monitoring" />
            <ServiceItem text="API rate limiting" />
            <ServiceItem text="Integration with your existing app" />
          </ul>
          <Link href="/contact">
            <Button className="w-full">Get in touch</Button>
          </Link>
        </div>

        <div className="bg-card rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold mb-6">Advanced Features</h3>
          <ul className="space-y-4 mb-8">
            <ServiceItem text="Custom authentication flows" />
            <ServiceItem text="Advanced security policies" />
            <ServiceItem text="User activity tracking" />
            <ServiceItem text="Custom provider integration" />
            <ServiceItem text="Security audit and hardening" />
            <ServiceItem text="Ongoing security maintenance" />
          </ul>
          <Link href="/contact">
            <Button variant="outline" className="w-full">
              Learn more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ServiceItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
}

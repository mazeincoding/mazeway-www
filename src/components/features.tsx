import { Badge } from "@/components/ui/badge";
import { Lock, Fingerprint, Shield, Zap, Code, Bell } from "lucide-react";
import type { ReactNode } from "react";

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
    <div className="bg-card rounded-md p-6 border shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-secondary w-10 h-10 flex items-center justify-center mb-4 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function Features() {
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

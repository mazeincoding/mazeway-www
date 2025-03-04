import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

function ServiceItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
      <span>{text}</span>
    </li>
  );
}

export function Services() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-3">
          Services
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Enterprise-Grade Auth Implementation
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Secure your Next.js + Supabase application with bulletproof
          authentication
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="bg-card rounded-md p-8 border shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold mb-6">Complete Auth Solution</h3>
          <ul className="space-y-4 mb-8">
            <ServiceItem text="Multi-factor authentication (Authenticator, SMS, Backup codes)" />
            <ServiceItem text="Device session management with security alerts" />
            <ServiceItem text="Advanced device verification system" />
            <ServiceItem text="Configurable email alerts for unknown logins" />
            <ServiceItem text="API rate limiting with Redis" />
            <ServiceItem text="Developer-friendly configuration options" />
          </ul>
          <Link href="/contact">
            <Button className="w-full">Get in touch</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

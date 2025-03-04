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
          Implementation Services
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Secure your application with enterprise-grade authentication
          implemented by a security specialist
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card rounded-md p-8 border shadow-sm hover:shadow-md transition-shadow">
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

        <div className="bg-card rounded-md p-8 border shadow-sm hover:shadow-md transition-shadow">
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

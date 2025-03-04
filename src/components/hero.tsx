import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Complete auth foundation you can customize
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Drop in production-ready auth code with everything apps need
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="https://demo.mazeway.dev/auth/login">
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

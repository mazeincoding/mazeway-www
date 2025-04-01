import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const meta: Metadata = {
  title: {
    default: "Mazeway - Complete auth you own",
    template: "%s | Mazeway",
  },
  description:
    "A complete, production-ready auth foundation you can build on - like Clerk but you own the code.",
  keywords: [
    "Next.js auth starter",
    "Shadcn UI for auth",
    "Mazeway",
    "Maze Winther",
    "Next.js auth",
    "Open source Clerk",
    "Supabase auth",
    "Supabase auth starter",
    "Enterprise authentication",
    "Open source auth",
  ],
  authors: [{ name: "Maze" }],
  metadataBase: new URL("https://mazeway.dev"),
  alternates: {
    canonical: "https://mazeway.dev/",
  },
  openGraph: {
    title: "Mazeway - Own Your Authentication Code",
    description:
      "A complete, production-ready auth foundation you can build on - like Clerk but you own the code.",
    type: "website",
    url: "https://mazeway.dev",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mazeway - Own Your Authentication Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mazeway - Own Your Authentication Code",
    description:
      "A complete, production-ready auth foundation you can build on - like Clerk but you own the code.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Mazeway",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "Authentication should live in your project, not in node_modules. A complete, production-ready auth foundation you can build on.",
              softwareRequirements: "Next.js, Supabase",
              programmingLanguage: ["TypeScript", "JavaScript"],
              featureList: [
                "Complete authentication flow",
                "Two-factor authentication (2FA)",
                "Device session management",
                "Email alerts for security events",
                "API rate limiting",
                "Customizable configuration",
              ],
              author: {
                "@type": "Person",
                name: "Maze",
              },
              codeRepository: "https://github.com/mazeincoding/mazeway",
              keywords: "authentication, Next.js, Supabase, 2FA, security",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

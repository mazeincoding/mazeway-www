import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Mazeway",
  description:
    "Get in touch about implementing enterprise-grade authentication in your Next.js application.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

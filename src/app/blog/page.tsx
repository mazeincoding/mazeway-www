import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog - Mazeway",
  description:
    "Latest articles, tutorials, and updates about Mazeway and web authentication.",
};

// Mock blog post data - replace with your actual data fetching logic
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Mazeway",
    description:
      "A comprehensive guide to setting up Mazeway in your Next.js project.",
    date: "March 15, 2025",
    readTime: "5 min read",
    slug: "getting-started",
    category: "Tutorial",
  },
  {
    id: 2,
    title: "Implementing Two-Factor Authentication",
    description:
      "Learn how to enhance your app's security with 2FA using Mazeway.",
    date: "March 10, 2025",
    readTime: "7 min read",
    slug: "implementing-2fa",
    category: "Security",
  },
  {
    id: 3,
    title: "Managing User Sessions Effectively",
    description:
      "Best practices for handling user sessions in modern web applications.",
    date: "March 5, 2025",
    readTime: "6 min read",
    slug: "managing-sessions",
    category: "Best Practices",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col gap-16 px-4 py-16 md:px-8">
        {/* Hero Section */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Mazeway Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Insights, tutorials, and updates about authentication and security
              for modern web applications
            </p>
          </div>
        </div>

        {/* Latest Articles */}
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <Button variant="outline" asChild>
              <Link href="/blog/archive">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="flex flex-col h-full hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                  <Button variant="ghost" className="p-0 h-auto" asChild>
                    <Link href={`/blog/${post.slug}`}>Read More →</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

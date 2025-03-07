"use client";

import { Button } from "@/components/ui/button";
import * as htmlToImage from "html-to-image";

export default function OGImagePage() {
  const handleSave = async () => {
    const element = document.getElementById("og-image");
    if (!element) return;

    try {
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1.0,
        width: 1200,
        height: 630,
      });

      // Create a download link
      const link = document.createElement("a");
      link.download = "og-image.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Failed to save image. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8">
      {/* Controls */}
      <div className="w-full max-w-[1200px] flex justify-between items-center">
        <h1 className="text-2xl font-bold">OG Image Designer</h1>
        <Button onClick={handleSave}>Save as Image</Button>
      </div>

      {/* OG Image Canvas - 1200x630 */}
      <div
        id="og-image"
        className="w-[1200px] h-[630px] bg-background border rounded-lg overflow-hidden flex"
      >
        {/* Left side - Code */}
        <div className="flex-1 border-r p-12 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground font-mono">
              node_modules/auth/package.json
            </div>
            <div className="font-mono text-destructive line-through opacity-50">
              {`{
  "name": "auth-package",
  "private": true,
  "version": "1.0.0"
}`}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground font-mono">
              your-project/auth/config.ts
            </div>
            <div className="font-mono text-primary">
              {`export const authConfig = {
  methods: {
    email: true,
    google: true
  },
  security: {
    mfa: true,
    deviceTracking: true
  }
}`}
            </div>
          </div>
        </div>

        {/* Right side - Text */}
        <div className="flex-1 p-12 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Mazeway Auth</h1>
            <p className="text-2xl text-muted-foreground">
              Authentication should live in your project, not in node_modules
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium">Own your code</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium">Enterprise-ready security</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium">Complete auth foundation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

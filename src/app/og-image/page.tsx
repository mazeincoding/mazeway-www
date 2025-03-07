"use client";

import { Button } from "@/components/ui/button";
import * as htmlToImage from "html-to-image";

export default function OGImagePage() {
  const handleSave = async () => {
    const element = document.getElementById("og-image");
    if (!element) return;

    try {
      const dataUrl = await htmlToImage.toJpeg(element, {
        quality: 0.95,
        width: 1200,
        height: 630,
      });

      const link = document.createElement("a");
      link.download = "og-image.jpg";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Failed to save image. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8">
      <div className="w-full max-w-[1200px] flex justify-between items-center">
        <h1 className="text-2xl font-bold">OG Image Designer</h1>
        <Button onClick={handleSave}>Save as Image</Button>
      </div>

      <div
        id="og-image"
        className="w-[1200px] h-[630px] bg-black flex items-center justify-center relative overflow-hidden"
      >
        {/* Background subtle pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10" />
          <div className="grid grid-cols-6 w-full h-full opacity-[0.15]">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/30" />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative text-center space-y-4">
          <h1 className="text-6xl font-bold text-white">
            Authentication in <span className="text-primary">your</span> project
          </h1>
          <p className="text-3xl text-white/60">not in node_modules</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaGithub, FaTwitter } from "react-icons/fa";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 backdrop-blur-lg border-b sticky top-0 z-30 bg-background/50">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://res.cloudinary.com/dzjgehvid/image/upload/v1741403094/text-logo-black_xh4avc.png"
            alt="Logo"
            width={617}
            height={121}
            priority
            className="dark:invert w-auto h-7"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link href="https://github.com/mazeincoding/mazeway" target="_blank">
            <Button variant="ghost" size="icon">
              <FaGithub className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://twitter.com/mazewinther1" target="_blank">
            <Button variant="ghost" size="icon">
              <FaTwitter className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { LINKS } from "@/lib/constants";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/favicon.svg" alt="SuperAgents" width={32} height={32} />
          <span className="font-semibold text-lg">SuperAgents</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a
            href="#agents"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Agents
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
        </nav>

        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size: "sm" })}>
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </motion.header>
  );
}

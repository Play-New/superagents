"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  filename,
  language = "typescript",
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card overflow-hidden",
        className
      )}
    >
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              {filename}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-muted transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      )}
      <div className="overflow-auto max-h-[500px]">
        <pre className="p-4 text-sm font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="inline-block w-8 text-muted-foreground/50 select-none text-right mr-4">
                    {i + 1}
                  </span>
                )}
                <span className="flex-1">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

interface TerminalBlockProps {
  lines: Array<{
    type: "input" | "output" | "success" | "info";
    content: string;
    delay?: number;
  }>;
  className?: string;
}

export function TerminalBlock({ lines, className }: TerminalBlockProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-neutral-950 overflow-hidden",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-neutral-900">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-sm text-muted-foreground ml-2">Terminal</span>
      </div>
      <div className="p-4 font-mono text-sm space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="flex items-start gap-2">
            {line.type === "input" && (
              <>
                <span className="text-green-500">$</span>
                <span className="text-foreground">{line.content}</span>
              </>
            )}
            {line.type === "output" && (
              <span className="text-muted-foreground pl-4">{line.content}</span>
            )}
            {line.type === "success" && (
              <span className="text-green-500 pl-4">{line.content}</span>
            )}
            {line.type === "info" && (
              <span className="text-primary pl-4">{line.content}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

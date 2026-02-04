import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "SuperAgents by Play New - AI Agents That Think Like Experts",
  description:
    "Transform your Claude Code into an agentic powerhouse. 15 expert-backed agents built on principles from Uncle Bob, Dan Abramov, Kent Beck, and more.",
  keywords: [
    "Claude Code",
    "AI agents",
    "code generation",
    "developer tools",
    "Play New",
    "TypeScript",
    "React",
    "Node.js",
  ],
  authors: [{ name: "Play New" }],
  openGraph: {
    title: "SuperAgents by Play New - AI Agents That Think Like Experts",
    description:
      "Transform your Claude Code into an agentic powerhouse. Expert-backed agents. Built in.",
    url: "https://superagents.dev",
    siteName: "SuperAgents",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperAgents by Play New - AI Agents That Think Like Experts",
    description:
      "Transform your Claude Code into an agentic powerhouse. Expert-backed agents. Built in.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden max-w-[100vw]">
      <body className="overflow-x-hidden max-w-[100vw]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Floating glow blobs - inside overflow-hidden container to prevent scroll */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="glow-blob glow-blob-1" />
            <div className="glow-blob glow-blob-2" />
            <div className="glow-blob glow-blob-3" />
          </div>
          <div className="relative z-10 w-full max-w-[100vw] overflow-x-hidden">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

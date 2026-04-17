import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  /** Removes max-width constraint for full-bleed layouts */
  fullWidth?: boolean;
  /** Hides footer for focused pages (e.g. post forms) */
  noFooter?: boolean;
  /** Extra classes on the main content wrapper */
  className?: string;
}

export function Layout({
  children,
  fullWidth = false,
  noFooter = false,
  className = "",
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main
        className={`flex-1 ${fullWidth ? "" : "max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8"} ${className}`}
      >
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  );
}

/** Section wrapper with alternating bg treatment */
export function Section({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: "default" | "muted" | "card";
  className?: string;
}) {
  const bg =
    variant === "muted"
      ? "bg-muted/30"
      : variant === "card"
        ? "bg-card"
        : "bg-background";

  return (
    <section className={`${bg} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

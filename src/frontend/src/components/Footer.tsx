import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { Briefcase, ExternalLink, Mail, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";

interface FooterLink {
  label: string;
  href: string;
  hasQuery?: boolean;
}

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Jobs: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "IT Jobs", href: "/jobs?category=IT", hasQuery: true },
    { label: "Non-IT Jobs", href: "/jobs?category=NonIT", hasQuery: true },
    { label: "Post a Job", href: "/jobs/post" },
  ],
  Products: [
    { label: "Browse Products", href: "/products" },
    {
      label: "Electronics",
      href: "/products?category=Electronics",
      hasQuery: true,
    },
    { label: "Clothing", href: "/products?category=Clothing", hasQuery: true },
    { label: "List a Product", href: "/products/post" },
  ],
  Account: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Profile", href: "/profile" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      data-ocid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your professional dual marketplace for finding top IT & Non-IT
              jobs and buying or selling all types of products.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-amber-500">
                <Briefcase size={13} />
                <span>IT & Non-IT Jobs</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                <ShoppingBag size={13} />
                <span>All Products</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.hasQuery ? (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                        data-ocid={`footer.${section.toLowerCase()}_${link.label.replace(/\s+/g, "_").toLowerCase()}_link`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                        data-ocid={`footer.${section.toLowerCase()}_${link.label.replace(/\s+/g, "_").toLowerCase()}_link`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {year}{" "}
            <span className="font-semibold text-foreground">
              Chandu Jobs & Products
            </span>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:support@chandu.app"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              data-ocid="footer.contact_link"
            >
              <Mail size={14} />
              Contact
            </a>
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              data-ocid="footer.caffeine_link"
            >
              Built with{" "}
              <span className="font-medium text-primary">caffeine.ai</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

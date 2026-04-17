import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Briefcase,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  {
    label: "Jobs",
    href: "/jobs",
    icon: Briefcase,
    accent: "text-amber-500",
    badge: "IT & Non-IT",
    badgeClass: "badge-jobs",
  },
  {
    label: "Products",
    href: "/products",
    icon: ShoppingBag,
    accent: "text-emerald-500",
    badge: "All Categories",
    badgeClass: "badge-products",
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isLoading, principal, login, logout } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (href: string) =>
    currentPath === href || currentPath.startsWith(`${href}/`);

  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}...${principal.slice(-4)}`
    : "";

  return (
    <header
      className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm"
      data-ocid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 transition-opacity hover:opacity-80"
            data-ocid="navbar.logo_link"
          >
            <Logo size="md" />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth
                    ${
                      active
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }
                  `}
                  data-ocid={`navbar.${link.label.toLowerCase()}_link`}
                >
                  <Icon size={16} className={active ? link.accent : ""} />
                  <span>{link.label}</span>
                  <span
                    className={`hidden lg:inline-flex ${link.badgeClass} ml-1`}
                  >
                    {link.badge}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/jobs" data-ocid="navbar.search_button">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Search"
              >
                <Search size={18} />
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="hidden md:flex items-center gap-1.5"
                    data-ocid="navbar.account_button"
                  >
                    <User size={15} />
                    <span className="font-mono text-xs">{shortPrincipal}</span>
                    <ChevronDown size={13} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2"
                      data-ocid="navbar.dashboard_link"
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2"
                      data-ocid="navbar.profile_link"
                    >
                      <User size={14} />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive focus:text-destructive flex items-center gap-2"
                    data-ocid="navbar.logout_button"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isLoading}
                className="hidden md:flex items-center gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="navbar.signin_button"
              >
                <LogIn size={15} />
                {isLoading ? "Connecting…" : "Sign In"}
              </Button>
            )}

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              data-ocid="navbar.mobile_menu_button"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-border bg-card"
          data-ocid="navbar.mobile_menu"
        >
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth
                    ${active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
                  `}
                  data-ocid={`navbar.mobile_${link.label.toLowerCase()}_link`}
                >
                  <Icon size={18} className={link.accent} />
                  {link.label}
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {link.badge}
                  </Badge>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-border">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    data-ocid="navbar.mobile_dashboard_link"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    data-ocid="navbar.mobile_profile_link"
                  >
                    <User size={18} /> Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-destructive hover:bg-secondary/50"
                    data-ocid="navbar.mobile_logout_button"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  disabled={isLoading}
                  data-ocid="navbar.mobile_signin_button"
                >
                  <LogIn size={15} className="mr-2" />
                  {isLoading ? "Connecting…" : "Sign In with Internet Identity"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

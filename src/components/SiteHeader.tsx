import { Link, NavLink as RNL, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/products", label: "Products" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-cinematic",
        scrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="container-tight flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group" aria-label="NETSO home">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-sun shadow-sun">
            <Sun className="h-4 w-4 text-primary-foreground" strokeWidth={2.4} />
          </span>
          <span className="font-display text-xl tracking-tight">NETSO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <RNL
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-sm transition-colors duration-300 relative",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {l.label}
            </RNL>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/feasibility"
            className={cn(
              "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium",
              "bg-primary text-primary-foreground shadow-sun",
              "transition-all duration-300 ease-cinematic hover:scale-[1.03] hover:brightness-110"
            )}
          >
            Check rooftop potential
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-cinematic bg-background/95 backdrop-blur-xl border-b border-border",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container-tight py-6 flex flex-col gap-1">
          {links.map((l) => (
            <RNL
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "py-3 text-base border-b border-border/40",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )
              }
            >
              {l.label}
            </RNL>
          ))}
          <Link
            to="/feasibility"
            className="mt-4 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium bg-primary text-primary-foreground shadow-sun"
          >
            Check rooftop potential
          </Link>
        </div>
      </div>
    </header>
  );
};

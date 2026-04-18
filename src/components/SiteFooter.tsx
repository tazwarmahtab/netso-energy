import { Link } from "react-router-dom";
import { Sun } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container-tight py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-sun">
              <Sun className="h-4 w-4 text-primary-foreground" strokeWidth={2.4} />
            </span>
            <span className="font-display text-xl">NETSO</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Rooftop energy infrastructure for Bangladesh. We turn unused rooftops into
            long-term energy assets — quietly, beautifully, at scale.
          </p>
          <Link
            to="/feasibility"
            className="inline-flex items-center text-sm text-primary hover:text-primary-glow transition-colors"
          >
            Check your rooftop potential →
          </Link>
        </div>

        <div className="space-y-3">
          <p className="eyebrow">Platform</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/how-it-works" className="hover:text-foreground transition-colors">How it works</Link></li>
            <li><Link to="/products" className="hover:text-foreground transition-colors">Solar pergola</Link></li>
            <li><Link to="/projects" className="hover:text-foreground transition-colors">Projects</Link></li>
            <li><Link to="/feasibility" className="hover:text-foreground transition-colors">Feasibility</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="eyebrow">Company</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
            <li><a href="mailto:hello@netso.energy" className="hover:text-foreground transition-colors">hello@netso.energy</a></li>
            <li><span>Dhaka, Bangladesh</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="container-tight py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} NETSO Energy. All rights reserved.</p>
          <p>Distributed energy infrastructure · Made in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};

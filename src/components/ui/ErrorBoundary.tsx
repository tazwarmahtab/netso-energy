import { Component, ReactNode, ErrorInfo } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useSiteCopy } from "@/lib/site-copy";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryInner extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <DefaultErrorFallback />;
    }

    return this.props.children;
  }
}

export function ErrorBoundary(props: Props) {
  return <ErrorBoundaryInner {...props} />;
}

function DefaultErrorFallback() {
  const { language } = useLanguage();
  const copy = useSiteCopy();
  const isBn = language === "bn";

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-border/70 bg-secondary/10 p-8 text-center backdrop-blur-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="mb-2 font-display text-xl text-foreground">
        {isBn ? "কন্টেন্ট লোড হতে সমস্যা হয়েছে" : "Failed to load content"}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        {isBn 
          ? "দয়া করে পেজটি রিলোড করুন বা আবার চেষ্টা করুন।" 
          : "An unexpected error occurred while loading this section. Please refresh the page."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/30"
      >
        <RefreshCw className="h-4 w-4" />
        {isBn ? "রিলোড করুন" : "Reload page"}
      </button>
    </div>
  );
}

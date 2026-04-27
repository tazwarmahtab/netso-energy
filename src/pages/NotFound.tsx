import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  const copy =
    language === "bn"
      ? {
          headline: "এই ছাদটি পাওয়া যায়নি।",
          body: "আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, অথবা কখনও তৈরি করা হয়নি।",
          cta: "হোমে ফিরে যান",
        }
      : {
          headline: "This rooftop doesn't exist.",
          body: "The page you're looking for has moved or was never built.",
          cta: "Return home",
        };

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="min-h-[80vh] flex items-center pt-32">
      <div className="container-tight text-center max-w-xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">404</p>
        <h1 className="display-text text-5xl md:text-7xl text-balance">
          {copy.headline}
        </h1>
        <p className="mt-6 text-muted-foreground">
          {copy.body}
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-sun transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
        >
          {copy.cta}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;

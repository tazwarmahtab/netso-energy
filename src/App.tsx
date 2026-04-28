import { Suspense, lazy, type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SiteLayout } from "@/components/SiteLayout";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const HowItWorks = lazy(() => import("./pages/HowItWorks.tsx"));
const Projects = lazy(() => import("./pages/Projects.tsx"));
const Products = lazy(() => import("./pages/Products.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Feasibility = lazy(() => import("./pages/Feasibility.tsx"));

const RouteFallback = () => <div className="min-h-[40vh]" aria-hidden="true" />;

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{element}</Suspense>
);

const App = () => (
  <>
    <Sonner />
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Index />} />
          <Route
            path="/how-it-works"
            element={withSuspense(<HowItWorks />)}
          />
          <Route path="/projects" element={withSuspense(<Projects />)} />
          <Route path="/products" element={withSuspense(<Products />)} />
          <Route path="/about" element={withSuspense(<About />)} />
          <Route
            path="/feasibility"
            element={withSuspense(<Feasibility />)}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default App;

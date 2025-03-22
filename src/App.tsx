import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import CookieConsent from "./components/ui/cookie-consent";
import Index from "./pages/Index";
import Pergolas from "./pages/Pergolas";
import Abris from "./pages/Abris";
import Portails from "./pages/Portails";
import Menuiseries from "./pages/Menuiseries";
import Realisations from "./pages/Realisations";
import RealisationDetail from "./pages/RealisationDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import { initEmailJS } from "@/services/email-service";

// Scroll restoration component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialiser EmailJS au chargement de l'application
    initEmailJS();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products/pergolas" element={<Pergolas />} />
              <Route path="/products/abris" element={<Abris />} />
              <Route path="/products/portails" element={<Portails />} />
              <Route path="/products/menuiseries" element={<Menuiseries />} />
              <Route path="/realisations" element={<Realisations />} />
              <Route path="/realisations/:id" element={<RealisationDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieConsent />
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;

import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquare, HelpCircle, Headphones, Phone } from "lucide-react";
import { useAppStore } from "./lib/stores/app-store";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CartSidebar } from "./components/layout/CartSidebar";
import { FloatingActionButton } from "./components/ui/floating-action-button";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Wishlist from "./pages/Wishlist";
import Shipping from "./pages/Shipping";
import Compare from "./pages/Compare";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import { PageTransition } from "./components/ui/page-transition";

const queryClient = new QueryClient();

function AppContent() {
  const { theme } = useAppStore();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Don't show FAB on certain pages
  const hideFABPages = ['/login', '/register', '/admin'];
  const showFAB = !hideFABPages.includes(location.pathname);

  const floatingActions = [
    {
      icon: MessageSquare,
      label: 'Live Chat',
      onClick: () => alert('Live chat feature coming soon!'),
      color: 'bg-blue-600'
    },
    {
      icon: Phone,
      label: 'Call Support',
      onClick: () => window.open('tel:+15551234567'),
      color: 'bg-green-600'
    },
    {
      icon: HelpCircle,
      label: 'Help Center',
      onClick: () => window.location.href = '/help',
      color: 'bg-orange-600'
    },
    {
      icon: Headphones,
      label: 'Contact Us',
      onClick: () => window.location.href = '/contact',
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<PlaceholderPage title="Register" />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/returns" element={<PlaceholderPage title="Returns & Exchanges" />} />
            <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
            <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <CartSidebar />
      {showFAB && <FloatingActionButton actions={floatingActions} />}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

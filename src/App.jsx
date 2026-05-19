import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router";
import { useEffect } from "react";

import { CartProvider } from "./context/CartContext";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import Sonner from "./components/ui/sonner";

import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import ServicePage from "./pages/ServicePage";
import SupportPage from "./pages/SupportPage";
import ReviewPage from "./pages/ReviewPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import WelcomePage from "./pages/WelcomePage";
import CheckoutPage from "./pages/CheckoutPage";
import QRTableOrderingPage from "./pages/QRTableOrderingPage";
import HomeDeliveryPage from "./pages/HomeDeliveryPage";
import PrivateDiningPage from "./pages/PrivateDiningPage";
import CateringServicePage from "./pages/CateringServicePage";
import LoyaltyRewardsPage from "./pages/LoyaltyRewardsPage";
import OurStoryPage from "./pages/OurStoryPage";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
// ✅ NEW FLOW PAGES
import AuthPage from "./pages/AuthPage";
import BookingPage from "./pages/BookingPage";

function AppShell() {
  const location = useLocation();

  // ✅ SAFE GUEST PARSE (FIXED)
  const guest = JSON.parse(sessionStorage.getItem("guest"));

  const isGuestValid = !!guest?.name || !!guest?.email || !!guest?.phone;

  // ✅ CLEAN SESSION CLEAR (VERCEL SAFE)
  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.removeItem("guest");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  // ❗ Redirect first-time users
  if (!isGuestValid && location.pathname !== "/welcome") {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* Header hidden on welcome */}
      {location.pathname !== "/welcome" && <Header />}

      <div className="flex flex-1">
        <main className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex-1">
            <Routes>
              {/* Welcome */}
              <Route path="/welcome" element={<WelcomePage />} />

              {/* Main pages */}
              <Route path="/" element={<HomePage />} />

              <Route
                path="/menu"
                element={<Navigate to="/menu/foods" replace />}
              />
              <Route path="/menu/:tab" element={<MenuPage />} />

              <Route path="/service" element={<ServicePage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/our-story" element={<OurStoryPage />} />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* QR SYSTEM */}
              <Route
                path="/services/qr-table-ordering"
                element={<QRTableOrderingPage />}
              />

              {/* 🔥 AUTH FLOW ADDED */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/booking" element={<BookingPage />} />

              {/* Other services */}
              <Route
                path="/services/home-delivery"
                element={<HomeDeliveryPage />}
              />
              <Route
                path="/services/private-dining"
                element={<PrivateDiningPage />}
              />
              <Route
                path="/services/catering-service"
                element={<CateringServicePage />}
              />
              <Route
                path="/services/loyalty-rewards"
                element={<LoyaltyRewardsPage />}
              />
            </Routes>
            <ScrollToTopButton />
          </div>

          {/* Footer hidden on welcome */}
          {location.pathname !== "/welcome" && <Footer />}
        </main>

        {/* Sidebar hidden on welcome */}
        {location.pathname !== "/welcome" && <Sidebar />}
      </div>

      <Sonner />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </BrowserRouter>
  );
}

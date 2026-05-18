import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router";
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
function AppShell() {
  const location = useLocation();
  window.addEventListener("beforeunload", () => {
    sessionStorage.removeItem("guest");
  });

  const guest = JSON.parse(sessionStorage.getItem("guest"));

  window.onbeforeunload = () => {
    sessionStorage.removeItem("guest");
  };
  // Redirect first-time users
  if (!guest && location.pathname !== "/welcome") {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--bg)", color: "var(--tx)" }}
    >
      {/* Hide header/sidebar on welcome page */}
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
              <Route
                path="/services/qr-table-ordering"
                element={<QRTableOrderingPage />}
              />

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

              <Route path="/support" element={<SupportPage />} />

              <Route
                path="/services/loyalty-rewards"
                element={<LoyaltyRewardsPage />}
              />
              <Route path="/our-story" element={<OurStoryPage />} />
            </Routes>
          </div>

          {location.pathname !== "/welcome" && <Footer />}
        </main>

        {/* Hide sidebar on welcome page */}
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

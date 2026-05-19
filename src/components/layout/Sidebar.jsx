import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import {
  Home,
  UtensilsCrossed,
  Headset,
  MessageCircle,
  Star,
  Info,
  ShoppingCart,
  ChevronDown,
  X,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import logo from "../../assets/images/logo.png";
const NAV = [
  { label: "Home", icon: Home, to: "/" },

  {
    label: "Menu",
    icon: UtensilsCrossed,
    to: "/menu",
    children: [
      { label: "🍜 Foods", to: "/menu/foods" },
      { label: "🥤 Drinks", to: "/menu/drinks" },
      { label: "🍡 Desserts", to: "/menu/desserts" },
    ],
  },

  { label: "Service", icon: Headset, to: "/service" },
  { label: "Support", icon: MessageCircle, to: "/support" },
  { label: "Reviews", icon: Star, to: "/review" },
  { label: "About Us", icon: Info, to: "/about" },
  { label: "Cart", icon: ShoppingCart, to: "/cart" },
];

/* ───────────────────────────────────────────── */

function SidebarPanel({ onClose }) {
  const location = useLocation();

  const navigate = useNavigate();

  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  /* Guest */
  const guest = JSON.parse(sessionStorage.getItem("guest")) || {};

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  /* Auto close mobile drawer */
  useEffect(() => {
    if (onClose) onClose();
  }, [location.pathname]); // eslint-disable-line

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <div className="flex flex-col h-screen" style={{ background: "var(--cd)" }}>
      {/* Guest Section */}
      <div
        className="px-4 py-5 border-b shrink-0"
        style={{ borderColor: "var(--bo)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={logo}
                alt="Burmese Bistro Logo"
                className="w-10 h-10 rounded-full object-cover bg-white p-1 shadow-sm"
              />
              <div
                className="text-[18px] font-bold tracking-wide leading-tight"
                style={{
                  color: "var(--tx)",
                  fontFamily: "var(--ff)",
                }}
              >
                Burmese Bistro
              </div>
            </div>

            <div
              className="font-bold leading-tight"
              style={{
                fontFamily: "var(--ff)",
                fontSize: "22px",
                color: "var(--tx)",
              }}
            >
              {greeting},
              <br />
              {guest.name || "Guest"} 👋
            </div>

            <div className="text-xs mt-3" style={{ color: "var(--mt)" }}>
              Table No.
              <span
                className="font-semibold ml-1"
                style={{ color: "var(--br)" }}
              >
                {guest.table || "--"}
              </span>
            </div>

            <div
              className="text-[11px] mt-2 leading-relaxed max-w-[190px]"
              style={{ color: "var(--mt)" }}
            >
              Gracefully prepared dishes, inspired by tradition and served with
              genuine hospitality.
            </div>
          </div>

          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full border flex items-center justify-center transition-all hover:bg-[var(--br)] hover:text-white hover:border-[var(--br)]"
              style={{
                borderColor: "var(--bo)",
                color: "var(--mt)",
              }}
              aria-label="Close menu"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        <div
          className="text-[9px] uppercase tracking-[2px] font-semibold px-5 py-2"
          style={{ color: "var(--mt)" }}
        >
          Navigate
        </div>

        {NAV.map((item) => {
          const Icon = item.icon;

          const active = isActive(item.to);

          /* Menu dropdown */
          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => {
                    setMenuOpen((o) => !o);

                    if (!menuOpen) navigate(item.to);
                  }}
                  className={`flex items-center gap-2.5 w-full text-left px-5 py-2.5 text-xs font-medium border-l-[3px] transition-all ${
                    active || menuOpen
                      ? "text-[var(--br)] border-l-[var(--br)] bg-[rgba(192,57,43,0.06)]"
                      : "text-[var(--mt)] border-transparent hover:text-[var(--br)] hover:border-l-[var(--br)] hover:bg-[rgba(192,57,43,0.06)]"
                  }`}
                >
                  <Icon size={16} />

                  {item.label}

                  <ChevronDown
                    size={12}
                    className="ml-auto transition-transform"
                    style={{
                      transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {menuOpen && (
                  <div
                    style={{
                      background: "var(--bg2)",
                    }}
                  >
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className={`block pl-12 pr-5 py-2 text-[11px] transition-colors ${
                          location.pathname === c.to
                            ? "text-[var(--br)]"
                            : "text-[var(--mt)] hover:text-[var(--br)]"
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2.5 px-5 py-2.5 text-xs font-medium border-l-[3px] transition-all ${
                active
                  ? "text-[var(--br)] border-l-[var(--br)] bg-[rgba(192,57,43,0.06)]"
                  : "text-[var(--mt)] border-transparent hover:text-[var(--br)] hover:border-l-[var(--br)] hover:bg-[rgba(192,57,43,0.06)]"
              }`}
            >
              <Icon size={16} />

              {item.label}

              {item.label === "Cart" && cartCount > 0 && (
                <span
                  className="ml-auto w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                  style={{
                    background: "var(--br)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/* ───────────────────────────────────────────── */

export default function Sidebar() {
  const { sidebarOpen, closeSidebar } = useCart();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex w-[260px] shrink-0 flex-col border-l"
        style={{
          borderColor: "var(--bo)",
          background: "var(--cd)",
        }}
      >
        <SidebarPanel />
      </aside>

      {/* Mobile Backdrop */}
      <div
        onClick={closeSidebar}
        className="lg:hidden fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.45)",
          opacity: sidebarOpen ? 1 : 0,
          pointerEvents: sidebarOpen ? "auto" : "none",
        }}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        className="lg:hidden fixed top-0 right-0 h-full w-[280px] z-50 border-l shadow-2xl transition-transform duration-300"
        style={{
          borderColor: "var(--bo)",
          background: "var(--cd)",
          transform: sidebarOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <SidebarPanel onClose={closeSidebar} />
      </div>
    </>
  );
}

import { Link, useLocation } from "react-router";
import { ShoppingCart, Moon, Sun, Menu } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { BRAND } from "../../data/siteData";
import logo from "../../assets/images/logo.png";
export default function Header() {
  const guest = JSON.parse(sessionStorage.getItem("guest"));
  const { cartCount, dark, toggleDark, toggleSidebar } = useCart();

  return (
    <header
      className="flex items-center justify-between px-7 h-20 shrink-0 z-20 border-b"
      style={{ background: "var(--cd)", borderColor: "var(--bo)" }}
    >
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt={BRAND.name}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div>
          <div
            className="font-bold text-[24px] leading-none"
            style={{ fontFamily: "var(--ff)", color: "var(--tx)" }}
          >
            {BRAND.name}
          </div>
          <div
            className="text-[11px] uppercase tracking-[3px]"
            style={{ color: "var(--mt)" }}
          >
            {BRAND.tagline}
          </div>

          {guest && (
            <div className="text-[10px] mt-0.5" style={{ color: "var(--mt)" }}>
              Welcome, {guest.name} • Table {guest.table}
            </div>
          )}
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={toggleDark}
          className="w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:bg-[var(--br)] hover:text-white hover:border-[var(--br)]"
          style={{
            borderColor: "var(--bo)",
            background: "var(--bg)",
            color: "var(--tx)",
          }}
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <Link
          to="/cart"
          className="relative w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:bg-[var(--br)] hover:text-white hover:border-[var(--br)]"
          style={{
            borderColor: "var(--bo)",
            background: "var(--bg)",
            color: "var(--tx)",
          }}
          aria-label="Cart"
        >
          <ShoppingCart size={14} />
          {cartCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-white text-[8px] font-bold flex items-center justify-center"
              style={{ background: "var(--br)" }}
            >
              {cartCount}
            </span>
          )}
        </Link>

        {/* Hamburger — visible on all sizes since nav is gone */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:bg-[var(--br)] hover:text-white hover:border-[var(--br)]"
          style={{
            borderColor: "var(--bo)",
            background: "var(--bg)",
            color: "var(--tx)",
          }}
          aria-label="Open menu"
        >
          <Menu size={15} />
        </button>
      </div>
    </header>
  );
}

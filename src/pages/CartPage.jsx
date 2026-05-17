import { Link, useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, cartTotal, updateQty, clearCart, showToast } = useCart();

  const navigate = useNavigate();

  function placeOrder() {
    navigate("/checkout");
  }
  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{ background: "var(--bg)" }}
    >
      <div className="flex-1 px-7 md:px-9 pt-7 pb-4">
        <div
          className="font-bold text-[28px] mb-1.5"
          style={{ fontFamily: "var(--ff)", color: "var(--tx)" }}
        >
          Your Cart
        </div>
        <div
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: "var(--mt)" }}
        >
          Review your order and place it when ready.
        </div>

        {cartItems.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            style={{ color: "var(--mt)" }}
          >
            <ShoppingCart size={48} className="opacity-25" />
            <div className="text-sm font-semibold">Your cart is empty</div>
            <Link
              to="/menu"
              className="mt-3 px-6 py-3 rounded-xl text-white text-sm font-semibold"
              style={{ background: "var(--br)" }}
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Cart grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {cartItems.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 rounded-xl p-3.5 border"
                  style={{ background: "var(--cd)", borderColor: "var(--bo)" }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 border"
                    style={{ borderColor: "var(--bo)" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-semibold"
                      style={{ color: "var(--tx)" }}
                    >
                      {product.name}
                    </div>
                    <div
                      className="text-[11px] font-bold mt-0.5"
                      style={{ color: "var(--br)" }}
                    >
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => updateQty(product.id, -1)}
                        className="w-[22px] h-[22px] rounded-full border flex items-center justify-center text-sm cursor-pointer"
                        style={{
                          borderColor: "var(--bo)",
                          background: "var(--bg)",
                          color: "var(--tx)",
                        }}
                      >
                        −
                      </button>
                      <span
                        className="text-xs font-bold"
                        style={{ color: "var(--tx)" }}
                      >
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQty(product.id, 1)}
                        className="w-[22px] h-[22px] rounded-full border flex items-center justify-center text-sm cursor-pointer"
                        style={{
                          borderColor: "var(--bo)",
                          background: "var(--bg)",
                          color: "var(--tx)",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div
              className="rounded-2xl p-4 border mb-4"
              style={{ background: "var(--cd)", borderColor: "var(--bo)" }}
            >
              <div
                className="flex justify-between text-xs mb-1.5"
                style={{ color: "var(--mt)" }}
              >
                <span>Subtotal</span>
                <span>{cartTotal.toFixed(0)} MMK</span>
              </div>
              <div
                className="flex justify-between text-xs mb-1.5"
                style={{ color: "var(--mt)" }}
              >
                <span>Service fee</span>
                <span>15000 MMK</span>
              </div>
              <div
                className="flex justify-between text-[15px] font-bold border-t pt-3 mt-1.5"
                style={{ borderColor: "var(--bo)", color: "var(--tx)" }}
              >
                <span>Total</span>
                <span style={{ color: "var(--br)" }}>
                  {(cartTotal + 15000).toFixed(0)} MMK
                </span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="w-full py-3.5 rounded-xl text-white text-sm font-semibold transition-colors"
              style={{ background: "var(--br)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--brd)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--br)")
              }
            >
              ✓ Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

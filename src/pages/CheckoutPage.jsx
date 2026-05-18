import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import kbzPayQR from "../assets/images/kbzpay-qr.jpg";
import momoQR from "../assets/images/momo-qr.jpg";
import bankQR from "../assets/images/bank-qr.jpg";
export default function CheckoutPage() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart, showToast } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedOnlinePayment, setSelectedOnlinePayment] = useState("");

  function confirmOrder() {
    showToast("Order confirmed! 🍜");

    clearCart();

    navigate("/");
  }

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{ background: "var(--bg)" }}
    >
      <div className="flex-1 px-7 md:px-9 pt-7 pb-8">
        {" "}
        {/* Heading */}
        <div
          className="font-bold text-[28px] mb-1"
          style={{ fontFamily: "var(--ff)", color: "var(--tx)" }}
        >
          Checkout
        </div>
        <div className="text-[13px] mb-6" style={{ color: "var(--mt)" }}>
          Review your order and select payment method.
        </div>
        {/* Cart Items */}
        <div className="space-y-3 mb-6">
          {cartItems.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 rounded-2xl border"
              style={{
                background: "var(--cd)",
                borderColor: "var(--bo)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-2xl object-cover border"
                style={{ borderColor: "var(--bo)" }}
              />

              <div className="flex-1">
                <div
                  className="font-semibold text-sm"
                  style={{ color: "var(--tx)" }}
                >
                  {product.name}
                </div>

                <div className="text-xs mt-1" style={{ color: "var(--mt)" }}>
                  Quantity: {qty}
                </div>

                <div
                  className="text-sm font-bold mt-2"
                  style={{ color: "var(--br)" }}
                >
                  {(product.price * qty).toFixed(0)} MMK
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Payment Method */}
        <div
          className="rounded-2xl border p-5 mb-6"
          style={{
            background: "var(--cd)",
            borderColor: "var(--bo)",
          }}
        >
          <div className="font-semibold mb-4" style={{ color: "var(--tx)" }}>
            Payment Method
          </div>

          <div className="flex flex-col gap-3">
            <label
              className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer"
              style={{ borderColor: "var(--bo)" }}
            >
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span style={{ color: "var(--tx)" }}>Cash </span>
            </label>

            <label
              className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer"
              style={{ borderColor: "var(--bo)" }}
            >
              <input
                type="radio"
                value="banking"
                checked={paymentMethod === "banking"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span style={{ color: "var(--tx)" }}>
                Banking / Online Payment
              </span>
            </label>

            {/* Online Payment Options */}
            {paymentMethod === "banking" && (
              <div className="ml-6 mt-1 flex flex-col gap-3">
                {/* MoMo */}
                <button
                  onClick={() => setSelectedOnlinePayment("momo")}
                  className="text-left p-4 rounded-2xl border"
                  style={{
                    background:
                      selectedOnlinePayment === "momo"
                        ? "var(--bg2)"
                        : "var(--bg)",
                    borderColor: "var(--bo)",
                  }}
                >
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "var(--tx)" }}
                  >
                    MoMo Pay
                  </div>

                  <div className="text-xs mt-1" style={{ color: "var(--mt)" }}>
                    Pay with MoMo QR
                  </div>
                </button>

                {/* KBZPay */}
                <button
                  onClick={() => setSelectedOnlinePayment("kbzpay")}
                  className="text-left p-4 rounded-2xl border"
                  style={{
                    background:
                      selectedOnlinePayment === "kbzpay"
                        ? "var(--bg2)"
                        : "var(--bg)",
                    borderColor: "var(--bo)",
                  }}
                >
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "var(--tx)" }}
                  >
                    KBZPay
                  </div>

                  <div className="text-xs mt-1" style={{ color: "var(--mt)" }}>
                    Pay with KBZPay QR
                  </div>
                </button>

                {/* Bank */}
                <button
                  onClick={() => setSelectedOnlinePayment("bank")}
                  className="text-left p-4 rounded-2xl border"
                  style={{
                    background:
                      selectedOnlinePayment === "bank"
                        ? "var(--bg2)"
                        : "var(--bg)",
                    borderColor: "var(--bo)",
                  }}
                >
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "var(--tx)" }}
                  >
                    Bank Transfer
                  </div>

                  <div className="text-xs mt-1" style={{ color: "var(--mt)" }}>
                    BIDV Bank QR Payment
                  </div>
                </button>
              </div>
            )}

            {/* QR Popup */}
            {selectedOnlinePayment && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div
                  className="w-full max-w-sm rounded-3xl p-5 relative"
                  style={{ background: "var(--cd)" }}
                >
                  {/* Close */}
                  <button
                    onClick={() => setSelectedOnlinePayment("")}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full"
                    style={{
                      background: "var(--bg2)",
                      color: "var(--tx)",
                    }}
                  >
                    ✕
                  </button>

                  <div
                    className="text-lg font-bold text-center mb-4"
                    style={{ color: "var(--tx)" }}
                  >
                    Scan to Pay
                  </div>

                  <img
                    src={
                      selectedOnlinePayment === "momo"
                        ? momoQR
                        : selectedOnlinePayment === "kbzpay"
                          ? kbzPayQR
                          : bankQR
                    }
                    alt="QR Payment"
                    className="w-full rounded-2xl border"
                    style={{ borderColor: "var(--bo)" }}
                  />

                  <div
                    className="text-xs text-center mt-4"
                    style={{ color: "var(--mt)" }}
                  >
                    Complete payment and confirm your order.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Summary */}
        <div
          className="rounded-2xl p-5 border mb-6"
          style={{
            background: "var(--cd)",
            borderColor: "var(--bo)",
          }}
        >
          <div
            className="flex justify-between text-sm mb-2"
            style={{ color: "var(--mt)" }}
          >
            <span>Subtotal</span>
            <span>{cartTotal.toFixed(0)} MMK</span>
          </div>

          <div
            className="flex justify-between text-sm mb-2"
            style={{ color: "var(--mt)" }}
          >
            <span>Service Fee</span>
            <span>15000 MMK</span>
          </div>

          <div
            className="flex justify-between text-lg font-bold border-t pt-3 mt-3"
            style={{
              borderColor: "var(--bo)",
              color: "var(--tx)",
            }}
          >
            <span>Total</span>

            <span style={{ color: "var(--br)" }}>
              {(cartTotal + 15000).toFixed(0)} MMK
            </span>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            to="/cart"
            className="flex-1 py-3 rounded-xl border text-center text-sm font-semibold"
            style={{
              borderColor: "var(--bo)",
              color: "var(--tx)",
            }}
          >
            Back to Cart
          </Link>

          <button
            onClick={confirmOrder}
            className="flex-1 py-3 rounded-xl text-white text-sm font-semibold"
            style={{ background: "var(--br)" }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}

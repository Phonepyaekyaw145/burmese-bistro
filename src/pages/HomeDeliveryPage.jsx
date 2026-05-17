export default function HomeDeliveryPage() {
  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{
        background: "var(--bg)",
        fontFamily: "var(--ff)",
      }}
    >
      <div className="w-full px-7 md:px-9 pt-7 pb-8">
        <div
          className="font-bold text-[28px] mb-2"
          style={{ color: "var(--tx)" }}
        >
          Home Delivery
        </div>

        <div
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: "var(--mt)" }}
        >
          Enjoy authentic Burmese dishes delivered fresh and hot to your home.
        </div>

        <div
          className="rounded-3xl p-6 border"
          style={{
            background: "var(--cd)",
            borderColor: "var(--bo)",
          }}
        >
          <div
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--tx)" }}
          >
            Delivery Benefits
          </div>

          <ul className="space-y-2 text-[13px]" style={{ color: "var(--mt)" }}>
            <li>🛵 Fast delivery service</li>
            <li>🔥 Freshly prepared meals</li>
            <li>📍 Real-time order tracking</li>
            <li>🍱 Safe and secure packaging</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

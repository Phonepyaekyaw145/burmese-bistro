export default function QRTableOrderingPage() {
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
          QR Table Ordering
        </div>

        <div
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: "var(--mt)" }}
        >
          Scan the QR code at your table to browse our menu and order instantly
          without waiting for staff.
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
            Features
          </div>

          <ul className="space-y-2 text-[13px]" style={{ color: "var(--mt)" }}>
            <li>📱 Instant mobile ordering</li>
            <li>🍜 Live menu updates</li>
            <li>⚡ Faster service experience</li>
            <li>💳 Easy checkout process</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

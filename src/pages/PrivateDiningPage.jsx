export default function PrivateDiningPage() {
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
          Private Dining
        </div>

        <div
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: "var(--mt)" }}
        >
          Celebrate special occasions with a private Burmese dining experience.
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
            Perfect For
          </div>

          <ul className="space-y-2 text-[13px]" style={{ color: "var(--mt)" }}>
            <li>🎉 Birthday celebrations</li>
            <li>👨‍👩‍👧 Family gatherings</li>
            <li>💼 Business meetings</li>
            <li>🍷 Romantic dinners</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

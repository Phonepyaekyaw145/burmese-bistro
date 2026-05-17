export default function CateringServicePage() {
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
          Catering Service
        </div>

        <div
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: "var(--mt)" }}
        >
          Bring authentic Burmese flavors to your events with our catering
          service.
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
            Catering Includes
          </div>

          <ul className="space-y-2 text-[13px]" style={{ color: "var(--mt)" }}>
            <li>🍛 Custom Burmese menus</li>
            <li>👨‍🍳 Professional preparation</li>
            <li>🎊 Event food setup</li>
            <li>🥗 Vegetarian options available</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

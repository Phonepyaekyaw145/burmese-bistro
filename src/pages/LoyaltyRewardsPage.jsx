export default function LoyaltyRewardsPage() {
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
          Loyalty Rewards
        </div>

        <div
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: "var(--mt)" }}
        >
          Earn rewards and enjoy exclusive benefits every time you dine with us.
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
            Member Benefits
          </div>

          <ul className="space-y-2 text-[13px]" style={{ color: "var(--mt)" }}>
            <li>🎁 Exclusive discounts</li>
            <li>⭐ Reward points system</li>
            <li>🍜 Free special menu items</li>
            <li>🎉 Birthday rewards</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

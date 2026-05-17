import { useParams, useNavigate } from "react-router";
import MenuGrid from "../components/menu/MenuGrid";
import { MENU, MENU_CAT_DESC } from "../data/siteData";

const TABS = [
  { key: "foods", label: "🍜 Foods" },
  { key: "drinks", label: "🥤 Drinks" },
  { key: "desserts", label: "🍡 Desserts" },
];

export default function MenuPage() {
  const { tab = "foods" } = useParams();
  const navigate = useNavigate();
  const items = MENU[tab] || MENU.foods;

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
          Our Menu
        </div>
        <div
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: "var(--mt)" }}
        >
          Authentic Myanmar flavours, made fresh daily from the finest local
          ingredients.
        </div>
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => navigate(`/menu/${t.key}`)}
              className="px-4 py-2 rounded-3xl border text-xs font-semibold transition-all cursor-pointer"
              style={{
                background: tab === t.key ? "var(--br)" : "var(--cd)",
                borderColor: tab === t.key ? "var(--br)" : "var(--bo)",
                color: tab === t.key ? "#fff" : "var(--mt)",
                fontFamily: "var(--fb)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div
          className="text-[10px] font-semibold uppercase tracking-[1.5px] mb-2.5"
          style={{ color: "var(--mt)" }}
        >
          {MENU_CAT_DESC[tab]}
        </div>
        <MenuGrid items={items} />
      </div>
    </div>
  );
}

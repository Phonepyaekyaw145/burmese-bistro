import { useCart } from "../../context/CartContext";

const TAG_STYLES = {
  popular: {
    background: "#faeeda",
    color: "#854f0b",
    label: "Popular",
  },

  spicy: {
    background: "#fcebeb",
    color: "#a32d2d",
    label: "Spicy",
  },

  veg: {
    background: "#eaf3de",
    color: "#3b6d11",
    label: "Veg",
  },

  cold: {
    background: "#e6f7ff",
    color: "#0b74a8",
    label: "Cold",
  },

  hot: {
    background: "#fff0e6",
    color: "#d35400",
    label: "Hot",
  },

  sweet: {
    background: "#fff0f6",
    color: "#c2185b",
    label: "Sweet",
  },

  sour: {
    background: "#f3ffe6",
    color: "#5f8f00",
    label: "Sour",
  },
  halal: {
    background: "#e8f7ec",
    color: "#1f7a3d",
    label: "Halal",
  },
  musttry: {
    background: "#fff4d6",
    color: "#b26a00",
    label: "Must Try",
  },
  alcohol: {
    background: "#f3e8ff",
    color: "#6b21a8",
    label: "Alcohol",
  },
};

export default function MenuGrid({ items }) {
  const { addItem } = useCart();

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => addItem(item)}
          className="
            group
            rounded-2xl
            p-3.5
            border
            cursor-pointer
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-2xl
            hover:shadow-black/10
            hover:scale-[1.02]
            hover:border-[var(--br)]
          "
          style={{
            background: "var(--cd)",
            borderColor: "var(--bo)",
          }}
        >
          {/* Image */}
          <div className="mb-3 overflow-hidden rounded-xl">
            <img
              src={item.image}
              alt={item.name}
              className="
                w-full
                h-[150px]
                object-cover
                transition-transform
                duration-500
                group-hover:scale-110
              "
            />
          </div>

          {/* Title */}
          <div
            className="
              text-[13px]
              font-semibold
              mb-1
              transition-colors
              duration-300
              group-hover:text-[var(--br)]
            "
            style={{ color: "var(--tx)" }}
          >
            {item.name}
          </div>

          {/* Description */}
          <div
            className="text-[11px] leading-snug mb-2"
            style={{ color: "var(--mt)" }}
          >
            {item.desc}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="
                  text-[9px]
                  font-semibold
                  px-1.5
                  py-0.5
                  rounded-md
                  transition-all
                  duration-300
                  group-hover:scale-105
                "
                style={{
                  background: TAG_STYLES[t]?.background,
                  color: TAG_STYLES[t]?.color,
                }}
              >
                {TAG_STYLES[t]?.label}
              </span>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between mt-3">
            <span
              className="
                font-bold
                text-base
                transition-transform
                duration-300
                group-hover:scale-110
              "
              style={{
                fontFamily: "var(--ff)",
                color: "var(--br)",
              }}
            >
              {item.price.toFixed(0)} MMK
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addItem(item);
              }}
              className="
                w-[30px]
                h-[30px]
                rounded-full
                text-white
                text-lg
                flex
                items-center
                justify-center
                transition-all
                duration-300
                hover:scale-125
                active:scale-95
              "
              style={{ background: "var(--br)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--brd)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--br)")
              }
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

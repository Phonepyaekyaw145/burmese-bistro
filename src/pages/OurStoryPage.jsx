import { useNavigate } from "react-router";
import shop from "../assets/images/shop.jpg";
import cook2 from "../assets/images/cook2.jpg";
import cook3 from "../assets/images/cook3.jpg";

const YEAR_FOUNDED = new Date().getFullYear() - 32;

const milestones = [
  {
    year: YEAR_FOUNDED.toString(),
    label: "The First Pot",
    desc: "Grandmother Aye sets up her stall on Anawrahta Road with one recipe and an old clay pot.",
  },
  {
    year: "2008",
    label: "A Proper Kitchen",
    desc: "Her daughter opens the first Burmese Bistro restaurant, honouring tradition with a real dining room.",
  },
  {
    year: "Today",
    label: "Third Generation",
    desc: "Grandchildren now serve the same beloved recipes to a new generation of food lovers.",
  },
];

const IMAGES = {
  hero: shop,
  side: cook2,
  bottom: cook3,
};

export default function OurStoryPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto transition-colors duration-300"
      style={{
        background: "var(--panel)",
        color: "var(--text)",
      }}
    >
      <div className="max-w-[860px] mx-auto w-full px-4 sm:px-6 md:px-9 py-7 pb-16">
        {/* HERO */}
        <div className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] rounded-3xl overflow-hidden mb-8 md:mb-10 shadow-xl">
          <img
            src={IMAGES.hero}
            alt="Burmese Bistro"
            className="w-full h-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* text */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10">
            <p
              className="text-[11px] tracking-[0.22em] uppercase mb-3 font-medium"
              style={{
                color: "var(--gold)",
              }}
            >
              Est. {YEAR_FOUNDED} · Yangon, Myanmar
            </p>

            <h1
              className="font-display text-[40px] sm:text-[56px] md:text-[70px] font-bold leading-none"
              style={{
                color: "#fff",
              }}
            >
              Our{" "}
              <span
                className="italic"
                style={{
                  color: "var(--gold)",
                }}
              >
                Story
              </span>
            </h1>
          </div>
        </div>

        {/* QUOTE */}
        <blockquote
          className="border-l-4 rounded-r-2xl p-6 mb-8 shadow-sm"
          style={{
            background: "var(--card)",
            borderColor: "var(--gold)",
          }}
        >
          <p
            className="font-display italic text-[22px] sm:text-[28px] leading-relaxed"
            style={{
              color: "var(--text)",
            }}
          >
            "What started with a single pot of Mohinga became a gathering place
            for an entire city."
          </p>
        </blockquote>

        {/* STORY SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-10">
          {/* TEXT */}
          <div
            className="space-y-5 text-[15px] leading-relaxed"
            style={{
              color: "var(--muted)",
            }}
          >
            <p>
              Burmese Bistro began as a humble family street stall in Yangon,
              founded by Grandmother Aye in {YEAR_FOUNDED}. Every morning before
              sunrise, she prepared her famous fish broth using traditional
              spices and recipes passed through generations.
            </p>

            <p>
              Her small stall quickly became loved by locals, travellers, and
              food lovers from all around the city. Even as Burmese Bistro grew,
              the heart of the recipes never changed.
            </p>

            <p>
              Today, Burmese Bistro proudly carries the warmth of Myanmar
              hospitality into a modern dining experience while preserving the
              authentic flavours of home.
            </p>
          </div>

          {/* IMAGE */}
          <div className="rounded-3xl overflow-hidden min-h-[240px] shadow-lg">
            <img
              src={IMAGES.side}
              alt="Traditional Burmese Food"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* DIVIDER */}
        <div
          className="flex items-center gap-4 my-10 text-[11px] tracking-[0.25em] uppercase"
          style={{
            color: "var(--muted)",
          }}
        >
          <span
            className="flex-1 h-px"
            style={{
              background: "var(--border)",
            }}
          />
          Three Generations
          <span
            className="flex-1 h-px"
            style={{
              background: "var(--border)",
            }}
          />
        </div>

        {/* MILESTONES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <p
                className="font-display text-[36px] font-bold mb-2"
                style={{
                  color: "var(--gold)",
                }}
              >
                {m.year}
              </p>

              <p
                className="text-[15px] font-semibold mb-2"
                style={{
                  color: "var(--text)",
                }}
              >
                {m.label}
              </p>

              <p
                className="text-[13px] leading-relaxed"
                style={{
                  color: "var(--muted)",
                }}
              >
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center">
          {/* IMAGE */}
          <div className="rounded-3xl overflow-hidden h-[220px] shadow-lg order-2 md:order-1">
            <img
              src={IMAGES.bottom}
              alt="Cooking traditional Burmese dishes"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="order-1 md:order-2">
            <h3
              className="font-display text-[30px] italic font-bold mb-4"
              style={{
                color: "var(--text)",
              }}
            >
              Food should bring people together.
            </h3>

            <p
              className="text-[15px] leading-relaxed mb-6"
              style={{
                color: "var(--muted)",
              }}
            >
              Every dish we serve carries the warmth of Grandmother Aye's
              kitchen — prepared with care, cooked with heritage, and shared
              with everyone who walks through our doors.
            </p>

            <button
              onClick={() => navigate("/menu")}
              className="px-6 py-3 rounded-xl text-white text-[13px] uppercase tracking-wide font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: "var(--gold)",
              }}
            >
              Explore Our Menu →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

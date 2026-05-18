import { useNavigate } from "react-router";

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

// Replace these with your own images in /public/images/ or a CDN
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1400&q=80",
  side: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  bottom:
    "https://images.unsplash.com/photo-1567087527-8c0a3e30ffa9?w=800&q=80",
};

export default function OurStoryPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto font-body"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-[860px] mx-auto w-full px-4 sm:px-6 md:px-9 py-7 pb-16">
        {/* ── Hero Banner ── */}
        <div className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] rounded-2xl overflow-hidden mb-8 md:mb-10">
          <img
            src={IMAGES.hero}
            alt="Yangon street food market at dusk"
            className="w-full h-full object-cover brightness-[0.68] saturate-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,12,3,0.85)] via-transparent to-transparent" />
          {/* Text */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10">
            <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-gold-light font-body font-medium mb-2">
              Est. {YEAR_FOUNDED} · Yangon, Myanmar
            </p>
            <h1 className="font-display text-[38px] sm:text-[52px] md:text-[62px] font-semibold text-white leading-[1.05]">
              Our{" "}
              <em className="italic text-gold-light not-italic font-display">
                Story
              </em>
            </h1>
          </div>
        </div>

        {/* ── Pull Quote ── */}
        <blockquote className="border-l-[3px] border-gold pl-5 sm:pl-6 py-3 mb-8 bg-stone-50 dark:bg-stone-900/40 rounded-r-xl">
          <p className="font-display text-[18px] sm:text-[22px] italic text-stone-700 dark:text-stone-300 leading-snug">
            "What started with a single pot of Mohinga became a gathering place
            for an entire city."
          </p>
        </blockquote>

        {/* ── Two-Column: Text + Image ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Text */}
          <div className="space-y-4 text-[14.5px] leading-relaxed text-stone-600 dark:text-stone-400 font-body">
            <p>
              Burmese Bistro began as a humble family street stall in Yangon,
              founded by Grandmother Aye in {YEAR_FOUNDED}. Every morning before
              sunrise, she would rise to prepare her fish broth — slow-simmered
              with lemongrass, ginger, and secrets she never fully wrote down.
            </p>
            <p>
              Her stall drew neighbours first, then travellers, then food
              writers who couldn't quite believe what a clay pot and a wood fire
              could produce. The line grew longer. The recipes stayed the same.
            </p>
            <p>
              What started with a single pot of traditional Mohinga quickly
              became a gathering place — a warmth that no weather could cool, a
              flavour that no distance could diminish.
            </p>
          </div>

          {/* Side Image */}
          <div className="rounded-2xl overflow-hidden h-[220px] md:h-full min-h-[200px]">
            <img
              src={IMAGES.side}
              alt="Traditional Myanmar soup in a clay bowl"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 my-8 text-stone-400 dark:text-stone-600 text-[11px] tracking-[0.18em] uppercase font-body">
          <span className="flex-1 h-px bg-stone-200 dark:bg-stone-700" />
          Three Generations
          <span className="flex-1 h-px bg-stone-200 dark:bg-stone-700" />
        </div>

        {/* ── Milestones ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="bg-stone-50 dark:bg-stone-900/50 border-l-[3px] border-gold rounded-r-xl rounded-tl-none rounded-bl-none p-5"
            >
              <p className="font-display text-[32px] sm:text-[36px] font-semibold text-gold leading-none mb-1">
                {m.year}
              </p>
              <p className="text-[13px] font-medium text-stone-800 dark:text-stone-200 mb-1 font-body">
                {m.label}
              </p>
              <p className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed font-body">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom Row: Image + Closing Text ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Bottom Image */}
          <div className="rounded-2xl overflow-hidden h-[200px] md:h-[220px] order-2 md:order-1">
            <img
              src={IMAGES.bottom}
              alt="Hands preparing traditional noodle dish"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Closing text */}
          <div className="order-1 md:order-2">
            <h3 className="font-display text-[24px] sm:text-[28px] italic font-semibold text-stone-800 dark:text-stone-100 mb-3">
              Food should bring people together.
            </h3>
            <p className="text-[14px] leading-relaxed text-stone-500 dark:text-stone-400 mb-5 font-body">
              Every dish we serve carries the warmth of Grandmother Aye's
              kitchen — prepared with care, cooked with heritage, and shared
              with everyone who walks through our door.
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="inline-block px-5 py-2.5 bg-gold hover:bg-gold-dark text-white text-[13px] font-medium tracking-wide uppercase rounded-lg transition-colors duration-200 font-body cursor-pointer"
            >
              Explore Our Menu →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

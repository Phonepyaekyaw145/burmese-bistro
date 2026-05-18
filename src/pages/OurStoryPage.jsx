import { useNavigate } from "react-router";

import cook1 from "../assets/images/cook1.jpg";
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
  hero: cook1,
  side: cook2,
  bottom: cook3,
};

export default function OurStoryPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-[#f8f5ef] dark:bg-[#17120d] transition-colors duration-500">
      <div className="max-w-[920px] mx-auto w-full px-4 sm:px-6 md:px-9 py-7 pb-16">
        {/* ========================================== */}
        {/* HERO */}
        {/* ========================================== */}

        <div className="relative w-full h-[260px] sm:h-[340px] md:h-[430px] rounded-[28px] overflow-hidden mb-10 shadow-2xl">
          <img
            src={IMAGES.hero}
            alt="Burmese Bistro Story"
            className="w-full h-full object-cover brightness-[0.58]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Text */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10">
            <p className="text-[11px] tracking-[0.25em] uppercase text-amber-200 font-medium mb-3">
              Est. {YEAR_FOUNDED} · Yangon, Myanmar
            </p>

            <h1 className="text-[42px] sm:text-[56px] md:text-[72px] leading-[1] font-bold text-white">
              Our{" "}
              <span className="italic text-amber-300 font-serif">Story</span>
            </h1>
          </div>
        </div>

        {/* ========================================== */}
        {/* QUOTE */}
        {/* ========================================== */}

        <blockquote className="border-l-4 border-amber-400 bg-white dark:bg-[#241b13] rounded-r-2xl px-6 py-5 mb-10 shadow-lg transition-colors duration-500">
          <p className="text-[20px] sm:text-[24px] italic text-stone-700 dark:text-amber-100 leading-relaxed font-serif transition-colors duration-500">
            "What started with a single pot of Mohinga became a gathering place
            for an entire city."
          </p>
        </blockquote>

        {/* ========================================== */}
        {/* STORY SECTION */}
        {/* ========================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-12">
          {/* Text */}
          <div className="space-y-5 text-[15px] leading-[1.9] text-stone-700 dark:text-stone-300 transition-colors duration-500">
            <p>
              Burmese Bistro began as a humble family street stall in Yangon,
              founded by Grandmother Aye in {YEAR_FOUNDED}. Every morning before
              sunrise, she prepared her famous fish broth with lemongrass,
              ginger, and recipes passed through generations.
            </p>

            <p>
              Her tiny stall quickly became known across the city. Locals,
              travellers, and food lovers gathered daily for warm bowls of
              Mohinga cooked over charcoal fire.
            </p>

            <p>
              Even as Burmese Bistro grew into a restaurant, the family never
              changed the heart of the recipes — preserving the warmth,
              tradition, and hospitality that started everything.
            </p>
          </div>

          {/* Side Image */}
          <div className="rounded-[26px] overflow-hidden min-h-[240px] shadow-xl border border-black/5 dark:border-white/10">
            <img
              src={IMAGES.side}
              alt="Traditional Burmese Dish"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* ========================================== */}
        {/* DIVIDER */}
        {/* ========================================== */}

        <div className="flex items-center gap-4 my-10 text-amber-500 dark:text-amber-200 text-[11px] tracking-[0.22em] uppercase transition-colors duration-500">
          <span className="flex-1 h-px bg-amber-300 dark:bg-amber-700/40" />
          Three Generations
          <span className="flex-1 h-px bg-amber-300 dark:bg-amber-700/40" />
        </div>

        {/* ========================================== */}
        {/* TIMELINE */}
        {/* ========================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="bg-white dark:bg-[#241b13] border border-amber-500/20 rounded-[24px] p-6 shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-[38px] font-bold text-amber-500 dark:text-amber-300 leading-none mb-2 transition-colors duration-500">
                {m.year}
              </p>

              <p className="text-[14px] font-semibold text-stone-900 dark:text-white mb-2 transition-colors duration-500">
                {m.label}
              </p>

              <p className="text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed transition-colors duration-500">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ========================================== */}
        {/* BOTTOM SECTION */}
        {/* ========================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center">
          {/* Bottom Image */}
          <div className="rounded-[26px] overflow-hidden h-[230px] md:h-[260px] shadow-xl border border-black/5 dark:border-white/10 order-2 md:order-1">
            <img
              src={IMAGES.bottom}
              alt="Cooking Burmese Food"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Closing Text */}
          <div className="order-1 md:order-2">
            <h3 className="text-[28px] sm:text-[34px] italic font-serif font-semibold text-amber-600 dark:text-amber-200 mb-4 leading-snug transition-colors duration-500">
              Food should bring people together.
            </h3>

            <p className="text-[15px] leading-[1.9] text-stone-600 dark:text-stone-400 mb-6 transition-colors duration-500">
              Every dish we serve carries the warmth of Grandmother Aye's
              kitchen — prepared with care, cooked with heritage, and shared
              with everyone who walks through our doors.
            </p>

            <button
              onClick={() => navigate("/menu")}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 dark:bg-amber-400 dark:hover:bg-amber-300 text-black font-semibold tracking-wide uppercase text-[13px] transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer"
            >
              Explore Our Menu →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

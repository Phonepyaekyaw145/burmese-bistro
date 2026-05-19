import { useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useInView } from "framer-motion";
import Slideshow from "../components/home/Slideshow";

// ── Data ────────────────────────────────────────────────────────────────
// Replace image URLs with your own from /public/images/
const SPECIALS = [
  {
    id: 1,
    tag: "Chef's Pick",
    name: "Mohinga",
    subtitle: "Fish Noodle Soup",
    desc: "Grandmother Aye's original recipe — slow-simmered catfish broth with lemongrass, rice noodles, and crispy fritters.",
    price: "8,500",
    currency: "MMK",
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80",
    spice: 2,
    time: "15 min",
  },
  {
    id: 2,
    tag: "Today Only",
    name: "Lahpet Thoke",
    subtitle: "Fermented Tea Leaf Salad",
    desc: "A bold mix of fermented tea leaves, crunchy nuts, sesame, tomatoes, and lime — Myanmar's most iconic salad.",
    price: "6,000",
    currency: "MMK",
    badge: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    spice: 1,
    time: "10 min",
  },
  {
    id: 3,
    tag: "New",
    name: "Shan Khao Swe",
    subtitle: "Shan-Style Noodles",
    desc: "Flat rice noodles in a light chicken broth with pickled mustard greens, peanuts, and chilli oil drizzle.",
    price: "7,500",
    currency: "MMK",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    spice: 3,
    time: "20 min",
  },
  {
    id: 4,
    tag: "Popular",
    name: "Ohn No Khao Swe",
    subtitle: "Coconut Chicken Noodle",
    desc: "Rich coconut milk soup with egg noodles, tender chicken, crispy onions, and a squeeze of fresh lime.",
    price: "9,000",
    currency: "MMK",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    spice: 1,
    time: "18 min",
  },
];

const BADGE_COLORS = {
  Bestseller:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
  Seasonal:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
  New: "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300",
  Popular: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300",
};

// ── Sub-components ───────────────────────────────────────────────────────

function SpiceIndicator({ level }) {
  return (
    <div className="flex items-center gap-0.5" title={`Spice level ${level}/3`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`text-[13px] ${i <= level ? "opacity-100" : "opacity-20"}`}
        >
          🌶
        </span>
      ))}
    </div>
  );
}

function SpecialCard({ item, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 cursor-pointer"
      style={{
        background: "var(--cd)",
        border: "1px solid var(--bo)",
      }}
      onClick={() => navigate("/menu")}
    >
      {/* Image */}
      <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Tag top-left */}
        <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase font-body font-medium text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {item.tag}
        </span>

        {/* Badge top-right */}
        <span
          className={`absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full font-body ${BADGE_COLORS[item.badge]}`}
        >
          {item.badge}
        </span>

        {/* Price overlay bottom */}
        <div className="absolute bottom-3 right-3 font-display text-[22px] font-semibold text-white leading-none">
          {item.price}
          <span className="text-[11px] font-body font-normal ml-1 opacity-80">
            {item.currency}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <h3
          className="font-display text-[22px] sm:text-[24px] font-semibold leading-tight mb-0.5 transition-colors duration-300"
          style={{ color: "var(--tx)" }}
        >
          {item.name}
        </h3>
        <p className="text-[11px] tracking-widest uppercase text-gold font-body font-medium mb-3">
          {item.subtitle}
        </p>
        <p
          className="text-[13px] leading-relaxed font-body flex-1 mb-4 transition-colors duration-300"
          style={{ color: "var(--mt)" }}
        >
          {item.desc}
        </p>

        {/* Footer row */}
        <div
          className="flex items-center justify-between pt-3"
          style={{
            borderTop: "1px solid var(--bo)",
          }}
        >
          <SpiceIndicator level={item.spice} />
          <div
            className="flex items-center gap-1.5 text-[12px] font-body transition-colors duration-300"
            style={{ color: "var(--mt)" }}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {item.time}
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="text-[12px] font-medium font-body text-gold hover:text-gold-dark transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/menu");
            }}
          >
            Order →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function TodaysSpecials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  return (
    <section
      ref={ref}
      className="px-4 sm:px-6 md:px-10 py-14 md:py-20 max-w-[1100px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-2">
            <span
              className="h-px w-8 transition-colors duration-300"
              style={{ background: "var(--br)" }}
            />
            <p
              className="text-[11px] tracking-[0.22em] uppercase font-body font-medium transition-colors duration-300"
              style={{ color: "var(--br)" }}
            >
              Fresh Today
            </p>
          </div>
          <h2
            className="font-display text-[36px] sm:text-[44px] md:text-[52px] font-semibold leading-[1.05] transition-colors duration-300"
            style={{ color: "var(--tx)" }}
          >
            Today's
            <em className="italic" style={{ color: "var(--br)" }}>
              Specials
            </em>
          </h2>
        </motion.div>

        {/* View all — hidden on mobile, shown on sm+ */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          onClick={() => navigate("/menu")}
          className="hidden sm:inline-flex items-center gap-2 text-[13px] font-medium font-body text-stone-500 dark:text-stone-400 hover:text-gold transition-colors group"
        >
          View full menu
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </motion.button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SPECIALS.map((item, i) => (
          <SpecialCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* Mobile: View all button */}
      <div className="mt-8 flex justify-center sm:hidden">
        <button
          onClick={() => navigate("/menu")}
          className="px-6 py-2.5 border border-gold text-gold text-[13px] font-medium font-body rounded-full hover:bg-gold hover:text-white transition-all duration-200"
        >
          View Full Menu →
        </button>
      </div>
    </section>
  );
}

function WhyUsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const perks = [
    { icon: "🫕", title: "Family Recipes", desc: "Passed down 3 generations" },
    {
      icon: "🌿",
      title: "Fresh Ingredients",
      desc: "Sourced daily from local markets",
    },
    { icon: "⚡", title: "Fast Service", desc: "Ready in under 20 minutes" },
    { icon: "🏆", title: "Award Winning", desc: "Best of Yangon 2023 & 2024" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16 overflow-hidden transition-colors duration-300"
      style={{
        background: "var(--cd)",
      }}
    >
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-[32px] mb-3">{p.icon}</span>
              <p
                className="font-display text-[17px] font-semibold mb-1 transition-colors duration-300"
                style={{ color: "var(--tx)" }}
              >
                {p.title}
              </p>
              <p
                className="text-[12px] font-body transition-colors duration-300"
                style={{ color: "var(--mt)" }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ background: "var(--bg)" }}>
      {/* ── Hero Slideshow ── */}
      <div className="relative w-full h-[calc(100svh-56px)] min-h-[480px] max-h-[820px]">
        <Slideshow />
      </div>

      {/* ── Why Us Strip ── */}
      <WhyUsStrip />

      {/* ── Today's Specials ── */}
      <TodaysSpecials />
    </div>
  );
}

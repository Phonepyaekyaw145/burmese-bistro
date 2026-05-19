import { useRef } from "react";
import { Link } from "react-router";
import { Heart, Leaf, MapPin, Clock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { BRAND, ABOUT_FEATURES, STATS } from "../data/siteData";
import logo from "../assets/images/logo.png";

const ICONS = { Heart, Leaf, MapPin, Clock };

// ── Icon background colours per feature ──────────────────────────────────
const ICON_STYLES = {
  Heart: {
    bg: "bg-rose-50   dark:bg-rose-900/30",
    icon: "text-rose-500   dark:text-rose-400",
  },
  Leaf: {
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
  MapPin: {
    bg: "bg-sky-50    dark:bg-sky-900/30",
    icon: "text-sky-600    dark:text-sky-400",
  },
  Clock: {
    bg: "bg-amber-50  dark:bg-amber-900/30",
    icon: "text-amber-600  dark:text-amber-400",
  },
};

// ── Reusable fade-up wrapper ──────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <div className="grid grid-cols-4 divide-x divide-stone-200 dark:divide-stone-800 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 mb-6">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.15 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center justify-center py-4 px-2"
        >
          <span className="font-display text-[22px] sm:text-[26px] font-semibold text-gold leading-none mb-0.5">
            {s.value}
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-wide uppercase text-stone-500 dark:text-stone-400 font-body font-medium">
            {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Our Story card ────────────────────────────────────────────────────────
function StoryCard({ feature }) {
  const Icon = ICONS[feature.icon];
  const style = ICON_STYLES[feature.icon];

  return (
    <Link to={feature.link} className="block group">
      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.22 } }}
        className="relative h-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 overflow-hidden hover:border-gold/60 hover:shadow-xl transition-shadow duration-300"
      >
        {/* Decorative gradient blob */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-gold/10 to-rose-400/10 blur-2xl pointer-events-none" />

        {/* Gold top accent line */}
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${style.bg}`}
        >
          {Icon && <Icon size={20} className={style.icon} />}
        </div>

        <p className="font-display text-[22px] font-semibold text-stone-900 dark:text-stone-100 mb-2 leading-tight">
          {feature.title}
        </p>
        <p className="text-[13px] leading-relaxed text-stone-500 dark:text-stone-400 font-body">
          {feature.desc}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium text-gold font-body">
          Read our story
          <motion.span
            className="inline-block"
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}

// ── Fresh Ingredients card ────────────────────────────────────────────────
function IngredientsCard({ feature }) {
  const Icon = ICONS[feature.icon];
  const style = ICON_STYLES[feature.icon];

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="relative h-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 overflow-hidden hover:border-gold/60 hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400/10 to-gold/10 blur-2xl pointer-events-none" />
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${style.bg}`}
      >
        {Icon && <Icon size={20} className={style.icon} />}
      </div>
      <p className="font-display text-[22px] font-semibold text-stone-900 dark:text-stone-100 mb-2 leading-tight">
        {feature.title}
      </p>
      <p className="text-[13px] leading-relaxed text-stone-500 dark:text-stone-400 font-body">
        {feature.desc}
      </p>

      {/* Visual freshness pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {["Daily Sourced", "Local Farms", "Ground Fresh"].map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium font-body tracking-wide px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
          >
            ✦ {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Location card ─────────────────────────────────────────────────────────
function LocationCard({ feature }) {
  const Icon = ICONS[feature.icon];
  const style = ICON_STYLES[feature.icon];

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="relative h-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 overflow-hidden hover:border-gold/60 hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${style.bg}`}
      >
        {Icon && <Icon size={20} className={style.icon} />}
      </div>
      <p className="font-display text-[22px] font-semibold text-stone-900 dark:text-stone-100 mb-2 leading-tight">
        {feature.title}
      </p>
      <p className="text-[13px] leading-relaxed text-stone-500 dark:text-stone-400 font-body mb-4">
        {feature.desc}
      </p>

      {/* Mini map placeholder */}
      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[12px] font-medium text-gold font-body hover:text-gold-dark transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <MapPin size={13} />
        Open in Maps →
      </a>
    </motion.div>
  );
}

// ── Opening Hours card ────────────────────────────────────────────────────
function HoursCard({ feature }) {
  const Icon = ICONS[feature.icon];
  const style = ICON_STYLES[feature.icon];

  // Determine today's slot
  const dayIndex = new Date().getDay(); // 0=Sun … 6=Sat
  const todaySlot =
    dayIndex === 0
      ? 2 // Sunday
      : dayIndex === 6
        ? 1 // Saturday
        : 0; // Mon–Fri

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="relative h-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 overflow-hidden hover:border-gold/60 hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${style.bg}`}
      >
        {Icon && <Icon size={20} className={style.icon} />}
      </div>
      <p className="font-display text-[22px] font-semibold text-stone-900 dark:text-stone-100 mb-4 leading-tight">
        {feature.title}
      </p>

      <div className="space-y-2">
        {feature.hours.map((h, i) => (
          <div
            key={h.day}
            className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 ${
              i === todaySlot
                ? "bg-gold/10 dark:bg-gold/15 border border-gold/30"
                : "bg-stone-50 dark:bg-stone-800/60"
            }`}
          >
            <span
              className={`text-[12px] font-body font-medium ${i === todaySlot ? "text-gold" : "text-stone-500 dark:text-stone-400"}`}
            >
              {h.day}
              {i === todaySlot && (
                <span className="ml-2 text-[9px] tracking-widest uppercase font-semibold text-gold opacity-80">
                  Today
                </span>
              )}
            </span>
            <span
              className={`text-[12px] font-semibold font-body ${i === todaySlot ? "text-gold" : "text-stone-700 dark:text-stone-300"}`}
            >
              {h.time}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Card dispatcher ───────────────────────────────────────────────────────
function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const inner = feature.link ? (
    <StoryCard feature={feature} />
  ) : feature.icon === "Leaf" ? (
    <IngredientsCard feature={feature} />
  ) : feature.icon === "MapPin" ? (
    <LocationCard feature={feature} />
  ) : feature.icon === "Clock" ? (
    <HoursCard feature={feature} />
  ) : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      {inner}
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-stone-50 dark:bg-stone-950 font-body">
      <div className="max-w-[900px] mx-auto w-full px-4 sm:px-6 md:px-9 pt-8 pb-12">
        {/* ── Page header ── */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-gold" />
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-body font-medium">
              Est. {BRAND.founded} · Yangon, Myanmar
            </p>
          </div>
          <h1 className="font-display text-[36px] sm:text-[44px] font-semibold text-stone-900 dark:text-stone-100 leading-tight mb-1">
            About <em className="italic text-gold">Us</em>
          </h1>
          <p className="text-[13px] text-stone-500 dark:text-stone-400 font-body mb-6">
            Three generations of authentic Myanmar cooking, served with love
            since {BRAND.founded}.
          </p>
        </FadeUp>

        {/* ── Hero brand card ── */}
        <FadeUp delay={0.05}>
          <Link to="/" className="block group mb-6">
            <motion.div
              whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
              className="relative rounded-2xl p-6 sm:p-8 overflow-hidden flex items-center gap-5 sm:gap-7 shadow-lg"
              style={{
                background: "linear-gradient(135deg,#c0392b 0%,#e05a2b 100%)",
              }}
            >
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
              <div className="absolute -bottom-8 right-20 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

              <motion.img
                src={logo}
                alt="Burmese Bistro Logo"
                className="w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] object-cover rounded-full border-2 border-white/30 flex-shrink-0 shadow-md"
                whileHover={{
                  rotate: 5,
                  scale: 1.08,
                  transition: { duration: 0.2 },
                }}
              />
              <div className="z-10">
                <p className="font-display text-[26px] sm:text-[30px] font-semibold text-white leading-tight mb-1">
                  {BRAND.name}
                </p>
                <p className="text-[13px] text-white/85 font-body leading-relaxed">
                  Family-owned since {BRAND.founded}. From Grandmother Aye's
                  street stall to a beloved Yangon institution.
                </p>
                <p className="mt-2 text-[11px] text-white/60 font-body tracking-widest uppercase">
                  {BRAND.tagline}
                </p>
              </div>
            </motion.div>
          </Link>
        </FadeUp>

        {/* ── Stats bar ── */}
        <FadeUp delay={0.1}>
          <StatsBar />
        </FadeUp>

        {/* ── Feature cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ABOUT_FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

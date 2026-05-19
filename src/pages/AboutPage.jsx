import { useRef } from "react";
import { Link } from "react-router";
import { Heart, Leaf, MapPin, Clock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { BRAND, ABOUT_FEATURES, STATS } from "../data/siteData";
import logo from "../assets/images/logo.png";

const ICONS = { Heart, Leaf, MapPin, Clock };

// ── Icon background colours ───────────────────────────────────────────────
const ICON_STYLES = {
  Heart: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    icon: "text-rose-600 dark:text-rose-400",
  },
  Leaf: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
  MapPin: {
    bg: "bg-sky-100 dark:bg-sky-900/30",
    icon: "text-sky-600 dark:text-sky-400",
  },
  Clock: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    icon: "text-amber-600 dark:text-amber-400",
  },
};

// ── FadeUp Animation ──────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <div
      className="
        grid grid-cols-2 sm:grid-cols-4
        rounded-3xl overflow-hidden
        border border-[var(--bo)]
        bg-[var(--card)]
        divide-x divide-y sm:divide-y-0 divide-[var(--bo)]
        shadow-sm
        transition-colors duration-300
        mb-6
      "
    >
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.15 + i * 0.08,
          }}
          className="flex flex-col items-center justify-center py-5 px-2"
        >
          <span className="font-display text-[24px] sm:text-[28px] font-semibold text-gold leading-none">
            {s.value}
          </span>

          <span className="mt-1 text-[11px] uppercase tracking-wide text-[var(--muted)] font-medium text-center">
            {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Story Card ────────────────────────────────────────────────────────────
function StoryCard({ feature }) {
  const Icon = ICONS[feature.icon];
  const style = ICON_STYLES[feature.icon];

  return (
    <Link to={feature.link} className="block group h-full">
      <motion.div
        whileHover={{
          y: -6,
          transition: { duration: 0.22 },
        }}
        className="
          relative h-full overflow-hidden
          rounded-3xl
          border border-[var(--bo)]
          bg-[var(--card)]
          p-6
          shadow-sm
          hover:shadow-xl
          hover:border-gold/50
          transition-all duration-300
        "
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-gold/10 to-rose-400/10 blur-3xl pointer-events-none" />

        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${style.bg}`}
        >
          {Icon && <Icon size={21} className={style.icon} />}
        </div>

        <h3 className="font-display text-[24px] font-semibold text-[var(--text)] mb-3 leading-tight">
          {feature.title}
        </h3>

        <p className="text-[14px] leading-relaxed text-[var(--muted)]">
          {feature.desc}
        </p>

        <div className="mt-5 flex items-center gap-2 text-[13px] font-medium text-gold">
          Read our story
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
            }}
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}

// ── Ingredients Card ──────────────────────────────────────────────────────
function IngredientsCard({ feature }) {
  const Icon = ICONS[feature.icon];
  const style = ICON_STYLES[feature.icon];

  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: { duration: 0.22 },
      }}
      className="
        relative h-full overflow-hidden
        rounded-3xl
        border border-[var(--bo)]
        bg-[var(--card)]
        p-6
        shadow-sm
        hover:shadow-xl
        hover:border-gold/50
        transition-all duration-300
        group
      "
    >
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400/10 to-gold/10 blur-3xl pointer-events-none" />

      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${style.bg}`}
      >
        {Icon && <Icon size={21} className={style.icon} />}
      </div>

      <h3 className="font-display text-[24px] font-semibold text-[var(--text)] mb-3">
        {feature.title}
      </h3>

      <p className="text-[14px] leading-relaxed text-[var(--muted)]">
        {feature.desc}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {["Daily Sourced", "Local Farms", "Ground Fresh"].map((tag) => (
          <span
            key={tag}
            className="
              px-3 py-1 rounded-full
              text-[11px] font-medium
              bg-emerald-100 dark:bg-emerald-900/30
              text-emerald-700 dark:text-emerald-400
            "
          >
            ✦ {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Location Card ─────────────────────────────────────────────────────────
function LocationCard({ feature }) {
  const Icon = ICONS[feature.icon];
  const style = ICON_STYLES[feature.icon];

  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: { duration: 0.22 },
      }}
      className="
        relative h-full overflow-hidden
        rounded-3xl
        border border-[var(--bo)]
        bg-[var(--card)]
        p-6
        shadow-sm
        hover:shadow-xl
        hover:border-gold/50
        transition-all duration-300
        group
      "
    >
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${style.bg}`}
      >
        {Icon && <Icon size={21} className={style.icon} />}
      </div>

      <h3 className="font-display text-[24px] font-semibold text-[var(--text)] mb-3">
        {feature.title}
      </h3>

      <p className="text-[14px] leading-relaxed text-[var(--muted)] mb-5">
        {feature.desc}
      </p>

      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[13px] font-medium text-gold hover:text-gold-dark transition-colors"
      >
        <MapPin size={14} />
        Open in Maps →
      </a>
    </motion.div>
  );
}

// ── Hours Card ────────────────────────────────────────────────────────────
function HoursCard({ feature }) {
  const Icon = ICONS[feature.icon];
  const style = ICON_STYLES[feature.icon];

  const dayIndex = new Date().getDay();

  const todaySlot = dayIndex === 0 ? 2 : dayIndex === 6 ? 1 : 0;

  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: { duration: 0.22 },
      }}
      className="
        relative h-full overflow-hidden
        rounded-3xl
        border border-[var(--bo)]
        bg-[var(--card)]
        p-6
        shadow-sm
        hover:shadow-xl
        hover:border-gold/50
        transition-all duration-300
        group
      "
    >
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${style.bg}`}
      >
        {Icon && <Icon size={21} className={style.icon} />}
      </div>

      <h3 className="font-display text-[24px] font-semibold text-[var(--text)] mb-5">
        {feature.title}
      </h3>

      <div className="space-y-2">
        {feature.hours.map((h, i) => (
          <div
            key={h.day}
            className={`
              flex items-center justify-between
              rounded-2xl px-4 py-3
              transition-all duration-200
              ${
                i === todaySlot
                  ? "bg-gold/10 dark:bg-gold/15 border border-gold/30"
                  : "bg-stone-100 dark:bg-stone-800/60"
              }
            `}
          >
            <span
              className={`text-[12px] font-medium ${
                i === todaySlot ? "text-gold" : "text-[var(--muted)]"
              }`}
            >
              {h.day}

              {i === todaySlot && (
                <span className="ml-2 text-[9px] uppercase tracking-widest">
                  Today
                </span>
              )}
            </span>

            <span
              className={`text-[12px] font-semibold ${
                i === todaySlot ? "text-gold" : "text-[var(--text)]"
              }`}
            >
              {h.time}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Card Dispatcher ───────────────────────────────────────────────────────
function FeatureCard({ feature, index }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-40px",
  });

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
    <div
      className="
        flex flex-col flex-1 overflow-y-auto
        bg-[var(--bg)]
        text-[var(--text)]
        transition-colors duration-300
        font-body
      "
    >
      <div className="max-w-[950px] mx-auto w-full px-4 sm:px-6 md:px-9 pt-8 pb-14">
        {/* Header */}

        <FadeUp>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-gold" />

            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-medium">
              Est. {BRAND.founded} · Yangon, Myanmar
            </p>
          </div>

          <h1 className="font-display text-[38px] sm:text-[48px] font-semibold leading-tight text-[var(--text)] mb-2">
            About <em className="italic text-gold">Us</em>
          </h1>

          <p className="text-[14px] text-[var(--muted)] leading-relaxed mb-7">
            Three generations of authentic Myanmar cooking, served with love
            since {BRAND.founded}.
          </p>
        </FadeUp>

        {/* Hero Brand Card */}

        <FadeUp delay={0.05}>
          <Link to="/" className="block group mb-7">
            <motion.div
              whileHover={{
                scale: 1.015,
                transition: { duration: 0.2 },
              }}
              className="
                relative overflow-hidden
                rounded-3xl
                p-6 sm:p-8
                flex items-center gap-5 sm:gap-7
                shadow-xl
              "
              style={{
                background: "linear-gradient(135deg,#c0392b 0%,#e05a2b 100%)",
              }}
            >
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/10" />

              <div className="absolute -bottom-10 right-16 w-28 h-28 rounded-full bg-white/5" />

              <motion.img
                src={logo}
                alt="Burmese Bistro Logo"
                whileHover={{
                  rotate: 5,
                  scale: 1.08,
                }}
                transition={{ duration: 0.2 }}
                className="
                  w-[70px] h-[70px]
                  sm:w-[82px] sm:h-[82px]
                  object-cover rounded-full
                  border-2 border-white/30
                  shadow-lg flex-shrink-0
                "
              />

              <div className="relative z-10">
                <h2 className="font-display text-[28px] sm:text-[34px] font-semibold text-white leading-tight mb-2">
                  {BRAND.name}
                </h2>

                <p className="text-[14px] leading-relaxed text-white/85">
                  Family-owned since {BRAND.founded}. From Grandmother Aye's
                  street stall to a beloved Yangon institution.
                </p>

                <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/60">
                  {BRAND.tagline}
                </p>
              </div>
            </motion.div>
          </Link>
        </FadeUp>

        {/* Stats */}

        <FadeUp delay={0.1}>
          <StatsBar />
        </FadeUp>

        {/* Features */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ABOUT_FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

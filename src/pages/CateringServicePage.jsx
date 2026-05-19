import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────

const EVENT_TYPES = [
  {
    icon: "🎊",
    title: "Corporate Events",
    desc: "Board lunches, team celebrations, product launches, and client dinners.",
  },
  {
    icon: "💒",
    title: "Weddings & Receptions",
    desc: "Elegant Burmese catering for weddings and celebrations.",
  },
  {
    icon: "🎂",
    title: "Birthday Parties",
    desc: "Custom menus and sharing platters for unforgettable birthdays.",
  },
];

const PACKAGES = [
  {
    name: "Starter",
    guests: "20 – 50",
    price: "350,000",
    highlight: false,
    perks: [
      "3-dish buffet menu",
      "Setup & cleanup included",
      "Vegetarian option available",
    ],
  },
  {
    name: "Banquet",
    guests: "50 – 150",
    price: "850,000",
    highlight: true,
    perks: [
      "6-dish buffet",
      "Dessert table",
      "Full service staff",
      "Custom menu consultation",
    ],
  },
  {
    name: "Grand",
    guests: "150 – 500+",
    price: "Custom",
    highlight: false,
    perks: [
      "Custom menu",
      "Live cooking stations",
      "Premium setup",
      "Event coordinator",
    ],
  },
];

const FAQS = [
  {
    q: "How early should I book?",
    a: "We recommend booking 3–6 weeks in advance.",
  },
  {
    q: "Can menus be customised?",
    a: "Yes. Every event includes a custom consultation.",
  },
];

// ── Components ────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="h-px w-8 bg-gold" />

      <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-medium">
        {children}
      </p>
    </div>
  );
}

function PackageCard({ pkg, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
      }}
      className={`relative flex flex-col rounded-2xl p-6 border transition-all duration-300 ${
        pkg.highlight
          ? "bg-gold border-gold shadow-xl shadow-gold/20"
          : "bg-[var(--card)] border-[var(--bo)] hover:border-gold/50 hover:shadow-md"
      }`}
    >
      {pkg.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap">
          Most Popular
        </span>
      )}

      <p
        className={`font-display text-[28px] font-semibold mb-1 ${
          pkg.highlight ? "text-white" : "text-stone-900 dark:text-stone-100"
        }`}
      >
        {pkg.name}
      </p>

      <p
        className={`text-[12px] mb-4 ${
          pkg.highlight ? "text-white/80" : "text-stone-500 dark:text-stone-400"
        }`}
      >
        {pkg.guests} guests
      </p>

      <div
        className={`flex items-end gap-1 mb-6 ${
          pkg.highlight ? "text-white" : "text-stone-900 dark:text-stone-100"
        }`}
      >
        {pkg.price === "Custom" ? (
          <span className="font-display text-[32px] font-semibold">
            Custom Quote
          </span>
        ) : (
          <>
            <span className="font-display text-[36px] font-semibold">
              {pkg.price}
            </span>

            <span
              className={`text-[12px] mb-1 ${
                pkg.highlight
                  ? "text-white/70"
                  : "text-stone-500 dark:text-stone-400"
              }`}
            >
              MMK
            </span>
          </>
        )}
      </div>

      <ul className="flex-1 space-y-2.5 mb-6">
        {pkg.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 text-[13px] ${
                pkg.highlight ? "text-white" : "text-gold"
              }`}
            >
              ✓
            </span>

            <span
              className={`text-[13px] leading-snug ${
                pkg.highlight
                  ? "text-white/90"
                  : "text-stone-500 dark:text-stone-400"
              }`}
            >
              {perk}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/contact")}
        className={`w-full py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
          pkg.highlight
            ? "bg-white text-gold hover:bg-stone-100"
            : "bg-gold text-white hover:bg-gold-dark"
        }`}
      >
        Book Package
      </button>
    </motion.div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 dark:border-stone-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="text-[14px] font-medium text-stone-900 dark:text-stone-100 group-hover:text-gold transition-colors">
          {item.q}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[20px] text-stone-500 dark:text-stone-400"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-[13px] leading-relaxed pb-4 text-stone-500 dark:text-stone-400">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default function CateringServicePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 overflow-y-auto font-body bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {/* Hero */}
      <div className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1400&q=80"
          alt="Catering"
          className="w-full h-full object-cover brightness-[0.48]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-medium mb-2">
              Burmese Bistro · Event Catering
            </p>

            <h1 className="font-display text-[40px] sm:text-[54px] md:text-[64px] font-semibold text-white leading-[1.02]">
              Catering <em className="italic text-gold-light">Service</em>
            </h1>

            <p className="mt-3 text-[14px] text-white/70 max-w-[480px] leading-relaxed">
              Authentic Burmese cuisine for every celebration.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto w-full px-4 sm:px-6 md:px-9 py-12 space-y-20">
        {/* Intro */}
        <FadeUp>
          <SectionLabel>About Catering</SectionLabel>

          <h2 className="font-display text-[30px] sm:text-[38px] font-semibold leading-tight mb-4 text-stone-900 dark:text-stone-100">
            We bring the kitchen to you.
          </h2>

          <p className="text-[14px] leading-relaxed max-w-[640px] text-stone-500 dark:text-stone-400">
            Burmese Bistro caters weddings, celebrations, office events, and
            community gatherings with authentic Burmese cuisine.
          </p>
        </FadeUp>

        {/* Event Types */}
        <div>
          <FadeUp>
            <SectionLabel>Events</SectionLabel>

            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold mb-8 text-stone-900 dark:text-stone-100">
              Every occasion, beautifully fed.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {EVENT_TYPES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                }}
                className="flex flex-col gap-3 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-gold/60 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-[30px]">{item.icon}</span>

                <h3 className="font-display text-[19px] font-semibold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>

                <p className="text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Packages */}
        <div>
          <FadeUp>
            <SectionLabel>Pricing</SectionLabel>

            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold mb-2 text-stone-900 dark:text-stone-100">
              Catering Packages
            </h2>

            <p className="text-[13px] mb-8 text-stone-500 dark:text-stone-400">
              Flexible catering options for every event size.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <FadeUp>
            <SectionLabel>Questions</SectionLabel>

            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold mb-6 text-stone-900 dark:text-stone-100">
              Frequently Asked
            </h2>
          </FadeUp>

          <div>
            {FAQS.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeUp>
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80"
              alt="Event"
              className="w-full h-[220px] sm:h-[260px] object-cover brightness-[0.42]"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="font-display text-[28px] sm:text-[36px] font-semibold italic text-white mb-3">
                Planning an event?
              </h3>

              <p className="text-[13px] text-white/70 mb-6 max-w-[400px]">
                Let us create an unforgettable Burmese dining experience for
                your guests.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white text-[13px] font-medium rounded-xl transition-colors duration-200"
                >
                  Request a Quote
                </button>

                <button
                  onClick={() => navigate("/menu")}
                  className="px-6 py-2.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-[13px] font-medium rounded-xl transition-colors duration-200"
                >
                  Browse Menu
                </button>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

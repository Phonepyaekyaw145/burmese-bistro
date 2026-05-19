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

// ── Animation Wrapper ─────────────────────────────────────────────────────

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
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

// ── Section Label ─────────────────────────────────────────────────────────

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

// ── Package Card ──────────────────────────────────────────────────────────

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
      className={`relative flex flex-col rounded-3xl p-6 border transition-all duration-300 ${
        pkg.highlight
          ? "bg-gold border-gold shadow-xl shadow-gold/20"
          : "hover:border-gold/40 hover:shadow-xl"
      }`}
      style={
        !pkg.highlight
          ? {
              background: "var(--card)",
              borderColor: "var(--border)",
            }
          : {}
      }
    >
      {pkg.highlight && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap border"
          style={{
            background: "var(--card)",
            color: "var(--text)",
            borderColor: "var(--border)",
          }}
        >
          Most Popular
        </span>
      )}

      <h3
        className={`font-display text-[30px] font-semibold mb-1 ${
          pkg.highlight ? "text-white" : "text-[var(--text)]"
        }`}
      >
        {pkg.name}
      </h3>

      <p
        className="text-[13px] mb-4"
        style={{
          color: pkg.highlight ? "rgba(255,255,255,0.75)" : "var(--text-soft)",
        }}
      >
        {pkg.guests} guests
      </p>

      <div
        className="flex items-end gap-1 mb-6"
        style={{
          color: pkg.highlight ? "#fff" : "var(--text)",
        }}
      >
        {pkg.price === "Custom" ? (
          <span className="font-display text-[32px] font-semibold">
            Custom Quote
          </span>
        ) : (
          <>
            <span className="font-display text-[38px] font-semibold">
              {pkg.price}
            </span>

            <span
              className="text-[12px] mb-1"
              style={{
                color: pkg.highlight
                  ? "rgba(255,255,255,0.7)"
                  : "var(--text-soft)",
              }}
            >
              MMK
            </span>
          </>
        )}
      </div>

      <ul className="space-y-3 flex-1 mb-6">
        {pkg.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-3">
            <span
              className={`text-sm mt-0.5 ${
                pkg.highlight ? "text-white" : "text-gold"
              }`}
            >
              ✓
            </span>

            <span
              className="text-[13px] leading-relaxed"
              style={{
                color: pkg.highlight
                  ? "rgba(255,255,255,0.9)"
                  : "var(--text-soft)",
              }}
            >
              {perk}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/contact")}
        className={`w-full py-3 rounded-2xl text-[13px] font-medium transition-all duration-300 ${
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

// ── FAQ Item ──────────────────────────────────────────────────────────────

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b"
      style={{
        borderColor: "var(--border)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span
          className="text-[15px] font-medium transition-colors hover:text-gold"
          style={{
            color: "var(--text)",
          }}
        >
          {item.q}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[22px]"
          style={{
            color: "var(--text-soft)",
          }}
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
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 text-[14px] leading-relaxed"
              style={{
                color: "var(--text-soft)",
              }}
            >
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
    <div
      className="flex flex-col flex-1 overflow-y-auto font-body transition-colors duration-300"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Hero */}
      <div className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1400&q=80"
          alt="Catering"
          className="w-full h-full object-cover brightness-[0.45]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-medium mb-3">
              Burmese Bistro · Event Catering
            </p>

            <h1 className="font-display text-[42px] sm:text-[58px] md:text-[70px] font-semibold leading-[1.02] text-white">
              Catering <em className="italic text-gold-light">Service</em>
            </h1>

            <p className="mt-4 text-[14px] text-white/75 max-w-[500px] leading-relaxed">
              Authentic Burmese cuisine crafted beautifully for weddings,
              birthdays, celebrations, and unforgettable events.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto w-full px-5 sm:px-7 md:px-10 py-14 space-y-24">
        {/* Intro */}
        <FadeUp>
          <SectionLabel>About Catering</SectionLabel>

          <h2
            className="font-display text-[34px] sm:text-[42px] font-semibold leading-tight mb-5"
            style={{ color: "var(--text)" }}
          >
            We bring the kitchen to you.
          </h2>

          <p
            className="text-[15px] leading-relaxed max-w-[700px]"
            style={{ color: "var(--text-soft)" }}
          >
            Burmese Bistro caters weddings, celebrations, office events, and
            community gatherings with authentic Burmese cuisine and elegant
            presentation.
          </p>
        </FadeUp>

        {/* Event Types */}
        <div>
          <FadeUp>
            <SectionLabel>Events</SectionLabel>

            <h2
              className="font-display text-[34px] sm:text-[42px] font-semibold mb-10"
              style={{ color: "var(--text)" }}
            >
              Every occasion, beautifully fed.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {EVENT_TYPES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                }}
                className="rounded-3xl p-6 border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <span className="text-[34px]">{item.icon}</span>

                <h3
                  className="font-display text-[22px] font-semibold mt-4 mb-3"
                  style={{ color: "var(--text)" }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: "var(--text-soft)" }}
                >
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

            <h2
              className="font-display text-[34px] sm:text-[42px] font-semibold mb-3"
              style={{ color: "var(--text)" }}
            >
              Catering Packages
            </h2>

            <p
              className="text-[14px] mb-10"
              style={{ color: "var(--text-soft)" }}
            >
              Flexible catering options for intimate dinners and large-scale
              events.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <FadeUp>
            <SectionLabel>Questions</SectionLabel>

            <h2
              className="font-display text-[34px] sm:text-[42px] font-semibold mb-8"
              style={{ color: "var(--text)" }}
            >
              Frequently Asked
            </h2>
          </FadeUp>

          <div
            className="rounded-3xl border px-6 py-2"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            {FAQS.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeUp>
          <div className="relative rounded-[32px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80"
              alt="Event"
              className="w-full h-[260px] sm:h-[320px] object-cover brightness-[0.4]"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="font-display text-[32px] sm:text-[42px] font-semibold italic text-white mb-4">
                Planning an event?
              </h3>

              <p className="text-[14px] text-white/75 mb-7 max-w-[460px] leading-relaxed">
                Let us create an unforgettable Burmese dining experience for
                your guests with beautifully crafted catering services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-7 py-3 bg-gold hover:bg-gold-dark text-white text-[13px] font-medium rounded-2xl transition-all duration-300"
                >
                  Request a Quote
                </button>

                <button
                  onClick={() => navigate("/menu")}
                  className="px-7 py-3 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-[13px] font-medium rounded-2xl transition-all duration-300"
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

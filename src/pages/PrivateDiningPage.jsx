import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────

const OCCASIONS = [
  {
    icon: "🎉",
    title: "Birthday Celebrations",
    desc: "Make their day unforgettable. We'll decorate the room, arrange a custom cake, and prepare a special menu tailored to your guest of honour.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Gatherings",
    desc: "Reunite over the flavours of home. Our family-style sharing platters are designed for groups of 6 to 30, keeping every generation happy.",
  },
  {
    icon: "💼",
    title: "Business Meetings",
    desc: "Impress clients in a refined private setting. We offer discreet service, AV setup, and a curated menu to suit any dietary requirement.",
  },
  {
    icon: "🍷",
    title: "Romantic Dinners",
    desc: "A candlelit table, curated courses, and complete privacy. Let us craft an evening your partner will never forget.",
  },
  {
    icon: "💍",
    title: "Engagements & Proposals",
    desc: "We work with florists, photographers, and planners to set the perfect scene for your most important question.",
  },
  {
    icon: "🎓",
    title: "Graduation Parties",
    desc: "Celebrate the milestone with a feast. Reserve the full room for up to 40 guests and let our team handle every detail.",
  },
];

const PACKAGES = [
  {
    name: "Intimate",
    guests: "2 – 8",
    price: "800,000",
    highlight: false,
    perks: [
      "Private room with ambient lighting",
      "Welcome drink on arrival",
      "3-course set menu",
      "Dedicated host",
      "Complimentary table décor",
    ],
  },
  {
    name: "Signature",
    guests: "8 – 20",
    price: "2,000,000",
    highlight: true,
    perks: [
      "Exclusive private hall",
      "Welcome cocktails & canapés",
      "5-course tasting menu",
      "Dedicated host & service team",
      "Custom floral arrangement",
      "Personalised menu cards",
      "Optional AV setup",
    ],
  },
  {
    name: "Grand",
    guests: "20 – 40",
    price: "5,800,000",
    highlight: false,
    perks: [
      "Full venue buyout",
      "Open welcome drinks station",
      "Banquet-style sharing feast",
      "Full service team",
      "Custom décor & centrepieces",
      "Personalised menu & signage",
      "AV & PA system included",
      "Complimentary birthday cake",
    ],
  },
];

const FAQS = [
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 2 weeks in advance for smaller parties, and 4–6 weeks for larger events.",
  },
  {
    q: "Can I bring my own cake or decorations?",
    a: "Absolutely. You're welcome to bring your own cake and decorations.",
  },
  {
    q: "Do you accommodate dietary requirements?",
    a: "Yes. We cater for vegetarian, vegan, gluten-free, and halal requirements.",
  },
  {
    q: "Is a deposit required?",
    a: "A 30% deposit is required to confirm your booking.",
  },
  {
    q: "Can I customise the menu?",
    a: "Yes — especially for Signature and Grand packages.",
  },
];

// ── Components ────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
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
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="h-px w-8 bg-[var(--br)]" />

      <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--br)] font-medium">
        {children}
      </p>
    </div>
  );
}

function OccasionCard({ item, index }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-40px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col gap-3 p-5 rounded-3xl border transition-all duration-300 hover:shadow-xl"
      style={{
        background: "var(--card)",
        borderColor: "var(--bo)",
      }}
    >
      <span className="text-[30px]">{item.icon}</span>

      <h3
        className="font-display text-[19px] font-semibold leading-tight"
        style={{ color: "var(--text)" }}
      >
        {item.title}
      </h3>

      <p
        className="text-[13px] leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        {item.desc}
      </p>
    </motion.div>
  );
}

function PackageCard({ pkg, index }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-40px",
  });

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
      className={`relative flex flex-col rounded-3xl p-6 border transition-all duration-300 ${
        pkg.highlight ? "shadow-2xl" : "hover:shadow-lg"
      }`}
      style={{
        background: pkg.highlight ? "var(--br)" : "var(--card)",
        borderColor: pkg.highlight ? "var(--br)" : "var(--bo)",
      }}
    >
      {pkg.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--text)] text-[var(--bg)] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3
        className="font-display text-[30px] font-semibold mb-1"
        style={{
          color: pkg.highlight ? "#ffffff" : "var(--text)",
        }}
      >
        {pkg.name}
      </h3>

      <p
        className="text-[12px] mb-4"
        style={{
          color: pkg.highlight ? "rgba(255,255,255,0.75)" : "var(--muted)",
        }}
      >
        {pkg.guests} guests
      </p>

      <div className="flex items-end gap-1 mb-6">
        <span
          className="font-display text-[38px] font-semibold leading-none"
          style={{
            color: pkg.highlight ? "#ffffff" : "var(--text)",
          }}
        >
          {pkg.price}
        </span>

        <span
          className="text-[12px] mb-1"
          style={{
            color: pkg.highlight ? "rgba(255,255,255,0.7)" : "var(--muted)",
          }}
        >
          MMK / event
        </span>
      </div>

      <ul className="flex-1 space-y-2.5 mb-6">
        {pkg.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2.5">
            <span
              className="mt-0.5 text-[13px]"
              style={{
                color: pkg.highlight ? "#ffffff" : "var(--br)",
              }}
            >
              ✓
            </span>

            <span
              className="text-[13px] leading-snug"
              style={{
                color: pkg.highlight
                  ? "rgba(255,255,255,0.88)"
                  : "var(--muted)",
              }}
            >
              {perk}
            </span>
          </li>
        ))}
      </ul>

      <button
        className="w-full py-3 rounded-xl text-[13px] font-medium transition-all duration-200"
        style={{
          background: pkg.highlight ? "#ffffff" : "var(--br)",
          color: pkg.highlight ? "var(--br)" : "#ffffff",
        }}
      >
        Book This Package
      </button>
    </motion.div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b" style={{ borderColor: "var(--bo)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span
          className="text-[14px] font-medium"
          style={{ color: "var(--text)" }}
        >
          {item.q}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[22px]"
          style={{ color: "var(--muted)" }}
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
              className="pb-5 text-[13px] leading-relaxed"
              style={{ color: "var(--muted)" }}
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

export default function PrivateDiningPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Hero */}

      <div className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80"
          alt="Private dining"
          className="w-full h-full object-cover brightness-[0.5]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#f5c16c] mb-2">
              Burmese Bistro · Exclusive Spaces
            </p>

            <h1 className="font-display text-[42px] sm:text-[58px] md:text-[68px] font-semibold text-white leading-[1.02]">
              Private <em className="italic text-[#f5c16c]">Dining</em>
            </h1>

            <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed text-white/70">
              Reserve an intimate space for your celebrations, gatherings, and
              unforgettable moments.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}

      <div className="max-w-[1000px] mx-auto w-full px-4 sm:px-6 md:px-8 py-14 space-y-24">
        {/* Intro */}

        <FadeUp>
          <SectionLabel>Welcome</SectionLabel>

          <h2
            className="font-display text-[32px] sm:text-[40px] font-semibold mb-5"
            style={{ color: "var(--text)" }}
          >
            Your celebration, your space.
          </h2>

          <p
            className="max-w-[720px] text-[14px] leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Whether you're planning an intimate dinner or a grand gathering,
            Burmese Bistro offers elegant private dining experiences tailored
            entirely to you.
          </p>
        </FadeUp>

        {/* Occasions */}

        <div>
          <FadeUp>
            <SectionLabel>Perfect For</SectionLabel>

            <h2
              className="font-display text-[32px] sm:text-[38px] font-semibold mb-8"
              style={{ color: "var(--text)" }}
            >
              Every Special Occasion
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OCCASIONS.map((item, i) => (
              <OccasionCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Packages */}

        <div>
          <FadeUp>
            <SectionLabel>Packages</SectionLabel>

            <h2
              className="font-display text-[32px] sm:text-[38px] font-semibold mb-3"
              style={{ color: "var(--text)" }}
            >
              Choose Your Package
            </h2>

            <p className="text-[13px] mb-8" style={{ color: "var(--muted)" }}>
              Flexible options designed for every celebration size.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>
        </div>

        {/* Room Details */}

        <FadeUp>
          <div
            className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border"
            style={{
              borderColor: "var(--bo)",
              background: "var(--card)",
            }}
          >
            <div className="h-[220px] md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Private dining room"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 flex flex-col justify-center">
              <SectionLabel>The Space</SectionLabel>

              <h3
                className="font-display text-[28px] sm:text-[32px] font-semibold mb-5"
                style={{ color: "var(--text)" }}
              >
                Designed for intimacy.
              </h3>

              <ul className="space-y-3">
                {[
                  "🕯️ Warm ambient lighting",
                  "🔇 Soundproofed walls",
                  "🌸 Fresh floral arrangements",
                  "📺 Optional AV & projector",
                  "🚗 Dedicated parking",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[13px]"
                    style={{ color: "var(--muted)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* FAQ */}

        <div>
          <FadeUp>
            <SectionLabel>Questions</SectionLabel>

            <h2
              className="font-display text-[32px] sm:text-[38px] font-semibold mb-6"
              style={{ color: "var(--text)" }}
            >
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
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80"
              alt="Guests celebrating"
              className="w-full h-[240px] sm:h-[300px] object-cover brightness-[0.45]"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="font-display italic text-[32px] sm:text-[42px] font-semibold text-white mb-4">
                Ready to book your table?
              </h3>

              <p className="max-w-[460px] text-[13px] leading-relaxed text-white/70 mb-7">
                Contact our events team today and let us create a memorable
                experience for you and your guests.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-3 rounded-xl text-white text-[13px] font-medium transition-colors"
                  style={{ background: "var(--br)" }}
                >
                  Make an Enquiry
                </button>

                <button
                  onClick={() => navigate("/reservations")}
                  className="px-6 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-[13px] font-medium transition-colors"
                >
                  View Reservations
                </button>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

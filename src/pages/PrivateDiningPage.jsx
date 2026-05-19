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
    price: "120,000",
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
    price: "280,000",
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
    price: "580,000",
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
    a: "We recommend booking at least 2 weeks in advance for smaller parties, and 4–6 weeks for larger events. For peak dates (weekends, public holidays) please book as early as possible.",
  },
  {
    q: "Can I bring my own cake or decorations?",
    a: "Absolutely. You're welcome to bring your own cake — we'll store and serve it for you at no extra charge. For décor, please let us know in advance so we can coordinate setup.",
  },
  {
    q: "Do you accommodate dietary requirements?",
    a: "Yes. We cater for vegetarian, vegan, gluten-free, and halal requirements. Please inform us when booking so our kitchen can prepare accordingly.",
  },
  {
    q: "Is a deposit required?",
    a: "A 30% deposit is required to confirm your booking. The remainder is settled on the day of your event.",
  },
  {
    q: "Can I customise the menu?",
    a: "Yes — especially for the Signature and Grand packages. Our chef will consult with you to create a personalised menu that reflects your preferences.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="h-px w-8 bg-gold" />
      <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-body font-medium">
        {children}
      </p>
    </div>
  );
}

function OccasionCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
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
      className="group flex flex-col gap-3 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-gold/60 hover:shadow-lg transition-all duration-300"
    >
      <span className="text-[30px]">{item.icon}</span>
      <h3 className="font-display text-[19px] font-semibold text-stone-900 dark:text-stone-100 leading-tight">
        {item.title}
      </h3>
      <p className="text-[13px] leading-relaxed text-stone-500 dark:text-stone-400 font-body">
        {item.desc}
      </p>
    </motion.div>
  );
}

function PackageCard({ pkg, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
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
      className={`relative flex flex-col rounded-2xl p-6 border transition-all duration-300 ${
        pkg.highlight
          ? "bg-gold border-gold shadow-xl shadow-gold/20 text-white"
          : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-gold/50 hover:shadow-md"
      }`}
    >
      {pkg.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-[10px] font-semibold font-body tracking-widest uppercase px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <p
        className={`font-display text-[28px] font-semibold mb-0.5 ${pkg.highlight ? "text-white" : "text-stone-900 dark:text-stone-100"}`}
      >
        {pkg.name}
      </p>
      <p
        className={`text-[12px] font-body mb-4 ${pkg.highlight ? "text-white/80" : "text-stone-500 dark:text-stone-400"}`}
      >
        {pkg.guests} guests
      </p>

      <div
        className={`flex items-end gap-1 mb-6 ${pkg.highlight ? "text-white" : "text-stone-900 dark:text-stone-100"}`}
      >
        <span className="font-display text-[38px] font-semibold leading-none">
          {pkg.price}
        </span>
        <span
          className={`text-[12px] font-body mb-1.5 ${pkg.highlight ? "text-white/70" : "text-stone-400"}`}
        >
          MMK / event
        </span>
      </div>

      <ul className="flex-1 space-y-2.5 mb-6">
        {pkg.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 text-[13px] ${pkg.highlight ? "text-white" : "text-gold"}`}
            >
              ✓
            </span>
            <span
              className={`text-[13px] font-body leading-snug ${pkg.highlight ? "text-white/90" : "text-stone-600 dark:text-stone-400"}`}
            >
              {perk}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-2.5 rounded-xl text-[13px] font-medium font-body tracking-wide transition-all duration-200 ${
          pkg.highlight
            ? "bg-white text-gold hover:bg-stone-100"
            : "bg-gold text-white hover:bg-gold-dark"
        }`}
      >
        Book This Package
      </button>
    </motion.div>
  );
}

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 dark:border-stone-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="text-[14px] font-medium font-body text-stone-800 dark:text-stone-200 group-hover:text-gold transition-colors">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[20px] text-stone-400 dark:text-stone-600 flex-shrink-0 leading-none"
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[13px] leading-relaxed text-stone-500 dark:text-stone-400 font-body pb-4">
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
    <div className="flex flex-col flex-1 overflow-y-auto bg-stone-50 dark:bg-stone-950 font-body">
      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80"
          alt="Elegant private dining room"
          className="w-full h-full object-cover brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-body font-medium mb-2">
              Burmese Bistro · Exclusive Spaces
            </p>
            <h1 className="font-display text-[40px] sm:text-[54px] md:text-[64px] font-semibold text-white leading-[1.02]">
              Private <em className="italic text-gold-light">Dining</em>
            </h1>
            <p className="mt-3 text-[14px] text-white/70 font-body max-w-[480px] leading-relaxed">
              Reserve an intimate space for your most meaningful moments —
              crafted with Burmese warmth, served with quiet elegance.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto w-full px-4 sm:px-6 md:px-9 py-12 space-y-20">
        {/* ── Intro ── */}
        <FadeUp>
          <SectionLabel>Welcome</SectionLabel>
          <h2 className="font-display text-[30px] sm:text-[38px] font-semibold text-stone-900 dark:text-stone-100 leading-tight mb-4">
            Your celebration, your space.
          </h2>
          <p className="text-[14px] leading-relaxed text-stone-500 dark:text-stone-400 max-w-[640px]">
            Tucked behind our main dining room, Burmese Bistro's private spaces
            are available exclusively for you and your guests. Whether you're
            gathering for two or forty, we offer the same care, the same
            recipes, and the same warmth — in complete privacy. Every detail is
            handled so you can simply be present.
          </p>
        </FadeUp>

        {/* ── Occasions ── */}
        <div>
          <FadeUp>
            <SectionLabel>Perfect For</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-8">
              Every Special Occasion
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {OCCASIONS.map((item, i) => (
              <OccasionCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── Packages ── */}
        <div>
          <FadeUp>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Choose Your Package
            </h2>
            <p className="text-[13px] text-stone-500 dark:text-stone-400 font-body mb-8">
              All prices are per event and include service. Custom packages
              available on request.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>
        </div>

        {/* ── Room Details strip ── */}
        <FadeUp>
          <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-stone-200 dark:border-stone-800">
            <div className="h-[200px] md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Private dining room interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-7 sm:p-8 bg-white dark:bg-stone-900 flex flex-col justify-center">
              <SectionLabel>The Space</SectionLabel>
              <h3 className="font-display text-[26px] sm:text-[30px] font-semibold text-stone-900 dark:text-stone-100 mb-4">
                Designed for intimacy.
              </h3>
              <ul className="space-y-3">
                {[
                  "🕯️  Warm ambient lighting, fully dimmable",
                  "🔇  Soundproofed walls for complete privacy",
                  "🌸  Fresh floral arrangements every event",
                  "📺  Optional AV & projection screen",
                  "🚗  Private entrance & dedicated parking",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[13px] text-stone-600 dark:text-stone-400 font-body leading-snug"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* ── FAQ ── */}
        <div>
          <FadeUp>
            <SectionLabel>Questions</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-6">
              Frequently Asked
            </h2>
          </FadeUp>
          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {FAQS.map((item, i) => (
              <FaqItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <FadeUp>
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80"
              alt="Guests celebrating at a private dinner"
              className="w-full h-[220px] sm:h-[260px] object-cover brightness-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="font-display text-[28px] sm:text-[36px] font-semibold italic text-white mb-3">
                Ready to book your table?
              </h3>
              <p className="text-[13px] text-white/70 font-body mb-6 max-w-[400px]">
                Contact us today and our events team will get back to you within
                24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white text-[13px] font-medium font-body tracking-wide rounded-xl transition-colors duration-200"
                >
                  Make an Enquiry
                </button>
                <button
                  onClick={() => navigate("/reservations")}
                  className="px-6 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white text-[13px] font-medium font-body tracking-wide rounded-xl transition-colors duration-200"
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

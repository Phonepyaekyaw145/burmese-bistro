import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────

const EVENT_TYPES = [
  {
    icon: "🎊",
    title: "Corporate Events",
    desc: "Board lunches, team celebrations, product launches, and client dinners — we handle the food so you can focus on the moment.",
  },
  {
    icon: "💒",
    title: "Weddings & Receptions",
    desc: "From intimate ceremonies to grand receptions of 300+, our wedding catering blends Burmese tradition with elegant presentation.",
  },
  {
    icon: "🎂",
    title: "Birthday Parties",
    desc: "A feast spread worthy of the occasion. Custom menus, sharing platters, and a centrepiece dish designed around the guest of honour.",
  },
  {
    icon: "🎓",
    title: "Graduations",
    desc: "Celebrate the milestone with food that brings everyone together — family-style spreads designed for groups of all sizes.",
  },
  {
    icon: "🏛️",
    title: "Cultural Ceremonies",
    desc: "Traditional Burmese ceremonies deserve authentic flavours. We work respectfully with your customs to provide fitting menus.",
  },
  {
    icon: "🤝",
    title: "Community Gatherings",
    desc: "Festivals, fundraisers, school events, and neighbourhood gatherings — our team scales to your crowd with ease.",
  },
];

const PACKAGES = [
  {
    name: "Starter",
    guests: "20 – 50",
    price: "350,000",
    highlight: false,
    note: "Great for small office events or intimate celebrations.",
    perks: [
      "3-dish buffet menu",
      "Disposable eco serving ware",
      "1 dedicated catering staff",
      "Setup & breakdown included",
      "Vegetarian option available",
    ],
  },
  {
    name: "Banquet",
    guests: "50 – 150",
    price: "850,000",
    highlight: true,
    note: "Our most popular package — perfect for weddings and corporate events.",
    perks: [
      "6-dish buffet + dessert table",
      "Premium reusable serving ware",
      "Full catering team (4 staff)",
      "Setup, service & breakdown",
      "Vegetarian & halal options",
      "Custom menu consultation",
      "Personalised signage & labels",
    ],
  },
  {
    name: "Grand",
    guests: "150 – 500+",
    price: "Custom",
    highlight: false,
    note: "Fully bespoke catering for large-scale events and weddings.",
    perks: [
      "Fully custom menu design",
      "Live cooking stations",
      "Full service team & manager",
      "Premium tableware & décor",
      "Halal, vegan & allergy menus",
      "Pre-event tasting session",
      "Day-of event coordinator",
      "Post-event cleanup",
    ],
  },
];

const MENU_HIGHLIGHTS = [
  {
    category: "Mains",
    items: [
      "Mohinga — Fish Noodle Soup",
      "Ohn No Khao Swe — Coconut Noodle",
      "Mandalay Mee Shay — Dry Noodles",
      "Burmese Chicken Curry",
    ],
  },
  {
    category: "Sharing Platters",
    items: [
      "Mixed Fritter Platter",
      "Burmese Salad Selection",
      "Stuffed Tofu & Vegetable Skewers",
      "Grilled Lemongrass Chicken",
    ],
  },
  {
    category: "Vegetarian",
    items: [
      "Lahpet Thoke — Tea Leaf Salad",
      "Tofu Kyaw — Crispy Fried Tofu",
      "Mixed Vegetable Curry",
      "Chickpea & Potato Dry Curry",
    ],
  },
  {
    category: "Desserts",
    items: [
      "Mont Lone Yay Paw — Coconut Balls",
      "Sanwin Makin — Semolina Cake",
      "Seasonal Fresh Fruit Platter",
      "Palm Sugar Pudding",
    ],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Get in Touch",
    desc: "Fill out our catering enquiry form or call us. We'll respond within 24 hours to discuss your event.",
  },
  {
    step: "02",
    title: "Menu Consultation",
    desc: "Our chef meets with you (in person or online) to design a custom menu around your event, headcount, and dietary needs.",
  },
  {
    step: "03",
    title: "Tasting Session",
    desc: "For Banquet and Grand packages, we invite you for a complimentary tasting before finalising the menu.",
  },
  {
    step: "04",
    title: "Event Day",
    desc: "Our team arrives early, sets everything up, and manages the service so you don't have to worry about a thing.",
  },
];

const FAQS = [
  {
    q: "How far in advance should I book catering?",
    a: "We recommend booking at least 3–4 weeks in advance for smaller events, and 6–8 weeks for large weddings or corporate functions. High-demand dates (holidays, weekends) fill up quickly.",
  },
  {
    q: "Do you cater outside of Yangon?",
    a: "Yes — we travel within a 60 km radius of Yangon. For events further afield, travel and accommodation costs for the team will be added to your quote.",
  },
  {
    q: "Can we customise the menu?",
    a: "Absolutely. Every package includes a menu consultation. We can accommodate dietary restrictions, cultural requirements, and personal preferences.",
  },
  {
    q: "Do you provide serving equipment and tables?",
    a: "Yes. All packages include serving ware. For the Banquet and Grand packages, we bring full table setups with linens, chafing dishes, and signage.",
  },
  {
    q: "Is a deposit required to confirm?",
    a: "Yes — a 30% deposit is required to hold your date. The balance is due 7 days before the event. For Grand packages, a payment plan can be arranged.",
  },
  {
    q: "What if my guest count changes?",
    a: "We understand headcounts shift. Final guest numbers can be confirmed up to 5 days before the event. We always prepare a 10% buffer to ensure no one goes without.",
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

function PackageCard({ pkg, index }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative flex flex-col rounded-2xl p-6 border transition-all duration-300 ${
        pkg.highlight
          ? "bg-gold border-gold shadow-xl shadow-gold/20"
          : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-gold/50 hover:shadow-md"
      }`}
    >
      {pkg.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-[10px] font-semibold font-body tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap">
          Most Popular
        </span>
      )}
      <p
        className={`font-display text-[28px] font-semibold mb-0.5 ${pkg.highlight ? "text-white" : "text-stone-900 dark:text-stone-100"}`}
      >
        {pkg.name}
      </p>
      <p
        className={`text-[12px] font-body mb-1 ${pkg.highlight ? "text-white/80" : "text-stone-500 dark:text-stone-400"}`}
      >
        {pkg.guests} guests
      </p>
      <p
        className={`text-[12px] font-body italic mb-4 ${pkg.highlight ? "text-white/70" : "text-stone-400 dark:text-stone-500"}`}
      >
        {pkg.note}
      </p>
      <div
        className={`flex items-end gap-1 mb-6 ${pkg.highlight ? "text-white" : "text-stone-900 dark:text-stone-100"}`}
      >
        {pkg.price === "Custom" ? (
          <span className="font-display text-[32px] font-semibold leading-none">
            Custom Quote
          </span>
        ) : (
          <>
            <span className="font-display text-[36px] font-semibold leading-none">
              {pkg.price}
            </span>
            <span
              className={`text-[12px] font-body mb-1.5 ${pkg.highlight ? "text-white/70" : "text-stone-400"}`}
            >
              MMK / event
            </span>
          </>
        )}
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
        onClick={() => navigate("/contact")}
        className={`w-full py-2.5 rounded-xl text-[13px] font-medium font-body tracking-wide transition-all duration-200 ${
          pkg.highlight
            ? "bg-white text-gold hover:bg-stone-100"
            : "bg-gold text-white hover:bg-gold-dark"
        }`}
      >
        {pkg.price === "Custom" ? "Request a Quote" : "Book This Package"}
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

export default function CateringServicePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-stone-50 dark:bg-stone-950 font-body">
      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1400&q=80"
          alt="Catering buffet spread"
          className="w-full h-full object-cover brightness-[0.48]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-body font-medium mb-2">
              Burmese Bistro · Event Catering
            </p>
            <h1 className="font-display text-[40px] sm:text-[54px] md:text-[64px] font-semibold text-white leading-[1.02]">
              Catering <em className="italic text-gold-light">Service</em>
            </h1>
            <p className="mt-3 text-[14px] text-white/70 font-body max-w-[480px] leading-relaxed">
              Authentic Burmese cuisine, professionally prepared and served at
              your event — from intimate gatherings to grand celebrations.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto w-full px-4 sm:px-6 md:px-9 py-12 space-y-20">
        {/* ── Intro ── */}
        <FadeUp>
          <SectionLabel>About Our Catering</SectionLabel>
          <h2 className="font-display text-[30px] sm:text-[38px] font-semibold text-stone-900 dark:text-stone-100 leading-tight mb-4">
            We bring the kitchen to you.
          </h2>
          <p className="text-[14px] leading-relaxed text-stone-500 dark:text-stone-400 max-w-[640px]">
            For over a decade, Burmese Bistro has catered events across Yangon
            and beyond — bringing the same family recipes, the same
            craftsmanship, and the same warmth from our kitchen to yours.
            Whether you're hosting 20 colleagues or 500 wedding guests, our team
            handles every detail from menu planning to final cleanup, so you can
            be fully present for what matters.
          </p>
        </FadeUp>

        {/* ── Event Types ── */}
        <div>
          <FadeUp>
            <SectionLabel>Events We Cater</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-8">
              Every occasion, beautifully fed.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {EVENT_TYPES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col gap-3 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-gold/60 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-[30px]">{item.icon}</span>
                <h3 className="font-display text-[19px] font-semibold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-stone-500 dark:text-stone-400 font-body">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Packages ── */}
        <div>
          <FadeUp>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Catering Packages
            </h2>
            <p className="text-[13px] text-stone-500 dark:text-stone-400 font-body mb-8">
              All packages include setup and breakdown. Custom packages
              available on request.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>
        </div>

        {/* ── Menu Highlights ── */}
        <div>
          <FadeUp>
            <SectionLabel>Sample Menu</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-2">
              A taste of what we offer.
            </h2>
            <p className="text-[13px] text-stone-500 dark:text-stone-400 font-body mb-8">
              All menus are customisable. Final selection is confirmed during
              your consultation.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MENU_HIGHLIGHTS.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden"
              >
                <div className="px-5 py-3 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50">
                  <p className="text-[11px] tracking-[0.18em] uppercase font-medium text-gold font-body">
                    {cat.category}
                  </p>
                </div>
                <ul className="px-5 py-4 space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-gold mt-0.5 text-[12px]">✦</span>
                      <span className="text-[13px] text-stone-600 dark:text-stone-400 font-body leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Process ── */}
        <div>
          <FadeUp>
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-8">
              From enquiry to event day.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {PROCESS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
              >
                <span className="font-display text-[42px] font-semibold text-gold/20 leading-none select-none">
                  {s.step}
                </span>
                <h3 className="font-display text-[18px] font-semibold text-stone-900 dark:text-stone-100">
                  {s.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-stone-500 dark:text-stone-400 font-body">
                  {s.desc}
                </p>
                {i < PROCESS.length - 1 && (
                  <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-stone-300 dark:text-stone-700 text-[18px] z-10">
                    →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Photo strip ── */}
        <FadeUp>
          <div className="grid grid-cols-3 gap-3 rounded-2xl overflow-hidden">
            {[
              "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80",
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
            ].map((src, i) => (
              <div
                key={i}
                className="h-[120px] sm:h-[160px] rounded-xl overflow-hidden"
              >
                <img
                  src={src}
                  alt="Catering event"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
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
              <FaqItem key={i} item={item} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <FadeUp>
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80"
              alt="Event catering celebration"
              className="w-full h-[220px] sm:h-[260px] object-cover brightness-[0.42]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="font-display text-[28px] sm:text-[36px] font-semibold italic text-white mb-3">
                Planning an event?
              </h3>
              <p className="text-[13px] text-white/70 font-body mb-6 max-w-[400px]">
                Tell us about your occasion and we'll craft a catering
                experience your guests will talk about long after the last dish
                is cleared.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white text-[13px] font-medium font-body tracking-wide rounded-xl transition-colors duration-200"
                >
                  Request a Quote
                </button>
                <button
                  onClick={() => navigate("/menu")}
                  className="px-6 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white text-[13px] font-medium font-body tracking-wide rounded-xl transition-colors duration-200"
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
